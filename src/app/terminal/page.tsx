'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import FormulaDisplay from '@/components/FormulaDisplay'

interface MarketData {
  FW: number
  FM: number
  FQ: number
  FY: number
  isGBP?: boolean
}

interface Market {
  country: string
  index: string
  price: number
  role: string
  oi: number
  status?: string
}

interface Prices {
  power: Market[]
  gas: Market[]
  future: Market[]
}

const MARKETS_DATA = {
  POWER: {
    DE: { FW: 85.4, FM: 85.4, FQ: 85.4, FY: 85.4 },
    PL: { FW: 101.2, FM: 101.2, FQ: 101.2, FY: 101.2 },
    FR: { FW: 71.6, FM: 71.6, FQ: 71.6, FY: 71.6 },
    RO: { FW: 91.4, FM: 91.4, FQ: 91.4, FY: 91.4 },
    NO: { FW: 83.6, FM: 83.6, FQ: 83.6, FY: 83.6 },
    BG: { FW: 105.4, FM: 105.4, FQ: 105.4, FY: 105.4 },
    GB: { FW: 92.0, FM: 92.0, FQ: 92.0, FY: 92.0, isGBP: true },
    HU: { FW: 106.2, FM: 106.2, FQ: 106.2, FY: 106.2 },
    IT: { FW: 109.3, FM: 109.3, FQ: 109.3, FY: 109.3 }
  },
  GAS: {
    NL: { FW: 32.8, FM: 32.8, FQ: 32.8, FY: 32.8 },
    DE: { FW: 42.0, FM: 42.0, FQ: 42.0, FY: 42.0 },
    PL: { FW: 31.2, FM: 31.2, FQ: 31.2, FY: 31.2 },
    FR: { FW: 35.8, FM: 35.8, FQ: 35.8, FY: 35.8 },
    BG: { FW: 32.5, FM: 32.5, FQ: 32.5, FY: 32.5 },
    AT: { FW: 38.6, FM: 38.6, FQ: 38.6, FY: 38.6 },
    IT: { FW: 34.0, FM: 36.3, FQ: 34.48, FY: 29.03 },
    GB: { FW: 81.7675, FM: 81.7675, FQ: 81.7675, FY: 81.7675, isGBP: true }
  }
}

const calculateFinalPrice = (data: MarketData, country: string, marketType: string) => {
  const weighted_raw = (data.FW * 0.1) + (data.FM * 0.4) + (data.FQ * 0.25) + (data.FY * 0.25)
  if (marketType === 'gas' && country === 'GB') {
    return (81.7675 * 1.15 * 34.12) / 100 / 10
  } else if (marketType === 'gas') {
    return weighted_raw / 10
  } else if (marketType === 'power') {
    return weighted_raw / 10
  } else {
    return weighted_raw / 10
  }
}

const getMarketRole = (country: string, marketType: string) => {
  if (marketType === 'power') {
    switch (country) {
      case 'DE': return 'Anchor'
      case 'PL': return 'Coal Base'
      case 'FR': return 'Nuclear Base'
      case 'RO': return 'Strong Flow'
      case 'NO': return 'Hydro'
      case 'BG': return 'Balkan Entry'
      case 'GB': return 'Island Market'
      case 'HU': return 'CEE Hub'
      case 'IT': return 'South Demand'
      default: return 'Market'
    }
  } else if (marketType === 'gas') {
    switch (country) {
      case 'NL': return 'Liquidity'
      case 'DE': return 'Physical Flow'
      case 'PL': return 'Dynamic Growth'
      case 'FR': return 'LNG'
      case 'BG': return 'Balkan Hub'
      case 'AT': return 'Baumgarten'
      case 'IT': return 'Southern Flow'
      case 'GB': return 'Island'
      default: return 'Market'
    }
  }
  return 'Market'
}

