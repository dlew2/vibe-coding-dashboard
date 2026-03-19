import { ToolIcon } from './Icons'

export default function WorkflowBanner({ workflow }) {
  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius)',
      boxShadow: 'var(--shadow)',
      padding: '18px 20px 20px',
    }}>
      <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--text-primary)', marginBottom: 3 }}>
        {workflow.label}
      </div>
      <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 6 }}>
        {workflow.subtitle}
      </div>
      <div style={{ paddingBottom: 14, borderBottom: '1px solid var(--border)', marginBottom: 16 }}>
        <div style={{ fontSize: 10, fontWeight: 500, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 3 }}>Your project</div>
        <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{workflow.project}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {workflow.steps.map((step, i) => (
          <div key={step.name} style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: step.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 7 }}>
                <ToolIcon type={step.icon} size={18} />
              </div>
              <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-primary)', textAlign: 'center' }}>{step.name}</div>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2, textAlign: 'center' }}>{step.role}</div>
            </div>
            {i < workflow.steps.length - 1 && (
              <div style={{ fontSize: 14, color: 'var(--text-tertiary)', padding: '0 8px', marginBottom: 22 }}>→</div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
