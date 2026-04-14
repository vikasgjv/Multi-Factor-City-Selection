import React from 'react';
import { candidateCities } from '../data/cities';

export default function Overview({ onNavigate, setSelectedCityId }) {
  const kpis = [
    { icon: '🏙️', label: 'Candidate Cities', value: '5', delta: '+2 this quarter' },
    { icon: '📊', label: 'Data Points', value: '20', delta: 'Across 4 metrics' },
    { icon: '💰', label: 'Combined Market', value: '₹924B', delta: 'GDP Addressable' },
    { icon: '👥', label: 'Total Population', value: '89M', delta: 'Across all cities' },
  ];

  return (
    <div className="overview-page">
      <div className="overview-hero">
        <div className="hero-eyebrow">
          <span className="live-dot" />
          Expansion Intelligence Platform
        </div>
        <h1 className="hero-title">
          Find Your Next<br />
          <span className="hero-gradient-text">Market Frontier.</span>
        </h1>
        <p className="hero-desc">
          A data-driven site selection system for growing brands. Compare demographics, infrastructure, and competitive landscapes across India's top cities — then decide with confidence.
        </p>
      </div>

      <div className="kpi-row">
        {kpis.map((k, i) => (
          <div className="kpi-card" key={i} style={{ animationDelay: `${i * 0.05}s` }}>
            <div className="kpi-icon">{k.icon}</div>
            <div className="kpi-value">{k.value}</div>
            <div className="kpi-label">{k.label}</div>
            <div className="kpi-delta">↑ {k.delta}</div>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>Candidate Cities</h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-500)', marginBottom: '20px' }}>Click any city to launch the full map analysis.</p>
      </div>
      <div className="city-cards-grid">
        {candidateCities.map((city, i) => (
          <div
            key={city.id}
            className="city-overview-card"
            style={{
              animationDelay: `${0.1 + i * 0.07}s`,
              '--card-color': city.color,
            }}
            onClick={() => { setSelectedCityId(city.id); onNavigate('analysis'); }}
          >
            <div
              style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
                background: city.color, borderRadius: 'var(--radius-md) var(--radius-md) 0 0',
                opacity: 0.8,
              }}
            />
            <div className="coc-header">
              <div>
                <div className="coc-name">{city.name}</div>
                <div className="coc-state">{city.state}</div>
              </div>
              <span
                className="coc-tag"
                style={{ background: `${city.color}22`, color: city.color, border: `1px solid ${city.color}44` }}
              >
                {city.tag}
              </span>
            </div>
            <p className="coc-description">{city.description}</p>
            <div className="coc-stats">
              <div className="coc-stat">
                <span className="coc-stat-val" style={{ color: city.color }}>{city.population}</span>
                <span className="coc-stat-key">Population</span>
              </div>
              <div className="coc-stat">
                <span className="coc-stat-val" style={{ color: city.color }}>₹{city.gdp}</span>
                <span className="coc-stat-key">Est. GDP</span>
              </div>
              <div className="coc-stat">
                <span className="coc-stat-val" style={{ color: city.color }}>{city.spending}/100</span>
                <span className="coc-stat-key">Spending</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
