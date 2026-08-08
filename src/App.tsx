import { useEffect, useMemo, useRef, useState } from 'react';
import { getQuestionBrief, getQuestionTemplate, getQuestions } from './lib/questions';
import type { QuestionMeta } from './lib/types';

const API_BASE = import.meta.env.VITE_API_BASE ?? '';

type WaveformData = {
  times: number[];
  signals: Array<{ name: string; width: number; values: string[] }>;
};

type GradeStatus = 'accepted' | 'wrong_answer' | 'compile_error' | 'runtime_error' | 'timeout' | 'internal_error';
type CaseResult = {
  id: string;
  status: 'passed' | 'failed';
  expected?: string;
  actual?: string;
  message?: string;
};
type GradeResult = {
  status: GradeStatus;
  public: { passed: number; total: number; cases: CaseResult[] };
  hidden?: { passed: number; total: number };
  diagnostics: string[];
  stdout?: string;
  stderr?: string;
  vcdPath?: string;
  waveform?: WaveformData;
  submissionId?: string;
  submittedAt?: string;
};
type Progress = Record<string, {
  status: 'unattempted' | 'attempted' | 'solved';
  submissionCount: number;
  lastSubmittedAt?: string;
}>;
type SubmissionSummary = GradeResult & { id: string; questionId: string; submittedAt: string };
type SubmissionDetail = SubmissionSummary & { source: string };

async function requestJson<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, options);
  const result = await response.json() as T & { error?: string };
  if (!response.ok) throw new Error(result.error ?? `Request failed with status ${response.status}`);
  return result;
}

function verdictLabel(status: GradeStatus): string {
  return status.replaceAll('_', ' ').replace(/\b\w/g, (character) => character.toUpperCase());
}

