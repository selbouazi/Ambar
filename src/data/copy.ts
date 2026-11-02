/** Todos los textos de la web en un único lugar. */
import { site, hoursSummary } from './site'
import { menuItemCount } from './menu'

export const copy = {
  nav: {
    subtitle: 'Restaurante halal · El Vendrell',
  },

  hero: {
    kicker: 'Cocina marroquí halal',
    lead: 'Restaurante halal en El Vendrell: tajín, parrilla, pescado y desayunos marroquíes.',
    panelTitle: 'Halal, de la cocina a la mesa',
    panelText:
      'Tajín a fuego lento, cuscús los viernes, marisco fresco y desayunos de msemmen y harxa.',
  },

  historia: {
    title: 'Un rincón marroquí, abierto a toda la familia',
    description:
      'Cocina de casa, raciones generosas y un comedor tranquilo y climatizado en la Ctra. de Valls.',
    body: 'En Ambar se cocina como en Marruecos: el tajín sin prisa, el cuscús solo los viernes y el pescado hecho al momento. Quien viene con niños destaca el ambiente tranquilo; quien viene con amigos, la música suave y las mesas cómodas. Y casi todos repiten.',
    reserveNote: 'Si venís en grupo, llamad antes y os guardamos la mesa.',
  },

  cartaDestacada: {
    title: 'Lo que no puedes irte sin probar',
    description: 'Cuatro platos que resumen la casa. La carta completa tiene mucho más.',
  },

  couscous: {
    title: 'Cuscús, los viernes',
  },

  desayunos: {
    title: 'Desayunos marroquíes',
    description: 'Msemmen y harxa recién hechos, con miel y queso, y un té que se sirve como en casa.',
    body: 'Empieza el día sin prisa: té caliente, pan todavía tibio y el desayuno completo con huevos, queso y mortadela. También hay brunch.',
    note: 'Msemmen o harxa con miel y queso: 1,50 €. Pregunta por el horario de desayunos.',
  },

  resenas: {
    title: 'Quien viene, repite',
    description: `Opiniones reales de la ficha de Google · ${site.rating.score.toString().replace('.', ',')} sobre 5 con ${site.rating.count} reseñas.`,
  },

  familias: {
    title: 'Para venir en familia, sin prisa',
    description:
      'Un local tranquilo y climatizado, con terraza, menú infantil y raciones abundantes. Lo que más repiten quienes vienen con niños.',
    services: [
      { icon: 'moon', label: 'Cocina halal' },
      { icon: 'family', label: 'Menú infantil' },
      { icon: 'delivery', label: 'Para llevar y a domicilio' },
      { icon: 'coffee', label: 'Desayuno y brunch' },
      { icon: 'wheelchair', label: 'Acceso adaptado' },
      { icon: 'car', label: 'Aparcamiento en la calle' },
    ],
  },

  llegar: {
    title: 'Cómo llegar',
    description:
      'Estamos en la Ctra. de Valls, 70, en El Vendrell. Hay plazas gratuitas en la calle, aunque en hora punta cuesta encontrar sitio.',
  },

  cierre: {
    titleA: '¿Te guardamos',
    titleB: 'una mesa?',
    body: 'Llámanos para reservar, sobre todo si venís en grupo. También puedes pedir para llevar o a domicilio.',
  },

  gallery: {
    title: 'El local, por dentro',
  },

  footer: {
    description:
      'Cocina marroquí halal en El Vendrell. Tajín, cuscús de los viernes, parrilla, pescado y desayunos desde primera hora.',
  },

  carta: {
    headerLead:
      'Cocina marroquí, parrilla, pescado y desayunos. El cuscús solo se sirve los viernes. Precios en euros, IVA incluido salvo error.',
    searchPlaceholder: 'Buscar en la carta: tajín, tacos, té…',
    empty: 'No encontramos ese plato. Llámanos y te decimos si lo tenemos hoy.',
    footnotePrefix: 'Para alérgenos, consulta al personal. Pedidos y reservas: ',
    hoursNote: `${hoursSummary}. El resto del horario, por confirmar.`,
    closingTitle: '¿Lo pides para llevar o te sientas a comer?',
    closingText: 'Hay servicio en el local, para llevar y entrega a domicilio.',
  },

  info: {
    lead: 'Todo lo práctico para tu visita: horario, cómo llegar, dónde aparcar y qué puedes pedir. Si te queda alguna duda, llámanos.',
    horarioDesc: 'Lunes cerrado. Los martes abrimos a las 12:30; el resto del horario está pendiente de confirmar.',
    horarioNote: 'El horario puede variar en festivos. Llámanos si vienes desde lejos.',
    couscousTitle: 'Cuscús, solo los viernes',
    couscousText: 'Se prepara ese día y se sirve mientras dure la olla.',
    llegarDesc:
      'En la Ctra. de Valls, 70, con plazas gratuitas en la calle. En hora punta cuesta encontrar sitio.',
    serviciosTitle: 'Lo que encontrarás',
    serviciosDesc: 'Servicios confirmados en la ficha de Google del restaurante.',
    servicios: [
      {
        icon: 'moon',
        title: 'Comer allí y terraza',
        detail: 'Servicio en mesa y en barra, también en la terraza.',
      },
      {
        icon: 'delivery',
        title: 'Para llevar y a domicilio',
        detail: 'Recogida en el local, entrega a domicilio y entrega sin contacto.',
      },
      {
        icon: 'coffee',
        title: 'Ambiente tranquilo',
        detail: 'Local climatizado, informal y tranquilo, con música suave.',
      },
      {
        icon: 'family',
        title: 'Ideal para familias',
        detail: 'Apto para niños y con menú infantil. También para grupos.',
      },
      {
        icon: 'wheelchair',
        title: 'Accesible',
        detail: 'Acceso, aseo y aparcamiento adaptados para sillas de ruedas.',
      },
      {
        icon: 'check',
        title: 'Wi-Fi y pago con tarjeta',
        detail: 'Wi-Fi gratis y pago con tarjeta de crédito, débito o móvil (NFC).',
      },
    ],
    reservaNote: '¿Venís en grupo? Llama antes al 666 05 55 26 y os guardamos la mesa.',
    faqTitle: 'Preguntas frecuentes',
    faqDesc: 'Las dudas que más nos llegan por teléfono.',
    faqHelp: '¿No encuentras tu pregunta?',
    faq: [
      {
        question: '¿Es toda la cocina halal?',
        answer: 'Somos un restaurante halal.',
      },
      {
        question: '¿Hace falta reservar?',
        answer: 'Puedes llamar al 666 05 55 26 para reservar, sobre todo si sois grupo.',
      },
      {
        question: '¿Se puede ir con niños?',
        answer: 'Sí, es un local familiar y hay menú infantil.',
      },
      {
        question: '¿Hay opción para llevar?',
        answer: 'Sí: para llevar, a domicilio y entrega sin contacto.',
      },
      {
        question: '¿Qué día hay cuscús?',
        answer: 'Los viernes (7 €).',
      },
      {
        question: '¿Dónde se puede aparcar?',
        answer: 'En la calle, gratis; en horas punta puede costar encontrar plaza.',
      },
      {
        question: '¿Cuál es el horario?',
        answer:
          'Los lunes cerramos. Los martes abrimos a las 12:30; el resto del horario está pendiente de confirmar. Llámanos al 666 05 55 26 para asegurarte.',
      },
    ],
  },

  resenasPage: {
    lead: 'Reseñas publicadas en la ficha de Google del restaurante. Las mostramos tal cual, con extractos cuando el texto es largo.',
    footnote:
      'Reseñas de Google, extractos. Las reseñas no están verificadas por la web. Puedes leerlas todas en la ficha del restaurante.',
    highlightsTitle: 'Lo que más se repite',
    closingTitle: 'Ven a comprobarlo tú mismo',
    closingText: 'Llama para reservar o pide para llevar.',
  },

  legal: {
    nif: 'NIF/CIF y razón social: pendiente de facilitar por el titular.',
    prices:
      'Los precios de la carta están expresados en euros e incluyen el IVA. Pueden variar por temporada o disponibilidad de producto fresco; para alérgenos, consulta al personal.',
    jurisdictionCity: site.address.city,
    cookiesDescription:
      'Este sitio no usa cookies publicitarias ni de analítica. Solo Google puede usar cookies si decides cargar el mapa.',
    cookiesMap:
      'el mapa no se carga al abrir la página. Solo se incrusta si pulsas «Cargar mapa». En ese momento Google puede instalar sus propias cookies. Si no quieres, usa el botón «Abrir en Google Maps», que abre una pestaña nueva.',
  },

  noMatch: {
    lead: `Puede que el enlace haya cambiado. Vuelve al inicio, mira la carta o llámanos: seguimos en la Ctra. de Valls, 70, ${site.address.city}.`,
  },

  seo: {
    home: {
      title: 'Restaurante Halal Ambar · Cocina marroquí halal en El Vendrell',
      description:
        'Restaurante halal en El Vendrell: tajín, parrilla, pescado, cuscús los viernes y desayunos marroquíes. 4,9 sobre 5 con 154 reseñas en Google.',
    },
    carta: {
      title: 'La carta · Restaurante Halal Ambar, El Vendrell',
      description:
        'Carta completa de Ambar: desayunos marroquíes, tajín, cuscús de los viernes, tacos, pizzas, pescado fresco y marisco. Precios en euros.',
    },
    info: {
      title: 'El local y cómo llegar · Restaurante Halal Ambar, El Vendrell',
      description:
        'Horario, dirección, aparcamiento y servicios del Restaurante Halal Ambar en El Vendrell: terraza, para llevar, a domicilio y local accesible.',
    },
    resenas: {
      title: 'Reseñas · Restaurante Halal Ambar, El Vendrell',
      description:
        'Opiniones de clientes de Ambar en El Vendrell: 4,9 sobre 5 con 154 reseñas en Google. Cocina marroquí halal, tajín y cuscús de los viernes.',
    },
    notFound: {
      title: 'Página no encontrada · Restaurante Halal Ambar',
      description:
        'La página que buscas no existe. Vuelve al inicio o consulta la carta del Restaurante Halal Ambar en El Vendrell.',
    },
  },

  menuCount: menuItemCount,
}
