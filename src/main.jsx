import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import SourcewellApp from './App.jsx'

const PASSWORD = 'pest2026'

function PasswordGate({ children }) {
  const [authenticated, setAuthenticated] = useState(
    () => sessionStorage.getItem('sw_auth') === '1'
  )
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (value === PASSWORD) {
      sessionStorage.setItem('sw_auth', '1')
      setAuthenticated(true)
    } else {
      setError(true)
      setValue('')
    }
  }

  if (authenticated) return children

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e293b 100%)',
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <form onSubmit={handleSubmit} style={{
        background: 'rgba(15, 23, 42, 0.8)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(99, 102, 241, 0.2)',
        borderRadius: '16px',
        padding: '48px 40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
        minWidth: '340px',
        boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
      }}>
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '14px',
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          marginBottom: '4px',
        }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
        </div>

        <div style={{ textAlign: 'center' }}>
          <h1 style={{
            color: '#f1f5f9',
            fontSize: '22px',
            fontWeight: 700,
            margin: 0,
          }}>Sourcewell Intel</h1>
          <p style={{
            color: '#94a3b8',
            fontSize: '14px',
            marginTop: '6px',
          }}>Enter password to continue</p>
        </div>

        <input
          type="password"
          value={value}
          onChange={(e) => { setValue(e.target.value); setError(false) }}
          placeholder="Password"
          autoFocus
          style={{
            width: '100%',
            padding: '12px 16px',
            borderRadius: '10px',
            border: error ? '1.5px solid #ef4444' : '1.5px solid rgba(99, 102, 241, 0.3)',
            background: 'rgba(2, 6, 23, 0.6)',
            color: '#f1f5f9',
            fontSize: '15px',
            fontFamily: "'DM Sans', sans-serif",
            outline: 'none',
            transition: 'border-color 0.2s',
          }}
          onFocus={(e) => e.target.style.borderColor = error ? '#ef4444' : '#6366f1'}
          onBlur={(e) => e.target.style.borderColor = error ? '#ef4444' : 'rgba(99, 102, 241, 0.3)'}
        />

        {error && (
          <p style={{ color: '#ef4444', fontSize: '13px', margin: '-12px 0 0 0' }}>
            Incorrect password
          </p>
        )}

        <button type="submit" style={{
          width: '100%',
          padding: '12px',
          borderRadius: '10px',
          border: 'none',
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          color: 'white',
          fontSize: '15px',
          fontWeight: 600,
          fontFamily: "'DM Sans', sans-serif",
          cursor: 'pointer',
          transition: 'opacity 0.2s',
        }}
        onMouseEnter={(e) => e.target.style.opacity = '0.85'}
        onMouseLeave={(e) => e.target.style.opacity = '1'}
        >
          Unlock
        </button>
      </form>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PasswordGate>
      <SourcewellApp />
    </PasswordGate>
  </React.StrictMode>,
)
