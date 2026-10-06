import { useEffect, useRef, useState } from 'react'
import { tools, openWeightModels, openWeightNote } from './data'
import { UPDATED, SHORT_DATE, latestChanges, isChanged, pad, Seg } from './kit'
import Compare from './Compare'

// Four category keys, matching the four knobs. Colors live in index.css (--c-*).
const KEYS = ['code', 'build', 'design', 'ship']
const MAX_COMPARE = 3

// Library order: grouped by key, then the order within each lane.
const ORDER = [
  'claude', 'cursor', 'windsurf', 'copilot', 'codexcli', 'geminicli', 'chatgpt', 'aistudio',
  'lovable', 'bolt', 'replit', 'v0',
  'figma', 'framer', 'stitch', 'notebooklm', 'cowork',
  'github', 'vercel', 'supabase', 'firebase', 'appwrite',
]
const LIBRARY = ORDER.map(id => tools.find(t => t.id === id)).filter(Boolean)
const CHANGED_COUNT = LIBRARY.filter(isChanged).length

// Every string value in an item, lowercased, so search reaches pros, pricing, tags, etc.
const haystack = x => JSON.stringify(x).replace(/"[a-zA-Z]+":/g, ' ').toLowerCase()
const INDEX = new Map([...tools, ...openWeightModels].map(x => [x.id, haystack(x)]))
// Each word must start a word in the text, so "mit" finds MIT but not "limits".
const wordRe = w => new RegExp(`(?:^|[^a-z0-9])${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`)
const matches = (x, res) => res.every(re => re.test(INDEX.get(x.id)))

const knobStyle = key => ({ '--k': `var(--c-${key})`, '--k-ink': `var(--c-${key}-ink)` })

