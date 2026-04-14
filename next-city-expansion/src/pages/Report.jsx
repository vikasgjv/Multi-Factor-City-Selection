import React, { useMemo } from 'react';
import { candidateCities } from '../data/cities';

const risks = [
  { city: 'Mumbai',     level: 'high',   reason: 'Saturated market with highest competition index (85/100).' },
  { city: 'Chennai',    level: 'medium', reason: 'Moderate competition with solid infrastructure; mid-tier spending.' },
  { city: 'Hyderabad',  level: 'low',    reason: 'Lowest competition of all cities; fastest growing consumer class.' },
  { city: 'Delhi',      level: 'low',    reason: 'Lowest competition index (45/100); massive addressable population.' },
  { city: 'Bengaluru',  level: 'medium', reason: 'Hot market with high spending, but rising competition.' },
];

const recommendations = [
  'Prioritize Delhi or Hyderabad for first-mover advantage — both show sub-50 competition scores.',
  "Bengaluru's high spending power (95/100) makes it ideal for a premium brand positioning.",
  'Mumbai entry should be deferred unless the brand has strong differentiation from incumbents.',
  "Chennai's industrial backbone offers strong logistics for supply chain-heavy operations.",
  'Run a consumer sentiment survey in Hyderabad before committing — data suggests emerging, not yet confirmed, demand.',
];

export default function Report({ weights }) {
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

  const winner = scoredCities[0];

  const riskClass = l => `risk-pill risk-${l}`;

  return (
    <div className="report-page">
      <h1 className="page-heading">Strategic Report</h1>
      <p className="page-subheading">AI-generated expansion recommendations based on your current priority weights.</p>

      {/* Winner Hero */}
      <div className="winner-hero">
        <div className="winner-trophy">🏆</div>
        <div>
          <div className="winner-title">Top Recommended City</div>
          <div className="winner-name">{winner.name}</div>
          <div className="winner-desc">{winner.description}</div>
        </div>
        <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-500)', marginBottom: 8 }}>COMPOSITE SCORE</div>
          <div style={{ fontSize: '3rem', fontWeight: 800, color: winner.color, letterSpacing: '-0.04em', lineHeight: 1 }}>
            {winner.totalScore.toFixed(1)}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-500)', marginTop: 4 }}>out of 100</div>
        </div>
      </div>

      <div className="report-grid">
        {/* Recommendations */}
        <div className="report-card" style={{ gridColumn: '1 / -1' }}>
          <div className="report-card-title">📋 Strategic Recommendations</div>
          <ul className="recommendation-list">
            {recommendations.map((r, i) => (
              <li key={i} className="rec-item">
                <span className="rec-bullet">{i + 1}</span>
                <span className="rec-text">{r}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* City Risk Assessment */}
        <div className="report-card">
          <div className="report-card-title">⚠️ Market Entry Risk</div>
          {risks.map(r => (
            <div key={r.city} style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                <span style={{ fontWeight: 700, fontSize: '0.88rem' }}>{r.city}</span>
                <span className={riskClass(r.level)}>
                  {r.level === 'low' ? '✅' : r.level === 'medium' ? '⚠️' : '🔴'} {r.level.toUpperCase()} RISK
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-500)', lineHeight: 1.6 }}>{r.reason}</p>
            </div>
          ))}
        </div>

        {/* Ranking snapshot */}
        <div className="report-card">
          <div className="report-card-title">📈 Final Weighted Rankings</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {scoredCities.map((city, i) => (
              <div key={city.id} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontWeight: 800, fontSize: '0.75rem', color: 'var(--text-500)', minWidth: 20 }}>#{i + 1}</span>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: city.color, display: 'inline-block', flexShrink: 0 }} />
                <span style={{ fontSize: '0.88rem', fontWeight: 600, flex: 1 }}>{city.name}</span>
                <div style={{ flex: 2, height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${(city.totalScore / scoredCities[0].totalScore) * 100}%`, background: city.color, borderRadius: 3, transition: 'width 0.8s cubic-bezier(0.34,1.56,0.64,1)' }} />
                </div>
                <span style={{ fontWeight: 800, fontSize: '0.88rem', color: city.color, minWidth: 36, textAlign: 'right' }}>{city.totalScore.toFixed(1)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
