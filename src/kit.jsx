import { tools, openWeightModels } from './data'

// The newest change date anywhere in the data marks "this update".
export const LATEST = [...tools, ...openWeightModels]
  .flatMap(x => (x.changes || []).map(c => c.date))
  .sort().pop()
const at = new Date(`${LATEST}T12:00:00`)
export const UPDATED = at.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
export const SHORT_DATE = at.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toLowerCase()

export const latestChanges = x => (x.changes || []).filter(c => c.date === LATEST)
export const isChanged = x => latestChanges(x).length > 0

export const pad = n => String(n).padStart(2, '0')

export function Seg({ value }) {
  const on = Math.round(value / 5)
  return <div className="seg" aria-hidden="true">{Array.from({ length: 20 }, (_, i) => <i key={i} className={i < on ? 'on' : ''} />)}</div>
}
