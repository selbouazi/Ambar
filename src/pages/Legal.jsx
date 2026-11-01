import Seo from '../components/Seo'
import Reveal from '../components/Reveal'
import { ZelligePattern } from '../components/Zellige'
import { business, telHref } from '../data/business'

function LegalLayout({ title, description, path, children }) {
  return (
    <>
      <Seo title={`${title} · ${business.name}`} description={description} path={path} />

      <header className="relative overflow-hidden bg-maroc-950 pb-12 pt-28 text-cream-50 sm:pb-14 lg:pt-36">
        <ZelligePattern className="pointer-events-none absolute inset-0 h-full w-full text-gold-400 opacity-[0.05]" tile={130} />
        <div className="relative mx-auto max-w-[75rem] px-5 sm:px-8 lg:px-12">
          <Reveal priority>
            <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-normal leading-[0.98] tracking-[-0.03em]">
              {title}
            </h1>
            <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-cream-200/70">
              {description}
            </p>
          </Reveal>
        </div>
      </header>

      <section className="bg-cream-50 py-16 sm:py-20">
        <div className="mx-auto max-w-[46rem] px-5 sm:px-8">
          <div className="space-y-8 text-[16px] leading-relaxed text-ink-soft [&_a]:text-gold-700 [&_a]:underline [&_a]:underline-offset-4 [&_h2]:font-display [&_h2]:text-[24px] [&_h2]:font-medium [&_h2]:leading-snug [&_h2]:text-ink [&_li]:pl-1 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
            {children}
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
          <li>Denominación: {business.name}</li>
          <li>
            Domicilio: {business.address.street}, {business.address.number},{' '}
            {business.address.postalCode} {business.address.city} ({business.address.region})
          </li>
          <li>
            Teléfono: <a href={telHref}>{business.phone.display}</a>
          </li>
          {/* TODO(confirmar): el titular debe facilitar su NIF/CIF y, si procede,
              los datos registrales antes de publicar esta página. */}
          <li>NIF/CIF: pendiente de facilitar por el titular.</li>
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
        <p>
          Los precios de la carta están expresados en euros y pueden variar por
          temporada, disponibilidad de producto fresco o cambios del establecimiento.
          El cuscús solo se sirve los viernes. Para confirmar un precio o la
          disponibilidad de un plato, llama al restaurante.
        </p>
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
          someterá a los juzgados y tribunales de {business.address.city}.
        </p>
      </section>
    </LegalLayout>
  )
}

export function Cookies() {
  return (
    <LegalLayout
      title="Política de cookies"
      description="Este sitio no usa cookies publicitarias ni de analítica. Solo Google puede usar cookies si decides cargar el mapa."
      path="/cookies"
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
            <strong>Google Maps:</strong> el mapa no se carga al abrir la página. Solo se
            incrusta si pulsas «Ver el mapa». En ese momento Google puede instalar sus
            propias cookies. Si no quieres, usa el botón «Abrir en Google Maps», que
            abre una pestaña nueva.
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
