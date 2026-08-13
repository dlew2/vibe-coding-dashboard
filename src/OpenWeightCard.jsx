import { useEffect, useRef, useState } from 'react'

const SPEC_ROWS = [
  { label: 'Parameters', field: 'paramsDetail' },
  { label: 'Context',    field: 'context' },
  { label: 'License',    field: 'licenseDetail' },
  { label: 'Weights',    field: 'weights' },
  { label: 'API price',  field: 'apiPrice' },
]

export default function OpenWeightCard({ model, isExpanded, onToggle }) {
  // Each model's detail is a different length, so the open height is measured
  // rather than hardcoded. Re-measured on resize because the text reflows.
  const contentRef = useRef(null)
  const [openHeight, setOpenHeight] = useState(0)

  useEffect(() => {
    const measure = () => contentRef.current && setOpenHeight(contentRef.current.scrollHeight)
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  return (
    <div style={{
      background: 'var(--surface)',
      border: isExpanded ? '2px solid var(--apple-blue)' : '1px solid var(--border)',
      borderRadius: 'var(--radius)',
      overflow: 'hidden',
      boxShadow: isExpanded ? '0 4px 20px rgba(0,122,255,0.1)' : 'var(--shadow)',
      transition: 'border-color 0.2s, box-shadow 0.2s',
      cursor: 'pointer',
      alignSelf: 'start',
    }}>
      {/* Compact row */}
      <div onClick={onToggle} style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: isExpanded ? '1px solid var(--border)' : 'none' }}>
        <div style={{ width: 30, height: 30, borderRadius: 7, background: model.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <div style={{ width: 11, height: 11, borderRadius: 4, background: model.accent }} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 19, fontWeight: 500, color: '#1d1d1f', lineHeight: 1.2 }}>{model.name}</div>
          <div style={{ fontSize: 15, color: '#3a3a3c', marginTop: 2 }}>{model.maker} · {model.rank}</div>
        </div>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ transition: 'transform 0.25s', transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }}>
          <path d="M2.5 5L7 9.5L11.5 5" stroke="#3a3a3c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Expanded — 'none' is the fallback if measurement has not landed yet,
          so the detail is always reachable even without the animation. */}
      <div style={{
        maxHeight: isExpanded ? (openHeight ? `${openHeight}px` : 'none') : '0px',
        opacity: isExpanded ? 1 : 0,
        overflow: 'hidden',
        transition: 'max-height 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease',
      }}>
        <div ref={contentRef}>
          <div style={{ padding: '14px 16px 16px' }}>
            <div style={{ fontSize: 16, color: '#1d1d1f', lineHeight: 1.5, paddingBottom: 14, borderBottom: '1px solid var(--border)', marginBottom: 14 }}>
              {model.tagline}
            </div>

            <dl style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', columnGap: 12, rowGap: 6, margin: 0, marginBottom: 14 }}>
              {SPEC_ROWS.map(row => (
                <div key={row.label} style={{ display: 'contents' }}>
                  <dt style={{ fontSize: 13, fontWeight: 500, color: '#3a3a3c', textTransform: 'uppercase', letterSpacing: '0.05em', paddingTop: 2, whiteSpace: 'nowrap' }}>
                    {row.label}
                  </dt>
                  <dd style={{ fontSize: 15, color: '#1d1d1f', lineHeight: 1.45, margin: 0 }}>{model[row.field]}</dd>
                </div>
              ))}
            </dl>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
              {model.benchmarks.map(b => (
                <div key={b.label} style={{
                  background: model.accentBg,
                  borderRadius: 8,
                  padding: '5px 9px',
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 6,
                }}>
                  <span style={{ fontSize: 13, color: '#3a3a3c' }}>{b.label}</span>
                  <span style={{ fontSize: 15, fontWeight: 500, color: model.accent, fontFamily: 'var(--mono)' }}>{b.value}</span>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: '#3a3a3c', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 3 }}>Why it stands out</div>
              <div style={{ fontSize: 15, color: '#1d1d1f', lineHeight: 1.5 }}>{model.strengths}</div>
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, color: '#3a3a3c', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 3 }}>Trade-offs</div>
              <div style={{ fontSize: 15, color: '#1d1d1f', lineHeight: 1.5 }}>{model.tradeoffs}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
