import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import Reveal from '../components/Reveal'
import CTAButton from '../components/CTAButton'
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
        <div className="relative mx-auto w-full max-w-page px-gutter">
          <Reveal priority>
            <p className="tnum font-display text-hero text-gold-500/20">
              404
            </p>
            <h1 className="mt-3 max-w-2xl font-display text-h2">
              Esta página no está en la carta
            </h1>
            <p className="mt-4 max-w-xl text-body leading-relaxed text-cream-200">
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

            <p className="mt-10 text-meta text-cream-200">
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
