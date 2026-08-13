import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Photo from './Photo'
import Icon from './Icons'
import { EASE } from './FadeIn'
import { slugCategoria } from '../data/restaurante'

export default function DishCard({ photo, label, name, description, price, note, category }) {
  const to = category ? `/carta#${slugCategoria(category)}` : '/carta'

  return (
    <motion.article
      whileHover="hover"
      className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-maroc-900 md:rounded-[2.5rem]"
    >
      <div className="relative overflow-hidden">
        <motion.div
          variants={{ hover: { scale: 1.045 } }}
          transition={{ duration: 0.9, ease: EASE }}
          className="aspect-[4/3] w-full"
        >
          <Photo src={photo} label={label} ratio="w-full h-full" rounded="rounded-none" />
        </motion.div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-maroc-900 via-maroc-900/20 to-transparent" />
        {note && (
          <span className="absolute left-4 top-4 rounded-full border border-gold-400/50 bg-maroc-950/60 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-gold-300 backdrop-blur">
            {note}
          </span>
        )}
      </div>

      <div className="relative flex flex-1 flex-col -mt-10 px-6 pb-6 md:px-7 md:pb-7">
        <div className="flex items-end justify-between gap-4">
          <h3 className="font-display text-2xl font-medium leading-tight text-cream-50 md:text-[1.7rem]">
            {name}
          </h3>
          <p className="shrink-0 font-display text-2xl font-semibold text-gold-400 md:text-[1.7rem]">
            {price}
          </p>
        </div>
        {description && (
          <p className="mt-2 text-sm leading-relaxed text-cream-200/65">{description}</p>
        )}
        <span className="mt-5 inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.22em] text-cream-200/50">
          <Link
            to={to}
            className="gold-underline text-gold-400/90"
          >
            Ver en la carta
          </Link>
          <Icon name="arrow" className="h-3.5 w-3.5 text-gold-400/90 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </motion.article>
  )
}