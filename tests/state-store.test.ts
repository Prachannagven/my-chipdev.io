import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

test('drafts and submissions persist and derive progress', async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'chipdev-state-'));
  process.env.CHIPDEV_STATE_DIR = directory;
  const store = await import(`../server/state-store.ts?test=${Date.now()}`);

  try {
    await store.saveDraft('Q01', 'module draft; endmodule');
    let state = await store.getQuestionState('Q01');
    assert.equal(state.draft, 'module draft; endmodule');
    assert.equal(state.status, 'unattempted');

    const failed = await store.addSubmission('Q01', 'bad source', {
      status: 'wrong_answer',
      public: { passed: 1, total: 2, cases: [] },
      hidden: { passed: 0, total: 3 },
      diagnostics: [],
    });
    assert.equal((await store.getQuestionState('Q01')).status, 'attempted');
    assert.equal((await store.getSubmission(failed.id))?.source, 'bad source');

    await store.addSubmission('Q01', 'accepted source', {
      status: 'accepted',
      public: { passed: 2, total: 2, cases: [] },
      hidden: { passed: 3, total: 3 },
      diagnostics: [],
    });
    state = await store.getQuestionState('Q01');
    assert.equal(state.status, 'solved');
    assert.equal(state.submissions.length, 2);
    assert.equal(state.draft, 'accepted source');
  } finally {
    await rm(directory, { recursive: true, force: true });
    delete process.env.CHIPDEV_STATE_DIR;
  }
});
