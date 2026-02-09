'use client';

import React from 'react';
import Image from 'next/image';

export default function Home() {
  return (
    <main style={{ backgroundColor: '#000', minHeight: '100vh', color: '#fff', fontFamily: 'monospace' }}>
      
      {/* SEKCJA GŁÓWNA */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        minHeight: '70vh',
        gap: '30px',
        padding: '20px' 
      }}>
        
        {/* LOGO Z GITHUBA */}
        <div style={{ position: 'relative', width: '120px', height: '120px' }}>
          <img 
            src="/bs_image.jpg" 
            alt="BlackSlon Logo" 
            style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
          />
        </div>

        <h1 style={{ fontSize: '48px', fontWeight: 'bold', letterSpacing: '12px', margin: 0 }}>
          BLACKSLON
        </h1>

        {/* SIATKA MNIEJSZYCH KWADRATÓW */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', 
          gap: '15px', 
          width: '100%', 
          maxWidth: '850px' 
        }}>
          
          {/* ŻÓŁTY - Poprawiona nazwa */}
          <div 
            onClick={() => document.getElementById('indexes-section')?.scrollIntoView({ behavior: 'smooth' })} 
            style={squareStyle('#FFD700', '#000')}
          >
            BlackSlon Energy Indexes
          </div>

          <div style={squareStyle('#FF4136', '#fff')}>Broken Market Architecture</div>
          <div style={squareStyle('#2ECC40', '#fff')}>Manifesto</div>

          {/* NIEBIESKI - Poprawiona nazwa */}
          <div style={squareStyle('#0074D9', '#fff')}>
            Matrix of BlackSlon Events
          </div>

          <div style={squareStyle('#FFFFFF', '#000')}>White Paper</div>
        </div>
      </div>

      {/* SEKCJA INDEKSÓW (Terminal Liquidty) */}
      <div id="indexes-section" style={{ paddingTop: '50px' }}>
         {/* Tutaj zostaje Twój kod z wykresami i formułą BlackSlon */}
      </div>

    </main>
  );
}

// STYL MNIEJSZYCH KWADRATÓW
const squareStyle = (bgColor: string, textColor: string) => ({
  backgroundColor: bgColor,
  color: textColor,
  height: '130px', // Zmniejszone
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '8px',
  cursor: 'pointer',
  textAlign: 'center' as 'center',
  fontWeight: 'bold' as 'bold',
  fontSize: '12px', // Mniejszy font do dłuższych nazw
  padding: '10px',
  transition: 'transform 0.2s',
  boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
  border: 'none'
});