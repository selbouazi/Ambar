import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import Reveal from '../components/Reveal'
import BrushLabel from '../components/BrushLabel'
import { StarPattern } from '../components/Ornament'
import { site, telHref } from '../data/site'
import { copy } from '../data/copy'

function LegalLayout({ title, description, path, children }) {
  return (
    <>
      <Seo title={`${title} · ${site.name}`} description={description} path={path} />

      <header className="relative overflow-hidden bg-night-950 pb-12 pt-28 sm:pb-14 lg:pt-36">
        <StarPattern className="pointer-events-none absolute inset-0 h-full w-full star-texture" tile={150} />
        <div className="relative mx-auto max-w-[78rem] px-5 sm:px-8 lg:px-12">
          <Reveal priority>
            <BrushLabel variant={1} size="sm">
              Información legal
            </BrushLabel>
            <h1 className="mt-4 font-display text-[clamp(2.8rem,7vw,5rem)] uppercase leading-[0.9] text-cream-50">
              {title}
            </h1>
            <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-cream-200/70">
              {description}
            </p>
          </Reveal>
        </div>
      </header>

      <section className="bg-cream-50 py-16 text-ink sm:py-20">
        <div className="mx-auto max-w-[48rem] px-5 sm:px-8">
          <div className="space-y-9 text-[16px] leading-relaxed text-ink-soft [&_a]:font-medium [&_a]:text-gold-700 [&_a]:underline [&_a]:underline-offset-4 [&_h2]:font-display [&_h2]:text-[26px] [&_h2]:uppercase [&_h2]:leading-tight [&_h2]:text-ink [&_li]:pl-1 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
            {children}
          </div>

          <div className="mt-12 flex flex-wrap gap-x-6 gap-y-3 border-t border-ink/15 pt-6 text-[14px]">
            <Link to="/aviso-legal" className="text-gold-700 underline underline-offset-4">
              Aviso legal
            </Link>
            <Link to="/politica-de-cookies" className="text-gold-700 underline underline-offset-4">
              Política de cookies
            </Link>
            <Link to="/el-local" className="text-gold-700 underline underline-offset-4">
              Volver a El local
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export function AvisoLegal() {
  return (
    <LegalLayout
      title="Aviso legal"
      description="Datos del titular, condiciones de uso y propiedad intelectual del sitio web del Restaurante Halal Ambar."
      path="/aviso-legal"
    >
      <section>
        <h2>1. Titular del sitio</h2>
        <ul>
          <li>Denominación: {site.name}</li>
          <li>Domicilio: {site.address.full}</li>
          <li>
            Teléfono: <a href={telHref}>{site.phone.display}</a>
          </li>
          {/* TODO(confirmar): el titular debe facilitar su NIF/CIF y, si procede,
              los datos registrales antes de publicar esta página. */}
          <li>{copy.legal.nif}</li>
        </ul>
      </section>

      <section>
        <h2>2. Objeto</h2>
        <p>
          Este sitio web tiene una finalidad informativa: dar a conocer el restaurante,
          su carta, su horario y sus formas de contacto. La información publicada no
          constituye una oferta contractual.
        </p>
      </section>

      <section>
        <h2>3. Precios y disponibilidad</h2>
        <p>{copy.legal.prices}</p>
      </section>

      <section>
        <h2>4. Propiedad intelectual</h2>
        <p>
          Los textos, el diseño y las fotografías de este sitio pertenecen al titular
          del restaurante o se usan con su autorización. No se permite su reproducción,
          distribución ni transformación sin permiso expreso.
        </p>
      </section>

      <section>
        <h2>5. Responsabilidad</h2>
        <p>
          El titular procura que la información esté actualizada, pero no garantiza la
          ausencia de errores. No se responsabiliza de los daños derivados del uso del
          sitio ni del contenido de páginas de terceros enlazadas.
        </p>
      </section>

      <section>
        <h2>6. Legislación aplicable</h2>
        <p>
          Este sitio se rige por la legislación española. Cualquier controversia se
          someterá a los juzgados y tribunales de {copy.legal.jurisdictionCity}.
        </p>
      </section>
    </LegalLayout>
  )
}

export function Cookies() {
  return (
    <LegalLayout
      title="Política de cookies"
      description={copy.legal.cookiesDescription}
      path="/politica-de-cookies"
    >
      <section>
        <h2>1. Qué son las cookies</h2>
        <p>
          Una cookie es un archivo pequeño que un sitio web guarda en tu navegador para
          recordar información. También existen tecnologías similares, como el
          almacenamiento local.
        </p>
      </section>

      <section>
        <h2>2. Cookies que usa este sitio</h2>
        <p>
          <strong>Ninguna cookie propia.</strong> No usamos cookies publicitarias, ni de
          analítica, ni de perfilado. No hay banner de cookies porque no hay nada que
          consentir al entrar.
        </p>
      </section>

      <section>
        <h2>3. Servicios de terceros</h2>
        <ul>
          <li>
            <strong>Google Maps:</strong> {copy.legal.cookiesMap}
          </li>
          <li>
            <strong>Instagram:</strong> los enlaces a Instagram abren una pestaña nueva.
            Al visitarlos, se aplican la política de cookies y privacidad de Instagram.
          </li>
        </ul>
        <p className="mt-4">
          Las tipografías se sirven desde este mismo dominio, así que no se envía
          ninguna petición a Google para cargar la página.
        </p>
      </section>

      <section>
        <h2>4. Cómo desactivarlas</h2>
        <p>
          Puedes borrar o bloquear las cookies desde la configuración de tu navegador
          (Chrome, Safari, Firefox, Edge). Si bloqueas las de Google, el mapa incrustado
          puede no funcionar; el resto de la web seguirá funcionando con normalidad.
        </p>
      </section>

      <section>
        <h2>5. Cambios</h2>
        <p>
          Si en el futuro se añade analítica o publicidad, esta política se actualizará
          y se pedirá consentimiento antes de instalar cookies no esenciales.
        </p>
      </section>
    </LegalLayout>
  )
}
