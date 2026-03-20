import { useState } from 'react'
import { tools, workflows } from './data'
import WorkflowBanner from './WorkflowBanner'
import ToolCard from './ToolCard'

const LANES = [
  { id: 'ai',           label: 'AI & coding',              stripe: '#afa9ec', ids: ['claude', 'cursor', 'geminicli'] },
  { id: 'design',       label: 'Design & prototyping',      stripe: '#ed93b1', ids: ['figma', 'replit', 'stitch'] },
  { id: 'deploy',       label: 'Deploy & version control',  stripe: '#97c459', ids: ['github', 'vercel'] },
  { id: 'productivity', label: 'Research & productivity',   stripe: '#fac775', ids: ['notebooklm', 'cowork'] },
  { id: 'backend',      label: 'Backend & data',            stripe: '#5dcaa5', ids: ['supabase', 'firebase', 'appwrite'] },
]

export default function App() {
  const [expandedIds, setExpandedIds] = useState(new Set())

  const toggle = (id) => setExpandedIds(prev => {
    const next = new Set(prev)
    next.has(id) ? next.delete(id) : next.add(id)
    return next
  })

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <header style={{ background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, zIndex: 10, padding: '0 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
            <span style={{ fontSize: 17, fontWeight: 500, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>Vibe Coding Dashboard</span>
            <span style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>Tool comparison & workflows</span>
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-tertiary)', fontFamily: 'var(--mono)' }}>{tools.length} tools · click any to expand</div>
        </div>
      </header>

      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '28px 24px 60px' }}>
        <SectionHeading>My workflows</SectionHeading>
        <div style={{ marginTop: 12, marginBottom: 32, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {workflows.map(wf => <WorkflowBanner key={wf.id} workflow={wf} />)}
        </div>

        <SectionHeading>Tools</SectionHeading>
        <div style={{ marginTop: 16 }}>
          {LANES.map(lane => {
            const laneTools = lane.ids.map(id => tools.find(t => t.id === id)).filter(Boolean)
            return (
              <div key={lane.id} style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <span style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.07em', whiteSpace: 'nowrap' }}>{lane.label}</span>
                  <div style={{ height: 2, borderRadius: 2, flex: 1, background: lane.stripe }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 10 }}>
                  {laneTools.map(tool => (
                    <ToolCard
                      key={tool.id}
                      tool={tool}
                      isExpanded={expandedIds.has(tool.id)}
                      onToggle={() => toggle(tool.id)}
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        <div style={{ marginTop: 40, textAlign: 'center', fontSize: 12, color: 'var(--text-tertiary)' }}>
          Last updated March 2026 · Built with React + Vite + Vercel
        </div>
      </main>
    </div>
  )
}

function SectionHeading({ children }) {
  return <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{children}</div>
}

