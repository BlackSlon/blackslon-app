'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function TerminalPage() {
  // Parametry BlackSlon do kalibracji [cite: 2026-02-06]
  const a = 120.50; // Base Price (Cena bazowa)
  const b = 0.045;  // Volatility/Sensitivity (Wrażliwość)
  const S = 15.2;   // Stress Factor / Supply (Współczynnik stresu)

  // Obliczanie ceny według Twojej formuły: P = a * e^(b * S)
  const currentPrice = (a * Math.exp(b * S)).toFixed(2);

  const [logs, setLogs] = useState<string[]>([]);

  // Symulacja logów systemowych protocol
  useEffect(() => {
    const messages = [
      "Initializing BlackSlon Protocol...",
      "Analyzing Energy Market Liquidty...",
      "Connecting to Arbitrage Mechanism...",
      "Calibration parameters: a=" + a + ", b=" + b + ", S=" + S,
      "Price stabilized at: $" + currentPrice
    ];

    messages.forEach((msg, i) => {
      setTimeout(() => {
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
      }, i * 1000);
    });
  }, []);

  return (
    <main style={{ backgroundColor: '#000', minHeight: '100vh', color: '#00ff00', fontFamily: 'monospace', padding: '20px' }}>
      
      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #004400', paddingBottom: '10px', marginBottom: '20px' }}>
        <h1 style={{ color: '#FFD700', margin: 0, fontSize: '24px' }}>BLACKSLON TERMINAL v1.0</h1>
        <Link href="/" style={{ color: '#888', textDecoration: 'none', fontSize: '14px', border: '1px solid #444', padding: '5px 10px' }}>
          EXIT_TERMINAL
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '20px' }}>
        
        {/* LEWA KOLUMNA: DANE I FORMUŁA */}
        <div>
          <div style={{ border: '1px solid #00ff00', padding: '20px', backgroundColor: '#050505', marginBottom: '20px' }}>
            <h2 style={{ color: '#00ff00', marginTop: 0 }}>Mathematical Model</h2>
            <p style={{ fontSize: '28px', color: '#fff', textAlign: 'center', margin: '20px 0' }}>
              P = a · e<sup>(b · S)</sup>
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', textAlign: 'center' }}>
              <div style={{ border: '1px solid #222', padding: '10px' }}>
                <span style={{ color: '#888' }}>Base (a)</span><br />
                <span style={{ fontSize: '20px' }}>{a}</span>
              </div>
              <div style={{ border: '1px solid #222', padding: '10px' }}>
                <span style={{ color: '#888' }}>Sens. (b)</span><br />
                <span style={{ fontSize: '20px' }}>{b}</span>
              </div>
              <div style={{ border: '1px solid #222', padding: '10px' }}>
                <span style={{ color: '#888' }}>Stress (S)</span><br />
                <span style={{ fontSize: '20px' }}>{S}</span>
              </div>
            </div>
          </div>

          <div style={{ border: '1px solid #00ff00', padding: '15px', height: '300px', overflowY: 'auto', backgroundColor: '#050505' }}>
            {logs.map((log, i) => (
              <div key={i} style={{ marginBottom: '5px' }}>{log}</div>
            ))}
            <div style={{ animation: 'blink 1s infinite' }}>_</div>
          </div>
        </div>

        {/* PRAWA KOLUMNA: STATUS I LIQUIDTY */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ border: '1px solid #FFD700', padding: '20px', textAlign: 'center' }}>
            <h3 style={{ margin: 0, color: '#FFD700' }}>CURRENT PRICE</h3>
            <div style={{ fontSize: '42px', fontWeight: 'bold', color: '#fff', margin: '10px 0' }}>
              ${currentPrice}
            </div>
            <div style={{ color: '#2ECC40', fontSize: '12px' }}>● MARKET OPEN</div>
          </div>

          <div style={{ border: '1px solid #0074D9', padding: '15px' }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#0074D9' }}>Liquidty Protocol</h4>
            <div style={{ height: '10px', backgroundColor: '#111', width: '100%', marginBottom: '10px' }}>
              <div style={{ height: '100%', backgroundColor: '#0074D9', width: '75%' }}></div>
            </div>
            <span style={{ fontSize: '12px' }}>POOL STATUS: 75% LOADED</span>
          </div>

          <div style={{ border: '1px solid #FF4136', padding: '15px' }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#FF4136' }}>Arbitrage Alert</h4>
            <p style={{ fontSize: '11px', color: '#888' }}>Monitoring price gaps between Bonded Curve and External Indexes...</p>
          </div>
        </div>

      </div>

      <style jsx>{`
        @keyframes blink {
          0% { opacity: 0; }
          50% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </main>
  );
}