import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import CTAButton from '../components/CTAButton'
import { ZelligePattern } from '../components/Zellige'
import { business, telHref } from '../data/business'

export default function NoMatch() {
  return (
    <>
      <Seo
        title="Página no encontrada · Restaurante Halal Ambar"
        description="La página que buscas no existe. Vuelve al inicio o consulta la carta del Restaurante Halal Ambar en El Vendrell."
        path="/404"
      />

      <section className="relative flex min-h-[80svh] items-center overflow-hidden bg-maroc-950 py-24 text-cream-50">
        <ZelligePattern className="pointer-events-none absolute inset-0 h-full w-full text-gold-400 opacity-[0.05]" tile={130} />
        <div className="relative mx-auto w-full max-w-[75rem] px-5 sm:px-8 lg:px-12">
          <p className="tnum font-display text-[clamp(5rem,18vw,12rem)] font-normal leading-none text-gold-500/25">
            404
          </p>
          <h1 className="mt-2 font-display text-[clamp(2.25rem,5vw,4rem)] font-normal leading-tight tracking-[-0.02em]">
            Esta página no está en la carta
          </h1>
          <p className="mt-4 max-w-lg text-[17px] leading-relaxed text-cream-200/70">
            Puede que el enlace haya cambiado. Vuelve al inicio, mira la carta o
            llámanos: seguimos en la Ctra. de Valls, 70, {business.address.city}.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <CTAButton to="/" variant="primary" icon="arrow">
              Volver al inicio
            </CTAButton>
            <CTAButton to="/carta" variant="onDark">
              Ver la carta
            </CTAButton>
            <CTAButton href={telHref} variant="onDark" icon="phone">
              Llamar
            </CTAButton>
          </div>

          <p className="mt-10 text-[14px] text-cream-200/70">
            También puedes{' '}
            <Link to="/informacion" className="gold-underline text-gold-300">
              ver cómo llegar
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  )
}
