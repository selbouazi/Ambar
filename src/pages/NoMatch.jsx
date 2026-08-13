import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import CTAButton from '../components/CTAButton'
import Icon from '../components/Icons'
import { ZelligeGrain } from '../components/Zellige'
import { restaurante } from '../data/restaurante'

export default function NoMatch() {
  return (
    <>
      <Seo
        title="Página no encontrada · Restaurante Halal Ambar"
        description="La página que buscas no existe en la web de Restaurante Halal Ambar."
        path="/404"
        withRestaurantJsonLd={false}
      />
      <section className="relative flex min-h-svh items-center justify-center overflow-hidden bg-maroc-950 text-center text-cream-50">
        <ZelligeGrain className="absolute inset-0 h-full w-full text-gold-400 opacity-[0.05]" />
        <div className="relative px-6 py-32">
          <p className="font-display text-8xl font-semibold italic text-gold-400 lg:text-9xl">404</p>
          <h1 className="mt-4 font-display text-3xl font-medium italic text-cream-100 lg:text-4xl">
            Esta página no está en la carta
          </h1>
          <p className="mx-auto mt-4 max-w-md text-cream-200/65">
            La dirección ha cambiado o nunca existió. Volvamos a lugares conocidos.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <CTAButton to="/" variant="gold" icon="arrow">
              Volver al inicio
            </CTAButton>
            <CTAButton to="/carta" variant="outlineCream" icon="menu">
              Ver la carta
            </CTAButton>
          </div>
          <p className="mt-8 flex items-center justify-center gap-2 text-xs text-cream-200/40">
            <Icon name="pin" className="h-3.5 w-3.5" />
            <Link to="/contacto" className="gold-underline text-gold-400">
              {restaurante.negocio.telefono} · Ctra. de Valls, 70, El Vendrell
            </Link>
          </p>
        </div>
      </section>
    </>
  )
}