import { useState } from 'react'

function ChevronIcon({ open }) {
  return (
    <svg
      className={`chevron${open ? ' open' : ''}`}
      viewBox="0 0 14 14"
      fill="none"
    >
      <path d="M2.5 5L7 9.5L11.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function WorkflowBadge({ workflow, color }) {
  if (!workflow) return null
  const bg = workflow === 1 ? '#f0f6ff' : '#fff0f3'
  const text = workflow === 1 ? '#004eb3' : '#a8003a'
  return (
    <span className="badge" style={{ background: bg, color: text }}>
      Workflow {workflow}
    </span>
  )
}

export default function ToolCard({ tool }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="card card-expandable" style={{ overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ padding: '16px 18px 12px', borderBottom: '1px solid var(--border)', position: 'relative' }}>
        {tool.workflow && (
          <div style={{ position: 'absolute', top: 14, right: 14 }}>
            <WorkflowBadge workflow={tool.workflow} color={tool.workflowColor} />
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 5 }}>
          <div style={{
            width: 30, height: 30, borderRadius: 7, background: tool.iconBg,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              {getIconPath(tool.id)}
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--text-primary)', lineHeight: 1.2 }}>{tool.name}</div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>{tool.tagline}</div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '14px 18px' }}>
        <SectionLabel>How it works</SectionLabel>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: 12 }}>
          {tool.howItWorks}
        </p>

        <div className="divider" />

        <SectionLabel>Best for</SectionLabel>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 12 }}>
          {tool.tags.map(t => (
            <span key={t} className="tag" style={{ background: tool.tagColor.bg, color: tool.tagColor.text }}>{t}</span>
          ))}
        </div>

        <div className="divider" />

        <SectionLabel>Skill curve</SectionLabel>
        <SkillRow label="Design" value={tool.skillDesign} color={tool.skillColor} />
        <SkillRow label="Coding req." value={tool.skillCoding} color={tool.skillColor} />

        {tool.yourProject && (
          <>
            <div className="divider" />
            <SectionLabel>Your project</SectionLabel>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.65 }}>{tool.yourProject}</p>
          </>
        )}

        <div className="divider" />

        <button className="expand-btn" onClick={() => setOpen(o => !o)}>
          <ChevronIcon open={open} />
          {open ? 'Less detail' : 'More detail — pros, cons & pricing'}
        </button>
      </div>

      {/* Expandable panel */}
      <div className={`expand-panel${open ? ' open' : ''}`}>
        <div style={{ padding: '0 18px 18px', borderTop: '1px solid var(--border)', paddingTop: 14 }}>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 14 }}>
            <div>
              <SectionLabel>Pros</SectionLabel>
              {tool.pros.map((p, i) => (
                <div key={i} className="pro-con-row"><span className="dot-green" />{p}</div>
              ))}
            </div>
            <div>
              <SectionLabel>Cons</SectionLabel>
              {tool.cons.map((c, i) => (
                <div key={i} className="pro-con-row"><span className="dot-red" />{c}</div>
              ))}
            </div>
          </div>

          <div className="divider" />

          <SectionLabel>Pricing</SectionLabel>
          <span className="pricing-pill" style={{ marginBottom: 12, display: 'inline-flex' }}>{tool.pricing}</span>

          <div className="divider" />

          <SectionLabel>When to use</SectionLabel>
          <div className="pro-con-row" style={{ marginBottom: 10 }}><span className="dot-green" />{tool.whenToUse}</div>

          <SectionLabel>When to avoid</SectionLabel>
          <div className="pro-con-row"><span className="dot-amber" />{tool.whenToAvoid}</div>
        </div>
      </div>
    </div>
  )
}

function SectionLabel({ children }) {
  return (
    <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
      {children}
    </div>
  )
}

function SkillRow({ label, value, color }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
      <span style={{ fontSize: 12, color: 'var(--text-secondary)', width: 80, flexShrink: 0 }}>{label}</span>
      <div className="skill-bar-track">
        <div className="skill-bar-fill" style={{ width: `${value}%`, background: color }} />
      </div>
    </div>
  )
}

function getIconPath(id) {
  switch (id) {
    case 'figma':
      return <>
        <rect x="2" y="2" width="9" height="9" rx="2" fill="#ff2d55"/>
        <rect x="13" y="2" width="9" height="9" rx="2" fill="#007aff"/>
        <rect x="2" y="13" width="9" height="9" rx="2" fill="#34c759"/>
        <circle cx="17.5" cy="17.5" r="4.5" fill="#ffcc00"/>
      </>
    case 'replit':
      return <>
        <rect x="3" y="3" width="8" height="8" rx="2" fill="#1d9e75"/>
        <rect x="3" y="13" width="8" height="8" rx="2" fill="#1d9e75"/>
        <rect x="13" y="3" width="8" height="18" rx="2" fill="#5dcaa5"/>
      </>
    case 'claude':
      return <>
        <circle cx="12" cy="12" r="9" fill="#5856d6"/>
        <path d="M8 12.5l2.5 2.5 5.5-6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </>
    case 'cursor':
      return <>
        <path d="M5 19L12 5l7 14H5z" fill="#378add"/>
        <path d="M9 14h6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      </>
    case 'vercel':
      return <path d="M12 3L22 21H2L12 3z" fill="#1d1d1f"/>
    case 'github':
      return <>
        <circle cx="12" cy="12" r="9" fill="#34c759"/>
        <path d="M9 17c0-2 1-3 1-3s-2-.5-2-3c0-1.5.5-2.5 1.5-3C9 7 9.5 5.5 10 5.5c.5 1.5 1.5 2 2 2 .5 0 1.5-.5 2-2 .5 0 1 1.5.5 2.5 1 .5 1.5 1.5 1.5 3 0 2.5-2 3-2 3s1 1 1 3" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      </>
    case 'supabase':
      return <path d="M13 3L4 14h8l-1 7 9-11h-8l1-7z" fill="#1d9e75"/>
    default:
      return null
  }
}
