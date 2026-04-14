import React, { useState, useMemo } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { candidateCities, metricConfig } from '../data/cities';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    return (
      <div style={{ background: 'rgba(8,12,20,0.95)', padding: '10px 14px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: 'white', fontSize: '0.82rem' }}>
        <strong>{payload[0].payload.subject}</strong>: {payload[0].value}
      </div>
    );
  }
  return null;
};

export default function Analysis({ selectedCityId, setSelectedCityId, weights, setWeights }) {
  const normalizedWeights = useMemo(() => {
    const total = Object.values(weights).reduce((a, b) => a + b, 0) || 1;
    return Object.fromEntries(Object.entries(weights).map(([k, v]) => [k, v / total]));
  }, [weights]);

  const scoredCities = useMemo(() =>
    candidateCities.map(city => ({
      ...city,
      totalScore:
        (city.demographics * normalizedWeights.demographics) +
        ((100 - city.competition) * normalizedWeights.competition) +
        (city.infrastructure * normalizedWeights.infrastructure) +
        (city.spending * normalizedWeights.spending),
    })).sort((a, b) => b.totalScore - a.totalScore),
    [normalizedWeights]
  );

  const selectedCity = scoredCities.find(c => c.id === selectedCityId) || scoredCities[0];

  const radarData = [
    { subject: 'Demographics', A: selectedCity.demographics },
    { subject: 'Market Gap',   A: 100 - selectedCity.competition },
    { subject: 'Infrastructure', A: selectedCity.infrastructure },
    { subject: 'Spending',    A: selectedCity.spending },
  ];

  const rankClass = i => i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : '';

  return (
    <div className="analysis-page">
      {/* Weight Control Panel */}
      <div className="weight-panel slide-right">
        <div>
          <h3>Priority Weights</h3>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-500)', lineHeight: 1.6, marginBottom: '20px' }}>
            Adjust strategy dials. Rankings update in real time.
          </p>
          {metricConfig.map(metric => (
            <div key={metric.key} className="slider-group">
              <div className="slider-label-row">
                <span className="slider-label">{metric.label}</span>
                <span className="slider-value">{Math.round(normalizedWeights[metric.key] * 100)}%</span>
              </div>
              <input
                type="range" min="0" max="100"
                value={weights[metric.key]}
                onChange={e => setWeights(prev => ({ ...prev, [metric.key]: parseInt(e.target.value) }))}
              />
            </div>
          ))}
        </div>

        <div>
          <h3>Consensus Ranking</h3>
          <div className="leaderboard-list">
            {scoredCities.map((city, i) => (
              <div
                key={city.id}
                className={`leaderboard-item ${selectedCity.id === city.id ? 'active' : ''}`}
                onClick={() => setSelectedCityId(city.id)}
              >
                <div className={`lb-rank ${rankClass(i)}`}>{i + 1}</div>
                <div className="lb-name" style={{ color: city.color }}>{city.name}</div>
                <div className="lb-score">{city.totalScore.toFixed(1)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Map + Floating panels */}
      <div className="map-area">
        <div className="map-iframe-wrapper" key={selectedCity.name}>
          <iframe
            src={`https://maps.google.com/maps?q=${encodeURIComponent(selectedCity.name + ', India')}&t=k&z=11&output=embed`}
            title={`Map of ${selectedCity.name}`}
            loading="lazy"
          />
          <div className="map-overlay-gradient" />
        </div>

        {/* City name banner */}
        <div className="city-banner" key={selectedCity.name + '-banner'}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: selectedCity.color, display: 'inline-block', boxShadow: `0 0 8px ${selectedCity.color}` }} />
          <span className="city-banner-name">{selectedCity.name}</span>
          <span className="city-banner-state">{selectedCity.state}</span>
          <span style={{
            fontSize: '0.7rem', fontWeight: 700, padding: '2px 8px', borderRadius: 10,
            background: `${selectedCity.color}22`, color: selectedCity.color, border: `1px solid ${selectedCity.color}44`,
          }}>{selectedCity.tag}</span>
        </div>

        {/* Floating Analytics Panels */}
        <div className="floating-panels">
          <div className="glass-island chart-island" key={selectedCity.name + '-radar'} style={{ animationDelay: '0.05s' }}>
            <div className="island-header">📡 Profile Index</div>
            <ResponsiveContainer width="100%" height="85%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.15)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.65)', fontSize: 10 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Radar dataKey="A" stroke={selectedCity.color} fill={selectedCity.color} fillOpacity={0.5} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="glass-island stats-island" key={selectedCity.name + '-stats'} style={{ animationDelay: '0.1s' }}>
            <div className="island-header">📍 {selectedCity.name} Diagnostics</div>
            <div className="metric-grid">
              {[
                { label: 'Demographics', val: selectedCity.demographics, suffix: '/100' },
                { label: 'Competition', val: selectedCity.competition, suffix: '/100', note: 'lower better' },
                { label: 'Infrastructure', val: selectedCity.infrastructure, suffix: '/100' },
                { label: 'Local Spending', val: selectedCity.spending, suffix: '/100' },
              ].map(m => (
                <div className="metric-tile" key={m.label}>
                  <div className="metric-label">{m.label}</div>
                  <div className="metric-value" style={{ color: selectedCity.color }}>{m.val}<span style={{ fontSize: '0.7rem', color: 'var(--text-500)', fontWeight: 400 }}>{m.suffix}</span></div>
                  {m.note && <div style={{ fontSize: '0.68rem', color: 'var(--text-500)', marginTop: 2 }}>{m.note}</div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