function App() {
  const questions: QuestionMeta[] = useMemo(() => getQuestions(), []);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedId, setSelectedId] = useState(questions[0]?.id ?? '');
  const [drafts, setDrafts] = useState<Record<string, string>>(() =>
    Object.fromEntries(questions.map((question) => [question.id, getQuestionTemplate(question.id)])),
  );
  const [progress, setProgress] = useState<Progress>({});
  const [submissions, setSubmissions] = useState<Record<string, SubmissionSummary[]>>({});
  const [results, setResults] = useState<Record<string, GradeResult>>({});
  const [busyQuestion, setBusyQuestion] = useState<string>('');
  const [busyMode, setBusyMode] = useState<'run' | 'submit' | ''>('');
  const [saveStatus, setSaveStatus] = useState<'Loading' | 'Saving' | 'Saved' | 'Save failed'>('Loading');
  const [resultTab, setResultTab] = useState<'results' | 'waveform' | 'history'>('results');
  const [viewedSubmission, setViewedSubmission] = useState<SubmissionDetail | null>(null);
  const loadedQuestion = useRef<string>('');
  const draftsRef = useRef(drafts);

  const selectedQuestion = questions.find((question) => question.id === selectedId) ?? questions[0];
  const code = selectedQuestion ? drafts[selectedQuestion.id] ?? getQuestionTemplate(selectedQuestion.id) : '';
  const result = selectedQuestion ? results[selectedQuestion.id] : undefined;
  const selectedSubmissions = selectedQuestion ? submissions[selectedQuestion.id] ?? [] : [];
  draftsRef.current = drafts;

  function persistDraft(questionId: string, source: string, keepalive = false): Promise<unknown> {
    return requestJson(`/api/questions/${questionId}/draft`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ source }),
      keepalive,
    });
  }

  async function refreshProgress() {
    const response = await requestJson<{ progress: Progress }>('/api/progress');
    setProgress(response.progress);
  }

  useEffect(() => {
    void refreshProgress().catch(() => undefined);
  }, []);

  useEffect(() => {
    if (!selectedQuestion) return;
    let active = true;
    loadedQuestion.current = '';
    setSaveStatus('Loading');
    setViewedSubmission(null);
    void requestJson<{ draft?: string; submissions: SubmissionSummary[] }>(`/api/questions/${selectedQuestion.id}/state`)
      .then((state) => {
        if (!active) return;
        if (state.draft !== undefined) {
          setDrafts((current) => ({ ...current, [selectedQuestion.id]: state.draft as string }));
        }
        setSubmissions((current) => ({ ...current, [selectedQuestion.id]: state.submissions }));
        loadedQuestion.current = selectedQuestion.id;
        setSaveStatus('Saved');
      })
      .catch(() => {
        if (active) setSaveStatus('Save failed');
      });
    return () => { active = false; };
  }, [selectedQuestion?.id]);

  useEffect(() => {
    const questionId = selectedId;
    const flush = () => {
      if (loadedQuestion.current === questionId) {
        void persistDraft(questionId, draftsRef.current[questionId] ?? '', true).catch(() => undefined);
      }
    };
    const handleVisibility = () => {
      if (document.visibilityState === 'hidden') flush();
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      flush();
    };
  }, [selectedId]);

  useEffect(() => {
    if (!selectedQuestion || loadedQuestion.current !== selectedQuestion.id) return;
    setSaveStatus('Saving');
    const timeout = window.setTimeout(() => {
      void persistDraft(selectedQuestion.id, code)
        .then(() => setSaveStatus('Saved'))
        .catch(() => setSaveStatus('Save failed'));
    }, 500);
    return () => window.clearTimeout(timeout);
  }, [code, selectedQuestion?.id]);

  async function grade(mode: 'run' | 'submit') {
    if (!selectedQuestion || busyQuestion) return;
    setBusyQuestion(selectedQuestion.id);
    setBusyMode(mode);
    setResultTab('results');
    try {
      const endpoint = mode === 'run' ? 'run' : 'submissions';
      const gradeResult = await requestJson<GradeResult>(`/api/questions/${selectedQuestion.id}/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source: code }),
      });
      setResults((current) => ({ ...current, [selectedQuestion.id]: gradeResult }));
      if (mode === 'submit') {
        const state = await requestJson<{ submissions: SubmissionSummary[] }>(`/api/questions/${selectedQuestion.id}/state`);
        setSubmissions((current) => ({ ...current, [selectedQuestion.id]: state.submissions }));
        await refreshProgress();
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown API error.';
      setResults((current) => ({
        ...current,
        [selectedQuestion.id]: {
          status: 'internal_error',
          public: { passed: 0, total: selectedQuestion.visibleCount, cases: [] },
          diagnostics: [message, 'Start the backend with "npm run api".'],
        },
      }));
    } finally {
      setBusyQuestion('');
      setBusyMode('');
    }
  }

  async function viewSubmission(submissionId: string) {
    const detail = await requestJson<SubmissionDetail>(`/api/submissions/${submissionId}`);
    setViewedSubmission(detail);
  }

  function restoreSubmission() {
    if (!selectedQuestion || !viewedSubmission) return;
    setDrafts((current) => ({ ...current, [selectedQuestion.id]: viewedSubmission.source }));
    setResultTab('results');
  }

  return (
    <div className={`shell ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <aside className="question-list">
        <div className="brand">
          <button className="sidebar-toggle" onClick={() => setSidebarCollapsed((value) => !value)} aria-label="Toggle question list">
            {sidebarCollapsed ? '>' : '<'}
          </button>
          <span className="brand-kicker">ChipDev</span>
          <h1>SystemVerilog arena</h1>
          <p>Run visible cases, then submit against the complete suite.</p>
        </div>
        <div className="question-index">
          {questions.map((question) => {
            const questionStatus = progress[question.id]?.status ?? 'unattempted';
            return (
              <button key={question.id} className={`question-chip ${question.id === selectedQuestion?.id ? 'active' : ''}`} onClick={() => setSelectedId(question.id)}>
                <span>{question.id}</span>
                <strong>{question.title}</strong>
                <small>{question.difficulty} / {questionStatus}</small>
              </button>
            );
          })}
        </div>
      </aside>

      <main className="workspace">
        <section className="brief-pane panel">
          <div className="panel-header">
            <div><span className="eyebrow">Problem</span><h2>{selectedQuestion?.id} {selectedQuestion?.title}</h2></div>
            <div className="difficulty-badge">{selectedQuestion?.difficulty}</div>
          </div>
          <p className="summary">{selectedQuestion?.summary}</p>
          <pre className="brief-text">{selectedQuestion ? getQuestionBrief(selectedQuestion.fileName) : ''}</pre>
        </section>

        <section className="editor-pane panel">
          <div className="panel-header">
            <div><span className="eyebrow">Solution</span><h2>Editor</h2></div>
            <div className="editor-actions">
              <button className="secondary-button" disabled={Boolean(busyQuestion)} onClick={() => void grade('run')}>
                {busyMode === 'run' ? 'Running...' : 'Run'}
              </button>
              <button className="primary-button" disabled={Boolean(busyQuestion)} onClick={() => void grade('submit')}>
                {busyMode === 'submit' ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </div>
          <textarea className="editor" disabled={saveStatus === 'Loading'} value={code} onChange={(event) => setDrafts((current) => ({ ...current, [selectedId]: event.target.value }))} spellCheck={false} aria-label="SystemVerilog editor" />
          <div className="status-row">
            <span>Draft: {saveStatus}</span>
            <span>{progress[selectedId]?.status ?? 'unattempted'}</span>
          </div>
        </section>

        <section className="tests-pane panel">
          <div className="panel-header">
            <div><span className="eyebrow">Test cases</span><h2>Visible and hidden grading</h2></div>
            <div className="count-pill">{selectedQuestion?.visibleCount} public / {selectedQuestion?.hiddenCount} hidden</div>
          </div>
          <div className="test-grid">
            <div><h3>Public cases</h3><div className="test-list">
              {selectedQuestion?.publicCases.map((testCase, index) => {
                const caseResult = result?.public.cases[index];
                return <article className={`test-card ${caseResult?.status ?? ''}`} key={testCase.label}>
                  <div className="case-heading"><strong>{testCase.label}</strong><span>{caseResult?.status ?? 'pending'}</span></div>
                  <div className="test-block"><span>Input</span><pre><code>{testCase.input}</code></pre></div>
                  <div className="test-block"><span>Expected</span><pre><code>{testCase.expectedOutput}</code></pre></div>
                  {caseResult?.message ? <p>{caseResult.message} Expected {caseResult.expected}, got {caseResult.actual}.</p> : null}
                </article>;
              })}
            </div></div>
            <div><h3>Hidden cases</h3><div className="test-card hidden-card">
              <strong>{result?.hidden ? `${result.hidden.passed}/${result.hidden.total} passed` : `${selectedQuestion?.hiddenCount} cases`}</strong>
              <p>Hidden cases run only when you submit.</p>
              <p className="muted">Only the aggregate result is shown.</p>
            </div></div>
          </div>
        </section>

        <section className="results-pane panel">
          <div className="panel-header">
            <div><span className="eyebrow">Results</span><h2>{result ? verdictLabel(result.status) : 'No result yet'}</h2></div>
            <div className="tabs">
              {(['results', 'waveform', 'history'] as const).map((tab) => <button key={tab} className={`tab-button ${resultTab === tab ? 'active' : ''}`} onClick={() => setResultTab(tab)}>{tab}</button>)}
            </div>
          </div>

          {resultTab === 'results' ? <pre className="result-log">{result
            ? [`Public: ${result.public.passed}/${result.public.total}`, result.hidden ? `Hidden: ${result.hidden.passed}/${result.hidden.total}` : '', ...result.diagnostics].filter(Boolean).join('\n\n')
            : 'Run the public cases or submit the complete suite.'}</pre> : null}

          {resultTab === 'waveform' ? <div className="waveform-panel">
            <div className="waveform-header"><h3>Public waveform</h3><span>{result?.vcdPath ?? 'Run public cases to create a waveform.'}</span></div>
            {result?.waveform && result.waveform.times.length > 0 ? <div className="waveform-table-wrap"><table className="waveform-table">
              <thead><tr><th>Signal</th>{result.waveform.times.map((time, index) => <th key={`${time}-${index}`}>{time}</th>)}</tr></thead>
              <tbody>{result.waveform.signals.map((signal) => <tr key={signal.name}><td>{signal.name}</td>{signal.values.map((value, index) => <td key={`${signal.name}-${index}`}>{value}</td>)}</tr>)}</tbody>
            </table></div> : <p className="muted">Submission waveforms and hidden waveforms are not exposed. Use Run for public debugging.</p>}
          </div> : null}

          {resultTab === 'history' ? <div className="history-layout">
            <div className="submission-list">{selectedSubmissions.length === 0 ? <p className="muted">No submissions yet.</p> : [...selectedSubmissions].reverse().map((submission) =>
              <button key={submission.id} className="submission-row" onClick={() => void viewSubmission(submission.id)}>
                <strong>{verdictLabel(submission.status)}</strong><span>{new Date(submission.submittedAt).toLocaleString()}</span>
              </button>)}</div>
            {viewedSubmission ? <div className="submission-detail"><div className="case-heading"><strong>{verdictLabel(viewedSubmission.status)}</strong><button className="secondary-button" onClick={restoreSubmission}>Restore to editor</button></div><pre className="result-log">{viewedSubmission.source}</pre></div> : null}
          </div> : null}
        </section>
      </main>
    </div>
  );
}

export default App;
