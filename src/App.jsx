import { useState } from 'react'
import { tools, openWeightModels, openWeightNote } from './data'
import OpenWeightCard from './OpenWeightCard'
import OpenWeightTable from './OpenWeightTable'
import ToolCard from './ToolCard'
import TableView from './TableView'

const LANES = [
  { id: 'ai',        label: 'AI & coding',              stripe: '#afa9ec', ids: ['claude', 'chatgpt', 'cursor', 'windsurf', 'copilot', 'geminicli', 'codexcli', 'aistudio'] },
  { id: 'fullstack', label: 'Full-stack builders',       stripe: '#f0997b', ids: ['lovable', 'bolt', 'replit', 'v0'] },
  { id: 'design',    label: 'Design & prototyping',      stripe: '#ed93b1', ids: ['figma', 'framer', 'stitch'] },
  { id: 'deploy',    label: 'Deploy & version control',  stripe: '#97c459', ids: ['github', 'vercel'] },
  { id: 'productivity', label: 'Research & productivity', stripe: '#fac775', ids: ['notebooklm', 'cowork'] },
  { id: 'backend',   label: 'Backend & data',            stripe: '#5dcaa5', ids: ['supabase', 'firebase', 'appwrite'] },
]

// The open-weight models section sits between the AI & coding lane and the rest.
const AI_LANES = LANES.filter(l => l.id === 'ai')
const REST_LANES = LANES.filter(l => l.id !== 'ai')

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
      <header style={{ background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, zIndex: 10, padding: '0 48px' }}>
        <div style={{ maxWidth: 2200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, height: 112 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 20, minWidth: 0, overflow: 'hidden' }}>
            <span style={{ fontSize: 34, fontWeight: 500, color: 'var(--text-primary)', letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>Vibe Coding Dashboard</span>
            <span style={{ fontSize: 26, color: '#3a3a3c', whiteSpace: 'nowrap' }}>Tool comparison & open models</span>
            <span style={{ fontSize: 26, color: '#3a3a3c', whiteSpace: 'nowrap' }}>Updated August 13 2026</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexShrink: 0 }}>
            <span style={{ fontSize: 24, color: '#3a3a3c', fontFamily: 'var(--mono)', whiteSpace: 'nowrap' }}>{tools.length} tools</span>
            <div style={{ display: 'flex', background: 'var(--surface2)', borderRadius: 16, padding: 6, gap: 4 }}>
              <ViewBtn label="Table" icon="table" active={view === 'table'} onClick={() => setView('table')} />
              <ViewBtn label="Cards" icon="cards" active={view === 'cards'} onClick={() => setView('cards')} />
            </div>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 2200, margin: '0 auto', padding: '56px 48px 120px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
          <SectionHeading>Tools</SectionHeading>
          <span style={{ fontSize: 24, color: '#3a3a3c' }}>
            {view === 'table' ? 'Click any row to expand detail' : 'Click any card to expand'}
          </span>
        </div>

        {view === 'table' ? (
          <>
            <TableView lanes={AI_LANES} tools={tools} />
            <OpenWeightSection view={view} />
            <TableView lanes={REST_LANES} tools={tools} />
          </>
        ) : (
          <div>
            {AI_LANES.map(lane => renderLaneCards(lane, expandedIds, toggle))}
            <OpenWeightSection view={view} />
            {REST_LANES.map(lane => renderLaneCards(lane, expandedIds, toggle))}
          </div>
        )}

        <div style={{ marginTop: 80, textAlign: 'center', fontSize: 24, color: '#3a3a3c' }}>
          Last updated August 2026 · Built with React + Vite + Vercel
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
        display: 'flex', alignItems: 'center', gap: 10,
        fontSize: 24, fontWeight: 500,
        padding: '10px 20px', borderRadius: 12,
        border: 'none', cursor: 'pointer',
        fontFamily: 'var(--font)',
        background: active ? 'var(--surface)' : 'transparent',
        color: active ? '#1d1d1f' : '#3a3a3c',
        boxShadow: active ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
        transition: 'all 0.15s',
      }}
    >
      {icon === 'table' ? (
        <svg width="26" height="26" viewBox="0 0 14 14" fill="none">
          <rect x="1" y="1" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.2"/>
          <path d="M1 5h12M5 5v8" stroke="currentColor" strokeWidth="1.2"/>
        </svg>
      ) : (
        <svg width="26" height="26" viewBox="0 0 14 14" fill="none">
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

function OpenWeightSection({ view }) {
  return (
    <div style={{ margin: '56px 0 64px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, marginBottom: 16 }}>
        <SectionHeading>Top open-weight models</SectionHeading>
        <span style={{ fontSize: 24, color: '#3a3a3c' }}>
          {view === 'table' ? 'Click any row to expand detail' : 'Full detail on each card'}
        </span>
      </div>
      <div style={{ fontSize: 26, color: '#3a3a3c', lineHeight: 1.55, maxWidth: 1560, marginBottom: 32 }}>
        {openWeightNote}
      </div>
      {view === 'table' ? (
        <OpenWeightTable models={openWeightModels} />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(600px, 1fr))', gap: 28, alignItems: 'stretch' }}>
          {openWeightModels.map(m => <OpenWeightCard key={m.id} model={m} />)}
        </div>
      )}
    </div>
  )
}

function renderLaneCards(lane, expandedIds, toggle) {
  const laneTools = lane.ids.map(id => tools.find(t => t.id === id)).filter(Boolean)
  return (
    <div key={lane.id} style={{ marginBottom: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 24 }}>
        <span style={{ fontSize: 22, fontWeight: 500, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.07em', whiteSpace: 'nowrap' }}>{lane.label}</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(560px, 1fr))', gap: 20 }}>
        {laneTools.map(tool => (
          <ToolCard key={tool.id} tool={tool} isExpanded={expandedIds.has(tool.id)} onToggle={() => toggle(tool.id)} />
        ))}
      </div>
    </div>
  )
}

function SectionHeading({ children }) {
  return <div style={{ fontSize: 26, fontWeight: 500, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{children}</div>
}
