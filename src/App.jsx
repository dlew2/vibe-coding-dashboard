import { useState } from 'react'
import { tools, workflows } from './data'
import ToolCard from './ToolCard'
import WorkflowBanner from './WorkflowBanner'

const FILTERS = ['All tools', 'Workflow 1', 'Workflow 2', 'Not in workflow']

export default function App() {
  const [filter, setFilter] = useState('All tools')

  const filtered = tools.filter(t => {
    if (filter === 'All tools') return true
    if (filter === 'Workflow 1') return t.workflow === 1
    if (filter === 'Workflow 2') return t.workflow === 2
    if (filter === 'Not in workflow') return !t.workflow
    return true
  })

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Header */}
      <header style={{
        background: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
        position: 'sticky', top: 0, zIndex: 10,
        padding: '0 24px',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
            <span style={{ fontSize: 17, fontWeight: 500, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
              Vibe Coding Dashboard
            </span>
            <span style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>Tool comparison & workflows</span>
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-tertiary)', fontFamily: 'var(--mono)' }}>
            {tools.length} tools
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '28px 24px 60px' }}>

        {/* Workflows */}
        <div style={{ marginBottom: 8 }}>
          <SectionHeading>My workflows</SectionHeading>
        </div>
        {workflows.map(wf => <WorkflowBanner key={wf.id} workflow={wf} />)}

        {/* Filter pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '28px 0 16px' }}>
          <SectionHeading>Tools</SectionHeading>
          <div style={{ flex: 1 }} />
          <div style={{ display: 'flex', gap: 6 }}>
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  fontFamily: 'var(--font)',
                  padding: '5px 12px',
                  borderRadius: 20,
                  border: `1px solid ${filter === f ? 'var(--apple-blue)' : 'var(--border)'}`,
                  background: filter === f ? 'var(--apple-blue)' : 'var(--surface)',
                  color: filter === f ? 'white' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 16,
        }}>
          {filtered.map(tool => <ToolCard key={tool.id} tool={tool} />)}
        </div>

        {/* Footer */}
        <div style={{ marginTop: 48, textAlign: 'center', fontSize: 12, color: 'var(--text-tertiary)' }}>
          Last updated March 2026 · Built with React + Vite + Vercel
        </div>
      </main>
    </div>
  )
}

function SectionHeading({ children }) {
  return (
    <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
      {children}
    </div>
  )
}
