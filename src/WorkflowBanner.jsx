import { ToolIcon } from './Icons'

export default function WorkflowBanner({ workflow }) {
  return (
    <div className="workflow-banner" style={{ borderLeft: `3px solid ${workflow.color}` }}>
      <div style={{ fontSize: 11, fontWeight: 500, color: workflow.color, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
        {workflow.label}
      </div>
      <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 14 }}>
        {workflow.subtitle}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 0 }}>
        {workflow.steps.map((step, i) => (
          <div key={step.name} style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 80 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10, background: step.iconBg,
                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 6
              }}>
                <ToolIcon type={step.icon} size={20} />
              </div>
              <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-primary)', textAlign: 'center' }}>{step.name}</div>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2, textAlign: 'center' }}>{step.role}</div>
            </div>
            {i < workflow.steps.length - 1 && (
              <div style={{ fontSize: 16, color: 'var(--text-tertiary)', padding: '0 4px', marginBottom: 18 }}>→</div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
