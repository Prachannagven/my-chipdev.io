import { useMemo, useState } from 'react';
import { getQuestionBrief, getQuestionTemplate, getQuestions } from './lib/questions';
import type { QuestionMeta } from './lib/types';

const API_BASE = import.meta.env.VITE_API_BASE ?? 'http://127.0.0.1:8787';

type WaveformData = {
  times: number[];
  signals: Array<{
    name: string;
    width: number;
    values: string[];
  }>;
};

type RunnerResponse = {
  ok?: boolean;
  stdout?: string;
  stderr?: string;
  error?: string;
  vcdPath?: string;
  diagnostics?: string[];
  waveform?: WaveformData;
};

function App() {
  const questions: QuestionMeta[] = useMemo(() => getQuestions(), []);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedId, setSelectedId] = useState(questions[0]?.id ?? '');
  const [drafts, setDrafts] = useState<Record<string, string>>(() =>
    Object.fromEntries(questions.map((question) => [question.id, getQuestionTemplate(question.id)])),
  );
  const [runStatus, setRunStatus] = useState('Ready');
  const [runOutput, setRunOutput] = useState('Run the selected question against the local Verilator backend.');
  const [diagnostics, setDiagnostics] = useState<string[]>([]);
  const [waveform, setWaveform] = useState<WaveformData | null>(null);
  const [vcdPath, setVcdPath] = useState<string>('');
  const [resultTab, setResultTab] = useState<'diagnostics' | 'full'>('diagnostics');

  const selectedQuestion = questions.find((question: QuestionMeta) => question.id === selectedId) ?? questions[0];
  const brief = selectedQuestion ? getQuestionBrief(selectedQuestion.fileName) : '';
  const code = selectedQuestion ? drafts[selectedQuestion.id] ?? getQuestionTemplate(selectedQuestion.id) : '';

  async function runSelectedQuestion() {
    if (!selectedQuestion) {
      return;
    }

    setRunStatus('Running');
    setRunOutput('Compiling candidate against the local testbench...');
    setDiagnostics([]);
    setWaveform(null);
    setVcdPath('');

    try {
      const response = await fetch(`${API_BASE}/run`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          questionFileName: selectedQuestion.fileName,
          source: code,
        }),
      });

      const result = await response.json() as RunnerResponse;

      if (!response.ok) {
        throw new Error(result.error ?? `Run request failed with status ${response.status}`);
      }

      const transcript = [result.stdout, result.stderr, result.error].filter(Boolean).join('\n\n');
      const waveformPath = result.vcdPath ? `Waveform saved at: ${result.vcdPath}` : 'Waveform path unavailable.';
      setRunStatus(result.ok ? 'Passed' : 'Failed');
      setRunOutput([transcript, waveformPath].filter(Boolean).join('\n\n') || 'No simulator output returned.');
      setDiagnostics(result.diagnostics ?? []);
      setWaveform(result.waveform ?? null);
      setVcdPath(result.vcdPath ?? '');
      setResultTab('diagnostics');
    } catch (error) {
      setRunStatus('Failed');
      const message = error instanceof Error ? error.message : 'Unknown API error.';
      setRunOutput(`${message}\n\nTip: start the backend with \"npm run api\".`);
      setDiagnostics([message]);
      setWaveform(null);
      setVcdPath('');
      setResultTab('diagnostics');
    }
  }

  function updateDraft(value: string) {
    if (!selectedQuestion) {
      return;
    }

    setDrafts((currentDrafts) => ({
      ...currentDrafts,
      [selectedQuestion.id]: value,
    }));
  }

  return (
    <div className={`shell ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <aside className="question-list">
        <div className="brand">
          <button
            className="sidebar-toggle"
            onClick={() => setSidebarCollapsed((current) => !current)}
            aria-label={sidebarCollapsed ? 'Expand question list' : 'Collapse question list'}
          >
            {sidebarCollapsed ? '»' : '«'}
          </button>
          <span className="brand-kicker">ChipDev</span>
          <h1>Local SystemVerilog arena</h1>
          <p>Briefs on the left, code on the right, with public and hidden tests underneath.</p>
        </div>

        <div className="question-index">
          {questions.map((question) => (
            <button
              key={question.id}
              className={`question-chip ${question.id === selectedQuestion?.id ? 'active' : ''}`}
              onClick={() => setSelectedId(question.id)}
            >
              <span>{question.id}</span>
              <strong>{question.title}</strong>
              <small>{question.difficulty}</small>
            </button>
          ))}
        </div>
      </aside>

      <main className="workspace">
        <section className="brief-pane panel">
          <div className="panel-header">
            <div>
              <span className="eyebrow">Problem brief</span>
              <h2>{selectedQuestion?.id} {selectedQuestion?.title}</h2>
            </div>
            <div className="difficulty-badge">{selectedQuestion?.difficulty}</div>
          </div>

          <p className="summary">{selectedQuestion?.summary}</p>
          <pre className="brief-text">{brief}</pre>
        </section>

        <section className="editor-pane panel">
          <div className="panel-header">
            <div>
              <span className="eyebrow">Code editor</span>
              <h2>Solution buffer</h2>
            </div>
            <div className="editor-actions">
              <button className="secondary-button" onClick={runSelectedQuestion}>Run public tests</button>
              <button className="primary-button" onClick={runSelectedQuestion}>Submit hidden tests</button>
            </div>
          </div>

          <textarea
            className="editor"
            value={code}
            onChange={(event) => updateDraft(event.target.value)}
            spellCheck={false}
            aria-label="SystemVerilog editor"
          />

          <div className="status-row">
            <span>Verilator runner: {runStatus}</span>
            <span>Waveforms: saved as VCD on every run</span>
          </div>

          <pre className="run-log">{runOutput}</pre>
        </section>

        <section className="tests-pane panel">
          <div className="panel-header">
            <div>
              <span className="eyebrow">Testcases</span>
              <h2>Visible and hidden grading</h2>
            </div>
            <div className="count-pill">
              {selectedQuestion?.visibleCount} public · {selectedQuestion?.hiddenCount} hidden
            </div>
          </div>

          <div className="test-grid">
            <div>
              <h3>Public cases</h3>
              <div className="test-list">
                {selectedQuestion?.publicCases.map((testCase) => (
                  <article className="test-card" key={testCase.label}>
                    <strong>{testCase.label}</strong>
                    <div className="test-block">
                      <span>Input</span>
                      <pre><code>{testCase.input}</code></pre>
                    </div>
                    <div className="test-block">
                      <span>Expected</span>
                      <pre><code>{testCase.expectedOutput}</code></pre>
                    </div>
                    {testCase.notes ? <p className="muted">{testCase.notes}</p> : null}
                  </article>
                ))}
              </div>
            </div>

            <div>
              <h3>Hidden cases</h3>
              <div className="test-card hidden-card">
                <strong>{selectedQuestion?.hiddenCount} blind tests</strong>
                <p>Only aggregate pass/fail will be shown after submit.</p>
                <p className="muted">These cases will be compiled locally but never rendered in full.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="results-pane panel">
          <div className="panel-header">
            <div>
              <span className="eyebrow">Run results</span>
              <h2>Diagnostics and waveform</h2>
            </div>
            <div className="tabs">
              <button
                className={`tab-button ${resultTab === 'diagnostics' ? 'active' : ''}`}
                onClick={() => setResultTab('diagnostics')}
              >
                Diagnostics
              </button>
              <button
                className={`tab-button ${resultTab === 'full' ? 'active' : ''}`}
                onClick={() => setResultTab('full')}
              >
                Full output
              </button>
            </div>
          </div>

          {resultTab === 'diagnostics' ? (
            <div className="diagnostics-panel">
              {runStatus === 'Passed' && diagnostics.length === 0 ? (
                <pre className="result-log">Passed</pre>
              ) : diagnostics.length > 0 ? (
                <pre className="result-log">{diagnostics.join('\n\n')}</pre>
              ) : (
                <pre className="result-log">No diagnostics captured.</pre>
              )}
            </div>
          ) : (
            <pre className="result-log">{runOutput}</pre>
          )}

          <div className="waveform-panel">
            <div className="waveform-header">
              <h3>Waveform view</h3>
              <span>{vcdPath ? `VCD: ${vcdPath}` : 'Run simulation to load waveform samples.'}</span>
            </div>

            {waveform && waveform.times.length > 0 && waveform.signals.length > 0 ? (
              <div className="waveform-table-wrap">
                <table className="waveform-table">
                  <thead>
                    <tr>
                      <th>Signal</th>
                      {waveform.times.map((time, index) => (
                        <th key={`time-${time}-${index}`}>{time}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {waveform.signals.map((signal) => (
                      <tr key={signal.name}>
                        <td>{signal.name}</td>
                        {signal.values.map((value, index) => (
                          <td key={`${signal.name}-${waveform.times[index]}-${index}`}>{value}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="muted">No waveform samples yet. Run a test to populate this area.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
