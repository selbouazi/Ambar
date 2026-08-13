export function Diamond({ className = 'h-2.5 w-2.5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M12 2l10 10-10 10L2 12 12 2Z" />
      <path d="m12 6 6 6-6 6-6-6 6-6Z" strokeWidth="0.9" />
    </svg>
  )
}

export function ZelligeLine({ className = '' }) {
  return (
    <div className={`flex items-center gap-3 ${className}`} aria-hidden="true">
      <span className="h-px flex-1 bg-current opacity-30" />
      <Diamond className="h-2 w-2 shrink-0 text-gold-500" />
      <span className="h-px w-10 bg-current opacity-30" />
      <Diamond className="h-1.5 w-1.5 shrink-0 text-gold-500" />
      <span className="h-px w-10 bg-current opacity-30" />
      <Diamond className="h-2 w-2 shrink-0 text-gold-500" />
      <span className="h-px flex-1 bg-current opacity-30" />
    </div>
  )
}

export function ZelligeGrain({ className = '' }) {
  const rows = 12
  const cols = 24
  return (
    <svg
      aria-hidden="true"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      viewBox={`0 0 ${cols * 30} ${rows * 30}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      {Array.from({ length: rows }).map((_, r) =>
        Array.from({ length: cols }).map((__, c) => {
          const x = c * 30 + 15
          const y = r * 30 + 15
          return (
            <path key={`${r}-${c}`} d={`M${x - 9} ${y}l9 -9 9 9-9 9-9-9Z`} />
          )
        }),
      )}
    </svg>
  )
}

export function StarBadge({ className = '' }) {
  return (
    <div
      className={`relative grid place-items-center ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 60 60" className="h-full w-full text-gold-500">
        <path
          d="M30 2l8.3 8.3 11.7-1.7-1.7 11.7L57 30l-8.7 9.7 1.7 11.7-11.7-1.7L30 58l-8.3-8.3L10 51.4l1.7-11.7L3 30l8.7-9.7L10 8.6l11.7 1.7L30 2Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path
          d="M30 14l5.3 5.3 7.5-1.1-1.1 7.5 5.6 5.6-5.6 5.6 1.1 7.5-7.5-1.1L30 46l-5.3-5.3-7.5 1.1 1.1-7.5-5.6-5.6 5.6-5.6-1.1-7.5 7.5 1.1L30 14Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
          opacity="0.7"
        />
      </svg>
      <svg viewBox="0 0 24 24" className="absolute h-1/3 w-1/3 text-gold-400" fill="currentColor" aria-hidden="true">
        <path d="m12 3 2.7 5.5 6 .9-4.3 4.2 1 6-5.4-2.8L6.6 19.6l1-6L3.3 9.4l6-.9L12 3Z" />
      </svg>
    </div>
  )
}