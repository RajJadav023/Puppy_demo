import { ArrowRight } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import PuppyCard from './PuppyCard.jsx'

export default function PuppyRail({ puppies }) {
  const sectionRef = useRef(null)
  const pinRef = useRef(null)
  const viewportRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const pin = pinRef.current
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!section || !pin || !viewport || !track) return undefined

    const desktop = window.matchMedia('(min-width: 1024px)')
    let frame = 0
    let maxTravel = 0

    function updatePosition() {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        if (!desktop.matches) {
          track.style.removeProperty('--puppy-gallery-offset')
          section.style.removeProperty('--puppy-gallery-distance')
          return
        }

        const nextMaxTravel = Math.max(0, track.scrollWidth - viewport.clientWidth)
        if (
          Math.abs(nextMaxTravel - maxTravel) > 1
          || !section.style.getPropertyValue('--puppy-gallery-distance')
        ) {
          maxTravel = nextMaxTravel
          section.style.setProperty('--puppy-gallery-distance', `${maxTravel}px`)
        }

        const sectionTop = section.getBoundingClientRect().top
        const distance = Math.max(1, section.offsetHeight - pin.clientHeight)
        const stickyTop = Number.parseFloat(window.getComputedStyle(pin).top) || 0
        const progress = Math.min(1, Math.max(0, (stickyTop - sectionTop) / distance))
        track.style.setProperty('--puppy-gallery-offset', `${maxTravel * progress}px`)
      })
    }

    const observer = new ResizeObserver(updatePosition)
    observer.observe(pin)
    observer.observe(track)
    window.addEventListener('scroll', updatePosition, { passive: true })
    window.addEventListener('resize', updatePosition)
    desktop.addEventListener('change', updatePosition)
    updatePosition()

    return () => {
      window.removeEventListener('scroll', updatePosition)
      window.removeEventListener('resize', updatePosition)
      desktop.removeEventListener('change', updatePosition)
      observer.disconnect()
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section aria-labelledby="puppies-title" className="puppy-gallery-section" ref={sectionRef}>
      <div className="puppy-gallery-pin" ref={pinRef}>
        <div className="puppy-gallery-content">
          <div className="puppy-gallery-heading">
            <div>
              <h2 className="font-display font-bold" id="puppies-title">Meet the pups</h2>
              <p>Real puppies, real photos, looking for their families right now.</p>
            </div>
            <Link className="button button--primary" to="/puppies">
              See all available puppies <ArrowRight aria-hidden="true" size={18} />
            </Link>
          </div>
          <div aria-label="Available puppies" className="puppy-gallery-viewport" ref={viewportRef}>
            <div className="puppy-gallery-track" ref={trackRef} role="list">
              {puppies.map((puppy, index) => (
                <div className="puppy-gallery-item" key={puppy.slug} role="listitem">
                  <PuppyCard colorIndex={index} puppy={puppy} />
                </div>
              ))}
            </div>
          </div>
          <div aria-hidden="true" className="puppy-gallery-floor" />
        </div>
      </div>
    </section>
  )
}
