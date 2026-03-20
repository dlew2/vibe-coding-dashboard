import { useState } from 'react'

function getIconPath(id) {
  switch (id) {
    case 'figma':      return (<><rect x="2" y="2" width="9" height="9" rx="2" fill="#ff2d55"/><rect x="13" y="2" width="9" height="9" rx="2" fill="#007aff"/><rect x="2" y="13" width="9" height="9" rx="2" fill="#34c759"/><circle cx="17.5" cy="17.5" r="4.5" fill="#ffcc00"/></>)
    case 'replit':     return (<><rect x="3" y="3" width="8" height="8" rx="2" fill="#1d9e75"/><rect x="3" y="13" width="8" height="8" rx="2" fill="#1d9e75"/><rect x="13" y="3" width="8" height="18" rx="2" fill="#5dcaa5"/></>)
    case 'claude':     return (<><circle cx="12" cy="12" r="9" fill="#5856d6"/><path d="M8 12.5l2.5 2.5 5.5-6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></>)
    case 'cursor':     return (<><path d="M5 19L12 5l7 14H5z" fill="#378add"/><path d="M9 14h6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></>)
    case 'vercel':     return <path d="M12 3L22 21H2L12 3z" fill="#1d1d1f"/>
    case 'github':     return (<><circle cx="12" cy="12" r="9" fill="#34c759"/><path d="M9 17c0-2 1-3 1-3s-2-.5-2-3c0-1.5.5-2.5 1.5-3C9 7 9.5 5.5 10 5.5c.5 1.5 1.5 2 2 2 .5 0 1.5-.5 2-2 .5 0 1 1.5.5 2.5 1 .5 1.5 1.5 1.5 3 0 2.5-2 3-2 3s1 1 1 3" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></>)
    case 'supabase':   return <path d="M13 3L4 14h8l-1 7 9-11h-8l1-7z" fill="#1d9e75"/>
    case 'geminicli':  return (<><circle cx="12" cy="12" r="9" fill="#1a73e8"/><path d="M8 12h8M12 8v8" stroke="white" strokeWidth="1.8" strokeLinecap="round"/></>)
    case 'stitch':     return (<><rect x="3" y="3" width="18" height="18" rx="3" fill="#1a73e8"/><path d="M7 12h10M12 7v10" stroke="white" strokeWidth="1.5" strokeLinecap="round"/><circle cx="12" cy="12" r="2.5" fill="white"/></>)
    case 'notebooklm': return (<><rect x="3" y="3" width="18" height="18" rx="3" fill="#1a73e8"/><path d="M7 8h10M7 12h10M7 16h6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></>)
    case 'cowork':     return (<><circle cx="12" cy="12" r="9" fill="#5856d6"/><path d="M8 12.5l2.5 2.5 5.5-6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></>)
    case 'firebase':   return (<><path d="M12 3L5 19h14L12 3z" fill="#f57c00"/><path d="M5 19l5-8 4 5" fill="#ffb300"/></>)
    case 'appwrite':   return (<><circle cx="12" cy="12" r="9" fill="#c0392b"/><path d="M8 12a4 4 0 0 1 8 0" stroke="white" strokeWidth="1.8" strokeLinecap="round" fill="none"/><circle cx="12" cy="12" r="1.5" fill="white"/></>)
    case 'chatgpt':    return (<><circle cx="12" cy="12" r="9" fill="#1a1a1a"/><path d="M8 10C8 8.9 8.9 8 10 8h4c1.1 0 2 .9 2 2v1c0 .8-.4 1.4-1 1.8l.8 2.2H14l-.7-2H10v2H8V10z" fill="white"/></>)
    case 'codexcli':   return (<><rect x="3" y="5" width="18" height="14" rx="3" fill="#1a1a1a"/><path d="M7 9l3 3-3 3M13 15h4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></>)
    case 'v0':         return (<><rect x="3" y="3" width="18" height="18" rx="3" fill="#1a1a1a"/><path d="M8 8l4 8 4-8" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></>)
    case 'lovable':    return (<><circle cx="12" cy="12" r="9" fill="#e05c4b"/><path d="M12 17s-5-3.5-5-7a3 3 0 0 1 5-2.2A3 3 0 0 1 17 10c0 3.5-5 7-5 7z" fill="white"/></>)
    case 'framer':     return (<><rect x="3" y="3" width="18" height="18" rx="3" fill="#7c3aed"/><path d="M7 7h10v5H12l5 5H7v-5h5L7 7z" fill="white"/></>)
    case 'bolt':       return (<><circle cx="12" cy="12" r="9" fill="#d97706"/><path d="M13 4L7 13h5l-1 7 6-9h-5l1-7z" fill="white"/></>)
    default: return null
  }
}

const COMPANIES = {
  claude: 'Anthropic', cursor: 'Anysphere', geminicli: 'Google',
  chatgpt: 'OpenAI', codexcli: 'OpenAI', v0: 'Vercel',
  figma: 'Figma', replit: 'Replit', stitch: 'Google', lovable: 'Lovable',
  framer: 'Framer', bolt: 'StackBlitz',
  github: 'Microsoft', vercel: 'Vercel',
  notebooklm: 'Google', cowork: 'Anthropic',
  supabase: 'Supabase', firebase: 'Google', appwrite: 'Appwrite',
}

const TYPES = {
  claude: 'Chat + CLI agent', cursor: 'AI code editor', geminicli: 'CLI agent',
  chatgpt: 'AI chat assistant', codexcli: 'CLI agent', v0: 'UI generator',
  figma: 'Design + AI gen', replit: 'Browser IDE', stitch: 'AI UI design',
  lovable: 'Full-stack builder', framer: 'Visual site builder', bolt: 'Full-stack builder',
  github: 'Version control', vercel: 'Deploy + host',
  notebooklm: 'Research + Q&A', cowork: 'Desktop automation',
  supabase: 'BaaS + Postgres', firebase: 'App platform', appwrite: 'Open-source BaaS',
}

const PRICING_LABELS = {
  claude:     { label: '$20/mo+',      free: false },
  cursor:     { label: '$20/mo',       free: false },
  geminicli:  { label: 'Free',         free: true  },
  chatgpt:    { label: '$20/mo+',      free: false },
  codexcli:   { label: 'w/ Plus $20',  free: false },
  v0:         { label: 'Free tier',    free: true  },
  figma:      { label: '$15/mo+',      free: false },
  replit:     { label: '$25/mo+',      free: false },
  stitch:     { label: 'Free',         free: true  },
  lovable:    { label: '$25/mo+',      free: false },
  framer:     { label: 'Free tier',    free: true  },
  bolt:       { label: 'Free tier',    free: true  },
  github:     { label: 'Free',         free: true  },
  vercel:     { label: 'Free tier',    free: true  },
  notebooklm: { label: 'Free',         free: true  },
  cowork:     { label: 'Via Claude.ai',free: false },
  supabase:   { label: 'Free tier',    free: true  },
  firebase:   { label: 'Free tier',    free: true  },
  appwrite:   { label: 'Free tier',    free: true  },
}

function diffIndicator(skillCoding) {
  if (skillCoding < 15) return null
  if (skillCoding < 35) return { label: 'Low',  color: '#34c759' }
  if (skillCoding < 55) return { label: 'Med',  color: '#ffcc00' }
  return                       { label: 'High', color: '#ff3b30' }
}

function SectionLabel({ children, style }) {
  return <div style={{ fontSize: 10, fontWeight: 500, color: '#3a3a3c', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 5, ...style }}>{children}</div>
}

function DotRow({ color, text }) {
  return (
    <div style={{ display: 'flex', gap: 6, marginBottom: 5, fontSize: 12, color: '#1d1d1f', lineHeight: 1.4 }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: color, flexShrink: 0, marginTop: 4 }} />{text}
    </div>
  )
}

function DetailPanel({ tool, onClose }) {
  return (
    <div style={{
      background: 'var(--surface)',
      borderTop: '2px solid #007aff',
      borderBottom: '2px solid #007aff',
      padding: '16px 20px',
      animation: 'slideDown 0.3s cubic-bezier(0.4,0,0.2,1)',
    }}>
      <style>{`@keyframes slideDown { from { opacity:0; transform:translateY(-6px) } to { opacity:1; transform:translateY(0) } }`}</style>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: 20 }}>
        {/* Col 1 — How it works */}
        <div>
          <div style={{ fontSize: 10, fontWeight: 600, color: '#3a3a3c', textTransform: 'uppercase', letterSpacing: '0.07em', paddingBottom: 8, borderBottom: '1px solid var(--border)', marginBottom: 10 }}>How it works</div>
          <p style={{ fontSize: 13, color: '#1d1d1f', lineHeight: 1.65, marginBottom: 12 }}>{tool.howItWorks}</p>
          <div style={{ fontSize: 10, fontWeight: 600, color: '#3a3a3c', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 5 }}>Best for</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {tool.tags.map(t => <span key={t} style={{ fontSize: 11, fontWeight: 500, padding: '3px 9px', borderRadius: 20, background: tool.tagColor.bg, color: tool.tagColor.text }}>{t}</span>)}
          </div>
        </div>

        {/* Col 2 — Pros & cons */}
        <div>
          <div style={{ fontSize: 10, fontWeight: 600, color: '#3a3a3c', textTransform: 'uppercase', letterSpacing: '0.07em', paddingBottom: 8, borderBottom: '1px solid var(--border)', marginBottom: 10 }}>Pros &amp; cons</div>
          <div style={{ fontSize: 10, fontWeight: 600, color: '#3a3a3c', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 5 }}>Pros</div>
          {tool.pros.map((p, i) => <DotRow key={i} color="#1e7e34" text={p} />)}
          <div style={{ marginTop: 8 }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: '#3a3a3c', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 5 }}>Cons</div>
            {tool.cons.map((c, i) => <DotRow key={i} color="#c0392b" text={c} />)}
          </div>
        </div>

        {/* Col 3 — Pricing + close button inline with header */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 8, borderBottom: '1px solid var(--border)', marginBottom: 10 }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: '#3a3a3c', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Pricing</div>
            <button onClick={onClose} style={{ fontSize: 11, fontWeight: 500, color: '#1d1d1f', cursor: 'pointer', background: 'none', border: '1px solid #6e6e73', borderRadius: 6, padding: '3px 9px', fontFamily: 'var(--font)', lineHeight: 1 }}>✕ Close</button>
          </div>
          <div style={{ fontSize: 12, fontWeight: 500, padding: '4px 12px', borderRadius: 20, background: '#e8f0fe', color: '#003d8f', border: '1px solid rgba(0,61,143,0.2)', display: 'inline-block', marginBottom: 12 }}>{tool.pricing}</div>
          <div style={{ fontSize: 10, fontWeight: 600, color: '#3a3a3c', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 5 }}>When to use</div>
          <DotRow color="#1e7e34" text={tool.whenToUse} />
          <div style={{ marginTop: 8 }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: '#3a3a3c', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 5 }}>When to avoid</div>
            <DotRow color="#b7600a" text={tool.whenToAvoid} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function TableView({ lanes, tools }) {
  const [activeId, setActiveId] = useState(null)
  const toggle = (id) => setActiveId(prev => prev === id ? null : id)

  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden', background: 'var(--surface)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
        <colgroup>
          <col style={{ width: '26%' }} />
          <col style={{ width: '13%' }} />
          <col style={{ width: '11%' }} />
          <col style={{ width: '12%' }} />
          <col style={{ width: '12%' }} />
          <col style={{ width: '12%' }} />
          <col style={{ width: '5%' }} />
        </colgroup>
        <thead>
          <tr style={{ background: 'var(--surface2)' }}>
            {['Tool', 'Type', 'Pricing', 'Coding req.', 'Workflow', 'Company', ''].map((h, i) => (
              <th key={i} style={{ padding: '10px 14px', fontSize: 10, fontWeight: 600, color: '#3a3a3c', textTransform: 'uppercase', letterSpacing: '0.07em', textAlign: 'left', borderBottom: '1px solid var(--border)' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {lanes.map(lane => {
            const laneTools = lane.ids.map(id => tools.find(t => t.id === id)).filter(Boolean)
            return laneTools.map((tool, idx) => {
              const isFirst = idx === 0
              const isActive = activeId === tool.id
              const pl = PRICING_LABELS[tool.id] || { label: tool.pricing?.split('·')[0].trim() || '—', free: false }
              const diff = diffIndicator(tool.skillCoding)

              return [
                isFirst && (
                  <tr key={`cat-${lane.id}`}>
                    <td colSpan={7} style={{ padding: '7px 14px', background: 'var(--surface2)', borderBottom: '1px solid var(--border)', borderTop: '1px solid var(--border)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 10, fontWeight: 500, color: '#3a3a3c', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{lane.label}</span>
                        <div style={{ flex: 1, height: 1, background: lane.stripe, opacity: 0.7 }} />
                      </div>
                    </td>
                  </tr>
                ),
                <tr
                  key={tool.id}
                  onClick={() => toggle(tool.id)}
                  style={{ borderBottom: '1px solid var(--border)', cursor: 'pointer', background: isActive ? '#f0f6ff' : 'var(--surface)', transition: 'background 0.15s' }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'var(--surface2)' }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'var(--surface)' }}
                >
                  <td style={{ padding: '11px 14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 24, height: 24, borderRadius: 6, background: tool.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none">{getIconPath(tool.id)}</svg>
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{tool.name}</div>
                        <div style={{ fontSize: 11, color: '#3a3a3c', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: 1 }}>{tool.tagline}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '11px 14px', fontSize: 12, color: '#1d1d1f' }}>{TYPES[tool.id] || '—'}</td>
                  <td style={{ padding: '11px 14px' }}>
                    <span style={{ fontSize: 11, fontWeight: 500, padding: '2px 8px', borderRadius: 20, background: pl.free ? '#e8faf4' : '#f1efe8', color: pl.free ? '#0a6b4a' : '#444441', whiteSpace: 'nowrap' }}>{pl.label}</span>
                  </td>
                  <td style={{ padding: '11px 14px' }}>
                    {diff ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: diff.color, flexShrink: 0 }} />
                        <span style={{ fontSize: 12, color: '#1d1d1f' }}>{diff.label}</span>
                      </div>
                    ) : <span style={{ fontSize: 12, color: '#3a3a3c' }}>—</span>}
                  </td>
                  <td style={{ padding: '11px 14px' }}>
                    {tool.workflow
                      ? <span style={{ fontSize: 10, fontWeight: 500, padding: '2px 8px', borderRadius: 20, background: tool.workflow === 1 ? '#e8f0fe' : '#ffeef2', color: tool.workflow === 1 ? '#004eb3' : '#a8003a' }}>Workflow {tool.workflow}</span>
                      : <span style={{ color: '#3a3a3c', fontSize: 13 }}>—</span>}
                  </td>
                  <td style={{ padding: '11px 14px', fontSize: 12, color: '#1d1d1f' }}>{COMPANIES[tool.id] || '—'}</td>
                  <td style={{ padding: '11px 14px', textAlign: 'center' }}>
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" style={{ transition: 'transform 0.2s', transform: isActive ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                      <path d="M2.5 5L7 9.5L11.5 5" stroke="var(--text-tertiary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </td>
                </tr>,
                isActive && (
                  <tr key={`panel-${tool.id}`}>
                    <td colSpan={7} style={{ padding: 0 }}>
                      <DetailPanel tool={tool} onClose={() => setActiveId(null)} />
                    </td>
                  </tr>
                )
              ]
            })
          })}
        </tbody>
      </table>
    </div>
  )
}
