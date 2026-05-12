import React from 'react';
import GlitchText from './GlitchText';

export default function Header() {
  return (
    <header style={{ borderBottom: 'none', paddingBottom: 0 }}>
      <div>
        <h1 style={{ fontSize: '2rem', margin: 0, textShadow: '0 0 10px var(--terminal-dim)' }}>
          <GlitchText text="PHISHBLOCKER//NEXUS" />
        </h1>
      </div>
    </header>
  );
}
