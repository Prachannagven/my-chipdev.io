import { useEffect, useMemo, useRef, useState } from 'react';
import { getQuestionBrief, getQuestionTemplate, getQuestions } from './lib/questions';
import type { QuestionMeta } from './lib/types';

const API_BASE = import.meta.env.VITE_API_BASE ?? '';
const svKeywords = new Set(['always', 'always_comb', 'always_ff', 'assign', 'begin', 'case', 'default', 'else', 'end', 'endcase', 'endfunction', 'endmodule', 'endtask', 'for', 'function', 'if', 'initial', 'input', 'integer', 'logic', 'module', 'output', 'parameter', 'reg', 'return', 'task', 'typedef', 'wire']);

type WaveformData = { times: number[]; signals: Array<{ name: string; width: number; values: string[] }> };
type GradeStatus = 'accepted' | 'wrong_answer' | 'compile_error' | 'runtime_error' | 'timeout' | 'internal_error';
type CaseResult = { id: string; status: 'passed' | 'failed'; expected?: string; actual?: string; message?: string };
type GradeResult = { status: GradeStatus; public: { passed: number; total: number; cases: CaseResult[] }; hidden?: { passed: number; total: number }; diagnostics: string[]; vcdPath?: string; waveform?: WaveformData; submissionId?: string; submittedAt?: string };
type Progress = Record<string, { status: 'unattempted' | 'attempted' | 'solved'; submissionCount: number; lastSubmittedAt?: string }>;
type SubmissionSummary = GradeResult & { id: string; questionId: string; submittedAt: string };
type SubmissionDetail = SubmissionSummary & { source: string };

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character] ?? character));
}

function inlineMarkdown(value: string) {
  return escapeHtml(value)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>');
}

