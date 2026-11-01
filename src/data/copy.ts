/**
 * Textos de la interfaz.
 *
 * Igual que los datos, hay dos versiones: la real (`REAL`) y la de ejemplo
 * (`PLACEHOLDER`). `copy` exporta una u otra según `PROTOTIPO`.
 *
 * La variante que no se usa no se exporta y el bundler la elimina, así que en
 * modo prototipo los textos reales no llegan al navegador.
 */

import { PROTOTIPO } from '../config'
import { business, hoursSummary } from './business'
import { menuItemCount } from './menu'

const REAL = {
  nav: {
    subtitle: 'Restaurante halal · El Vendrell',
  },

  hero: {
    kicker: 'Cocina marroquí halal · El Vendrell',
    lead: 'Tajines a fuego lento, cuscús solo los viernes y marisco fresco. La mesa de una familia marroquí, en la Ctra. de Valls.',
    panelTitle: 'Cocina halal',
    panelShort: 'Tajín, cuscús de los viernes y marisco fresco.',
    panelText: 'Tajín, cuscús de los viernes y marisco fresco. Todo se prepara al momento.',
  },

  historia: {
    title: 'Un rincón marroquí, abierto a toda la familia',
    description:
      'En Ambar cocinamos recetas marroquíes como se hacían en casa: a fuego lento, con calma y buenos ingredientes.',
    body: 'Tajines, cuscús solo los viernes, marisco fresco y unos desayunos que arrancan el día con el sabor del norte de África. Un local tranquilo y climatizado, donde venir con los niños, con amigos o a cenar sin prisa.',
    reserveNote: 'Reserva opcional: puedes venir sin avisar.',
  },

  cartaDestacada: {
    title: 'Lo que no puedes irte sin probar',
    description: 'Cinco platos que resumen la casa. La carta completa tiene mucho más.',
  },

  couscous: {
    title: 'Cuscús los viernes',
  },

  desayunos: {
    title: 'Desayunos marroquíes desde las nueve',
    description:
      'Msemmen y harxa recién hechos, con miel y queso, y un té que se sirve como en casa.',
    body: 'Es uno de los momentos que más se repiten en las reseñas: empezar el día aquí, sin prisa, con el té caliente y el pan todavía tibio.',
    note: 'También hay msemmen o harxa con miel y queso por 1,50 €.',
  },

  resenas: {
    title: 'Quien viene, repite',
    description: 'Opiniones reales publicadas en la ficha de Google.',
  },

  familias: {
    title: 'Para venir en familia, sin prisa',
    description:
      'Un local tranquilo y climatizado, con música suave y raciones generosas. Lo que más repiten quienes vienen con niños.',
    services: [
      { icon: 'moon', label: 'Cocina halal' },
      { icon: 'family', label: 'Ideal para familias' },
      { icon: 'delivery', label: 'A domicilio y para llevar' },
      { icon: 'coffee', label: 'Buen café' },
      { icon: 'wheelchair', label: 'Local accesible' },
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
    body: 'Puedes venir sin reserva o llamarnos para asegurar mesa. Estamos de martes a domingo, de 9:00 a 24:00.',
  },

  gallery: {
    title: 'El local, por dentro',
  },

  footer: {
    description:
      'Cocina marroquí halal en El Vendrell. Tajines, cuscús de los viernes, marisco fresco y desayunos desde primera hora.',
  },

  carta: {
    headerLead: `${menuItemCount} platos de cocina marroquí y brasa. El cuscús solo se sirve los viernes; el resto, de martes a domingo.`,
    searchPlaceholder: 'Buscar en la carta: tajín, tacos, té…',
    empty: 'No encontramos ese plato. Puedes llamarnos y te decimos si lo tenemos hoy.',
    footnotePrefix:
      'Precios en euros. La carta puede cambiar según temporada y producto fresco. Para pedir o preguntar por un plato, llama al ',
    hoursNote: `${hoursSummary}. Lunes cerrado.`,
    closingTitle: '¿Lo pides para llevar o te sientas a comer?',
    closingText: 'Comer en el local, para llevar y entrega a domicilio.',
  },

  info: {
    lead: 'Todo lo práctico para tu visita: horario, cómo llegar, dónde aparcar y qué puedes pedir. Si te queda alguna duda, llámanos.',
    horarioDesc: 'Abrimos de martes a domingo, de 9:00 a 24:00. El lunes descansamos.',
    horarioNote: 'El horario puede variar en festivos. Llámanos si vienes desde lejos.',
    couscousTitle: 'Cuscús solo los viernes',
    couscousText: 'Se prepara al momento y se sirve hasta que se acaba.',
    llegarDesc:
      'En la Ctra. de Valls, 70, con plazas gratuitas en la calle. En hora punta cuesta encontrar sitio.',
    serviciosTitle: 'Lo que encontrarás',
    serviciosDesc: 'Solo lo que de verdad ofrecemos. Si algo no aparece aquí, pregúntanos.',
    servicios: [
      {
        icon: 'moon',
        title: 'Cocina halal',
        detail: 'Toda la carta es halal, de principio a fin.',
      },
      {
        icon: 'family',
        title: 'Para familias',
        detail: 'Local amplio, climatizado y tranquilo, también con niños.',
      },
      {
        icon: 'delivery',
        title: 'Para llevar y a domicilio',
        detail: 'Puedes pedir para recoger o recibirlo en casa.',
      },
      {
        icon: 'coffee',
        title: 'Buen café',
        detail: 'Café y té marroquí a cualquier hora del día.',
      },
      {
        icon: 'wheelchair',
        title: 'Local accesible',
        detail: 'Acceso sin escalones desde la calle.',
      },
      {
        icon: 'car',
        title: 'Aparcamiento',
        detail: 'Plazas gratuitas en la calle, algo difíciles en hora punta.',
      },
    ],
    reservaNote:
      'Reserva opcional: puedes venir sin avisar. Si sois un grupo, mejor llámanos y te guardamos la mesa.',
    faqTitle: 'Preguntas frecuentes',
    faqDesc: 'Las dudas que más nos llegan por teléfono.',
    faqHelp: '¿No encuentras tu pregunta?',
    faq: [
      {
        question: '¿Es toda la cocina halal?',
        answer:
          'Sí. El restaurante es halal: la carne y la cocina siguen las normas halal en todos los platos de la carta.',
      },
      {
        question: '¿Hace falta reservar?',
        answer:
          'No es obligatorio. Puedes venir sin reserva o llamarnos para asegurar mesa, sobre todo si sois un grupo.',
      },
      {
        question: '¿Se puede ir con niños?',
        answer:
          'Sí. El local es tranquilo, está climatizado y es apto para familias, también con niños pequeños.',
      },
      {
        question: '¿Hay opción para llevar?',
        answer:
          'Sí. Puedes pedir para llevar y también hay servicio de entrega a domicilio, incluida la entrega sin contacto.',
      },
      {
        question: '¿Qué día hay cuscús?',
        answer:
          'Los viernes. Es el único día que se prepara cuscús; el resto de la semana encontrarás tajines, brasa, pescado y marisco.',
      },
      {
        question: '¿Dónde se puede aparcar?',
        answer:
          'Hay plazas gratuitas en la calle, junto al restaurante. En hora punta cuesta más encontrar sitio.',
      },
      {
        question: '¿Cuál es el horario?',
        answer: 'De martes a domingo, de 9:00 a 24:00. Los lunes cerramos.',
      },
    ],
  },

  resenasPage: {
    lead: 'Reseñas publicadas en la ficha de Google del restaurante. Las mostramos tal cual, sin retocar.',
    ratingPlaceholder: 'Reseñas de ejemplo',
    footnote:
      'Las reseñas se atribuyen a «Reseña en Google» cuando la persona no publica su nombre. Puedes leerlas todas, con sus respuestas, en la ficha del restaurante en Google.',
    closingTitle: 'Ven a comprobarlo tú mismo',
    closingText: 'Reserva opcional. También puedes pedir para llevar.',
  },

  legal: {
    nif: 'NIF/CIF: pendiente de facilitar por el titular.',
    couscous:
      'El cuscús solo se sirve los viernes. Para confirmar un precio o la disponibilidad de un plato, llama al restaurante.',
    jurisdictionCity: business.address.city,
    cookiesDescription:
      'Este sitio no usa cookies publicitarias ni de analítica. Solo Google puede usar cookies si decides cargar el mapa.',
    cookiesMap:
      'el mapa no se carga al abrir la página. Solo se incrusta si pulsas «Ver el mapa». En ese momento Google puede instalar sus propias cookies. Si no quieres, usa el botón «Abrir en Google Maps», que abre una pestaña nueva.',
  },

  noMatch: {
    lead: `Puede que el enlace haya cambiado. Vuelve al inicio, mira la carta o llámanos: seguimos en la Ctra. de Valls, 70, ${business.address.city}.`,
  },

  seo: {
    home: {
      title: 'Restaurante halal en El Vendrell · Ambar',
      description:
        'Cocina marroquí halal en El Vendrell: tajines, cuscús los viernes, marisco fresco y desayunos marroquíes. 4,9 sobre 5 con 153 reseñas en Google.',
    },
    carta: {
      title: 'La carta · Restaurante halal Ambar, El Vendrell',
      description:
        'Carta completa de Ambar: desayunos marroquíes, tajines, cuscús de los viernes, tacos, pizzas, pescado fresco y marisco. Precios actualizados.',
    },
    info: {
      title: 'El local y cómo llegar · Restaurante halal Ambar, El Vendrell',
      description:
        'Horario, dirección, aparcamiento y servicios del Restaurante Halal Ambar en El Vendrell: cocina halal, para llevar, a domicilio y local accesible.',
    },
    resenas: {
      title: 'Opiniones · Restaurante halal Ambar, El Vendrell',
      description: `Opiniones de clientes de Ambar en El Vendrell: ${business.rating.score} sobre 5 con ${business.rating.count} reseñas en Google. Cocina marroquí halal, tajín y cuscús.`,
    },
    notFound: {
      title: 'Página no encontrada · Restaurante Halal Ambar',
      description:
        'La página que buscas no existe. Vuelve al inicio o consulta la carta del Restaurante Halal Ambar en El Vendrell.',
    },
  },
}

const PLACEHOLDER: typeof REAL = {
  nav: {
    subtitle: 'Restaurante halal',
  },

  hero: {
    kicker: 'Cocina marroquí halal',
    lead: 'Aquí irá el texto de presentación del restaurante.',
    panelTitle: 'Cocina halal',
    panelShort: 'Aquí irá el texto sobre la cocina.',
    panelText: 'Aquí irá el texto sobre la cocina.',
  },

  historia: {
    title: 'Un rincón marroquí, abierto a toda la familia',
    description: 'Aquí irá el texto de presentación de la casa.',
    body: 'Aquí irá el texto sobre la historia y la cocina del restaurante.',
    reserveNote: 'Reserva opcional: puedes venir sin avisar.',
  },

  cartaDestacada: {
    title: 'Lo que no puedes irte sin probar',
    description: 'Aquí irá el texto sobre los platos destacados.',
  },

  couscous: {
    title: 'Plato destacado de ejemplo',
  },

  desayunos: {
    title: 'Desayunos marroquíes',
    description: 'Aquí irá el texto sobre los desayunos.',
    body: 'Aquí irá el texto sobre los desayunos y el té.',
    note: 'Aquí irá la nota sobre los desayunos.',
  },

  resenas: {
    title: 'Quien viene, repite',
    description: 'Aquí irá el texto sobre las opiniones.',
  },

  familias: {
    title: 'Para venir en familia, sin prisa',
    description: 'Aquí irá el texto sobre el local y las familias.',
    services: [
      { icon: 'moon', label: 'Servicio de ejemplo' },
      { icon: 'family', label: 'Atención de ejemplo' },
      { icon: 'delivery', label: 'Espacio de ejemplo' },
      { icon: 'coffee', label: 'Producto de ejemplo' },
      { icon: 'wheelchair', label: 'Acceso de ejemplo' },
    ],
  },

  llegar: {
    title: 'Cómo llegar',
    description: 'Aquí irá el texto con la dirección y las indicaciones para llegar.',
  },

  cierre: {
    titleA: '¿Te guardamos',
    titleB: 'una mesa?',
    body: 'Aquí irá el texto sobre las reservas y el horario.',
  },

  gallery: {
    title: 'El local, por dentro',
  },

  footer: {
    description: 'Aquí irá la descripción del restaurante.',
  },

  carta: {
    headerLead: 'Aquí irá la introducción de la carta.',
    searchPlaceholder: 'Buscar en la carta',
    empty: 'No hay resultados para esa búsqueda.',
    footnotePrefix: 'Aquí irá la nota sobre precios y disponibilidad. Teléfono: ',
    hoursNote: `${hoursSummary}.`,
    closingTitle: '¿Lo pides para llevar o te sientas a comer?',
    closingText: 'Aquí irá el texto sobre las formas de pedir.',
  },

  info: {
    lead: 'Aquí irá el texto de introducción con la información práctica del local.',
    horarioDesc: 'Aquí irá el texto sobre el horario.',
    horarioNote: 'Aquí irá la nota sobre festivos y cambios de horario.',
    couscousTitle: 'Plato destacado de ejemplo',
    couscousText: 'Aquí irá el texto sobre el plato destacado.',
    llegarDesc: 'Aquí irá el texto con la dirección y las indicaciones para llegar.',
    serviciosTitle: 'Lo que encontrarás',
    serviciosDesc: 'Aquí irá el texto de introducción a los servicios.',
    servicios: [
      { icon: 'moon', title: 'Servicio de ejemplo', detail: 'Aquí irá la descripción del servicio.' },
      { icon: 'family', title: 'Atención de ejemplo', detail: 'Aquí irá la descripción del servicio.' },
      { icon: 'delivery', title: 'Espacio de ejemplo', detail: 'Aquí irá la descripción del servicio.' },
      { icon: 'coffee', title: 'Producto de ejemplo', detail: 'Aquí irá la descripción del servicio.' },
      { icon: 'wheelchair', title: 'Acceso de ejemplo', detail: 'Aquí irá la descripción del servicio.' },
      { icon: 'car', title: 'Aparcamiento de ejemplo', detail: 'Aquí irá la descripción del servicio.' },
    ],
    reservaNote: 'Aquí irá la nota sobre reservas y grupos.',
    faqTitle: 'Preguntas frecuentes',
    faqDesc: 'Aquí irá el texto de introducción a las preguntas.',
    faqHelp: '¿No encuentras tu pregunta?',
    faq: [
      { question: '¿Es toda la cocina halal?', answer: 'Aquí irá la respuesta a esta pregunta.' },
      { question: '¿Hace falta reservar?', answer: 'Aquí irá la respuesta a esta pregunta.' },
      { question: '¿Se puede ir con niños?', answer: 'Aquí irá la respuesta a esta pregunta.' },
      { question: '¿Hay opción para llevar?', answer: 'Aquí irá la respuesta a esta pregunta.' },
      { question: '¿Qué día hay cuscús?', answer: 'Aquí irá la respuesta a esta pregunta.' },
      { question: '¿Dónde se puede aparcar?', answer: 'Aquí irá la respuesta a esta pregunta.' },
      { question: '¿Cuál es el horario?', answer: 'Aquí irá la respuesta a esta pregunta.' },
    ],
  },

  resenasPage: {
    lead: 'Aquí irá el texto de introducción a las opiniones.',
    ratingPlaceholder: 'Reseñas de ejemplo',
    footnote: 'Aquí irá la nota sobre el origen de las reseñas.',
    closingTitle: 'Ven a comprobarlo tú mismo',
    closingText: 'Aquí irá el texto de cierre.',
  },

  legal: {
    nif: 'NIF/CIF: dato de ejemplo.',
    couscous: 'Aquí irá la nota sobre precios y disponibilidad de los platos.',
    jurisdictionCity: 'la ciudad del restaurante',
    cookiesDescription: 'Aquí irá el texto sobre el uso de cookies en la web.',
    cookiesMap:
      'aquí irá el texto sobre el mapa y las cookies de terceros.',
  },

  noMatch: {
    lead: 'Puede que el enlace haya cambiado. Vuelve al inicio o consulta la carta.',
  },

  seo: {
    home: {
      title: 'Ambar · Prototipo de diseño',
      description: 'Prototipo de diseño de la web del restaurante Ambar. Contenido de ejemplo.',
    },
    carta: {
      title: 'La carta · Ambar · Prototipo',
      description: 'Prototipo de la carta del restaurante Ambar. Contenido de ejemplo.',
    },
    info: {
      title: 'El local · Ambar · Prototipo',
      description: 'Prototipo de la página del local del restaurante Ambar. Contenido de ejemplo.',
    },
    resenas: {
      title: 'Opiniones · Ambar · Prototipo',
      description: 'Prototipo de la página de opiniones del restaurante Ambar. Contenido de ejemplo.',
    },
    notFound: {
      title: 'Página no encontrada · Ambar · Prototipo',
      description: 'Prototipo de diseño de la web del restaurante Ambar.',
    },
  },
}

export const copy = PROTOTIPO ? PLACEHOLDER : REAL
