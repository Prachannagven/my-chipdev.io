import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { runVerilatorQuestion } from '../core/verilator-runner';

const PORT = 8787;

function sendJson(response: http.ServerResponse, statusCode: number, payload: unknown) {
  response.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  response.end(JSON.stringify(payload));
}

async function readBody(request: http.IncomingMessage): Promise<string> {
  const chunks: Buffer[] = [];
  for await (const chunk of request) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks).toString('utf8');
}

const server = http.createServer(async (request, response) => {
  if (!request.url) {
    sendJson(response, 400, { error: 'Missing URL.' });
    return;
  }

  if (request.method === 'OPTIONS') {
    response.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    response.end();
    return;
  }

  if (request.method === 'GET' && request.url === '/health') {
    sendJson(response, 200, { ok: true });
    return;
  }

  if (request.method === 'POST' && request.url === '/run') {
    try {
      const body = JSON.parse(await readBody(request)) as { questionFileName?: string; source?: string };
      if (!body.questionFileName || !body.source) {
        sendJson(response, 400, { error: 'questionFileName and source are required.' });
        return;
      }

      const result = await runVerilatorQuestion({
        questionFileName: body.questionFileName,
        source: body.source,
      });
      sendJson(response, 200, result);
      return;
    } catch (error) {
      sendJson(response, 500, {
        ok: false,
        error: error instanceof Error ? error.message : 'Unknown error.',
      });
      return;
    }
  }

  if (request.method === 'GET' && request.url === '/questions/Q01_Simple_Router') {
    const brief = await readFile(path.join(process.cwd(), 'questions', 'Q01_Simple_Router.md'), 'utf8');
    sendJson(response, 200, { brief });
    return;
  }

  sendJson(response, 404, { error: 'Not found.' });
});

server.listen(PORT, () => {
  console.log(`ChipDev API listening on http://127.0.0.1:${PORT}`);
});
