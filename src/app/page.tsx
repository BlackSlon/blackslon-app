'use client';
import React from 'react';

export default function Home() {
  const scrollToTerminal = () => {
    const el = document.getElementById('indexes-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.log("Nie znaleziono sekcji terminala!");
    }
  };

  return (
    <main style={{ backgroundColor: '#000', minHeight: '100vh', color: '#fff', fontFamily: 'monospace' }}>
      
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        minHeight: '90vh',
        gap: '20px',
        padding: '20px' 
      }}>
        
        {/* 1. NAPIS NAD LOGO */}
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '64px', fontWeight: 'bold', letterSpacing: '6px', margin: 0 }}>
            BlackSlon
          </h1>
          <p style={{ color: '#888', fontSize: '20px', letterSpacing: '4px', margin: '5px 0 20px 0' }}>
            Energy Indexes
          </p>
        </div>

        {/* 2. LOGO - DUŻE */}
        <div style={{ width: '300px', height: '300px', marginBottom: '40px' }}>
          <img 
            src="/BS_image.jpg" 
            alt="BlackSlon Logo" 
            style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
          />
        </div>

        {/* 3. KWADRATY - MAŁE, OSTRE ROGI */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center',
          gap: '15px', 
          width: '100%', 
          maxWidth: '600px'
        }}>
          
          <button 
            onClick={scrollToTerminal} 
            style={{
              backgroundColor: '#FFD700',
              color: '#000',
              width: '80px',
              height: '80px',
              borderRadius: '0px', // Ostre rogi
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '8px',
              border: 'none',
              padding: '5px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center'
            }}
          >
            BlackSlon Energy Indexes
          </button>

          <button style={squareStyle('#FF4136', '#fff')}>Broken Market Architecture</button>
          <button style={squareStyle('#2ECC40', '#fff')}>Manifesto</button>
          <button style={squareStyle('#0074D9', '#fff')}>Matrix of BlackSlon Events</button>
          <button style={squareStyle('#FFFFFF', '#000')}>White Paper</button>
        </div>
      </div>

      {/* SEKCJA DOCELOWA (TERMINAL) */}
      <div id="indexes-section" style={{ paddingTop: '100px', minHeight: '100vh', borderTop: '1px solid #333' }}>
         <h2 style={{ textAlign: 'center', color: '#FFD700' }}>TERMINAL PROTOCOL</h2>
         {/* Tutaj Twój kod Liquidty */}
      </div>

    </main>
  );
}

const squareStyle = (bgColor: string, textColor: string) => ({
  backgroundColor: bgColor,
  color: textColor,
  width: '80px',   
  height: '80px',  
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '0px', 
  cursor: 'pointer',
  textAlign: 'center' as 'center',
  fontWeight: 'bold' as 'bold',
  fontSize: '8px',   
  padding: '5px',
  border: 'none',
  lineHeight: '1.2'
});