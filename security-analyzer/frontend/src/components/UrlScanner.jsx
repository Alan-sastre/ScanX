import React, { useState } from 'react';
import ScanningTerminal from './ScanningTerminal';
import { GetVerdictIcon } from './Icons';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export default function UrlScanner({ onComplete }) {
  const [url, setUrl] = useState('');
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleScan = async (e) => {
    e.preventDefault();
    if (!url) return;
    
    setScanning(true);
    setResult(null);
    setError('');

    try {
      const formData = new FormData();
      formData.append('url', url);

      // Simulate network delay for effect
      await new Promise(r => setTimeout(r, 2000));

      const res = await fetch(`${API_URL}/analyze/url`, {
        method: 'POST',
        body: formData
      });

      if (!res.ok) {
        throw new Error('Error en el análisis');
      }

      const data = await res.json();
      setResult(data);
      if (onComplete) onComplete();
    } catch (err) {
      setError(err.message);
    } finally {
      setScanning(false);
    }
  };

  const getDangerClass = (level) => {
    if (level >= 7) return 'danger';
    if (level >= 4) return 'warning';
    return '';
  };

  return (
    <div>
      <form onSubmit={handleScan} style={{ display: 'flex', gap: '10px' }}>
        <input 
          type="text" 
          placeholder="ENTER TARGET URL [http(s)://...]" 
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={scanning}
        />
        <button type="submit" disabled={scanning || !url}>
          {scanning ? 'SCANNING...' : 'EXECUTE'}
        </button>
      </form>

      <ScanningTerminal active={scanning} />

      {error && <div style={{ color: 'var(--alert-red)', marginTop: '20px' }}>[!] ERROR: {error}</div>}

      {result && !scanning && (
        <div className={`result-box ${getDangerClass(result.danger_level)}`}>
          <h2 style={{ display: 'flex', alignItems: 'center', margin: 0 }}>
            {GetVerdictIcon(result.verdict)}
            VERDICT: {result.verdict.toUpperCase()}
          </h2>
          <div style={{ marginTop: '10px', fontSize: '0.9rem' }}>
            <p><strong>THREAT TYPE:</strong> {result.threat_type}</p>
            <p><strong>EXPLANATION:</strong> {result.explanation}</p>
            <div style={{ marginTop: '10px' }}>
              <strong>THREAT LEVEL: [{result.danger_level}/10]</strong>
              <div className="bar-container">
                <div 
                  className="bar-fill" 
                  style={{ 
                    width: `${(result.danger_level / 10) * 100}%`,
                    background: result.danger_level >= 7 ? 'var(--alert-red)' : result.danger_level >= 4 ? 'var(--warn-yellow)' : 'var(--term-green)'
                  }} 
                />
              </div>
            </div>
            
            {result.details && result.details.length > 0 && (
              <div style={{ marginTop: '15px' }}>
                <strong>&gt; TRACE DETAILS:</strong>
                <ul style={{ listStyleType: 'square', paddingLeft: '20px', color: 'var(--data-gray)' }}>
                  {result.details.map((d, i) => <li key={i}>{d}</li>)}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
