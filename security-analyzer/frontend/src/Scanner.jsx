import React, { useState, useEffect } from 'react';
import UrlScanner from './components/UrlScanner';
import FileScanner from './components/FileScanner';
import HistoryPanel from './components/HistoryPanel';

const API_URL = import.meta.env.VITE_API_URL || '/api';

export default function Scanner() {
  const [activeTab, setActiveTab] = useState('URL');
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    try {
      const res = await fetch(`${API_URL}/history`);
      const data = await res.json();
      setHistory(data);
    } catch (e) {
      console.error("Error fetching history", e);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleAnalysisComplete = () => {
    fetchHistory();
  };

  const deleteHistory = async (id) => {
    try {
      await fetch(`${API_URL}/history/${id}`, { method: 'DELETE' });
      fetchHistory();
    } catch(e) {
      console.error(e);
    }
  };

  return (
    <div className="app-container" style={{ paddingTop: 0 }}>
      <main className="main-content">
        <div className="tabs">
          <div 
            className={`tab ${activeTab === 'URL' ? 'active' : ''}`}
            onClick={() => setActiveTab('URL')}
          >
            [ MOD: URL ]
          </div>
          <div 
            className={`tab ${activeTab === 'FILE' ? 'active' : ''}`}
            onClick={() => setActiveTab('FILE')}
          >
            [ MOD: ARCHIVO ]
          </div>
        </div>

        {activeTab === 'URL' && <UrlScanner onComplete={handleAnalysisComplete} />}
        {activeTab === 'FILE' && <FileScanner onComplete={handleAnalysisComplete} />}
      </main>

      <aside className="history-panel">
        <HistoryPanel data={history} onDelete={deleteHistory} />
      </aside>
    </div>
  );
}
