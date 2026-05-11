import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={{ 
      display: 'flex', 
      gap: '20px', 
      borderBottom: '2px solid var(--term-green)', 
      paddingBottom: '10px',
      marginBottom: '20px',
      position: 'relative'
    }}>
      <Link to="/" style={{
        textDecoration: 'none',
        color: isActive('/') ? 'var(--bg-deep-black)' : 'var(--term-green)',
        background: isActive('/') ? 'var(--term-green)' : 'transparent',
        padding: '5px 15px',
        border: '1px solid var(--term-green)',
        textTransform: 'uppercase'
      }}>
        [ INFO_SISTEMA ]
      </Link>
      <Link to="/scanner" style={{
        textDecoration: 'none',
        color: isActive('/scanner') ? 'var(--bg-deep-black)' : 'var(--term-green)',
        background: isActive('/scanner') ? 'var(--term-green)' : 'transparent',
        padding: '5px 15px',
        border: '1px solid var(--term-green)',
        textTransform: 'uppercase'
      }}>
        [ ANALIZADOR ]
      </Link>
      <Link to="/login" style={{
        textDecoration: 'none',
        color: isActive('/login') ? 'var(--bg-deep-black)' : 'var(--term-green)',
        background: isActive('/login') ? 'var(--term-green)' : 'transparent',
        padding: '5px 15px',
        border: '1px solid var(--term-green)',
        textTransform: 'uppercase',
        marginLeft: 'auto'
      }}>
        [ LOGIN_OP ]
      </Link>
    </nav>
  );
}
