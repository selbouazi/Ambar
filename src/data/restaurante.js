export const restaurante = {
  negocio: {
    nombre: 'Restaurante Halal Ambar',
    direccion: 'Ctra. de Valls, 70, 43700 El Vendrell, Tarragona, España',
    telefono: '+34 623 16 32 35',
    telefono_uri: '+34623163235',
    rango_precio: '1-10 € por persona',
    valoracion: { puntuacion: 4.9, numero_resenas: 131 },
    horario: {
      apertura: '9:00',
      cierre: '0:00',
      nota: 'Horario detallado por día pendiente de confirmar',
    },
    enlaces: {
      pedidos_online: {
        texto: 'just-eat.es',
        url: 'https://www.just-eat.es',
      },
      instagram: {
        texto: '[FALTA DATO]',
        url: 'https://www.instagram.com',
      },
    },
  },
  accesibilidad: [
    'Acceso para sillas de ruedas',
    'Aparcamiento adaptado para sillas de ruedas',
    'Aseo adaptado para sillas de ruedas',
  ],
  opciones_servicio: [
    'Terraza',
    'Entrega sin contacto',
    'A domicilio',
    'Para llevar',
    'Comer allí',
    'Servicio en mesa',
    'Sitio para sentarse',
  ],
  servicios: ['Aseos', 'Wi-Fi gratis'],
  ambiente: ['Acogedor', 'Informal', 'Tranquilo'],
  clientela: ['Grupos', 'Ideal para familias'],
  pagos: ['NFC', 'Tarjetas de crédito', 'Tarjetas de débito'],
  ninos: ['Adecuado para niños', 'Menú infantil'],
  aparcamiento: [
    'Algo difícil encontrar plaza',
    'Aparcamiento en la calle gratuito',
    'Parking de pago',
  ],
  carta: [
    {
      categoria: 'Entrantes',
      items: [
        { nombre: 'Patatas Bravas', precio: '4€' },
        { nombre: 'Croquetas / Fingers / Nuggets', precio: '[FALTA DATO]' },
        { nombre: 'Alitas de pollo', precio: '4,50€' },
        { nombre: 'Ensalada marroquí (1 persona)', precio: '4€' },
        { nombre: 'Ensalada marroquí (2 personas)', precio: '8€' },
        { nombre: 'Pinchitos de Carne / Pollo / Hígado', precio: '3€' },
      ],
    },
    {
      categoria: 'Platos Combinados',
      nota: 'Con ensalada y patatas fritas',
      items: [
        { nombre: 'Pinchitos de pollo', precio: '8€' },
        { nombre: 'Carne picada', precio: '8€' },
        { nombre: 'Pinchitos de Ternera', precio: '8€' },
        { nombre: 'Salchichas', precio: '8€' },
        { nombre: 'Pollo Asado Entero', precio: '12€' },
        { nombre: 'Pollo Asado 1/2', precio: '6€' },
      ],
    },
    {
      categoria: 'Tacos',
      menu_extra: 'Bebida + patatas: +2€',
      items: [
        { nombre: 'Pollo - Ternera - Carne picada', precio: '5€' },
        { nombre: 'Mixto', precio: '5,50€' },
        { nombre: 'Marisco (Gamba y Calamar)', precio: '6€' },
      ],
    },
    {
      categoria: 'Pizzas',
      sabores: ['Gambas y atún', 'Pollo', 'Carne picada', '4 quesos'],
      items: [
        { nombre: 'Pizza pequeña', precio: '7€' },
        { nombre: 'Pizza mediana', precio: '9€' },
      ],
    },
    {
      categoria: 'Pescado',
      items: [
        { nombre: 'Lubina a la plancha', precio: '12€' },
        { nombre: 'Dorada a la plancha', precio: '12€' },
        { nombre: 'Fritura 1 persona', precio: '14€' },
        { nombre: 'Fritura 2 personas', precio: '28€' },
        { nombre: 'Gamba a la plancha (1/2 kg)', precio: '10€' },
        { nombre: 'Paella Marisco (1 persona)', precio: '8€' },
        { nombre: 'Paella Marisco (2 personas)', precio: '16€' },
        { nombre: 'Sardinas o Boquerones fritos', precio: '7€' },
        { nombre: 'Sopa Marisco', precio: '4,50€' },
      ],
    },
    {
      categoria: 'Bocadillos',
      items: [
        { nombre: 'Pechuga de pollo', precio: '4,50€' },
        { nombre: 'Carne picada', precio: '5€' },
        { nombre: 'Mixto', precio: '5€' },
        { nombre: 'Vegetal', precio: '4,50€' },
      ],
    },
    {
      categoria: 'Platos',
      items: [
        { nombre: 'Tajín de carne', precio: '7,00€' },
        { nombre: 'Tajín de pollo', precio: '7,00€' },
        { nombre: 'Pollo a la brasa', precio: '16,00€' },
        { nombre: 'Patas de vaca', precio: '7,00€' },
        { nombre: 'Carne picada en brasa con ensalada', precio: '9,00€' },
        { nombre: 'Salchichas en brasa con ensalada', precio: '9,00€' },
        { nombre: 'Bistec en brasa con ensalada', precio: '9,00€' },
        { nombre: 'Cuscús (solo viernes)', precio: '7,00€' },
      ],
    },
    {
      categoria: 'Hamburguesas',
      menu_extra: 'Bebida + patatas: +2€',
      items: [
        { nombre: 'Pollo / Carne picada', precio: '5€' },
        { nombre: 'Doble', precio: '7€' },
      ],
    },
    {
      categoria: 'Desayunos',
      items: [
        {
          nombre: 'Desayuno 1',
          descripcion:
            '2 huevos con queso, mortadela, miel, aceitunas/mermelada, té o café o zumo de naranja',
          precio: '6€',
        },
        { nombre: 'Desayuno 2', descripcion: 'Msemmen + té o café', precio: '3,50€' },
        { nombre: 'Desayuno 3', descripcion: 'Harxa + té o café', precio: '3,50€' },
        { nombre: 'Msemmen con miel y queso', precio: '1,50€' },
        { nombre: 'Harxa con miel y queso', precio: '1,50€' },
      ],
    },
    {
      categoria: 'Batidos',
      items: [
        { nombre: 'Batido de aguacate', precio: '3€' },
        { nombre: 'Batido de plátano con leche', precio: '2,50€' },
        { nombre: 'Zumo de naranja natural', precio: '2,50€' },
        { nombre: 'Za3za3 (fruta con frutos secos)', precio: '5€' },
      ],
    },
    {
      categoria: 'Bebidas',
      items: [
        { nombre: 'Té verde', precio: '1,50€' },
        { nombre: 'Café con leche', precio: '1,40€' },
        { nombre: 'Café sólo', precio: '1€' },
        { nombre: 'Cortado', precio: '1,20€' },
        { nombre: 'Latas (refrescos)', precio: '1,70€' },
        { nombre: 'Energéticas', precio: '2,50€' },
        { nombre: 'Agua pequeña', precio: '1€' },
        { nombre: 'Agua grande', precio: '1,50€' },
      ],
    },
  ],
  resenas_destacadas: [
    {
      autor: 'Jordy Segura reyes',
      texto:
        'Ambiente muy tranquilo y cómodo para venir con familia o amigos, música suave, sillas cómodas.',
    },
    {
      autor: 'Soukayna El harach',
      texto:
        'Excelente restaurante halal con auténtica cocina marroquí. Calidad de platos y atención profesional.',
    },
    {
      autor: 'Khadija Imran',
      texto: 'Comida realmente deliciosa, personal muy amable, lugar limpio y bonito. 5 estrellas.',
    },
    {
      autor: 'Ivknto',
      texto:
        'Restaurante familiar, cocina vista y muy limpio. Tajín de pollo y ternera muy buenos. El cuscús solo se hace los viernes.',
    },
    {
      autor: 'Yasmin Bonilla',
      texto: 'Local limpio, personal agradable, comida espectacular. Los tacos encantaron.',
    },
    {
      autor: 'Imran Ali',
      texto: 'Viajaron 20 km para comer aquí, experiencia increíblemente agradable en familia.',
    },
  ],
}

export const GOOGLE_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  restaurante.negocio.direccion,
)}`

export const GOOGLE_MAPS_EMBED_SRC =
  'https://www.google.com/maps?q=' +
  encodeURIComponent(restaurante.negocio.direccion) +
  '&output=embed&hl=es'

export const MAILTO_RESERVA = `mailto:?subject=${encodeURIComponent(
  `Reserva en ${restaurante.negocio.nombre}`,
)}&body=${encodeURIComponent(
  `Hola, me gustaría reservar mesa en ${restaurante.negocio.nombre}.\n\nNombre:\nFecha:\nHora:\nPersonas:\n\nTeléfono: ${restaurante.negocio.telefono}`,
)}`

export function slugCategoria(nombre) {
  return nombre
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}