function renderMarkdown(markdown: string) {
  const lines = markdown.replace(/\r/g, '').split('\n');
  const html: string[] = [];
  let index = 0;
  while (index < lines.length) {
    const line = lines[index];
    if (line.startsWith('```')) {
      const language = line.slice(3).trim();
      const code: string[] = [];
      index += 1;
      while (index < lines.length && !lines[index].startsWith('```')) code.push(lines[index++]);
      html.push(`<pre><span class="code-language">${escapeHtml(language || 'text')}</span><code>${escapeHtml(code.join('\n'))}</code></pre>`);
    } else if (/^#{1,3}\s/.test(line)) {
      const match = /^(#{1,3})\s+(.*)$/.exec(line)!;
      const level = match[1].length;
      html.push(`<h${level}>${inlineMarkdown(match[2])}</h${level}>`);
    } else if (/^[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^[-*]\s+/.test(lines[index])) items.push(`<li>${inlineMarkdown(lines[index++].replace(/^[-*]\s+/, ''))}</li>`);
      html.push(`<ul>${items.join('')}</ul>`);
      continue;
    } else if (/^\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^\d+\.\s+/.test(lines[index])) items.push(`<li>${inlineMarkdown(lines[index++].replace(/^\d+\.\s+/, ''))}</li>`);
      html.push(`<ol>${items.join('')}</ol>`);
      continue;
    } else if (line.trim()) {
      const paragraph: string[] = [line.trim()];
      while (index + 1 < lines.length && lines[index + 1].trim() && !/^(#{1,3}\s|```|[-*]\s+|\d+\.\s+)/.test(lines[index + 1])) paragraph.push(lines[++index].trim());
      html.push(`<p>${inlineMarkdown(paragraph.join(' '))}</p>`);
    }
    index += 1;
  }
  return html.join('');
}

function highlightSystemVerilog(source: string) {
  let output = '';
  for (let index = 0; index < source.length;) {
    const rest = source.slice(index);
    const comment = rest.match(/^\/\*[\s\S]*?\*\/|^\/\/[^\n]*/)?.[0];
    const string = rest.match(/^"(?:\\.|[^"\\])*"/)?.[0];
    const number = rest.match(/^\d+(?:'[bBoOdDhH][0-9a-fA-F_xXzZ]+)?/)?.[0];
    const directive = rest.match(/^`\w+/)?.[0];
    const identifier = rest.match(/^[A-Za-z_$][A-Za-z0-9_$]*/)?.[0];
    if (comment) { output += `<span class="tok-comment">${escapeHtml(comment)}</span>`; index += comment.length; }
    else if (string) { output += `<span class="tok-string">${escapeHtml(string)}</span>`; index += string.length; }
    else if (number) { output += `<span class="tok-number">${escapeHtml(number)}</span>`; index += number.length; }
    else if (directive) { output += `<span class="tok-directive">${escapeHtml(directive)}</span>`; index += directive.length; }
    else if (identifier) { output += svKeywords.has(identifier) ? `<span class="tok-keyword">${identifier}</span>` : escapeHtml(identifier); index += identifier.length; }
    else { output += escapeHtml(source[index++]); }
  }
  return output || ' ';
}

function SyntaxEditor({ value, disabled, onChange }: { value: string; disabled: boolean; onChange: (value: string) => void }) {
  const codeRef = useRef<HTMLElement>(null);
  function syncScroll(element: HTMLTextAreaElement) {
    if (codeRef.current) codeRef.current.style.transform = `translate(${-element.scrollLeft}px, ${-element.scrollTop}px)`;
  }
  return <div className="syntax-editor">
    <pre aria-hidden="true"><code ref={codeRef} dangerouslySetInnerHTML={{ __html: highlightSystemVerilog(value) }} /></pre>
    <textarea value={value} disabled={disabled} onChange={(event) => onChange(event.target.value)} onScroll={(event) => syncScroll(event.currentTarget)} spellCheck={false} aria-label="SystemVerilog editor" />
  </div>;
}

async function requestJson<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, options);
  const result = await response.json() as T & { error?: string };
  if (!response.ok) throw new Error(result.error ?? `Request failed with status ${response.status}`);
  return result;
}

function verdictLabel(status: GradeStatus) { return status.replaceAll('_', ' ').replace(/\b\w/g, (character) => character.toUpperCase()); }

function App() {
  const questions: QuestionMeta[] = useMemo(() => getQuestions(), []);
  const [page, setPage] = useState<'problems' | 'workspace'>('problems');
  const [selectedId, setSelectedId] = useState(questions[0]?.id ?? '');
  const [query, setQuery] = useState('');
  const [drafts, setDrafts] = useState<Record<string, string>>(() => Object.fromEntries(questions.map((question) => [question.id, getQuestionTemplate(question.id)])));
  const [progress, setProgress] = useState<Progress>({});
  const [submissions, setSubmissions] = useState<Record<string, SubmissionSummary[]>>({});
  const [results, setResults] = useState<Record<string, GradeResult>>({});
  const [busyQuestion, setBusyQuestion] = useState('');
  const [busyMode, setBusyMode] = useState<'run' | 'submit' | ''>('');
  const [saveStatus, setSaveStatus] = useState<'Loading' | 'Saving' | 'Saved' | 'Save failed'>('Loading');
  const [resultTab, setResultTab] = useState<'results' | 'waveform' | 'history'>('results');
  const [viewedSubmission, setViewedSubmission] = useState<SubmissionDetail | null>(null);
  const loadedQuestion = useRef('');
  const draftsRef = useRef(drafts);
  const selectedQuestion = questions.find((question) => question.id === selectedId) ?? questions[0];
  const code = selectedQuestion ? drafts[selectedQuestion.id] ?? getQuestionTemplate(selectedQuestion.id) : '';
  const result = selectedQuestion ? results[selectedQuestion.id] : undefined;
  const selectedSubmissions = selectedQuestion ? submissions[selectedQuestion.id] ?? [] : [];
  const visibleQuestions = questions.filter((question) => `${question.id} ${question.title} ${question.difficulty}`.toLowerCase().includes(query.trim().toLowerCase()));
  draftsRef.current = drafts;

  const persistDraft = (questionId: string, source: string, keepalive = false) => requestJson(`/api/questions/${questionId}/draft`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ source }), keepalive });
  const refreshProgress = async () => setProgress((await requestJson<{ progress: Progress }>('/api/progress')).progress);
  const openQuestion = (id: string) => { setSelectedId(id); setPage('workspace'); };

  useEffect(() => { void refreshProgress().catch(() => undefined); }, []);
  useEffect(() => {
    if (!selectedQuestion) return;
    let active = true;
    loadedQuestion.current = '';
    setSaveStatus('Loading'); setViewedSubmission(null);
    void requestJson<{ draft?: string; submissions: SubmissionSummary[] }>(`/api/questions/${selectedQuestion.id}/state`).then((state) => {
      if (!active) return;
      if (state.draft !== undefined) setDrafts((current) => ({ ...current, [selectedQuestion.id]: state.draft as string }));
      setSubmissions((current) => ({ ...current, [selectedQuestion.id]: state.submissions }));
      loadedQuestion.current = selectedQuestion.id; setSaveStatus('Saved');
    }).catch(() => { if (active) setSaveStatus('Save failed'); });
    return () => { active = false; };
  }, [selectedQuestion?.id]);
  useEffect(() => {
    const questionId = selectedId;
    const flush = () => { if (loadedQuestion.current === questionId) void persistDraft(questionId, draftsRef.current[questionId] ?? '', true).catch(() => undefined); };
    const handleVisibility = () => { if (document.visibilityState === 'hidden') flush(); };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => { document.removeEventListener('visibilitychange', handleVisibility); flush(); };
  }, [selectedId]);
  useEffect(() => {
    if (!selectedQuestion || loadedQuestion.current !== selectedQuestion.id) return;
    setSaveStatus('Saving');
    const timeout = window.setTimeout(() => { void persistDraft(selectedQuestion.id, code).then(() => setSaveStatus('Saved')).catch(() => setSaveStatus('Save failed')); }, 500);
    return () => window.clearTimeout(timeout);
  }, [code, selectedQuestion?.id]);

  async function grade(mode: 'run' | 'submit') {
    if (!selectedQuestion || busyQuestion) return;
    setBusyQuestion(selectedQuestion.id); setBusyMode(mode); setResultTab('results');
    try {
      const endpoint = mode === 'run' ? 'run' : 'submissions';
      const gradeResult = await requestJson<GradeResult>(`/api/questions/${selectedQuestion.id}/${endpoint}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ source: code }) });
      setResults((current) => ({ ...current, [selectedQuestion.id]: gradeResult }));
      if (mode === 'submit') {
        const state = await requestJson<{ submissions: SubmissionSummary[] }>(`/api/questions/${selectedQuestion.id}/state`);
        setSubmissions((current) => ({ ...current, [selectedQuestion.id]: state.submissions })); await refreshProgress();
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown API error.';
      setResults((current) => ({ ...current, [selectedQuestion.id]: { status: 'internal_error', public: { passed: 0, total: selectedQuestion.visibleCount, cases: [] }, diagnostics: [message, 'Start the backend with "npm run api".'] } }));
    } finally { setBusyQuestion(''); setBusyMode(''); }
  }
  async function viewSubmission(submissionId: string) { setViewedSubmission(await requestJson<SubmissionDetail>(`/api/submissions/${submissionId}`)); }
  function restoreSubmission() { if (selectedQuestion && viewedSubmission) { setDrafts((current) => ({ ...current, [selectedQuestion.id]: viewedSubmission.source })); setResultTab('results'); } }

  if (page === 'problems') return <div className="site-shell">
    <header className="site-header"><button className="wordmark" onClick={() => setPage('problems')}>chipdev</button><nav><button className="nav-current">Problems</button><span>{Object.values(progress).filter((item) => item.status === 'solved').length} solved</span></nav></header>
    <main className="problem-index-page"><div className="page-heading"><div><h1>Problems</h1><p>Local SystemVerilog practice and OA-style grading.</p></div><input className="problem-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Filter problems" aria-label="Filter problems" /></div>
      <section className="data-box"><table className="problem-table"><thead><tr><th>Status</th><th>ID</th><th>Problem</th><th>Difficulty</th><th>Tests</th><th>Submissions</th></tr></thead><tbody>{visibleQuestions.map((question) => { const item = progress[question.id]; const status = item?.status ?? 'unattempted'; return <tr key={question.id} onClick={() => openQuestion(question.id)}><td><span className={`status-mark ${status}`} title={status} /></td><td>{question.id}</td><td><button className="problem-link" onClick={() => openQuestion(question.id)}>{question.title}</button></td><td><span className={`difficulty ${question.difficulty.toLowerCase()}`}>{question.difficulty}</span></td><td>{question.visibleCount} public / {question.hiddenCount} hidden</td><td>{item?.submissionCount ?? 0}</td></tr>; })}</tbody></table>{visibleQuestions.length === 0 ? <p className="empty-state">No problems match this filter.</p> : null}</section>
    </main>
  </div>;

  return <div className="site-shell">
    <header className="site-header"><button className="wordmark" onClick={() => setPage('problems')}>chipdev</button><nav><button onClick={() => setPage('problems')}>Problems</button><span>{selectedQuestion?.id} / {progress[selectedId]?.status ?? 'unattempted'}</span></nav></header>
    <main className="workspace">
      <div className="workspace-title"><button className="back-link" onClick={() => setPage('problems')}>Problems</button><span>/</span><h1>{selectedQuestion?.id} {selectedQuestion?.title}</h1><span className={`difficulty ${selectedQuestion?.difficulty.toLowerCase()}`}>{selectedQuestion?.difficulty}</span></div>
      <section className="workspace-grid"><article className="problem-statement"><p className="summary">{selectedQuestion?.summary}</p><div className="markdown" dangerouslySetInnerHTML={{ __html: selectedQuestion ? renderMarkdown(getQuestionBrief(selectedQuestion.fileName)) : '' }} /></article>
        <section className="editor-panel"><div className="editor-toolbar"><span>solution.sv</span><span>Draft: {saveStatus}</span><div><button disabled={Boolean(busyQuestion)} onClick={() => void grade('run')}>{busyMode === 'run' ? 'Running...' : 'Run'}</button><button className="submit-button" disabled={Boolean(busyQuestion)} onClick={() => void grade('submit')}>{busyMode === 'submit' ? 'Submitting...' : 'Submit'}</button></div></div><SyntaxEditor value={code} disabled={saveStatus === 'Loading'} onChange={(value) => setDrafts((current) => ({ ...current, [selectedId]: value }))} /></section>
      </section>
      <section className="lower-grid"><article className="data-box tests-box"><div className="box-title"><h2>Public tests</h2><span>{selectedQuestion?.visibleCount} cases</span></div>{selectedQuestion?.publicCases.map((testCase, index) => { const caseResult = result?.public.cases[index]; return <div className={`public-case ${caseResult?.status ?? ''}`} key={testCase.label}><div><strong>{testCase.label}</strong><span>{caseResult?.status ?? 'pending'}</span></div><dl><dt>Input</dt><dd>{testCase.input}</dd><dt>Expected</dt><dd>{testCase.expectedOutput}</dd></dl>{caseResult?.message ? <p>{caseResult.message} Expected {caseResult.expected}, got {caseResult.actual}.</p> : null}</div>; })}</article>
        <article className="data-box results-box"><div className="box-title"><h2>{result ? verdictLabel(result.status) : 'Results'}</h2><div className="tabs">{(['results', 'waveform', 'history'] as const).map((tab) => <button key={tab} className={resultTab === tab ? 'active' : ''} onClick={() => setResultTab(tab)}>{tab}</button>)}</div></div>{resultTab === 'results' ? <div className="result-output"><p>Public: {result ? `${result.public.passed}/${result.public.total}` : '-'}</p><p>Hidden: {result?.hidden ? `${result.hidden.passed}/${result.hidden.total}` : 'shown after submit'}</p><pre>{result ? result.diagnostics.join('\n\n') || 'No diagnostics.' : 'Run public cases or submit the complete suite.'}</pre></div> : null}{resultTab === 'waveform' ? <div className="waveform-view">{result?.waveform?.times.length ? <div className="waveform-table-wrap"><table className="waveform-table"><thead><tr><th>Signal</th>{result.waveform.times.map((time, index) => <th key={`${time}-${index}`}>{time}</th>)}</tr></thead><tbody>{result.waveform.signals.map((signal) => <tr key={signal.name}><td>{signal.name}</td>{signal.values.map((value, index) => <td key={`${signal.name}-${index}`}>{value}</td>)}</tr>)}</tbody></table></div> : <p className="empty-state">Run public cases to inspect waveform samples.</p>}</div> : null}{resultTab === 'history' ? <div className="history-layout"><div className="submission-list">{selectedSubmissions.length ? [...selectedSubmissions].reverse().map((submission) => <button key={submission.id} className="submission-row" onClick={() => void viewSubmission(submission.id)}><strong>{verdictLabel(submission.status)}</strong><span>{new Date(submission.submittedAt).toLocaleString()}</span></button>) : <p className="empty-state">No submissions yet.</p>}</div>{viewedSubmission ? <div><div className="history-actions"><strong>{verdictLabel(viewedSubmission.status)}</strong><button onClick={restoreSubmission}>Restore</button></div><pre className="source-preview">{viewedSubmission.source}</pre></div> : null}</div> : null}</article>
      </section>
    </main>
  </div>;
}

export default App;
