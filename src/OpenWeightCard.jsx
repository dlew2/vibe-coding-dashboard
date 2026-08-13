const SPEC_ROWS = [
  { label: 'Parameters', field: 'paramsDetail' },
  { label: 'Context',    field: 'context' },
  { label: 'License',    field: 'licenseDetail' },
  { label: 'Weights',    field: 'weights' },
  { label: 'API price',  field: 'apiPrice' },
]

export default function OpenWeightCard({ model }) {
  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius)',
      boxShadow: 'var(--shadow)',
      padding: '18px 20px 20px',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 10, marginBottom: 2 }}>
        <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--text-primary)' }}>{model.name}</div>
        <div style={{ fontSize: 11, color: model.accent, fontWeight: 500, whiteSpace: 'nowrap' }}>{model.rank}</div>
      </div>
      <div style={{ fontSize: 12, color: '#3a3a3c', marginBottom: 10 }}>{model.maker}</div>
      <div style={{ fontSize: 13, color: '#1d1d1f', lineHeight: 1.5, paddingBottom: 14, borderBottom: '1px solid var(--border)', marginBottom: 14 }}>
        {model.tagline}
      </div>

      <dl style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', columnGap: 12, rowGap: 6, margin: 0, marginBottom: 14 }}>
        {SPEC_ROWS.map(row => (
          <div key={row.label} style={{ display: 'contents' }}>
            <dt style={{ fontSize: 10, fontWeight: 500, color: '#3a3a3c', textTransform: 'uppercase', letterSpacing: '0.05em', paddingTop: 2, whiteSpace: 'nowrap' }}>
              {row.label}
            </dt>
            <dd style={{ fontSize: 12, color: '#1d1d1f', lineHeight: 1.45, margin: 0 }}>{model[row.field]}</dd>
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
            <span style={{ fontSize: 10, color: '#3a3a3c' }}>{b.label}</span>
            <span style={{ fontSize: 12, fontWeight: 500, color: model.accent, fontFamily: 'var(--mono)' }}>{b.value}</span>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: 10 }}>
        <div style={{ fontSize: 10, fontWeight: 500, color: '#3a3a3c', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 3 }}>Why it stands out</div>
        <div style={{ fontSize: 12, color: '#1d1d1f', lineHeight: 1.5 }}>{model.strengths}</div>
      </div>
      <div>
        <div style={{ fontSize: 10, fontWeight: 500, color: '#3a3a3c', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 3 }}>Trade-offs</div>
        <div style={{ fontSize: 12, color: '#1d1d1f', lineHeight: 1.5 }}>{model.tradeoffs}</div>
      </div>
    </div>
  )
}
