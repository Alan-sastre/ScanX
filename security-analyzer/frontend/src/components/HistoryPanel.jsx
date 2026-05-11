import React from 'react';
import { GetVerdictIcon } from './Icons';

export default function HistoryPanel({ data, onDelete }) {
  if (!data || data.length === 0) {
    return <div style={{ color: 'var(--data-gray)' }}>[ NO HISTORY FOUND ]</div>;
  }

  return (
    <div>
      <h3 style={{ borderBottom: '1px solid var(--data-gray)', paddingBottom: '5px', marginBottom: '15px' }}>
        &gt; OP_HISTORY.log
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {data.map((item) => (
          <div key={item.id} style={{ 
            border: '1px solid var(--data-gray)', 
            padding: '10px', 
            fontSize: '0.8rem',
            position: 'relative'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <span style={{ color: item.danger_level >= 7 ? 'var(--alert-red)' : item.danger_level >= 4 ? 'var(--warn-yellow)' : 'var(--term-green)' }}>
                [{item.type.toUpperCase()}] {item.verdict.toUpperCase()}
              </span>
              <button 
                onClick={() => onDelete(item.id)}
                style={{ padding: '0 5px', fontSize: '0.7rem', border: 'none' }}
              >
                X
              </button>
            </div>
            <div style={{ wordBreak: 'break-all', marginBottom: '5px' }}>{item.target}</div>
            <div style={{ color: 'var(--data-gray)', display: 'flex', justifyContent: 'space-between' }}>
              <span>LVL: {item.danger_level}/10</span>
              <span>{new Date(item.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
