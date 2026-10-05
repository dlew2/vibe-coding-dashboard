import { useEffect, useRef } from 'react'
import { Seg, latestChanges } from './kit'

// Side-by-side spec sheet for 2–3 picked tools, one row per field.
const FIELDS = [
  ['verdict', t => <p className="verdict sm">{t.verdict}</p>],
  ['price', t => <><b className="big">{t.priceShort}</b><p className="fine">{t.pricing}</p></>],
  ['vs your stack', t => <b>{t.relation}</b>],
  ['coding skill', t => <><Seg value={t.skillCoding} /><span className="mono">{t.skillCoding}/100</span></>],
  ['design skill', t => <><Seg value={t.skillDesign} /><span className="mono">{t.skillDesign}/100</span></>],
  ['best for', t => <div className="tags">{t.tags.map(x => <span key={x}>{x}</span>)}</div>],
  ['→ use when', t => <p>{t.whenToUse}</p>],
  ['× avoid when', t => <p>{t.whenToAvoid}</p>],
  ['pros', t => <ul className="pros">{t.pros.map((p, i) => <li key={i}>{p}</li>)}</ul>],
  ['cons', t => <ul className="cons">{t.cons.map((c, i) => <li key={i}>{c}</li>)}</ul>],
  ['what changed', t => {
    const list = latestChanges(t)
    return list.length ? <ul className="pros">{list.map((c, i) => <li key={i}>{c.note}</li>)}</ul> : <span className="mono">no change</span>
  }],
]

export default function Compare({ items, onRemove, onClose }) {
  const ref = useRef(null)
  useEffect(() => {
    const d = ref.current
    d.showModal()
    const close = () => onClose()
    d.addEventListener('close', close)
    return () => d.removeEventListener('close', close)
  }, [])

  return (
    <dialog ref={ref} className="compare" aria-labelledby="cmp-h" onClick={e => { if (e.target === ref.current) ref.current.close() }}>
      <div className="cmp-head">
        <h2 id="cmp-h">compare <span className="mono">· {items.length} tools</span></h2>
        <button type="button" className="cmp-close" onClick={() => ref.current.close()}>close <kbd className="mono">esc</kbd></button>
      </div>
      <div className="cmp-scroll">
        <div className="cmp-grid" style={{ '--n': items.length }}>
          <div className="cmp-label" />
          {items.map(t => (
            <div key={t.id} className="cmp-col-h">
              <span className="dot" style={{ background: `var(--c-${t.key})` }} aria-hidden="true" />
              <b>{t.name.toLowerCase()}</b>
              <button type="button" onClick={() => onRemove(t.id)} aria-label={`Remove ${t.name}`}>×</button>
            </div>
          ))}
          {FIELDS.map(([label, render]) => (
            <div key={label} className="cmp-row" style={{ display: 'contents' }}>
              <div className="cmp-label mono">{label}</div>
              {items.map(t => <div key={t.id} className="cmp-cell">{render(t)}</div>)}
            </div>
          ))}
        </div>
      </div>
    </dialog>
  )
}
