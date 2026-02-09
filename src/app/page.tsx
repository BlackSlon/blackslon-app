'use client'; // Musi być na samej górze!

import React from 'react';
// ... inne importy, jeśli masz ...

export default function Home() {
  return (
    <main style={{ backgroundColor: '#000', minHeight: '100vh', color: '#fff' }}>
      
      {/* SEKCJA MENU - To co wkleiłeś na image_68a237.jpg */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px', paddingTop: '100px' }}>
        <div style={{ fontSize: '48px', fontWeight: 'bold', letterSpacing: '8px' }}>BLACKSLON</div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px', width: '900px' }}>
          <div onClick={() => window.scrollTo({top: 900, behavior: 'smooth'})} style={squareStyle('#FFD700', '#000')}>BSEI</div>
          <div style={squareStyle('#FF4136', '#fff')}>Broken Market Architecture</div>
          <div style={squareStyle('#2ECC40', '#fff')}>Manifesto</div>
          <div style={squareStyle('#0074D9', '#fff')}>Matrix of BS Events</div>
          <div style={squareStyle('#FFFFFF', '#000')}>White Paper</div>
        </div>
      </div>

      {/* TUTAJ DALSZA CZĘŚĆ TWOJEJ STRONY (TERMINAL INDEKSÓW) */}

    </main>
  );
}

// TA FUNKCJA MUSI BYĆ NA SAMYM DOLE, POZA NAWIASEM FUNKCJI HOME
const squareStyle = (bgColor: string, textColor: string) => ({
  backgroundColor: bgColor,
  color: textColor,
  height: '150px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '12px',
  cursor: 'pointer',
  textAlign: 'center' as 'center',
  fontWeight: 'bold'
});