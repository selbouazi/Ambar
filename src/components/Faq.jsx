import { useId, useState } from 'react'
import Icon from './Icons'

/**
 * Acordeón accesible. Solo responde con datos verificados del restaurante:
 * no se añaden servicios ni horarios que no estén en src/data/business.ts.
 */
export default function Faq({ items, className = '' }) {
  const [openIndex, setOpenIndex] = useState(0)
  const baseId = useId().replace(/[^a-zA-Z0-9]/g, '')

  return (
    <div className={`divide-y divide-ink/12 border-y border-ink/12 ${className}`}>
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
                <span className="font-display text-[19px] font-medium leading-snug text-ink sm:text-[21px]">
                  {item.question}
                </span>
                <span
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-colors ${
                    isOpen ? 'border-gold-600 text-gold-700' : 'border-ink/20 text-ink-soft'
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
              <p className="max-w-2xl text-[16px] leading-relaxed text-ink-soft">{item.answer}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
