const I = {
  phone: (
    <path d="M6.8 3.5h2.8l1.6 4.4-2.1 1.5a12.8 12.8 0 0 0 5.5 5.5l1.5-2.1 4.4 1.6v2.8a2 2 0 0 1-2.2 2A16.9 16.9 0 0 1 4.8 5.7a2 2 0 0 1 2-2.2Z" />
  ),
  pin: (
    <>
      <path d="M12 21s7-5.5 7-11a7 7 0 0 0-14 0c0 5.5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.4" />
    </>
  ),
  arrow: (
    <>
      <path d="M4 12h15" />
      <path d="m14 6 6 6-6 6" />
    </>
  ),
  external: (
    <>
      <path d="M14 4h6v6" />
      <path d="M20 4 11 13" />
      <path d="M19 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  wifi: (
    <>
      <path d="M5 9.4a9.5 9.5 0 0 1 14 0" />
      <path d="M8 12.6a5.5 5.5 0 0 1 8 0" />
      <path d="M11 16a1.4 1.4 0 0 1 2 0" />
    </>
  ),
  wheelchair: (
    <>
      <circle cx="7.5" cy="4.5" r="2.2" />
      <path d="M15 21v-4h-4.6a1.6 1.6 0 0 1-1.5-2.2L11.4 9H5M15 13h3.5" />
      <path d="M7.5 7.2V12L11.4 9M21 16.5a6 6 0 1 1-12 0" />
    </>
  ),
  car: (
    <>
      <path d="M4 11l1-4.5a1.5 1.5 0 0 1 1.5-1h11a1.5 1.5 0 0 1 1.5 1l1 4.5" />
      <path d="M3 11h18v6h-2" />
      <circle cx="7.5" cy="17.5" r="1.8" />
      <circle cx="16.5" cy="17.5" r="1.8" />
    </>
  ),
  card: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="2" />
      <path d="M2.5 10h19" />
    </>
  ),
  nfc: (
    <path d="M7 8.4a6.4 6.4 0 0 1 0 7.2M10.5 6a10 10 0 0 1 0 12M14 9.4a3.5 3.5 0 0 1 0 5.2M2.5 5.5a13 13 0 0 1 0 13" />
  ),
  family: (
    <>
      <circle cx="9" cy="7" r="3.2" />
      <path d="M4 20v-1.5A4.5 4.5 0 0 1 8.5 14h1A4.5 4.5 0 0 1 14 18.5V20" />
      <path d="M15.5 4.4a3.2 3.2 0 0 1 0 5.2" />
      <path d="M17.5 14a4.5 4.5 0 0 1 2.5 4v2" />
    </>
  ),
  baby: (
    <>
      <circle cx="9.5" cy="7.5" r="3.2" />
      <path d="M4.5 20v-2A4.5 4.5 0 0 1 9 13.5h1c.9 0 1.8.3 2.5.8" />
      <path d="M16 6.5a2.2 2.2 0 0 1 3 2.1V11" />
    </>
  ),
  delivery: (
    <>
      <path d="M2.5 7h9v9h-9z" />
      <path d="M11.5 10H15l3 3v3h-6.5" />
      <circle cx="7" cy="18" r="1.8" />
      <circle cx="17" cy="18" r="1.8" />
    </>
  ),
  coffee: (
    <path d="M4 8h13v6.5a4.5 4.5 0 0 1-4.5 4.5H8.5A4.5 4.5 0 0 1 4 14.5V8ZM17 10.5h1.2a2.8 2.8 0 0 1 0 5.6H17M8.5 2.8v2M12 2.8v2" />
  ),
  leaf: (
    <path d="M5 19C5 9 12 4 20 3.5c.5 8-4.5 15-12 15-1.2 0-2.3-.3-3-.5ZM5 19c-1.5 0-1.5-6-1-4.5" />
  ),
  moon: (
    <path d="M20 13.5A8 8 0 1 1 10.5 4a6.5 6.5 0 0 0 9.5 9.5Z" />
  ),
  star: (
    <path d="m12 3 2.7 5.5 6 .9-4.3 4.2 1 6-5.4-2.8L6.6 19.6l1-6L3.3 9.4l6-.9L12 3Z" />
  ),
  quote: (
    <path d="M8.5 5C5.5 5.5 4 8.5 4 12.5V19h6.5v-7H7.2C7.5 9.5 8.5 8 10 7.5L8.5 5Zm10 0c-3 .5-4.5 3.5-4.5 7.5V19H20.5v-7h-3.3c.3-2.5 1.3-4 2.8-4.5L18.5 5Z" />
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  info: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 11v5.5M12 7.8v.2" />
    </>
  ),
  camera: (
    <>
      <path d="M4 8.5A2.5 2.5 0 0 1 6.5 6h1.2l1.3-2h6l1.3 2h1.2A2.5 2.5 0 0 1 20 8.5v8a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 16.5v-8Z" />
      <circle cx="12" cy="13" r="3.2" />
    </>
  ),
  menu: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M8 12h8M12 8v8" />
    </>
  ),
  close: (
    <>
      <path d="m6 6 12 12M18 6 6 18" />
    </>
  ),
  umbrella: (
    <>
      <path d="M12 3a9 9 0 0 1 9 9H3a9 9 0 0 1 9-9Z" />
      <path d="M12 12v6.5a2 2 0 0 0 4 0" />
      <path d="M12 3v2" />
    </>
  ),
}

export default function Icon({ name, className = 'h-6 w-6' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {I[name] || I.info}
    </svg>
  )
}

export function CrescentLogo({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M14.5 3a8.2 8.2 0 1 0 6.5 6.5A6.4 6.4 0 0 1 14.5 3Z" />
      <path d="M18.8 5.2V7M20 7h-2.4M19.2 15.8v1.3M19.8 16.45h-1.2" />
    </svg>
  )
}

export function HalalSeal({ className = 'h-16 w-16' }) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="none" aria-hidden="true">
      <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="40" cy="40" r="32" stroke="currentColor" strokeWidth="0.6" opacity="0.6" />
      <path
        id="sealCircle"
        d="M40 9 A31 31 0 0 1 71 40"
        fill="none"
        stroke="none"
      />
      <text
        fontSize="7.2"
        letterSpacing="2.4"
        fill="currentColor"
        style={{ textTransform: 'uppercase' }}
      >
        <textPath href="#sealCircle" startOffset="0">
          Halal Food · Rest. Ambar ·
        </textPath>
      </text>
      <path d="M40 26l3.2 6.5 7.2 1-5.2 5 1.2 7.2L40 42.6l-6.4 3.1 1.2-7.2-5.2-5 7.2-1L40 26Z" fill="currentColor" stroke="none" />
    </svg>
  )
}