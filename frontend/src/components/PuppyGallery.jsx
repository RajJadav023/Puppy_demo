import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, PawPrint, X } from 'lucide-react'

export default function PuppyGallery({ images, name, breed }) {
  const [selected, setSelected] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [pawTrail, setPawTrail] = useState(null)
  const touchStartX = useRef(null)
  const trailTimeout = useRef(null)
  const hasMultipleImages = images.length > 1
  const currentPhoto = Math.min(selected, images.length - 1)

  useEffect(() => {
    setSelected(0)
    setLightboxOpen(false)
  }, [images])

  function movePhoto(direction) {
    if (!hasMultipleImages) return
    window.clearTimeout(trailTimeout.current)
    setPawTrail({ direction, run: Date.now() })
    trailTimeout.current = window.setTimeout(() => setPawTrail(null), 850)
    setSelected((current) => (current + direction + images.length) % images.length)
  }

  useEffect(() => () => window.clearTimeout(trailTimeout.current), [])

  useEffect(() => {
    function onKeyDown(event) {
      if (!lightboxOpen) return
      if (event.key === 'Escape') setLightboxOpen(false)
      if (event.key === 'ArrowRight') {
        setSelected((current) => (current + 1) % images.length)
      }
      if (event.key === 'ArrowLeft') {
        setSelected((current) => (current - 1 + images.length) % images.length)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [lightboxOpen, images.length])

  return (
    <>
      <div className="min-w-0">
        <div className="profile-photo-stack">
          <div className="group relative z-10 overflow-hidden rounded-4xl bg-[#f4e5ca]">
            <button
              aria-label={`Open photo ${currentPhoto + 1} of ${images.length} for ${name}`}
              className="block aspect-square w-full cursor-zoom-in"
              onClick={() => setLightboxOpen(true)}
              onTouchStart={(event) => {
                touchStartX.current = event.changedTouches[0].clientX
              }}
              onTouchEnd={(event) => {
                if (touchStartX.current === null) return
                const delta = event.changedTouches[0].clientX - touchStartX.current
                touchStartX.current = null
                if (Math.abs(delta) > 48) movePhoto(delta < 0 ? 1 : -1)
              }}
              type="button"
            >
              <img
                alt={`${name}, ${breed} puppy, photo ${currentPhoto + 1}`}
                className="size-full object-cover transition duration-500 group-hover:scale-[1.035]"
                fetchPriority="high"
                src={images[currentPhoto]}
              />
            </button>
            <span aria-live="polite" className="puppy-gallery-count">
              {currentPhoto + 1} / {images.length}
            </span>
            <span className="puppy-gallery-hint">Click to enlarge</span>
            {pawTrail && (
              <span
                aria-hidden="true"
                className={`puppy-gallery-paw-trail ${pawTrail.direction > 0 ? 'puppy-gallery-paw-trail--next' : 'puppy-gallery-paw-trail--previous'}`}
                key={pawTrail.run}
              >
                {[0, 1, 2, 3].map((step) => <PawPrint key={step} />)}
              </span>
            )}
            {hasMultipleImages && (
              <>
                <button
                  aria-label="Previous photo"
                  className="gallery-arrow left-3"
                  onClick={() => movePhoto(-1)}
                  type="button"
                >
                  <ChevronLeft aria-hidden="true" />
                </button>
                <button
                  aria-label="Next photo"
                  className="gallery-arrow right-3"
                  onClick={() => movePhoto(1)}
                  type="button"
                >
                  <ChevronRight aria-hidden="true" />
                </button>
              </>
            )}
          </div>
        </div>
        {hasMultipleImages && (
          <div aria-label="Choose puppy photo" className="puppy-gallery-thumbnails">
            {images.map((image, index) => (
              <button
                aria-label={`Show photo ${index + 1}`}
                aria-pressed={selected === index}
                className={`puppy-gallery-thumbnail ${currentPhoto === index ? 'is-selected' : ''}`}
                key={image}
                onClick={() => setSelected(index)}
                type="button"
              >
                <img alt="" className="aspect-square size-full object-cover" loading="eager" src={image} />
              </button>
            ))}
          </div>
        )}
      </div>

      {lightboxOpen && (
        <div
          aria-label={`${name} photo gallery`}
          aria-modal="true"
          className="fixed inset-0 z-50 grid place-items-center bg-black/90 p-4 sm:p-8"
          role="dialog"
          onClick={(event) => {
            if (event.target === event.currentTarget) setLightboxOpen(false)
          }}
        >
          <button
            aria-label="Close gallery"
            className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-white/15 text-white hover:bg-white/25"
            onClick={() => setLightboxOpen(false)}
            type="button"
          >
            <X />
          </button>
          {hasMultipleImages && (
            <button aria-label="Previous photo" className="gallery-lightbox-arrow left-2 sm:left-8" onClick={() => movePhoto(-1)} type="button">
              <ChevronLeft />
            </button>
          )}
          <figure className="max-h-full max-w-5xl">
            <img alt={`${name}, ${breed} puppy, photo ${currentPhoto + 1}`} className="max-h-[78vh] max-w-full rounded-2xl object-contain" src={images[currentPhoto]} />
            <figcaption className="mt-3 text-center text-sm text-white/80">{name}</figcaption>
          </figure>
          {hasMultipleImages && (
            <button aria-label="Next photo" className="gallery-lightbox-arrow right-2 sm:right-8" onClick={() => movePhoto(1)} type="button">
              <ChevronRight />
            </button>
          )}
        </div>
      )}
    </>
  )
}
