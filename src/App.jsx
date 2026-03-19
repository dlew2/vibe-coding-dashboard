import { tools, workflows } from './data'
import ToolCard from './ToolCard'
import WorkflowBanner from './WorkflowBanner'

const LANES = [
  { id: 'ai',      label: 'AI & coding',             color: '#3a3a3c', stripe: '#afa9ec', ids: ['claude', 'cursor'] },
  { id: 'design',  label: 'Design & prototyping',     color: '#3a3a3c', stripe: '#ed93b1', ids: ['figma', 'replit'] },
  { id: 'deploy',  label: 'Deploy & version control', color: '#3a3a3c', stripe: '#97c459', ids: ['github', 'vercel'] },
  { id: 'backend', label: 'Backend & data',           color: '#3a3a3c', stripe: '#5dcaa5', ids: ['supabase'] },
]

export default function App() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <header style={{
        background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, zIndex: 10, padding: '0 24px',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
            <span style={{ fontSize: 17, fontWeight: 500, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>Vibe Coding Dashboard</span>
            <span style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>Tool comparison & workflows</span>
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-tertiary)', fontFamily: 'var(--mono)' }}>{tools.length} tools</div>
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
            const single = laneTools.length === 1
            return (
              <div key={lane.id} className="lane">
                <div className="lane-header">
                  <span className="lane-label" style={{ color: lane.color }}>{lane.label}</span>
                  <div className="lane-stripe" style={{ background: lane.stripe }} />
                </div>
                {/* Single-tool lanes use a plain block so the card stretches full width */}
                {single ? (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                    <div style={{ gridColumn: '1 / -1' }}>
                      <ToolCard tool={laneTools[0]} />
                    </div>
                  </div>
                ) : (
                  <div className="lane-row">
                    {laneTools.map(tool => <ToolCard key={tool.id} tool={tool} />)}
                  </div>
                )}
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
