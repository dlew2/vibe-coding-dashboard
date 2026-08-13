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
    case 'aistudio':   return (<><rect x="3" y="3" width="18" height="18" rx="3" fill="#1a73e8"/><path d="M8 8h8M8 12h6M8 16h4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/><circle cx="16" cy="15" r="3" fill="white"/><path d="M15 15l1 1 2-2" stroke="#1a73e8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></>)
    default: return null
  }
}


function SL({ children }) {
  return <div style={{ fontSize: 22, fontWeight: 500, color: '#3a3a3c', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>{children}</div>
}

function SkillRow({ label, value, color }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
      <span style={{ fontSize: 24, color: '#3a3a3c', width: 160, flexShrink: 0 }}>{label}</span>
      <div style={{ flex: 1, height: 8, background: 'var(--surface2)', borderRadius: 4, overflow: 'hidden' }}>
        <div style={{ width: `${value}%`, height: '100%', background: color, borderRadius: 4 }} />
      </div>
    </div>
  )
}

function DotRow({ color, text }) {
  return (
    <div style={{ display: 'flex', gap: 12, marginBottom: 10, fontSize: 24, color: '#1d1d1f', lineHeight: 1.4 }}>
      <span style={{ width: 10, height: 10, borderRadius: '50%', background: color, flexShrink: 0, marginTop: 8 }} />{text}
    </div>
  )
}

export default function ToolCard({ tool, isExpanded, onToggle }) {
  const [flipped, setFlipped] = useState(false)

  const handleToggle = () => {
    if (isExpanded) setFlipped(false)
    onToggle()
  }

  return (
    <div style={{
      background: 'var(--surface)',
      border: isExpanded ? '2px solid var(--apple-blue)' : '1px solid var(--border)',
      borderRadius: 'var(--radius)',
      overflow: 'hidden',
      boxShadow: isExpanded ? '0 4px 20px rgba(0,122,255,0.1)' : 'var(--shadow)',
      transition: 'border-color 0.2s, box-shadow 0.2s',
      cursor: 'pointer',
    }}>
      {/* Compact row */}
      <div onClick={handleToggle} style={{ padding: '28px 32px', display: 'flex', alignItems: 'center', gap: 20, borderBottom: isExpanded ? '1px solid var(--border)' : 'none' }}>
        <div style={{ width: 60, height: 60, borderRadius: 14, background: tool.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">{getIconPath(tool.id)}</svg>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 30, fontWeight: 500, color: '#1d1d1f', lineHeight: 1.2 }}>{tool.name}</div>
          <div style={{ fontSize: 24, color: '#3a3a3c', marginTop: 4 }}>{tool.tagline}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
          <svg width="28" height="28" viewBox="0 0 14 14" fill="none" style={{ transition: 'transform 0.25s', transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }}>
            <path d="M2.5 5L7 9.5L11.5 5" stroke="#3a3a3c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Expanded */}
      <div style={{ maxHeight: isExpanded ? '840px' : '0px', opacity: isExpanded ? 1 : 0, overflow: 'hidden', transition: 'max-height 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease' }}>
        <div style={{ perspective: '2400px', height: 840 }}>
          <div style={{ position: 'relative', width: '100%', height: 840, transformStyle: 'preserve-3d', transition: 'transform 0.65s cubic-bezier(0.33,1,0.68,1)', transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>

            {/* Front */}
            <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', padding: '28px 32px', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
              <SL>How it works</SL>
              <p style={{ fontSize: 26, color: '#1d1d1f', lineHeight: 1.65, marginBottom: 24 }}>{tool.howItWorks}</p>
              <div style={{ height: 2, background: 'var(--border)', margin: '0 0 20px' }} />
              <SL>Best for</SL>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 24 }}>
                {tool.tags.map(t => <span key={t} style={{ fontSize: 22, fontWeight: 500, padding: '6px 20px', borderRadius: 40, background: tool.tagColor.bg, color: tool.tagColor.text }}>{t}</span>)}
              </div>
              <div style={{ height: 2, background: 'var(--border)', margin: '0 0 20px' }} />
              <SL>Skill curve</SL>
              <SkillRow label="Design" value={tool.skillDesign} color={tool.skillColor} />
              <SkillRow label="Coding req." value={tool.skillCoding} color={tool.skillColor} />
              <div style={{ height: 2, background: 'var(--border)', margin: '20px 0' }} />
              <button onClick={e => { e.stopPropagation(); setFlipped(true) }} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 24, fontWeight: 500, color: '#003d8f', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'var(--font)' }}>
                Pros, cons &amp; pricing →
              </button>
            </div>

            {/* Back */}
            <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)', padding: '28px 32px', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                <div style={{ fontSize: 28, fontWeight: 500, color: '#1d1d1f' }}>{tool.name}</div>
                <button onClick={e => { e.stopPropagation(); setFlipped(false) }} style={{ fontSize: 24, fontWeight: 500, color: '#003d8f', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'var(--font)' }}>← Back</button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, marginBottom: 20 }}>
                <div>
                  <SL>Pros</SL>
                  {tool.pros.map((p, i) => <DotRow key={i} color="#1e7e34" text={p} />)}
                </div>
                <div>
                  <SL>Cons</SL>
                  {tool.cons.map((c, i) => <DotRow key={i} color="#c0392b" text={c} />)}
                </div>
              </div>
              <div style={{ height: 2, background: 'var(--border)', margin: '0 0 20px' }} />
              <SL>Pricing</SL>
              <div style={{ marginBottom: 20 }}>
                <span style={{ fontSize: 24, fontWeight: 500, padding: '8px 24px', borderRadius: 40, background: '#e8f0fe', color: '#003d8f', border: '1px solid rgba(0,61,143,0.2)' }}>{tool.pricing}</span>
              </div>
              <div style={{ height: 2, background: 'var(--border)', margin: '0 0 20px' }} />
              <SL>When to use</SL>
              <DotRow color="#1e7e34" text={tool.whenToUse} />
              <div style={{ marginTop: 16 }}>
                <SL>When to avoid</SL>
                <DotRow color="#b7600a" text={tool.whenToAvoid} />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
