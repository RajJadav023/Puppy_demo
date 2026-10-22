import { Link } from 'react-router-dom'
import { ArrowUpRight, Moon, PawPrint, Phone, Sparkles, Star } from 'lucide-react'

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div aria-hidden="true" className="site-footer__celestial">
        <Moon className="site-footer__moon" />
        <Star className="site-footer__star site-footer__star--one" />
        <Star className="site-footer__star site-footer__star--two" />
        <Sparkles className="site-footer__sparkles" />
      </div>
      <div className="site-footer__main">
        <div className="site-footer__brand">
          <Link className="site-footer__logo" to="/">
            Home, at last.
          </Link>
          <p className="site-footer__description">
            TeddyPups U.A.E. is a Dubai-based brand specializing in miniature puppies, offering
            premium services and worldwide shipping.
          </p>
          <div className="site-footer__contact-row">
            <a
              className="site-footer__contact-link"
              href="https://wa.me/971541676733?text=Hello%2C%20I%27d%20love%20to%20know%20more%20about%20your%20puppies."
              rel="noreferrer"
              target="_blank"
            >
              <Phone aria-hidden="true" size={17} />
              +971 54 167 6733
              <ArrowUpRight aria-hidden="true" size={15} />
            </a>
          </div>
        </div>
        <nav aria-label="Explore" className="site-footer__column">
          <h2>Explore</h2>
          <Link to="/puppies">Available puppies</Link>
          <Link to="/happy-families">Gone home</Link>
          <Link to="/happy-families">Happy families</Link>
          <Link to="/how-it-works">How it works</Link>
          <Link to="/how-it-works">Delivery & collection</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/contact">Visit & contact</Link>
        </nav>
        <div className="site-footer__column site-footer__hello">
          <h2>Say hello</h2>
          <a href="mailto:teddypupsadmin@gmail.com">teddypupsadmin@gmail.com</a>
          <p>Downtown Dubai, United Arab Emirates</p>
          <a
            className="site-footer__button"
            href="https://wa.me/971541676733?text=Hello%2C%20I%27d%20love%20to%20know%20more%20about%20your%20puppies."
            rel="noreferrer"
            target="_blank"
          >
            Chat on WhatsApp <ArrowUpRight aria-hidden="true" size={17} />
          </a>
          <div className="site-footer__socials" aria-label="Social media">
            <a href="https://www.instagram.com/teddypups.worldwide/" rel="noreferrer" target="_blank">Instagram</a>
            <a href="https://www.tiktok.com/@teddypupsuae" rel="noreferrer" target="_blank">TikTok</a>
            <a href="https://www.facebook.com/profile.php?id=61567496944539" rel="noreferrer" target="_blank">Facebook</a>
          </div>
        </div>
        <Link aria-label="Back to the TeddyPups homepage" className="site-footer__paw-art" to="/">
          <span className="site-footer__paw-circle"><PawPrint aria-hidden="true" size={70} /></span>
          <span>Good things come in<br />little paw prints.</span>
        </Link>
      </div>
      <div className="site-footer__bottom">
        <span>© {new Date().getFullYear()} TeddyPups U.A.E.</span>
        <span>every puppy is family</span>
        <Link className="site-footer__back-top" to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Back to top <ArrowUpRight aria-hidden="true" size={15} />
        </Link>
      </div>
    </footer>
  )
}
