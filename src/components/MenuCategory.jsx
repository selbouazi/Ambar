import { FadeIn } from './FadeIn'
import Icon from './Icons'
import Photo from './Photo'

export default function MenuCategory({ category, index }) {
  return (
    <section id={category.slug} className="scroll-mt-28">
      {/* Cabecera de categoría */}
      <div className="grid items-end gap-6 md:grid-cols-[1fr_auto] md:gap-14">
        <FadeIn y={20}>
          <p className="font-display text-sm italic text-gold-500">
            {String(index + 1).padStart(2, '0')}
          </p>
          <h2 className="mt-2 font-display text-4xl font-medium leading-none sm:text-5xl">
            {category.nombre}
          </h2>
          <div className="mt-4 h-px w-24 bg-gold-500/60" />
          {(category.nota || category.menu_extra || category.sabores) && (
            <div className="mt-5 space-y-1 text-sm text-ink/65">
              {category.nota && <p>{category.nota}</p>}
              {category.menu_extra && (
                <p className="font-medium uppercase tracking-wide text-gold-600">
                  <Icon name="menu" className="mr-1 inline h-3.5 w-3.5" />
                  {category.menu_extra}
                </p>
              )}
              {category.sabores && (
                <p>
                  <span className="font-medium text-ink/80">Sabores:</span>{' '}
                  {category.sabores.join(' · ')}
                </p>
              )}
            </div>
          )}
        </FadeIn>
      </div>

      {/* Opcional: foto de cabecera de categoría */}
      {category.cover && (
        <FadeIn className="mt-8" y={26}>
          <Photo
            src={category.cover.src}
            label={category.cover.label}
            ratio="aspect-[16/6] md:aspect-[16/5]"
            className="w-full"
          />
        </FadeIn>
      )}

      {/* Lista editorial de platos */}
      <div className="mt-8">
        {category.items.map((item, i) => {
          const missing = item.precio === '[FALTA DATO]'
          return (
            <FadeIn key={item.nombre} delay={Math.min(i * 0.04, 0.3)} y={18}>
              <div className="group flex items-baseline gap-4 border-b border-ink/10 py-4 transition-colors duration-300 hover:border-gold-500/40 md:py-5">
                <span
                  aria-hidden="true"
                  className="hidden shrink-0 text-[10px] font-medium uppercase tracking-widest text-ink/30 sm:block"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-[1.15rem] font-medium leading-snug text-ink md:text-xl">
                    {item.nombre}
                  </h3>
                  {item.descripcion && (
                    <p className="mt-0.5 max-w-2xl text-sm text-ink/60">
                      {item.descripcion}
                    </p>
                  )}
                  {item.nota && (
                    <p className="mt-0.5 text-xs italic text-ink/50">{item.nota}</p>
                  )}
                  {missing && (
                    <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-600">
                      Precio pendiente · [FALTA DATO]
                    </p>
                  )}
                </div>
                <div className="shrink-0 text-right">
                  <span
                    className={
                      missing
                        ? 'font-display text-sm text-gold-600'
                        : 'font-display text-lg font-semibold text-gold-600'
                    }
                  >
                    {missing ? '[FALTA DATO]' : item.precio}
                  </span>
                </div>
              </div>
            </FadeIn>
          )
        })}
      </div>
    </section>
  )
}