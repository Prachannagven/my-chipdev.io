import assert from 'node:assert/strict';
import { access } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { questionManifest } from '../core/question-manifest';

test('all 34 questions have unique IDs and runnable assets', async () => {
  assert.equal(questionManifest.length, 34);
  assert.equal(new Set(questionManifest.map((question) => question.id)).size, 34);

  for (const question of questionManifest) {
    assert.ok(question.visibleCount > 0);
    assert.ok(question.hiddenCount > 0);
    await access(path.join(process.cwd(), 'questions', question.fileName));
    await access(path.join(process.cwd(), 'solutions', `${question.assetBase}_rtl.sv`));
    await access(path.join(process.cwd(), 'solutions', `${question.assetBase}_tb.sv`));
  }
});
