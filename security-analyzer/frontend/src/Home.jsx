import React from 'react';
import { Link } from 'react-router-dom';
import GlitchText from './components/GlitchText';
import { ShieldIcon, SkullIcon, WarningIcon } from './components/Icons';

export default function Home() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '10px', textShadow: '0 0 15px var(--terminal-dim)' }}>
          <GlitchText text="SCANX_SECURITY_NEXUS" />
        </h1>
        <p style={{ color: 'var(--data-gray)', fontSize: '1.2rem' }}>
          Plataforma de inteligencia de amenazas e investigación táctica.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', marginBottom: '50px' }}>
        <div style={{ border: '1px solid var(--term-green)', padding: '20px', background: 'rgba(0,255,136,0.05)' }}>
          <div style={{ marginBottom: '15px' }}><ShieldIcon /></div>
          <h3>ANÁLISIS HEURÍSTICO</h3>
          <p style={{ color: 'var(--data-gray)', marginTop: '10px', fontSize: '0.9rem' }}>
            Motores de evaluación locales y algoritmos de entropía para detectar malware polimórfico sin necesidad de firmas conocidas.
          </p>
        </div>
        <div style={{ border: '1px solid var(--alert-red)', padding: '20px', background: 'rgba(255,45,45,0.05)' }}>
          <div style={{ marginBottom: '15px', color: 'var(--alert-red)' }}><SkullIcon /></div>
          <h3 style={{ color: 'var(--alert-red)' }}>CAZA DE PHISHING</h3>
          <p style={{ color: 'var(--data-gray)', marginTop: '10px', fontSize: '0.9rem' }}>
            Detección de typosquatting, dominios enmascarados y vectores de ataque comunes en URLs maliciosas.
          </p>
        </div>
        <div style={{ border: '1px solid var(--warn-yellow)', padding: '20px', background: 'rgba(245,196,0,0.05)' }}>
          <div style={{ marginBottom: '15px', color: 'var(--warn-yellow)' }}><WarningIcon /></div>
          <h3 style={{ color: 'var(--warn-yellow)' }}>TRAZABILIDAD TOTAL</h3>
          <p style={{ color: 'var(--data-gray)', marginTop: '10px', fontSize: '0.9rem' }}>
            Registro inmutable de todas las operaciones y análisis para investigación post-incidente.
          </p>
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link to="/scanner" style={{
          display: 'inline-block',
          padding: '15px 30px',
          background: 'var(--term-green)',
          color: 'var(--bg-deep-black)',
          fontSize: '1.2rem',
          fontWeight: 'bold',
          border: '1px solid var(--term-green)',
          textDecoration: 'none',
          textTransform: 'uppercase',
          boxShadow: '0 0 15px var(--terminal-dim)'
        }}>
          &gt; INICIAR_ANALIZADOR
        </Link>
      </div>
    </div>
  );
}
