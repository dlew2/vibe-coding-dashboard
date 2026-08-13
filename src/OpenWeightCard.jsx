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
      padding: '36px 40px 40px',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 20, marginBottom: 4 }}>
        <div style={{ fontSize: 30, fontWeight: 500, color: 'var(--text-primary)' }}>{model.name}</div>
        <div style={{ fontSize: 22, color: model.accent, fontWeight: 500, whiteSpace: 'nowrap' }}>{model.rank}</div>
      </div>
      <div style={{ fontSize: 24, color: '#3a3a3c', marginBottom: 20 }}>{model.maker}</div>
      <div style={{ fontSize: 26, color: '#1d1d1f', lineHeight: 1.5, paddingBottom: 28, borderBottom: '1px solid var(--border)', marginBottom: 28 }}>
        {model.tagline}
      </div>

      <dl style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', columnGap: 24, rowGap: 12, margin: 0, marginBottom: 28 }}>
        {SPEC_ROWS.map(row => (
          <div key={row.label} style={{ display: 'contents' }}>
            <dt style={{ fontSize: 20, fontWeight: 500, color: '#3a3a3c', textTransform: 'uppercase', letterSpacing: '0.05em', paddingTop: 4, whiteSpace: 'nowrap' }}>
              {row.label}
            </dt>
            <dd style={{ fontSize: 24, color: '#1d1d1f', lineHeight: 1.45, margin: 0 }}>{model[row.field]}</dd>
          </div>
        ))}
      </dl>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 28 }}>
        {model.benchmarks.map(b => (
          <div key={b.label} style={{
            background: model.accentBg,
            borderRadius: 16,
            padding: '10px 18px',
            display: 'flex',
            alignItems: 'baseline',
            gap: 12,
          }}>
            <span style={{ fontSize: 20, color: '#3a3a3c' }}>{b.label}</span>
            <span style={{ fontSize: 24, fontWeight: 500, color: model.accent, fontFamily: 'var(--mono)' }}>{b.value}</span>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 20, fontWeight: 500, color: '#3a3a3c', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>Why it stands out</div>
        <div style={{ fontSize: 24, color: '#1d1d1f', lineHeight: 1.5 }}>{model.strengths}</div>
      </div>
      <div>
        <div style={{ fontSize: 20, fontWeight: 500, color: '#3a3a3c', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>Trade-offs</div>
        <div style={{ fontSize: 24, color: '#1d1d1f', lineHeight: 1.5 }}>{model.tradeoffs}</div>
      </div>
    </div>
  )
}
