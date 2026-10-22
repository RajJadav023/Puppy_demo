import { Link } from 'react-router-dom'
import { Heart, PawPrint, Sparkles } from 'lucide-react'

export default function PuppyCircleCard({ puppy }) {
  return (
    <article className="puppy-circle-card">
      <Link
        aria-label={`Meet ${puppy.name}, ${puppy.breed}, ${puppy.detail}, ${puppy.age}`}
        className="puppy-circle-card__link"
        to={`/puppies/${puppy.slug}`}
      >
        <span aria-hidden="true" className="puppy-circle-card__decor puppy-circle-card__decor--paw"><PawPrint /></span>
        <span aria-hidden="true" className="puppy-circle-card__decor puppy-circle-card__decor--heart"><Heart /></span>
        <span aria-hidden="true" className="puppy-circle-card__decor puppy-circle-card__decor--sparkle"><Sparkles /></span>
        <span className="puppy-circle-card__image-wrap">
          <img
            alt={`${puppy.name}, a ${puppy.breed} puppy`}
            className="puppy-circle-card__image"
            loading="lazy"
            src={puppy.image}
          />
          <span className="puppy-circle-card__badge">Available</span>
        </span>
        <span className="puppy-circle-card__details">
          <span className="puppy-circle-card__name">{puppy.name}</span>
          <span className="puppy-circle-card__meta">{puppy.detail} · {puppy.age}</span>
          <span className="puppy-circle-card__origin">{puppy.origin}</span>
        </span>
      </Link>
    </article>
  )
}
