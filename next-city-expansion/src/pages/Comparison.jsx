import React, { useMemo } from 'react';
import { candidateCities, metricConfig } from '../data/cities';

export default function Comparison({ weights }) {
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

  const topScore = scoredCities[0].totalScore;

  const renderBar = (val, color, max = 100) => (
    <div className="score-bar-cell">
      <div className="score-bar-bg" style={{ flex: 1 }}>
        <div
          className="score-bar-fill"
          style={{ width: `${(val / max) * 100}%`, background: color }}
        />
      </div>
      <span className="score-num">{val}</span>
    </div>
  );

  return (
    <div className="comparison-page">
      <h1 className="page-heading">City Comparison Matrix</h1>
      <p className="page-subheading">All five candidate cities ranked side-by-side across every metric.</p>

      <div className="comparison-table-wrapper">
        <table className="comparison-table">
          <thead>
            <tr>
              <th>#</th>
              <th>City</th>
              <th>Demographics</th>
              <th>Competition</th>
              <th>Infrastructure</th>
              <th>Local Spending</th>
              <th>Overall Score</th>
            </tr>
          </thead>
          <tbody>
            {scoredCities.map((city, i) => (
              <tr key={city.id} style={{ animationDelay: `${i * 0.06}s` }}>
                <td style={{ color: 'var(--text-500)', fontWeight: 700, fontSize: '0.85rem' }}>#{i + 1}</td>
                <td>
                  <div className="city-name-cell">
                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: city.color, display: 'inline-block', flexShrink: 0 }} />
                    {city.name}
                    {i === 0 && <span className="winner-badge">Top Pick</span>}
                  </div>
                </td>
                <td>{renderBar(city.demographics, city.color)}</td>
                <td>
                  {/* Competition is inverse — low score = less competition = good */}
                  {renderBar(100 - city.competition, city.color)}
                </td>
                <td>{renderBar(city.infrastructure, city.color)}</td>
                <td>{renderBar(city.spending, city.color)}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div className="score-bar-bg" style={{ flex: 1 }}>
                      <div
                        className="score-bar-fill"
                        style={{ width: `${(city.totalScore / topScore) * 100}%`, background: `linear-gradient(90deg, ${city.color}, ${city.color}88)` }}
                      />
                    </div>
                    <span style={{ fontWeight: 800, color: city.color, minWidth: 36 }}>{city.totalScore.toFixed(1)}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
