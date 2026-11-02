import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import Reveal from '../components/Reveal'
import CTAButton from '../components/CTAButton'
import BrushLabel from '../components/BrushLabel'
import { StarPattern, Leaf } from '../components/Ornament'
import { telHref } from '../data/site'
import { copy } from '../data/copy'

export default function NoMatch() {
  return (
    <>
      <Seo
        title={copy.seo.notFound.title}
        description={copy.seo.notFound.description}
        path="/404"
      />

      <section className="relative flex min-h-[85svh] items-center overflow-hidden bg-night-950 py-24 text-cream-50">
        <StarPattern className="pointer-events-none absolute inset-0 h-full w-full star-texture" tile={160} />
        <Leaf className="pointer-events-none absolute -right-8 bottom-0 h-52 w-40 text-leaf opacity-20" />
        <div className="relative mx-auto w-full max-w-[78rem] px-5 sm:px-8 lg:px-12">
          <Reveal priority>
            <BrushLabel variant={3} size="sm">
              Fuera de carta
            </BrushLabel>
            <p className="tnum mt-4 font-display text-[clamp(6rem,20vw,14rem)] uppercase leading-[0.78] text-gold-500/25">
              404
            </p>
            <h1 className="mt-3 max-w-2xl font-display text-[clamp(2.4rem,6vw,4.6rem)] uppercase leading-[0.92]">
              Esta página no está en la carta
            </h1>
            <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-cream-200/75">
              {copy.noMatch.lead}
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
              <Link to="/el-local" className="gold-underline text-gold-300">
                ver cómo llegar
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
