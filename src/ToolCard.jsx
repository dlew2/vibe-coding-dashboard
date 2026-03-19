import { useState } from 'react'

function WorkflowBadge({ workflow }) {
  if (!workflow) return null
  const bg = workflow === 1 ? '#e8f0fe' : '#ffeef2'
  const text = workflow === 1 ? '#004eb3' : '#a8003a'
  return <span className="badge" style={{ background: bg, color: text }}>Workflow {workflow}</span>
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
    case 'figma':    return (<><rect x="2" y="2" width="9" height="9" rx="2" fill="#ff2d55"/><rect x="13" y="2" width="9" height="9" rx="2" fill="#007aff"/><rect x="2" y="13" width="9" height="9" rx="2" fill="#34c759"/><circle cx="17.5" cy="17.5" r="4.5" fill="#ffcc00"/></>)
    case 'replit':   return (<><rect x="3" y="3" width="8" height="8" rx="2" fill="#1d9e75"/><rect x="3" y="13" width="8" height="8" rx="2" fill="#1d9e75"/><rect x="13" y="3" width="8" height="18" rx="2" fill="#5dcaa5"/></>)
    case 'claude':   return (<><circle cx="12" cy="12" r="9" fill="#5856d6"/><path d="M8 12.5l2.5 2.5 5.5-6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></>)
    case 'cursor':   return (<><path d="M5 19L12 5l7 14H5z" fill="#378add"/><path d="M9 14h6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></>)
    case 'vercel':   return <path d="M12 3L22 21H2L12 3z" fill="#1d1d1f"/>
    case 'github':   return (<><circle cx="12" cy="12" r="9" fill="#34c759"/><path d="M9 17c0-2 1-3 1-3s-2-.5-2-3c0-1.5.5-2.5 1.5-3C9 7 9.5 5.5 10 5.5c.5 1.5 1.5 2 2 2 .5 0 1.5-.5 2-2 .5 0 1 1.5.5 2.5 1 .5 1.5 1.5 1.5 3 0 2.5-2 3-2 3s1 1 1 3" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></>)
    case 'supabase': return <path d="M13 3L4 14h8l-1 7 9-11h-8l1-7z" fill="#1d9e75"/>
    case 'geminicli': return (<><circle cx="12" cy="12" r="9" fill="#1a73e8"/><path d="M8 12h8M12 8v8" stroke="white" strokeWidth="1.8" strokeLinecap="round"/></>)
    case 'stitch': return (<><rect x="3" y="3" width="18" height="18" rx="3" fill="#1a73e8"/><path d="M7 12h10M12 7v10" stroke="white" strokeWidth="1.5" strokeLinecap="round"/><circle cx="12" cy="12" r="2.5" fill="white"/></>)
    default:         return null
  }
}

export default function ToolCard({ tool }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div className="flip-container">
      <div className={`flip-inner${flipped ? ' flipped' : ''}`}>

        {/* FRONT */}
        <div className="flip-front">
          <div className="card-header">
            <div style={{ position: 'absolute', top: 13, right: 14 }}>
              <WorkflowBadge workflow={tool.workflow} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 30, height: 30, borderRadius: 7, background: tool.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">{getIconPath(tool.id)}</svg>
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--text-primary)', lineHeight: 1.2 }}>{tool.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>{tool.tagline}</div>
              </div>
            </div>
          </div>

          <div className="card-body">
            <div className="section-label">How it works</div>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 10 }}>{tool.howItWorks}</p>
            <div className="divider" />
            <div className="section-label">Best for</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 10 }}>
              {tool.tags.map(t => <span key={t} className="tag" style={{ background: tool.tagColor.bg, color: tool.tagColor.text }}>{t}</span>)}
            </div>
            <div className="divider" />
            <div className="section-label">Skill curve</div>
            <SkillRow label="Design" value={tool.skillDesign} color={tool.skillColor} />
            <SkillRow label="Coding req." value={tool.skillCoding} color={tool.skillColor} />
            <div className="divider" />
            <button className="flip-btn" onClick={() => setFlipped(true)}>
              Pros, cons &amp; pricing →
            </button>
          </div>
        </div>

        {/* BACK */}
        <div className="flip-back">
          <div className="card-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)' }}>{tool.name}</div>
            <button className="flip-btn" onClick={() => setFlipped(false)}>← Back</button>
          </div>
          <div className="card-back-body">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 10 }}>
              <div>
                <div className="section-label">Pros</div>
                {tool.pros.map((p, i) => <div key={i} className="pro-con-row"><span className="dot-green" />{p}</div>)}
              </div>
              <div>
                <div className="section-label">Cons</div>
                {tool.cons.map((c, i) => <div key={i} className="pro-con-row"><span className="dot-red" />{c}</div>)}
              </div>
            </div>
            <div className="divider" />
            <div className="section-label">Pricing</div>
            <div style={{ marginBottom: 10 }}><span className="pricing-pill">{tool.pricing}</span></div>
            <div className="divider" />
            <div className="section-label">When to use</div>
            <div className="pro-con-row" style={{ marginBottom: 8 }}><span className="dot-green" />{tool.whenToUse}</div>
            <div className="section-label">When to avoid</div>
            <div className="pro-con-row"><span className="dot-amber" />{tool.whenToAvoid}</div>
          </div>
        </div>

      </div>
    </div>
  )
}
