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
    <div
      className="bg-ash-900 border-x border-b border-ash-700 p-4 font-mono text-xs text-green-500 h-48 overflow-y-auto rounded-b-xl scrollbar-hide"
      onClick={() => document.getElementById('term-input')?.focus()}
    >
      {history.map((item, i) => (
        <div key={i} className="mb-2">
          <div className="flex gap-2">
            <span className="text-ash-500">➜</span>
            <span className="text-ash-100">{item.cmd}</span>
          </div>
          <div className="text-ash-400 mt-1 pl-4 break-words">{item.output}</div>
        </div>
      ))}
      <form onSubmit={handleCommand} className="flex gap-2">
        <span className="text-ash-500">➜</span>
        <input
          id="term-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-transparent border-none outline-none text-ash-100 flex-1"
          autoComplete="off"
          spellCheck="false"
        />
      </form>
    </div>
  );
}
