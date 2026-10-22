import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, PawPrint, X } from 'lucide-react'

const navigation = [
  { label: 'Home', to: '/' },
  { label: 'Puppies', to: '/puppies' },
  { label: 'Happy families', to: '/happy-families' },
  { label: 'How it works', to: '/how-it-works' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Visit & contact', to: '/contact' },
]

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [headerHidden, setHeaderHidden] = useState(false)

  function closeMenu() {
    setMenuOpen(false)
  }

  useEffect(() => {
    let previousScrollY = window.scrollY

    function handleScroll() {
      const currentScrollY = window.scrollY
      const scrollDifference = currentScrollY - previousScrollY

      if (menuOpen || currentScrollY <= 80) {
        setHeaderHidden(false)
      } else if (scrollDifference > 2) {
        setHeaderHidden(true)
      } else if (scrollDifference < -2) {
        setHeaderHidden(false)
      }

      previousScrollY = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return undefined

    function handleKeyDown(event) {
      if (event.key === 'Escape') closeMenu()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [menuOpen])

  return (
    <>
      <header
        aria-hidden={headerHidden}
        className="site-header sticky top-0 z-40 mx-auto flex w-full items-center justify-between gap-2 px-3 py-3 sm:px-8 lg:px-12"
        data-hidden={headerHidden}
        inert={headerHidden}
      >
        <Link
          aria-label="TeddyPups home"
          className="site-brand flex items-center gap-2 text-ink sm:gap-3"
          to="/"
          onClick={closeMenu}
        >
          <img alt="" className="site-brand__logo" src="https://puppy.instabizweb.com/brand/logo.png" />
          <span className="site-brand__wordmark">TeddyPups</span>
        </Link>
        <nav aria-label="Main navigation" className="site-desktop-nav">
          {navigation.map(({ label, to }) => (
            <NavLink
              className={({ isActive }) => `site-desktop-nav__link${isActive ? ' is-active' : ''}`}
              end={to === '/'}
              key={to}
              to={to}
            >
              {({ isActive }) => (
                <>
                  {label}
                  {isActive && <PawPrint aria-hidden="true" className="site-desktop-nav__paw" size={13} />}
                </>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            className="header-whatsapp hidden items-center gap-2 rounded-full px-3 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 xl:inline-flex xl:px-5 xl:text-base"
            href="https://wa.me/971541676733?text=Hello%2C%20I%27d%20love%20to%20know%20more%20about%20your%20puppies."
            rel="noreferrer"
            target="_blank"
          >
            WhatsApp us
          </a>
          <button
            aria-controls="site-menu"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="site-menu-toggle inline-flex min-h-12 shrink-0 items-center gap-2 rounded-full border-2 border-ink px-3 font-semibold text-ink transition hover:bg-ink hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-caramel sm:gap-3 sm:px-5 xl:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            type="button"
          >
            <PawPrint aria-hidden="true" size={20} />
            {menuOpen ? 'Close' : 'Menu'}
            {menuOpen ? <X aria-hidden="true" size={19} /> : <Menu aria-hidden="true" size={19} />}
          </button>
        </div>
      </header>
      {menuOpen && (
        <div
          className="site-menu-overlay"
          onClick={(event) => {
            if (event.target === event.currentTarget) closeMenu()
          }}
        >
          <section aria-label="Site menu" aria-modal="true" className="site-menu-panel" id="site-menu" role="dialog">
            <div className="site-menu-heading">
              <p className="eyebrow">where to, friend?</p>
              <button
                aria-label="Close menu"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-ink px-4 font-semibold text-ink transition hover:bg-ink hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-caramel"
                onClick={closeMenu}
                type="button"
              >
                Close <X aria-hidden="true" size={18} />
              </button>
            </div>
            <nav aria-label="Site menu navigation" className="site-menu-links">
              {navigation.map(({ label, to }, index) => (
                <Link
                  className="site-menu-link"
                  key={to}
                  onClick={closeMenu}
                  to={to}
                >
                  <span className="site-menu-link__number">0{index + 1}</span>
                  {label}
                </Link>
              ))}
            </nav>
            <div className="site-menu-contact">
              <a
                className="header-whatsapp inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-bold text-white transition hover:-translate-y-0.5"
                href="https://wa.me/971541676733?text=Hello%2C%20I%27d%20love%20to%20know%20more%20about%20your%20puppies."
                rel="noreferrer"
                target="_blank"
              >
                WhatsApp us <PawPrint aria-hidden="true" size={18} />
              </a>
              <p>+971 54 167 6733</p>
            </div>
          </section>
        </div>
      )}
    </>
  )
}