export default function App() {
  const [filter, setFilter] = useState('all')
  const [query, setQuery] = useState('')
  const [openIds, setOpenIds] = useState(new Set())
  const [picked, setPicked] = useState([])
  const [comparing, setComparing] = useState(false)
  const [libOpen, setLibOpen] = useState(false)
  const searchRef = useRef(null)

  // ⌘K / Ctrl+K or "/" jumps to search from anywhere.
  useEffect(() => {
    const onKey = e => {
      const typing = /input|textarea|select/i.test(document.activeElement?.tagName)
      if (((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') || (e.key === '/' && !typing)) {
        e.preventDefault()
        searchRef.current?.focus()
        searchRef.current?.select()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Searching or filtering opens the library so results are visible.
  useEffect(() => { if (query.trim() || filter !== 'all') setLibOpen(true) }, [query, filter])

  const toggle = id => setOpenIds(prev => {
    const next = new Set(prev)
    next.has(id) ? next.delete(id) : next.add(id)
    return next
  })

  const togglePick = id => setPicked(prev =>
    prev.includes(id) ? prev.filter(x => x !== id) : prev.length < MAX_COMPARE ? [...prev, id] : prev)

  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean).map(wordRe)
  const rows = LIBRARY.filter(t =>
    (filter === 'all' || (filter === 'changed' ? isChanged(t) : t.key === filter)) && matches(t, words))
  // Category keys only apply to tools; "changed" and search apply to models too.
  const models = openWeightModels.filter(m => (filter !== 'changed' || isChanged(m)) && matches(m, words))
  const removePick = id => setPicked(p => {
    const next = p.filter(x => x !== id)
    if (next.length < 2) setComparing(false)
    return next
  })

  return (
    <div className="kit">
      <header className="kit-top">
        <div>
          <h1 className="kit-model">AI Bazaar</h1>
          <div className="mono kicker">tools &amp; open models for building with AI · updated {UPDATED}</div>
        </div>
        <div className="dials" role="img" aria-label="Color key: blue is code, green is build, aqua is design, orange is ship">
          {KEYS.map(k => (
            <span key={k} className="dial">
              <span className="knob" style={knobStyle(k)} />
              <span className="mono">{k}</span>
            </span>
          ))}
        </div>
      </header>

      <div className="toolbar" role="search">
        <label className="search">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.5" /><path d="M9.5 9.5L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          <input ref={searchRef} type="search" value={query} placeholder="search tools, prices, licenses…"
            aria-label="Search tools and models" onChange={e => setQuery(e.target.value)}
            onKeyDown={e => { if (e.key === 'Escape') { setQuery(''); e.currentTarget.blur() } }} />
          <kbd className="mono">⌘K</kbd>
        </label>
        <div className="keys" role="group" aria-label="Filter">
          <button type="button" aria-pressed={filter === 'all'} onClick={() => setFilter('all')}>all</button>
          {KEYS.map(k => (
            <button key={k} type="button" aria-pressed={filter === k} onClick={() => setFilter(k)}>
              <i style={{ background: `var(--c-${k})` }} />{k}
            </button>
          ))}
          <button type="button" className="changed-key" aria-pressed={filter === 'changed'} onClick={() => setFilter('changed')}>
            <i />changed · {CHANGED_COUNT}
          </button>
        </div>
      </div>

      <section className="section" aria-labelledby="lib-h">
        <div className="section-h">
          <h2 id="lib-h">
            <button type="button" className="acc" aria-expanded={libOpen} aria-controls="lib-body" onClick={() => setLibOpen(o => !o)}>
              <Chev />library <span className="mono">· {rows.length} of {LIBRARY.length} tools</span>
            </button>
          </h2>
          {libOpen && <span className="mono">tick up to {MAX_COMPARE} to compare</span>}
        </div>
        <div id="lib-body" hidden={!libOpen}>
          {rows.map(t => (
            <ToolRow key={t.id} tool={t} num={LIBRARY.indexOf(t) + 1} open={openIds.has(t.id)} onToggle={() => toggle(t.id)}
              picked={picked.includes(t.id)} pickDisabled={!picked.includes(t.id) && picked.length >= MAX_COMPARE}
              onPick={() => togglePick(t.id)} />
          ))}
          {rows.length === 0 && <Empty query={query} filter={filter} onClear={() => { setQuery(''); setFilter('all') }} />}
        </div>
      </section>

      <section className="section" aria-labelledby="ow-h">
        <div className="section-h">
          <h2 id="ow-h">open-weight models <span className="mono">· {models.length} of {openWeightModels.length}</span></h2>
          <span className="mono">aa intelligence index</span>
        </div>
        <p className="section-note">{openWeightNote}</p>
        {models.map(m => (
          <ModelRow key={m.id} model={m} num={openWeightModels.indexOf(m) + 1} open={openIds.has(m.id)} onToggle={() => toggle(m.id)} />
        ))}
        {models.length === 0 && <p className="empty mono">no models match</p>}
      </section>

      <p className="sr-only" aria-live="polite">
        {(query.trim() || filter !== 'all') ? `${rows.length} tools and ${models.length} models match.` : ''}
        {picked.length ? ` ${picked.length} of ${MAX_COMPARE} picked for compare.` : ''}
      </p>

      <div className="mono foot">last updated {UPDATED.toLowerCase()} · built with react + vite + vercel</div>

      {picked.length > 0 && (
        <div className="tray" role="region" aria-label="Compare selection">
          <span className="mono">compare</span>
          <span className="tray-names">{picked.map(id => tools.find(t => t.id === id).name.toLowerCase()).join(' · ')}</span>
          <button type="button" className="tray-go" disabled={picked.length < 2} onClick={() => setComparing(true)}>
            {picked.length < 2 ? 'pick one more' : `compare ${picked.length} →`}
          </button>
          <button type="button" className="tray-clear" onClick={() => setPicked([])}>clear</button>
        </div>
      )}

      {comparing && (
        <Compare items={picked.map(id => tools.find(t => t.id === id))} onRemove={removePick} onClose={() => setComparing(false)} />
      )}
    </div>
  )
}

function Empty({ query, filter, onClear }) {
  return (
    <div className="empty">
      <p className="mono">nothing matches{query ? ` “${query}”` : ''}{filter !== 'all' ? ` in ${filter}` : ''}</p>
      <button type="button" onClick={onClear}>clear search &amp; filter</button>
    </div>
  )
}

function Chev() {
  return (
    <svg className="chev" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2.5 5L7 9.5L11.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function UpdTag() {
  return <span className="upd"><span aria-hidden="true">upd {SHORT_DATE}</span><span className="sr-only">, updated {SHORT_DATE}</span></span>
}

function Changes({ item }) {
  const list = latestChanges(item)
  if (!list.length) return null
  return (
    <div className="changes">
      <h3>what changed · {SHORT_DATE}</h3>
      <ul>{list.map((c, i) => <li key={i}>{c.note}</li>)}</ul>
    </div>
  )
}

function ToolRow({ tool, num, open, onToggle, picked, pickDisabled, onPick }) {
  const id = `tool-${tool.id}`
  return (
    <div className={`item${open ? ' open' : ''}${picked ? ' picked' : ''}`} id={id}>
      <div className="item-line">
        <label className="pick" title={pickDisabled ? `Compare holds ${MAX_COMPARE} at a time` : 'Add to compare'}>
          <input type="checkbox" checked={picked} disabled={pickDisabled} onChange={onPick} aria-label={`Compare ${tool.name}`} />
          <span aria-hidden="true" />
        </label>
        <button type="button" className="row" aria-expanded={open} aria-controls={`${id}-d`} onClick={onToggle}>
          <span className="num">{pad(num)}</span>
          <span className="dot" style={{ background: `var(--c-${tool.key})` }} aria-hidden="true" /><span className="sr-only">{tool.key}, </span>
          <span className="nm"><b>{tool.name.toLowerCase()}</b>{isChanged(tool) && <UpdTag />}</span>
          <span className="d">{tool.verdict}</span>
          <span className="p">{tool.priceShort}</span>
          <span className={`rel${tool.relation === 'in stack' ? ' stack-tag' : ''}`}>{tool.relation}</span>
          <Chev />
        </button>
      </div>
      {open && (
        <div className="detail" id={`${id}-d`}>
          <p className="tagline">{tool.tagline}</p>
          <div className="specs">
            <div><h3>price</h3><b className="big">{tool.priceShort}</b></div>
            <div><h3>coding skill</h3><Seg value={tool.skillCoding} /><span className="mono">{tool.skillCoding}/100</span></div>
            <div><h3>design skill</h3><Seg value={tool.skillDesign} /><span className="mono">{tool.skillDesign}/100</span></div>
            <div><h3>vs your stack</h3><b>{tool.relation}</b></div>
          </div>
          <p className="verdict">{tool.verdict}</p>
          <Changes item={tool} />
          <div className="cols">
            <div>
              <h3>→ use when</h3><p>{tool.whenToUse}</p>
              <h3>× avoid when</h3><p>{tool.whenToAvoid}</p>
              <h3>best for</h3>
              <div className="tags">{tool.tags.map(x => <span key={x}>{x}</span>)}</div>
            </div>
            <div><h3>pros</h3><ul className="pros">{tool.pros.map((p, i) => <li key={i}>{p}</li>)}</ul></div>
            <div><h3>cons</h3><ul className="cons">{tool.cons.map((c, i) => <li key={i}>{c}</li>)}</ul></div>
          </div>
          <div className="pricing"><span>pricing</span>{tool.pricing}</div>
          <details className="more">
            <summary className="mono">more · how it works{tool.yourProject ? ' & your projects' : ''}</summary>
            <p>{tool.howItWorks}</p>
            {tool.yourProject && (<><h3>in your projects</h3><p className="proj">{tool.yourProject}</p></>)}
          </details>
        </div>
      )}
    </div>
  )
}

function ModelRow({ model, num, open, onToggle }) {
  const id = `model-${model.id}`
  const score = parseFloat(model.headline.value)
  return (
    <div className={`item${open ? ' open' : ''}`}>
      <button type="button" className="mrow" aria-expanded={open} aria-controls={`${id}-d`} onClick={onToggle}>
        <span className="n">M{num}</span>
        <span><b>{model.name.toLowerCase()}</b>{isChanged(model) && <UpdTag />}<span className="mono" style={{ display: 'block' }}>{model.maker} · {model.params}</span></span>
        <Seg value={score} />
        <span className="mono score">{model.headline.value} {model.headline.label.split(' ')[0]}</span>
        <span className={`lic${model.licenseOpen ? ' open' : ''}`}>{model.license}</span>
        <Chev />
      </button>
      {open && (
        <div className="detail" id={`${id}-d`}>
          <p className="tagline">{model.rank}</p>
          <div className="specs">
            <div><h3>aa index</h3><b className="big">{model.headline.value}</b></div>
            <div><h3>size</h3><b>{model.params}</b></div>
            <div><h3>context</h3><b>{model.context}</b></div>
            <div><h3>license</h3><b>{model.license}</b></div>
          </div>
          <p className="verdict">{model.tagline}</p>
          <Changes item={model} />
          <div className="cols">
            <div><h3>strengths</h3><p>{model.strengths}</p><h3>trade-offs</h3><p>{model.tradeoffs}</p></div>
            <div><h3>benchmarks</h3><div className="bench">{model.benchmarks.map(b => <div key={b.label}><span>{b.label}</span><b>{b.value}</b></div>)}</div></div>
            <div><h3>size</h3><p>{model.paramsDetail}</p><h3>license</h3><p>{model.licenseDetail}</p><h3>weights</h3><p>{model.weights}</p></div>
          </div>
          <div className="pricing"><span>api</span>{model.apiPrice}</div>
        </div>
      )}
    </div>
  )
}
