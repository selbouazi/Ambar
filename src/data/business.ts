/**
 * Compatibilidad: `business` sigue siendo el nombre que usan los
 * componentes. La fuente de verdad vive en `site.ts`.
 */
export * from './site'
export { site as business } from './site'

/* TODO(confirmar con el titular): completar estos dos datos antes de publicar
   el aviso legal. Mientras estén vacíos, la web no los renderiza. */
export const legalName = ''
export const legalNif = ''
