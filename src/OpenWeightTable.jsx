import { useState } from 'react'

const HEADS = ['Model', 'Maker', 'Size', 'Context', 'License', 'Top benchmark', '']

export default function OpenWeightTable({ models }) {
  const [activeId, setActiveId] = useState(null)
  const toggle = (id) => setActiveId(prev => prev === id ? null : id)

  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden', background: 'var(--surface)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
        <colgroup>
          <col style={{ width: '26%' }} />
          <col style={{ width: '13%' }} />
          <col style={{ width: '15%' }} />
          <col style={{ width: '10%' }} />
          <col style={{ width: '13%' }} />
          <col style={{ width: '18%' }} />
          <col style={{ width: '5%' }} />
        </colgroup>
        <thead>
          <tr style={{ background: 'var(--surface2)' }}>
            {HEADS.map((h, i) => (
              <th key={i} style={{ padding: '10px 14px', fontSize: 10, fontWeight: 500, color: '#3a3a3c', textTransform: 'uppercase', letterSpacing: '0.07em', textAlign: 'left', borderBottom: '1px solid var(--border)' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {models.map(model => {
            const isActive = activeId === model.id
            return [
              <tr
                key={model.id}
                onClick={() => toggle(model.id)}
                style={{ borderBottom: '1px solid var(--border)', cursor: 'pointer', background: isActive ? '#f0f6ff' : 'var(--surface)', transition: 'background 0.15s' }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'var(--surface2)' }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'var(--surface)' }}
              >
                <td style={{ padding: '11px 14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 24, height: 24, borderRadius: 6, background: model.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <div style={{ width: 9, height: 9, borderRadius: 3, background: model.accent }} />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{model.name}</div>
                      <div style={{ fontSize: 11, color: model.accent, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: 1 }}>{model.rank}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '11px 14px', fontSize: 12, color: '#1d1d1f', verticalAlign: 'top', paddingTop: 13 }}>{model.maker}</td>
                <td style={{ padding: '11px 14px', fontSize: 12, color: '#1d1d1f', verticalAlign: 'top', paddingTop: 13 }}>{model.params}</td>
                <td style={{ padding: '11px 14px', fontSize: 12, color: '#1d1d1f', verticalAlign: 'top', paddingTop: 13 }}>{model.context}</td>
                <td style={{ padding: '11px 14px', verticalAlign: 'top', paddingTop: 13 }}>
                  <span style={{ fontSize: 11, fontWeight: 500, padding: '2px 8px', borderRadius: 20, whiteSpace: 'nowrap', background: model.licenseOpen ? '#e8faf4' : '#f1efe8', color: model.licenseOpen ? '#0a6b4a' : '#444441' }}>{model.license}</span>
                </td>
                <td style={{ padding: '11px 14px', verticalAlign: 'top', paddingTop: 13 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                    <span style={{ fontSize: 12, fontWeight: 500, color: model.accent, fontFamily: 'var(--mono)' }}>{model.headline.value}</span>
                    <span style={{ fontSize: 11, color: '#3a3a3c', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{model.headline.label}</span>
                  </div>
                </td>
                <td style={{ padding: '11px 14px', verticalAlign: 'top', paddingTop: 13, textAlign: 'right' }}>
                  <span style={{ fontSize: 11, color: '#3a3a3c', display: 'inline-block', transform: isActive ? 'rotate(90deg)' : 'none', transition: 'transform 0.15s' }}>›</span>
                </td>
              </tr>,
              isActive && (
                <tr key={`${model.id}-detail`}>
                  <td colSpan={7} style={{ padding: '16px 18px 18px', background: '#fafafc', borderBottom: '1px solid var(--border)', animation: 'slideDown 0.3s cubic-bezier(0.4,0,0.2,1)' }}>
                    <style>{`@keyframes slideDown { from { opacity:0; transform:translateY(-6px) } to { opacity:1; transform:translateY(0) } }`}</style>
                    <div style={{ fontSize: 13, color: '#1d1d1f', lineHeight: 1.5, marginBottom: 14 }}>{model.tagline}</div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
                      {model.benchmarks.map(b => (
                        <div key={b.label} style={{ background: model.accentBg, borderRadius: 8, padding: '5px 9px', display: 'flex', alignItems: 'baseline', gap: 6 }}>
                          <span style={{ fontSize: 10, color: '#3a3a3c' }}>{b.label}</span>
                          <span style={{ fontSize: 12, fontWeight: 500, color: model.accent, fontFamily: 'var(--mono)' }}>{b.value}</span>
                        </div>
                      ))}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 14 }}>
                      <Block label="Why it stands out">{model.strengths}</Block>
                      <Block label="Trade-offs">{model.tradeoffs}</Block>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, paddingTop: 12, borderTop: '1px solid var(--border)' }}>
                      <Inline label="Weights">{model.weights}</Inline>
                      <Inline label="API price">{model.apiPrice}</Inline>
                      <Inline label="License">{model.licenseDetail}</Inline>
                    </div>
                  </td>
                </tr>
              ),
            ]
          })}
        </tbody>
      </table>
    </div>
  )
}

function Block({ label, children }) {
  return (
    <div>
      <div style={{ fontSize: 10, fontWeight: 500, color: '#3a3a3c', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 5 }}>{label}</div>
      <div style={{ fontSize: 12, color: '#1d1d1f', lineHeight: 1.5 }}>{children}</div>
    </div>
  )
}

function Inline({ label, children }) {
  return (
    <div>
      <div style={{ fontSize: 10, fontWeight: 500, color: '#3a3a3c', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 3 }}>{label}</div>
      <div style={{ fontSize: 12, color: '#1d1d1f' }}>{children}</div>
    </div>
  )
}
