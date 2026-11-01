const paths = {
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
  delivery: (
    <>
      <path d="M2.5 7h9v9h-9z" />
      <path d="M11.5 10H15l3 3v3h-6.5" />
      <circle cx="7" cy="18" r="1.8" />
      <circle cx="17" cy="18" r="1.8" />
    </>
  ),
  family: (
    <>
      <circle cx="9" cy="7" r="3.2" />
      <path d="M4 20v-1.5A4.5 4.5 0 0 1 8.5 14h1A4.5 4.5 0 0 1 14 18.5V20" />
      <path d="M15.5 4.4a3.2 3.2 0 0 1 0 5.2" />
      <path d="M17.5 14a4.5 4.5 0 0 1 2.5 4v2" />
    </>
  ),
  coffee: (
    <path d="M4 8h13v6.5a4.5 4.5 0 0 1-4.5 4.5H8.5A4.5 4.5 0 0 1 4 14.5V8ZM17 10.5h1.2a2.8 2.8 0 0 1 0 5.6H17M8.5 2.8v2M12 2.8v2" />
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
  moon: <path d="M20 13.5A8 8 0 1 1 10.5 4a6.5 6.5 0 0 0 9.5 9.5Z" />,
  star: <path d="m12 3 2.7 5.5 6 .9-4.3 4.2 1 6-5.4-2.8L6.6 19.6l1-6L3.3 9.4l6-.9L12 3Z" />,
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
      <path d="M4 7h16M4 12h16M4 17h16" />
    </>
  ),
  close: <path d="m6 6 12 12M18 6 6 18" />,
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.2 6.9v.1" />
    </>
  ),
  leaf: (
    <path d="M5 19C5 9 12 4 20 3.5c.5 8-4.5 15-12 15-1.2 0-2.3-.3-3-.5ZM5 19c-1.5 0-1.5-6-1-4.5" />
  ),
  whatsapp: (
    <>
      <path d="M20.5 11.7a8.4 8.4 0 0 1-12.4 7.4L3.5 20.5l1.4-4.5A8.4 8.4 0 1 1 20.5 11.7Z" />
      <path d="M8.8 8.2c.3 0 .5.1.7.5l.6 1.4c.1.3 0 .5-.2.7l-.5.5c-.2.2-.2.4-.1.6a6 6 0 0 0 2.8 2.4c.3.1.5 0 .7-.2l.4-.5c.2-.2.4-.2.7-.1l1.5.7c.3.2.4.3.4.6 0 .8-.4 1.4-1.2 1.7-.6.2-1.4.3-2.3 0a8 8 0 0 1-3.7-2.4 8 8 0 0 1-1.5-3.2c-.2-1 .1-1.8.6-2.2.3-.3.6-.5 1.1-.5Z" />
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
      {paths[name] || paths.info}
    </svg>
  )
}
