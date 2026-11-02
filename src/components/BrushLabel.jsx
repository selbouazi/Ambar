const SHAPES = [
  // Pincelada ancha con el borde superior irregular.
  'M8 26C44 12 104 8 170 10c66 2 126 8 160 20 18 6 16 22 2 32-34 14-96 22-166 22S36 76 14 62C-2 52 0 34 8 26Z',
  // Pincelada inclinada, más corta por la izquierda.
  'M12 34C48 14 112 6 178 9c64 3 122 14 154 27 16 6 12 20-4 28-38 18-104 25-170 24C96 87 42 78 18 66 2 58 2 42 12 34Z',
  // Trazo doble: cuerpo ancho y cola fina.
  'M6 30C50 14 116 8 178 11c56 3 110 12 150 26 12 4 12 18-2 26-34 18-98 25-164 24C98 86 46 78 20 64 2 55 0 37 6 30Z',
  // Pincelada corta y redondeada.
  'M18 28C58 12 122 8 184 12c58 4 108 14 138 28 10 5 10 18-4 26-34 18-94 24-156 23C98 88 48 80 24 66 8 57 8 36 18 28Z',
]

/**
 * Etiqueta de sección tipo pincelada amarilla, con texto oscuro en
 * caligráfica. Cuatro formas para que no se repitan clavadas.
 */
export default function BrushLabel({
  children,
  variant = 0,
  size = 'md',
  as: Tag = 'span',
  className = '',
}) {
  const shape = SHAPES[variant % SHAPES.length]
  const sizes = {
    sm: 'px-4 py-1 text-[17px]',
    md: 'px-5 py-1.5 text-[21px] sm:text-[24px]',
    lg: 'px-7 py-2 text-[27px] sm:text-[33px]',
  }

  return (
    <Tag className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 340 96"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full text-gold-500"
        aria-hidden="true"
      >
        <path d={shape} fill="currentColor" />
        <path d={shape} fill="none" stroke="#070706" strokeOpacity="0.13" strokeWidth="2" />
      </svg>
      <span
        className={`relative z-10 whitespace-nowrap font-brush leading-none text-night-950 ${sizes[size]}`}
      >
        {children}
      </span>
    </Tag>
  )
}
