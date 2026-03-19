export function ToolIcon({ type, size = 20 }) {
  const s = size
  switch (type) {
    case 'claude':
    case 'claudecode':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" fill="#5856d6"/>
          <path d="M8 12.5l2.5 2.5 5.5-6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    case 'figma':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
          <rect x="2" y="2" width="9" height="9" rx="2" fill="#ff2d55"/>
          <rect x="13" y="2" width="9" height="9" rx="2" fill="#007aff"/>
          <rect x="2" y="13" width="9" height="9" rx="2" fill="#34c759"/>
          <circle cx="17.5" cy="17.5" r="4.5" fill="#ffcc00"/>
        </svg>
      )
    case 'github':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" fill="#34c759"/>
          <path d="M9 17c0-2 1-3 1-3s-2-.5-2-3c0-1.5.5-2.5 1.5-3C9 7 9.5 5.5 10 5.5c.5 1.5 1.5 2 2 2 .5 0 1.5-.5 2-2 .5 0 1 1.5.5 2.5 1 .5 1.5 1.5 1.5 3 0 2.5-2 3-2 3s1 1 1 3" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    case 'vercel':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
          <path d="M12 4L21 20H3L12 4z" fill="#1d1d1f"/>
        </svg>
      )
    case 'supabase':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
          <path d="M13 3L4 14h8l-1 7 9-11h-8l1-7z" fill="#1d9e75"/>
        </svg>
      )
    case 'react':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
          <rect x="3" y="4" width="18" height="16" rx="3" fill="#1d9e75"/>
          <path d="M7 9h10M7 13h6" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
      )
    case 'web':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="#ff2d55" strokeWidth="1.5" fill="none"/>
          <path d="M12 3c0 0 4 4 4 9s-4 9-4 9M12 3c0 0-4 4-4 9s4 9 4 9M3 12h18" stroke="#ff2d55" strokeWidth="1.3" strokeLinecap="round"/>
        </svg>
      )
    default:
      return null
  }
}
