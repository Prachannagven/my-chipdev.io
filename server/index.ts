import http from 'node:http';
import { gradeVerilatorQuestion, runVerilatorQuestion } from '../core/verilator-runner';
import { getQuestionConfig, getQuestionConfigByFileName } from '../core/question-manifest';
import {
  addSubmission,
  getProgress,
  getQuestionState,
  getSubmission,
  saveDraft,
  type StoredGrade,
} from './state-store';

const PORT = Number(process.env.PORT ?? 8787);
const MAX_BODY_BYTES = 512 * 1024;
const MAX_SOURCE_BYTES = 256 * 1024;
let gradingQueue = Promise.resolve();

function sendJson(response: http.ServerResponse, statusCode: number, payload: unknown) {
  response.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  response.end(JSON.stringify(payload));
}

async function readBody(request: http.IncomingMessage): Promise<Record<string, unknown>> {
  const chunks: Buffer[] = [];
  let size = 0;
  for await (const chunk of request) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    size += buffer.length;
    if (size > MAX_BODY_BYTES) throw new Error('Request body is too large.');
    chunks.push(buffer);
  }
  return JSON.parse(Buffer.concat(chunks).toString('utf8')) as Record<string, unknown>;
}

function requireSource(body: Record<string, unknown>): string {
  if (typeof body.source !== 'string' || body.source.trim().length === 0) {
    throw new Error('source is required.');
  }
  if (Buffer.byteLength(body.source, 'utf8') > MAX_SOURCE_BYTES) {
    throw new Error('Source exceeds the 256 KiB limit.');
  }
  return body.source;
}

function enqueueGrade<T>(operation: () => Promise<T>): Promise<T> {
  const queued = gradingQueue.then(operation);
  gradingQueue = queued.then(() => undefined, () => undefined);
  return queued;
}

function asStoredGrade(result: Awaited<ReturnType<typeof gradeVerilatorQuestion>>): StoredGrade {
  return {
    status: result.status,
    public: result.public,
    hidden: result.hidden,
    diagnostics: result.diagnostics,
  };
}

const server = http.createServer(async (request, response) => {
  try {
    if (!request.url) {
      sendJson(response, 400, { error: 'Missing URL.' });
      return;
    }

    if (request.method === 'OPTIONS') {
      sendJson(response, 204, {});
      return;
    }

    const url = new URL(request.url, `http://${request.headers.host ?? '127.0.0.1'}`);
    const segments = url.pathname.split('/').filter(Boolean);

    if (request.method === 'GET' && url.pathname === '/health') {
      sendJson(response, 200, { ok: true });
      return;
    }

    if (request.method === 'GET' && url.pathname === '/api/progress') {
      sendJson(response, 200, { progress: await getProgress() });
      return;
    }

    if (segments[0] === 'api' && segments[1] === 'questions' && segments[2]) {
      const questionId = segments[2];
      if (!getQuestionConfig(questionId)) {
        sendJson(response, 404, { error: 'Unknown question.' });
        return;
      }

      if (request.method === 'GET' && segments.length === 4 && segments[3] === 'state') {
        sendJson(response, 200, await getQuestionState(questionId));
        return;
      }

      if (request.method === 'PUT' && segments.length === 4 && segments[3] === 'draft') {
        const source = requireSource(await readBody(request));
        await saveDraft(questionId, source);
        sendJson(response, 200, { ok: true });
        return;
      }

      if (request.method === 'POST' && segments.length === 4 && segments[3] === 'run') {
        const source = requireSource(await readBody(request));
        const result = await enqueueGrade(() => gradeVerilatorQuestion({ questionId, source, mode: 'run' }));
        sendJson(response, 200, result);
        return;
      }

      if (request.method === 'POST' && segments.length === 4 && segments[3] === 'submissions') {
        const source = requireSource(await readBody(request));
        const result = await enqueueGrade(() => gradeVerilatorQuestion({ questionId, source, mode: 'submit' }));
        const submission = await addSubmission(questionId, source, asStoredGrade(result));
        sendJson(response, 200, { ...result, submissionId: submission.id, submittedAt: submission.submittedAt });
        return;
      }
    }

    if (request.method === 'GET' && segments[0] === 'api' && segments[1] === 'submissions' && segments[2]) {
      const submission = await getSubmission(segments[2]);
      sendJson(response, submission ? 200 : 404, submission ?? { error: 'Submission not found.' });
      return;
    }

    // Backward-compatible endpoint used by the original browser/CLI workflow.
    if (request.method === 'POST' && url.pathname === '/run') {
      const body = await readBody(request);
      const source = requireSource(body);
      const fileName = typeof body.questionFileName === 'string' ? body.questionFileName : '';
      const config = getQuestionConfigByFileName(fileName);
      if (!config) {
        sendJson(response, 400, { error: 'Unknown questionFileName.' });
        return;
      }
      const result = await enqueueGrade(() => runVerilatorQuestion({ questionFileName: config.fileName, source }));
      sendJson(response, 200, result);
      return;
    }

    sendJson(response, 404, { error: 'Not found.' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error.';
    const status = /required|too large|exceeds|JSON/.test(message) ? 400 : 500;
    sendJson(response, status, { error: message });
  }
});

server.listen(PORT, () => {
  console.log(`ChipDev API listening on http://127.0.0.1:${PORT}`);
});