const getMarketOI = (country: string, marketType: string) => {
  if (marketType === 'power') {
    switch (country) {
      case 'DE': return 1245000
      case 'PL': return 890000
      case 'FR': return 2100000
      case 'RO': return 180000
      case 'NO': return 1100000
      case 'BG': return 220000
      case 'GB': return 95000
      case 'HU': return 450000
      case 'IT': return 750000
      default: return 100000
    }
  } else if (marketType === 'gas') {
    switch (country) {
      case 'NL': return 5600000
      case 'DE': return 3200000
      case 'PL': return 1200000
      case 'FR': return 1800000
      case 'BG': return 850000
      case 'AT': return 640000
      case 'IT': return 950000
      case 'GB': return 420000
      default: return 100000
    }
  }
  return 100000
}

export default function TerminalPage() {
  const [activeTab, setActiveTab] = useState<'power' | 'gas'>('power')

  const prices: Prices = {
    power: Object.entries(MARKETS_DATA.POWER).map(([country, data]) => ({
      country,
      index: `BS-E-${country}`,
      price: calculateFinalPrice(data, country, 'power'),
      role: getMarketRole(country, 'power'),
      oi: getMarketOI(country, 'power')
    })),
    gas: Object.entries(MARKETS_DATA.GAS).map(([country, data]) => ({
      country,
      index: `BS-G-${country}`,
      price: calculateFinalPrice(data, country, 'gas'),
      role: getMarketRole(country, 'gas'),
      oi: getMarketOI(country, 'gas')
    })),
    future: [
      { country: 'LPG', index: 'BS-LPG-EU', price: 0.62, role: 'Regional Hub', status: 'development' },
      { country: 'Diesel', index: 'BS-D-EU', price: 7.58, role: 'Transport Fuel', status: 'development' },
      { country: 'Gasoline', index: 'BS-GSN-EU', price: 7.35, role: 'Motor Fuel', status: 'development' }
    ]
  }

  // Find DE Power market from the actual calculated prices array
  const dePowerMarket = prices.power.find(m => m.country === 'DE')

  const [selectedMarket, setSelectedMarket] = useState<Market>(dePowerMarket || prices.power[0])
  const [basePrice, setBasePrice] = useState<number>(dePowerMarket?.price || prices.power[0].price)

  const [pricesState, setPricesState] = useState<Prices>(prices)

  // Sync Engine: Update onClick for every tile to update global selectedMarket state
  const handleMarketClick = (market: Market) => {
    setSelectedMarket(market)
    setBasePrice(market.price)
  }

  // Handle tab switching to set appropriate default market
  const handleTabSwitch = (tab: 'power' | 'gas') => {
    setActiveTab(tab)
    if (tab === 'power') {
      // Set DE Power as default for power tab
      const dePowerMarket = pricesState.power.find(m => m.country === 'DE')
      if (dePowerMarket) {
        setSelectedMarket(dePowerMarket)
        setBasePrice(dePowerMarket.price)
      }
    } else if (tab === 'gas') {
      // Set NL Gas as default for gas tab
      const nlGasMarket = pricesState.gas.find(m => m.country === 'NL')
      if (nlGasMarket) {
        setSelectedMarket(nlGasMarket)
        setBasePrice(nlGasMarket.price)
      }
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setPricesState(prev => {
        const next = { ...prev }
        const vol = (activeTab === 'power' || activeTab === 'gas') ? 0.05 : 1.5
        next[activeTab] = next[activeTab].map((m: Market) => {
          const rawNewPrice = m.price + (Math.random() - 0.5) * vol
          return {
            ...m, 
            price: +(Math.max(0.01, rawNewPrice)).toFixed(2),
            oi: Math.max(0, m.oi + Math.floor((Math.random() - 0.4) * 100))
          }
        })
        return next
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [activeTab])

  const getAccent = () => {
    if(activeTab === 'power') return '#FFD700'
    if(activeTab === 'gas') return '#87CEEB'
    return '#00ced1'
  }

  const getUnit = () => {
    return 'kWh'
  }

  const getMarketLabel = (country: string, role: string) => {
    return `${country} // ${role}`
  }

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff', padding: '20px', fontFamily: 'monospace' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header & Branding */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: '#fff' }}>BlackSlon Energy Indexes</h1>
            <p style={{ margin: '5px 0', color: '#888', fontSize: '12px' }}>ZERO SPREAD | ZERO EXPIRY | LIQUIDTY 24/7</p>
          </div>
          <button style={{ background: '#fff', color: '#000', padding: '12px 24px', border: 'none', cursor: 'pointer', fontWeight: 'bold', borderRadius: '4px' }}>
            CONNECT WALLET
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-1 mb-8">
          <button 
            onClick={() => handleTabSwitch('power')} 
            style={{ 
              background: activeTab === 'power' ? getAccent() : 'transparent', 
              color: activeTab === 'power' ? '#000' : '#fff', 
              border: `1px solid ${getAccent()}`, 
              padding: '8px 10px', 
              cursor: 'pointer', 
              fontSize: '9px', 
              fontWeight: 'bold', 
              textTransform: 'uppercase' 
            }}
          >
            BlackSlon Power Indexes
          </button>
          <button 
            onClick={() => handleTabSwitch('gas')} 
            style={{ 
              background: activeTab === 'gas' ? getAccent() : 'transparent', 
              color: activeTab === 'gas' ? '#000' : '#fff', 
              border: `1px solid ${getAccent()}`, 
              padding: '8px 10px', 
              cursor: 'pointer', 
              fontSize: '9px', 
              fontWeight: 'bold', 
              textTransform: 'uppercase' 
            }}
          >
            BlackSlon Gas Indexes
          </button>
        </div>

        {/* Price Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {pricesState[activeTab].map(m => (
            <div 
              key={m.index}
              onClick={() => handleMarketClick(m)}
              style={{ 
                background: '#0a0a0a', 
                border: `1px solid ${getAccent()}`, 
                padding: '16px', 
                cursor: 'pointer',
                borderRadius: '8px',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = getAccent()
                e.currentTarget.style.transform = 'scale(1.02)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = '#1a1a1a'
                e.currentTarget.style.transform = 'scale(1)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <div>
                  <div style={{ fontSize: '10px', color: '#888', marginBottom: '2px' }}>{m.country}</div>
                  <div style={{ fontSize: '11px', color: getAccent(), fontWeight: 'bold' }}>{m.index}</div>
                </div>
                <div style={{ fontSize: '9px', color: '#666' }}>{m.role}</div>
              </div>
              
              <div style={{ textAlign: 'center', marginBottom: '12px' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', marginBottom: '4px' }}>
                  {(m.price ?? 0).toFixed(2)}
                </div>
                <div style={{ fontSize: '10px', color: '#888' }}>€/100 {getUnit()}</div>
              </div>

              <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                <button 
                  style={{ 
                    flex: 1, 
                    background: 'transparent', 
                    color: '#00ff88', 
                    border: '1px solid #00ff88', 
                    padding: '8px 0', 
                    fontSize: '10px', 
                    fontWeight: 'bold', 
                    cursor: 'pointer',
                    borderRadius: '4px'
                  }}
                >
                  BUY
                </button>
                <button 
                  style={{ 
                    flex: 1, 
                    background: 'transparent', 
                    color: '#ff4444', 
                    border: '1px solid #ff4444', 
                    padding: '8px 0', 
                    fontSize: '10px', 
                    fontWeight: 'bold', 
                    cursor: 'pointer',
                    borderRadius: '4px'
                  }}
                >
                  SELL
                </button>
              </div>
              <div className="text-xs text-gray-500">
                OI: {(m.oi || 0).toLocaleString()}
              </div>
              {m.status === 'development' && (
                <div className="text-xs text-gray-500 mt-1">
                  <span className="bg-gray-700 px-2 py-1 rounded">In Development</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Formula Display Section */}
        <div className="max-w-6xl mx-auto mt-8">
          <FormulaDisplay 
            activeMarket={selectedMarket}
          />
        </div>
      </div>
    </div>
  )
}
