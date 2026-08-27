import { useState } from 'react';

export function InteractiveTerminal() {
  const [history, setHistory] = useState<{ cmd: string; output: string }[]>([
    { cmd: 'whoami', output: 'Ganga Bharath: Full-Stack Developer & Cybersec Learner' },
    { cmd: 'focus', output: 'Synthesizing secure, scalable web architectures.' }
  ]);
  const [input, setInput] = useState('');

  const commands: { [key: string]: string } = {
    'help': 'Available: whoami, focus, skills, clear, echo',
    'whoami': 'Ganga Bharath. CSE Undergrad at VIT-AP. Passionate about bridging the gap between web dev and security.',
    'focus': 'Learning the art of penetration testing while perfecting React/Node.js ecosystems.',
    'skills': 'Languages: Java, Python, TS; Web: React, Node, SQL; Security: Network scanning, OWASP Top 10.',
    'clear': 'CLEAR_HISTORY'
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = input.toLowerCase().trim();
    if (!cleanInput) return;

    if (cleanInput === 'clear') {
      setHistory([]);
    } else {
      const output = commands[cleanInput] || `Command not found: ${cleanInput}. Type 'help' for options.`;
      setHistory([...history, { cmd: input, output }]);
    }
    setInput('');
  };

  return (
    <div className="terminal">
      <div className="terminal-bar"><div className="terminal-dots"><span /><span /><span /></div><span>ganga@portfolio ~</span></div>
      <div className="terminal-body" onClick={() => document.getElementById('term-input')?.focus()}>
        {history.map((item, i) => <div key={i} className="terminal-entry"><div className="terminal-command">{item.cmd}</div><div className="terminal-output">{item.output}</div></div>)}
        <form onSubmit={handleCommand} className="terminal-form">
          <input id="term-input" aria-label="Terminal command" type="text" value={input} onChange={(e) => setInput(e.target.value)} autoComplete="off" spellCheck="false" />
        </form>
      </div>
    </div>
  );
}
