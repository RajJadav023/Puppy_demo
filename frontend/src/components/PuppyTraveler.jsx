import { useEffect, useRef, useState } from 'react'

export default function PuppyTraveler() {
  const travelerRef = useRef(null)
  const speechTimeoutRef = useRef(0)
  const walkingTimeoutRef = useRef(0)
  const lastScrollYRef = useRef(0)
  const scrollDistanceRef = useRef(0)
  const [message, setMessage] = useState('')
  const messages = ['I like you!', 'Yep!', 'Achoo!', 'Whee!', 'Coming!']

  function speak() {
    const nextMessage = messages[Math.floor(Math.random() * messages.length)]
    setMessage(nextMessage)
    window.clearTimeout(speechTimeoutRef.current)
    speechTimeoutRef.current = window.setTimeout(() => setMessage(''), 1800)
  }

  useEffect(() => {
    const traveler = travelerRef.current
    if (!traveler) return undefined

    let frame = 0
    lastScrollYRef.current = window.scrollY

    function updatePosition() {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight
        const width = window.innerWidth <= 640
          ? Math.min(Math.max(180, window.innerWidth * 0.34), 220)
          : Math.min(Math.max(160, window.innerWidth * 0.2), 256)
        const startX = 8
        const endX = Math.max(startX, window.innerWidth - width - 8)
        const routeLength = Math.max(1, endX - startX)
        const routeProgress = (routeLength / 2 + scrollDistanceRef.current) % (routeLength * 2)
        const isMovingRight = routeProgress <= routeLength
        const routeX = routeProgress <= routeLength
          ? startX + routeProgress
          : endX - (routeProgress - routeLength)
        const hasStarted = window.scrollY > 8 && maxScroll > 0
        const contact = document.querySelector('.site-footer__contact-link')
        const contactBounds = contact?.getBoundingClientRect()
        const arrivalDistance = Math.min(640, Math.max(360, window.innerHeight * 0.75))
        const contactDocumentTop = contactBounds ? contactBounds.top + window.scrollY : 0
        const arrivalEnd = Math.min(maxScroll, Math.max(0, contactDocumentTop - window.innerHeight * 0.48))
        const arrivalStart = Math.max(0, arrivalEnd - arrivalDistance)
        const arrivalProgress = contactBounds && maxScroll > 0
          ? Math.min(1, Math.max(0, (window.scrollY - arrivalStart) / Math.max(1, arrivalEnd - arrivalStart)))
          : 0
        const easedArrival = arrivalProgress * arrivalProgress * (3 - 2 * arrivalProgress)
        const routeTop = Math.max(92, window.innerHeight * 0.68)
        const landingX = contactBounds
          ? Math.max(8, Math.min(window.innerWidth - width - 8, contactBounds.left))
          : routeX
        const landingTop = contactBounds
          ? Math.min(window.innerHeight - width * 0.8, contactBounds.bottom + 8)
          : routeTop
        const top = routeTop + (landingTop - routeTop) * easedArrival
        const x = routeX + (landingX - routeX) * easedArrival
        const hasArrived = arrivalProgress >= 1

        traveler.style.setProperty('--puppy-traveler-width', `${width}px`)
        traveler.style.setProperty('--puppy-traveler-top', `${top}px`)
        traveler.style.setProperty('--puppy-traveler-x', `${x}px`)
        if (hasArrived && traveler.dataset.arrived !== 'true') setMessage('Boww!')
        if (!hasArrived && traveler.dataset.arrived === 'true') setMessage('')
        traveler.dataset.arrived = String(hasArrived)
        traveler.dataset.arriving = String(arrivalProgress > 0 && !hasArrived)
        traveler.dataset.facing = arrivalProgress > 0.5 || isMovingRight ? 'right' : 'left'
        traveler.dataset.started = String(hasStarted)
        if (hasArrived) traveler.dataset.walking = 'false'
      })
    }

    function handleScroll() {
      const currentScrollY = window.scrollY
      if (currentScrollY !== lastScrollYRef.current) {
        scrollDistanceRef.current += Math.abs(currentScrollY - lastScrollYRef.current) * 0.5
        traveler.dataset.walking = 'true'
        window.clearTimeout(walkingTimeoutRef.current)
        walkingTimeoutRef.current = window.setTimeout(() => {
          traveler.dataset.walking = 'false'
        }, 180)
      }
      lastScrollYRef.current = currentScrollY
      updatePosition()
    }

    updatePosition()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', updatePosition)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', updatePosition)
      window.clearTimeout(walkingTimeoutRef.current)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => () => window.clearTimeout(speechTimeoutRef.current), [])

  return (
    <div className="puppy-traveler" data-arrived="false" data-arriving="false" data-facing="right" data-started="false" data-walking="false" ref={travelerRef}>
      <svg
        aria-label={message ? `Puppy says ${message}` : 'Click the puppy to hear it say something'}
        className="puppy-traveler__art"
        fill="none"
        onClick={speak}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            speak()
          }
        }}
        role="button"
        tabIndex={0}
        viewBox="0 0 300 240"
      >
        <g className="puppy-traveler__standing">
        <ellipse cx="151" cy="225" fill="#29180f" opacity=".12" rx="93" ry="7" />
        <g className="puppy-traveler__leg puppy-traveler__leg--back">
          <path d="M76 157c-1 19-2 31 1 43 1 6 6 8 13 7 7-1 10-4 9-10l-2-41Z" fill="#e4a352" stroke="#29180f" strokeWidth="3.4" />
          <path d="m80 198 1 7m10-8 1 7" stroke="#29180f" strokeWidth="2.4" strokeLinecap="round" />
        </g>
        <g className="puppy-traveler__leg puppy-traveler__leg--back-alt">
          <path d="M112 162c0 18-2 29 0 40 1 6 6 8 13 7 7-1 10-4 9-10l-2-39Z" fill="#f2be6b" stroke="#29180f" strokeWidth="3.4" />
          <path d="m116 198 1 7m10-8 1 7" stroke="#29180f" strokeWidth="2.4" strokeLinecap="round" />
        </g>
        <g className="puppy-traveler__leg puppy-traveler__leg--front">
          <path d="M179 157c0 19-2 31 0 43 1 6 6 8 13 7 7-1 10-4 9-10l-2-41Z" fill="#f2be6b" stroke="#29180f" strokeWidth="3.4" />
          <path d="m183 198 1 7m10-8 1 7" stroke="#29180f" strokeWidth="2.4" strokeLinecap="round" />
        </g>
        <g className="puppy-traveler__leg puppy-traveler__leg--front-alt">
          <path d="M213 151c1 19-1 32 2 45 1 6 6 8 13 7 7-1 10-4 9-10l-4-42Z" fill="#e4a352" stroke="#29180f" strokeWidth="3.4" />
          <path d="m219 197 1 7m10-8 1 7" stroke="#29180f" strokeWidth="2.4" strokeLinecap="round" />
        </g>
        <g className="puppy-traveler__body">
          <path className="puppy-traveler__tail" d="M74 143c-13-7-20-15-22-24" stroke="#29180f" strokeWidth="9" strokeLinecap="round" />
          <path d="M74 143c-13-7-20-15-22-24" stroke="#f2be6b" strokeWidth="4" strokeLinecap="round" />
          <path d="M48 108c8-8 18-7 22 2 7 1 9 8 4 13 3 7-4 13-11 11-5 5-13 1-13-6-7-4-6-14 1-20Z" fill="#e4a352" stroke="#29180f" strokeWidth="3.4" />
          <path d="M70 153c-3-13 7-21 22-25 13-10 33-12 48-6 16-3 31 1 40 11 15 1 25 12 24 24-1 17-21 29-46 32l-64-2c-18-3-29-14-24-34Z" fill="#f2be6b" stroke="#29180f" strokeWidth="3.4" strokeLinejoin="round" />
          <path d="M80 166c16 7 37 8 51 4" stroke="#fff1d3" strokeWidth="5" strokeLinecap="round" opacity=".7" />
          <path d="M188 90c-13-13-28-10-32 1-4 11 1 24 14 31l15-9 3-23Zm66-2c14-11 28-5 29 7 2 12-5 23-18 29l-14-11 3-25Z" fill="#d98f40" stroke="#29180f" strokeWidth="3.4" strokeLinejoin="round" />
          <path d="M166 94c3-6 8-8 13-5m69 2c5-4 10-3 13 2" fill="none" stroke="#f2be6b" strokeWidth="3" strokeLinecap="round" />
          <path d="M177 132c-11-12-10-30 1-38-1-14 11-23 24-18 7-15 24-18 36-8 13-5 27 3 27 16 12 6 13 21 4 29 5 12-1 25-13 28-7 15-26 18-38 8-12 8-28 3-31-9-10 2-17-1-20-8Z" fill="#f2be6b" stroke="#29180f" strokeWidth="3.4" strokeLinejoin="round" />
          <path d="M189 151c12 7 43 8 61 0l-1 8c-18 9-42 8-58 0Z" fill="#a24a1a" stroke="#29180f" strokeWidth="2.5" />
          <path d="M215 161c0-4-6-5-6-1 0 4 6 7 6 9 0-2 6-5 6-9 0-4-6-3-6 1Z" fill="#fbe3b4" stroke="#29180f" strokeWidth="1.8" />
          <ellipse cx="219" cy="120" fill="#fff4db" rx="28" ry="23" />
          <circle cx="190" cy="128" r="6.5" fill="#ed9d85" opacity=".8" />
          <circle cx="249" cy="128" r="6.5" fill="#ed9d85" opacity=".8" />
          <g className="puppy-traveler__eyes">
            <ellipse cx="199" cy="108" fill="#29180f" rx="5.8" ry="7.6" />
            <ellipse cx="237" cy="108" fill="#29180f" rx="5.8" ry="7.6" />
            <circle cx="201" cy="105" r="2.3" fill="#fff" />
            <circle cx="239" cy="105" r="2.3" fill="#fff" />
          </g>
          <path d="M210 120c2-7 16-7 18 0-1 6-5 9-9 9s-8-3-9-9Z" fill="#29180f" />
          <path d="M219 129v7m0 0c-5 6-11 5-15 2m15-2c5 6 11 5 15 2" stroke="#29180f" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M215 138c3 8 8 9 11 0Z" fill="#e98c8c" stroke="#29180f" strokeWidth="1.8" />
        </g>
        </g>
      </svg>
      {message && (
        <span aria-live="polite" className="puppy-traveler__speech">
          {message}
        </span>
      )}
    </div>
  )
}
