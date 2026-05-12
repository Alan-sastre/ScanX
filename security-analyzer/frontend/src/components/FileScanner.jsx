import React, { useState, useRef } from 'react';
import ScanningTerminal from './ScanningTerminal';
import { GetVerdictIcon } from './Icons';
const API_URL = import.meta.env.VITE_API_URL || '/api';

export default function FileScanner({ onComplete }) {
  const [file, setFile] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const handleScan = async (selectedFile) => {
    if (!selectedFile) return;
    
    if (selectedFile.size > 50 * 1024 * 1024) {
      setError('File size exceeds 50MB limit.');
      return;
    }

    setScanning(true);
    setResult(null);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      // Simulate delay
      await new Promise(r => setTimeout(r, 2500));

      const res = await fetch(`${API_URL}/analyze/file`, {
        method: 'POST',
        body: formData
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || 'Error en el análisis');
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

  const onDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      handleScan(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      handleScan(e.target.files[0]);
    }
  };

  const getDangerClass = (level) => {
    if (level >= 7) return 'danger';
    if (level >= 4) return 'warning';
    return '';
  };

  return (
    <div>
      <div 
        className={`file-drop-area ${dragActive ? 'active' : ''}`}
        onDragEnter={onDrag}
        onDragLeave={onDrag}
        onDragOver={onDrag}
        onDrop={onDrop}
        onClick={() => inputRef.current.click()}
        style={{ display: scanning || result ? 'none' : 'block' }}
      >
        <p>&gt; DROP BINARY HERE OR CLICK TO SELECT</p>
        <p style={{ fontSize: '0.8rem', color: 'var(--data-gray)' }}>[MAX 50MB]</p>
        <input 
          ref={inputRef}
          type="file" 
          style={{ display: 'none' }}
          onChange={handleChange}
        />
      </div>

      <ScanningTerminal active={scanning} />

      {error && <div style={{ color: 'var(--alert-red)', marginTop: '20px' }}>[!] ERROR: {error}</div>}

      {result && !scanning && (
        <div className={`result-box ${getDangerClass(result.danger_level)}`}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h2 style={{ display: 'flex', alignItems: 'center', margin: 0 }}>
              {GetVerdictIcon(result.verdict)}
              VERDICT: {result.verdict.toUpperCase()}
            </h2>
            <button onClick={() => { setResult(null); setFile(null); }}>SCAN NEW</button>
          </div>
          
          <div style={{ marginTop: '10px', fontSize: '0.9rem' }}>
            <p><strong>TARGET:</strong> {file?.name}</p>
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
                <strong>&gt; ANALYSIS LOGS:</strong>
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
