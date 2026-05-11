import React, { useState } from 'react';
import GlitchText from './components/GlitchText';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    alert("SYS.OP NOT FOUND: Base de datos de usuarios fuera de línea.");
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
      <div style={{ border: '1px solid var(--term-green)', padding: '30px', width: '100%', maxWidth: '400px', background: 'rgba(0, 255, 136, 0.05)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
          <GlitchText text="AUTH_REQUIRED" />
        </h2>
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', color: 'var(--data-gray)', marginBottom: '5px', fontSize: '0.8rem' }}>&gt; IDENTIFICADOR</label>
            <input 
              type="text" 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              placeholder="OP_ID"
              required
            />
          </div>
          <div>
            <label style={{ display: 'block', color: 'var(--data-gray)', marginBottom: '5px', fontSize: '0.8rem' }}>&gt; CÓDIGO DE ACCESO</label>
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              placeholder="••••••••"
              required
              style={{
                background: 'transparent',
                border: '1px solid var(--data-gray)',
                color: 'var(--term-green)',
                padding: '8px',
                fontFamily: "'JetBrains Mono', monospace",
                width: '100%',
                outline: 'none'
              }}
            />
          </div>
          
          <button type="submit" style={{ marginTop: '10px', padding: '10px' }}>
            [ VERIFICAR CREDENCIALES ]
          </button>
        </form>
      </div>
    </div>
  );
}
