import { PawPrint } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const doorColors = [
  { dark: '#49291f', mid: '#6c3e2d', light: '#87563b' },
  { dark: '#a85f26', mid: '#d58a35', light: '#efb457' },
  { dark: '#874033', mid: '#b75c49', light: '#d87862' },
]

export default function PuppyCard({ puppy, colorIndex = 0 }) {
  const [doorOpen, setDoorOpen] = useState(false)
  const [doorDelay] = useState(() => `${-Math.random() * 12}s`)
  const doorColor = doorColors[colorIndex % doorColors.length]

  return (
    <article className="puppy-card">
      <Link
        aria-label={`Meet ${puppy.name}, ${puppy.detail.toLowerCase()}, ${puppy.age} ${puppy.breed}`}
        className="puppy-card__link"
        onClick={(event) => {
          if (doorOpen) return
          event.preventDefault()
          setDoorOpen(true)
        }}
        to={`/puppies/${puppy.slug}`}
      >
        <div className="puppy-card__details">
          <h3 className="puppy-card__name">{puppy.name}</h3>
          <p className="puppy-card__meta">{puppy.breed}, {puppy.detail.toLowerCase()}, {puppy.age}</p>
          <p className="puppy-card__breed">{puppy.origin}</p>
        </div>
        <div
          className="puppy-door"
          data-open={doorOpen}
          style={{
            '--door-delay': doorDelay,
            '--door-dark': doorColor.dark,
            '--door-mid': doorColor.mid,
            '--door-light': doorColor.light,
          }}
        >
          <img
            alt={`${puppy.name}, a ${puppy.breed} puppy`}
            className="puppy-door__image"
            loading="lazy"
            src={puppy.image}
          />
          <span aria-hidden="true" className="puppy-door__panel">
            <PawPrint className="puppy-door__paw" size={24} />
            <span className="puppy-door__knob" />
          </span>
          <span className="puppy-door__badge">Available</span>
        </div>
      </Link>
    </article>
  )
}
