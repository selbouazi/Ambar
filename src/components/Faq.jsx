import { useId, useState } from 'react'
import Icon from './Icons'

/**
 * Acordeón accesible. Solo responde con datos confirmados del restaurante:
 * no se añaden servicios ni horarios que no estén en src/data/site.ts.
 */
export default function Faq({ items, className = '' }) {
  const [openIndex, setOpenIndex] = useState(0)
  const baseId = useId().replace(/[^a-zA-Z0-9]/g, '')

  return (
    <div className={`divide-y divide-cream-100/12 border-y border-cream-100/12 ${className}`}>
      {items.map((item, index) => {
        const isOpen = openIndex === index
        const buttonId = `faq-${baseId}-${index}-boton`
        const panelId = `faq-${baseId}-${index}-panel`

        return (
          <div key={item.question}>
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-6 py-5 text-left"
              >
                <span className="text-[17px] font-medium leading-snug text-cream-50 sm:text-[18px]">
                  {item.question}
                </span>
                <span
                  className={`grid h-9 w-9 shrink-0 place-items-center border ${
                    isOpen ? 'border-gold-500 bg-gold-500 text-night-950' : 'border-cream-100/30 text-cream-200'
                  }`}
                  aria-hidden="true"
                >
                  <Icon name={isOpen ? 'minus' : 'plus'} className="h-4 w-4" />
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="pb-6 pr-12"
            >
              <p className="max-w-2xl text-[16px] leading-relaxed text-cream-200">{item.answer}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
