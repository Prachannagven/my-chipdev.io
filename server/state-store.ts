import { randomUUID } from 'node:crypto';
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';

export type GradeStatus =
  | 'accepted'
  | 'wrong_answer'
  | 'compile_error'
  | 'runtime_error'
  | 'timeout'
  | 'internal_error';

export type CaseResult = {
  id: string;
  status: 'passed' | 'failed';
  expected?: string;
  actual?: string;
  message?: string;
};

export type StoredGrade = {
  status: GradeStatus;
  public: { passed: number; total: number; cases: CaseResult[] };
  hidden?: { passed: number; total: number };
  diagnostics: string[];
};

export type Submission = StoredGrade & {
  id: string;
  questionId: string;
  source: string;
  submittedAt: string;
};

type QuestionState = {
  draft?: string;
  submissions: Submission[];
};

type StateFile = {
  version: 1;
  questions: Record<string, QuestionState>;
};

const stateDir = process.env.CHIPDEV_STATE_DIR
  ? path.resolve(process.env.CHIPDEV_STATE_DIR)
  : path.join(process.cwd(), '.chipdev');
const statePath = path.join(stateDir, 'state.json');
let writeQueue = Promise.resolve();

async function loadState(): Promise<StateFile> {
  try {
    const value = JSON.parse(await readFile(statePath, 'utf8')) as StateFile;
    if (value.version === 1 && value.questions) {
      return value;
    }
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
      throw error;
    }
  }
  return { version: 1, questions: {} };
}

async function saveStateNow(state: StateFile): Promise<void> {
  await mkdir(stateDir, { recursive: true });
  const temporaryPath = `${statePath}.${process.pid}.tmp`;
  await writeFile(temporaryPath, `${JSON.stringify(state, null, 2)}\n`, 'utf8');
  await rename(temporaryPath, statePath);
}

function mutateState<T>(mutation: (state: StateFile) => T | Promise<T>): Promise<T> {
  const operation = writeQueue.then(async () => {
    const state = await loadState();
    const result = await mutation(state);
    await saveStateNow(state);
    return result;
  });
  writeQueue = operation.catch(() => undefined);
  return operation;
}

function statusFor(submissions: Submission[]): 'unattempted' | 'attempted' | 'solved' {
  if (submissions.some((submission) => submission.status === 'accepted')) return 'solved';
  return submissions.length > 0 ? 'attempted' : 'unattempted';
}

export async function getProgress() {
  await writeQueue;
  const state = await loadState();
  return Object.fromEntries(Object.entries(state.questions).map(([questionId, value]) => [questionId, {
    status: statusFor(value.submissions),
    submissionCount: value.submissions.length,
    lastSubmittedAt: value.submissions.at(-1)?.submittedAt,
  }]));
}

export async function getQuestionState(questionId: string) {
  await writeQueue;
  const state = await loadState();
  const value = state.questions[questionId] ?? { submissions: [] };
  return {
    draft: value.draft,
    status: statusFor(value.submissions),
    submissions: value.submissions.map(({ source: _source, diagnostics: _diagnostics, ...summary }) => summary),
  };
}

export async function saveDraft(questionId: string, draft: string): Promise<void> {
  await mutateState((state) => {
    const current = state.questions[questionId] ?? { submissions: [] };
    state.questions[questionId] = { ...current, draft };
  });
}

export async function addSubmission(questionId: string, source: string, grade: StoredGrade): Promise<Submission> {
  const submission: Submission = {
    id: randomUUID(),
    questionId,
    source,
    submittedAt: new Date().toISOString(),
    ...grade,
  };
  await mutateState((state) => {
    const current = state.questions[questionId] ?? { submissions: [] };
    current.draft = source;
    current.submissions.push(submission);
    state.questions[questionId] = current;
  });
  return submission;
}

export async function getSubmission(submissionId: string): Promise<Submission | undefined> {
  await writeQueue;
  const state = await loadState();
  return Object.values(state.questions).flatMap((question) => question.submissions)
    .find((submission) => submission.id === submissionId);
}
