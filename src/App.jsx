import { useState } from 'react'
import { tools, workflows } from './data'
import WorkflowBanner from './WorkflowBanner'
import ToolCard from './ToolCard'
import TableView from './TableView'

const LANES = [
  { id: 'ai',        label: 'AI & coding',              stripe: '#afa9ec', ids: ['claude', 'chatgpt', 'cursor', 'geminicli', 'codexcli'] },
  { id: 'fullstack', label: 'Full-stack builders',       stripe: '#f0997b', ids: ['lovable', 'bolt', 'replit', 'v0'] },
  { id: 'design',    label: 'Design & prototyping',      stripe: '#ed93b1', ids: ['figma', 'framer', 'stitch'] },
  { id: 'deploy',    label: 'Deploy & version control',  stripe: '#97c459', ids: ['github', 'vercel'] },
  { id: 'productivity', label: 'Research & productivity', stripe: '#fac775', ids: ['notebooklm', 'cowork'] },
  { id: 'backend',   label: 'Backend & data',            stripe: '#5dcaa5', ids: ['supabase', 'firebase', 'appwrite'] },
]

export default function App() {
  const [view, setView] = useState('table')
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
            <span style={{ fontSize: 13, color: '#3a3a3c' }}>Tool comparison & workflows</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 12, color: '#3a3a3c', fontFamily: 'var(--mono)' }}>{tools.length} tools</span>
            <div style={{ display: 'flex', background: 'var(--surface2)', borderRadius: 8, padding: 3, gap: 2 }}>
              <ViewBtn label="Table" icon="table" active={view === 'table'} onClick={() => setView('table')} />
              <ViewBtn label="Cards" icon="cards" active={view === 'cards'} onClick={() => setView('cards')} />
            </div>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '28px 24px 60px' }}>
        <SectionHeading>My workflows</SectionHeading>
        <div style={{ marginTop: 12, marginBottom: 32, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {workflows.map(wf => <WorkflowBanner key={wf.id} workflow={wf} />)}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <SectionHeading>Tools</SectionHeading>
          <span style={{ fontSize: 12, color: '#3a3a3c' }}>
            {view === 'table' ? 'Click any row to expand detail' : 'Click any card to expand'}
          </span>
        </div>

        {view === 'table' ? (
          <TableView lanes={LANES} tools={tools} />
        ) : (
          <div>
            {LANES.map(lane => {
              const laneTools = lane.ids.map(id => tools.find(t => t.id === id)).filter(Boolean)
              return (
                <div key={lane.id} style={{ marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    <span style={{ fontSize: 11, fontWeight: 500, color: '#3a3a3c', textTransform: 'uppercase', letterSpacing: '0.07em', whiteSpace: 'nowrap' }}>{lane.label}</span>
                    <div style={{ height: 2, borderRadius: 2, flex: 1, background: lane.stripe }} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 10 }}>
                    {laneTools.map(tool => (
                      <ToolCard key={tool.id} tool={tool} isExpanded={expandedIds.has(tool.id)} onToggle={() => toggle(tool.id)} />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        <div style={{ marginTop: 40, textAlign: 'center', fontSize: 12, color: '#3a3a3c' }}>
          Last updated March 2026 · Built with React + Vite + Vercel
        </div>
      </main>
    </div>
  )
}

function ViewBtn({ label, icon, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 5,
        fontSize: 12, fontWeight: 500,
        padding: '5px 10px', borderRadius: 6,
        border: 'none', cursor: 'pointer',
        fontFamily: 'var(--font)',
        background: active ? 'var(--surface)' : 'transparent',
        color: active ? '#1d1d1f' : '#3a3a3c',
        boxShadow: active ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
        transition: 'all 0.15s',
      }}
    >
      {icon === 'table' ? (
        <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
          <rect x="1" y="1" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.2"/>
          <path d="M1 5h12M5 5v8" stroke="currentColor" strokeWidth="1.2"/>
        </svg>
      ) : (
        <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
          <rect x="1" y="1" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
          <rect x="8" y="1" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
          <rect x="1" y="8" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
          <rect x="8" y="8" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
        </svg>
      )}
      {label}
    </button>
  )
}

function SectionHeading({ children }) {
  return <div style={{ fontSize: 13, fontWeight: 500, color: '#3a3a3c', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{children}</div>
}
