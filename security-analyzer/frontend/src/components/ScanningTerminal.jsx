import React, { useState, useEffect } from 'react';

export default function ScanningTerminal({ active }) {
  const [chars, setChars] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!active) {
      setChars('');
      setProgress(0);
      return;
    }

    const interval = setInterval(() => {
      const randomChar = String.fromCharCode(33 + Math.floor(Math.random() * 94));
      setChars(prev => (prev + randomChar).slice(-50));
      setProgress(p => Math.min(100, p + Math.random() * 5));
    }, 50);

    return () => clearInterval(interval);
  }, [active]);

  if (!active) return null;

  const barLength = 20;
  const filled = Math.floor((progress / 100) * barLength);
  const bar = '[' + '='.repeat(filled) + '>'.repeat(filled < barLength ? 1 : 0) + '.'.repeat(Math.max(0, barLength - filled - 1)) + ']';

  return (
    <div style={{ marginTop: '20px', border: '1px solid var(--term-green)', padding: '10px', background: 'rgba(0,0,0,0.5)' }}>
      <div>&gt; INITIATING HEURISTIC SCAN...</div>
      <div style={{ wordBreak: 'break-all', color: 'var(--data-gray)', fontSize: '0.8rem', margin: '5px 0' }}>
        {chars}
      </div>
      <div>
        {bar} {Math.floor(progress)}%
      </div>
    </div>
  );
}
