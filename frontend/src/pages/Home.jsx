import {
  ArrowRight,
  Globe2,
  Heart,
  HeartPulse,
  MessageCircle,
  Moon,
  PawPrint,
  Plane,
  Sparkles,
} from 'lucide-react'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import PuppyRail from '../components/PuppyRail.jsx'
import SiteFooter from '../components/SiteFooter.jsx'
import SiteHeader from '../components/SiteHeader.jsx'
import { familyMoments } from '../data/happyFamilies.js'
import { faqs, puppies } from '../data/puppies.js'

const heroPuppies = [puppies[0], puppies[7], puppies[2], puppies[6], puppies[8], puppies[1]]
const showcaseOrder = [
  heroPuppies[4],
  heroPuppies[0],
  heroPuppies[5],
  heroPuppies[2],
  heroPuppies[1],
  heroPuppies[3],
]

const journey = [
  {
    number: '1',
    title: 'Choose your breed',
    copy: 'Tell us which breed you like or describe what you are looking for. We can help you find a match.',
  },
  {
    number: '2',
    title: 'Get photos & details',
    copy: 'Ask our team for current photos and available care information, and get your questions answered.',
  },
  {
    number: '3',
    title: 'Plan a safe welcome',
    copy: 'Arrange a Dubai visit or discuss travel options and timing with our team before making plans.',
  },
]

const trustPoints = [
  {
    icon: HeartPulse,
    title: 'Vet-checked & healthy',
    copy: 'Ask our team about vaccination and veterinary records for each puppy.',
    tone: 'copper',
  },
  {
    icon: Plane,
    title: 'Korea to Dubai, safely',
    copy: 'We explain travel arrangements and documentation before you decide.',
    tone: 'green',
  },
  {
    icon: MessageCircle,
    title: 'Support 24/7',
    copy: 'We are here to help, from choosing your puppy through the welcome home.',
    tone: 'brown',
  },
  {
    icon: Globe2,
    title: 'Trusted by families',
    copy: 'Guidance for local visits and travel planning, every step of the way.',
    tone: 'orange',
  },
]

function PuppyPassportSection() {
  const bookRef = useRef(null)

  useEffect(() => {
    const book = bookRef.current
    if (!book) return undefined

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.dataset.revealed = 'true'
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.25 })

    book.querySelectorAll('.passport-entry').forEach((entry) => observer.observe(entry))
    return () => observer.disconnect()
  }, [])

  return (
    <section aria-label="Puppy passport" className="trust-section px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
      <article aria-labelledby="trust-title" className="puppy-passport-book mx-auto" ref={bookRef}>
        <div className="puppy-passport-page puppy-passport-page--intro">
          <p className="puppy-passport-kicker">TeddyPups · Dubai</p>
          <div aria-hidden="true" className="puppy-passport-seal"><Globe2 /></div>
          <h2 id="trust-title">Puppy passport</h2>
          <p className="puppy-passport-caption">A little record of care, guidance, and every step home.</p>
          <span aria-hidden="true" className="puppy-passport-number">TP · UAE</span>
        </div>
        <div className="puppy-passport-page puppy-passport-page--details">
          {trustPoints.map(({ icon: Icon, title, copy, tone }, index) => (
            <article
              className={`passport-entry passport-entry--${tone}`}
              data-revealed="false"
              key={title}
              style={{ '--passport-entry-delay': `${index * 260}ms` }}
            >
              <div aria-hidden="true" className="passport-entry__stamp">
                <Icon />
                <strong>{title}</strong>
              </div>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </article>
    </section>
  )
}

function MeetWaysSection() {
  const sectionRef = useRef(null)
  const flightRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const flight = flightRef.current
    if (!section || !flight) return undefined

    let frame = 0

    function updateFlight() {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        const bounds = section.getBoundingClientRect()
        const routeBounds = flight.parentElement.getBoundingClientRect()
        const progress = Math.min(
          1,
          Math.max(0, (window.innerHeight - bounds.top) / (window.innerHeight + bounds.height)),
        )
        const start = { x: routeBounds.width * 0.08, y: routeBounds.height * 0.82 }
        const control = { x: routeBounds.width * 0.425, y: routeBounds.height * 0.04 }
        const end = { x: routeBounds.width * 0.915, y: routeBounds.height * 0.47 }
        const inverse = 1 - progress
        const x = inverse * inverse * start.x + 2 * inverse * progress * control.x + progress * progress * end.x
        const y = inverse * inverse * start.y + 2 * inverse * progress * control.y + progress * progress * end.y
        const dx = 2 * inverse * (control.x - start.x) + 2 * progress * (end.x - control.x)
        const dy = 2 * inverse * (control.y - start.y) + 2 * progress * (end.y - control.y)
        const angle = Math.atan2(dy, dx) * (180 / Math.PI)

        flight.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) rotate(${angle}deg)`
      })
    }

    window.addEventListener('scroll', updateFlight, { passive: true })
    window.addEventListener('resize', updateFlight)
    updateFlight()

    return () => {
      window.removeEventListener('scroll', updateFlight)
      window.removeEventListener('resize', updateFlight)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section aria-labelledby="meeting-title" className="meet-ways" ref={sectionRef}>
      <div className="meet-ways__heading">
        <p className="eyebrow">A lovely first hello</p>
        <h2 id="meeting-title">Two ways to meet your puppy</h2>
      </div>

      <div aria-hidden="true" className="meet-ways__signpost">
        <span className="meet-ways__post" />
        <span className="meet-ways__sign meet-ways__sign--local">Puppies in Dubai</span>
        <span className="meet-ways__sign meet-ways__sign--import">Imported for you</span>
      </div>

      <div className="meet-ways__content">
        <article className="meet-ways__local">
          <span className="meet-ways__mobile-sign meet-ways__mobile-sign--local">Puppies in Dubai</span>
          <div className="meet-ways__showroom-art">
            <svg aria-hidden="true" className="meet-ways__skyline" viewBox="0 0 600 180" preserveAspectRatio="none">
              <path d="M4 172h590M28 172v-78h36v78m19 0V62h27v110m20 0v-49h52v49m20 0V16h34v156m19 0v-75h45v75m20 0v-47h48v47m19 0V90h31v82m18 0v-57h61v57m19 0v-89h39v89" />
            </svg>
            <div className="meet-ways__awning" />
            <img alt="A TeddyPups puppy being held in the Dubai showroom" loading="lazy" src="/images/puppy-showroom.jpg" />
            <span className="meet-ways__caption">In our showroom</span>
          </div>
          <p>See them, love them, take them home. Come meet our locally available puppies before you decide.</p>
          <Link className="button button--primary" to="/puppies?origin=local">
            Meet local puppies <ArrowRight aria-hidden="true" size={17} />
          </Link>
        </article>

        <article className="meet-ways__import">
          <span className="meet-ways__mobile-sign meet-ways__mobile-sign--import">Imported for you</span>
          <div aria-label="Puppy flight route from Korea to Dubai" className="meet-ways__route">
            <svg aria-hidden="true" className="meet-ways__route-line" viewBox="0 0 1000 500" preserveAspectRatio="none">
              <path d="M80 410 Q425 20 915 235" />
              <circle cx="80" cy="410" r="8" />
              <circle cx="915" cy="235" r="8" />
            </svg>
            <span className="meet-ways__location meet-ways__location--korea">Korea</span>
            <span className="meet-ways__location meet-ways__location--dubai">Dubai</span>
            <div aria-hidden="true" className="meet-ways__flight" ref={flightRef}>
              <svg fill="none" viewBox="0 0 150 86">
                <path d="m42 31-30-18c-5-3-10 2-7 7l21 29m81-18 31-18c5-3 10 2 7 7l-21 29m-64 7 12 20c2 4 8 3 8-2l5-22m-20-12 12-20c2-4 8-3 8 2l5 22" fill="#ad4b17" stroke="#2a170e" strokeWidth="4" strokeLinejoin="round" />
                <path d="M18 44c0-16 25-27 57-27s57 11 57 27-25 27-57 27S18 60 18 44Z" fill="#fffaf1" stroke="#2a170e" strokeWidth="4" />
                <defs>
                  <clipPath id="flight-puppy-clip"><circle cx="75" cy="44" r="13" /></clipPath>
                </defs>
                <circle cx="75" cy="44" r="15.5" fill="#2a170e" />
                <image clipPath="url(#flight-puppy-clip)" height="27" href={puppies[1].image} width="27" x="61.5" y="30.5" preserveAspectRatio="xMidYMid slice" />
                <path d="M120 39q-5-5-12-5" stroke="#2a170e" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </div>
          </div>
          <p>Exclusive Korean teacup puppies, delivered. Order from the world’s most reputable breeders and let us handle the import.</p>
          <Link className="button button--primary" to="/puppies?origin=imported">
            See imported puppies <ArrowRight aria-hidden="true" size={17} />
          </Link>
        </article>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-clip bg-[#fbe3b4] text-ink">
      <a
        aria-label="Skip to content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-cream"
        href="#main"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <section aria-labelledby="hero-title" className="premium-hero relative px-5 pb-14 pt-12 sm:px-8 sm:pt-16 lg:px-12">
          <div className="relative z-10 mx-auto max-w-5xl text-center">
            <p className="eyebrow inline-flex items-center gap-2">
              Every puppy is family <Heart aria-hidden="true" fill="currentColor" size={16} />
            </p>
            <h1 className="home-hero-title mx-auto mt-5 max-w-4xl font-display font-bold leading-[0.9] tracking-[-0.045em]" id="hero-title">
              Premium teacup puppies in Dubai
            </h1>
            <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-brown/85 sm:text-xl">
              Meet your new best friend in our Dubai showroom, or explore miniature breeds from
              trusted breeders around the world.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
              <Link className="button button--primary" to="/puppies">
                View available puppies <ArrowRight aria-hidden="true" size={19} />
              </Link>
              <a
                className="button button--outline"
                href="https://wa.me/971541676733?text=Hello%2C%20I%27d%20love%20to%20know%20more%20about%20your%20puppies."
                rel="noreferrer"
                target="_blank"
              >
                Enquire on WhatsApp <PawPrint aria-hidden="true" size={19} />
              </a>
            </div>
          </div>

          <div className="puppy-showcase-stage">
            <ul aria-label="Some of the puppies in our showroom" className="puppy-showcase-grid mx-auto max-w-7xl">
              {showcaseOrder.map((puppy) => (
                <li className="showcase-puppy-item" key={puppy.slug}>
                  <Link
                    aria-label={`Meet ${puppy.name}, ${puppy.breed}`}
                    className="showcase-puppy"
                    to={`/puppies/${puppy.slug}`}
                  >
                    <img alt="" className="showcase-puppy__image" loading="lazy" src={puppy.image} />
                    <span className="showcase-puppy__label">{puppy.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div aria-hidden="true" className="puppy-showcase-fence" />
          </div>
        </section>

        <PuppyRail puppies={puppies} />

        <MeetWaysSection />

        <section aria-labelledby="journey-title" className="journey-section px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="eyebrow">A premium, step-by-step experience</p>
              <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl" id="journey-title">
                Your puppy journey
              </h2>
              <p className="mt-4 max-w-xl leading-relaxed text-brown">
                We make it easier to explore, ask questions, and plan your puppy’s welcome with our team.
              </p>
              <ol className="journey-list mt-8">
                {journey.map(({ number, title, copy }) => (
                  <li className="journey-step" key={number}>
                    <span className="journey-step__number">{number}</span>
                    <div>
                      <h3 className="journey-step__title font-display font-bold">{title}</h3>
                      <p className="journey-step__copy">{copy}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <Link className="button button--primary mt-6" to="/how-it-works">
                How it works <ArrowRight aria-hidden="true" size={18} />
              </Link>
            </div>
            <div aria-label="Example WhatsApp conversation with TeddyPups" className="journey-phone" role="group">
              <div className="journey-phone__top">
                <span className="journey-phone__avatar"><PawPrint aria-hidden="true" size={21} /></span>
                <span><span className="journey-phone__name">TeddyPups</span><span className="journey-phone__status">Here to help</span></span>
              </div>
              <div className="journey-phone__chat">
                <p className="journey-message journey-message--sent">Hi! I’d love to learn about your puppies.</p>
                <div className="journey-message">
                  <p>Of course! Which breeds are you interested in?</p>
                  <div aria-label="Example puppy breeds" className="journey-phone__chips">
                    <span>Maltipoo</span><span>Pomeranian</span><span>Poodle</span><span>Cavapoo</span>
                  </div>
                </div>
                <p className="journey-message journey-message--sent">Could you share some photos and details?</p>
                <div className="journey-message">
                  <p>Here are a few example photos. Please ask us for current photos and available care records.</p>
                  <div className="journey-phone__photos">
                    <img alt="Example Maltipoo puppy photo" loading="lazy" src={puppies[0].image} />
                    <img alt="Example puppy photo from the showroom" loading="lazy" src="/images/puppy-showroom.jpg" />
                    <img alt="Example Toy Poodle puppy photo" loading="lazy" src={puppies[4].image} />
                  </div>
                </div>
                <div className="journey-message">
                  <div className="journey-phone__passport">
                    <img alt="Example puppy passport photo" loading="lazy" src={puppies[1].image} />
                    <div><strong>Puppy information</strong><span>Ask our team for details</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <PuppyPassportSection />

        <section aria-labelledby="families-title" className="home-family-section px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="home-family-intro">
              <div>
                <div aria-hidden="true" className="home-celestial home-celestial--families">
                  <Moon />
                  <Sparkles />
                </div>
                <p className="eyebrow">Happy families & little companions</p>
                <h2 id="families-title">Happy families &amp; puppies</h2>
                <p className="home-family-copy">
                  We are honored to see our puppies become cherished members of loving families.
                  These heartwarming moments were shared by the families who welcomed a Teddy Pup
                  into their homes and hearts.
                </p>
              </div>
              <blockquote className="home-family-quote">
                <p>
                  “TeddyPups truly made our dream a reality. They supported us at every step of the
                  import journey. Our Maltipoo arrived healthy, cheerful, and absolutely perfect.
                  Having 24/7 support gave us complete peace of mind.”
                </p>
                <cite>Sarah M., Dubai, UAE</cite>
              </blockquote>
            </div>
            <div aria-label="Happy families with their TeddyPups" className="family-gallery home-family-gallery">
              {familyMoments.slice(0, 12).map(({ image, caption }, index) => (
                <figure className={`family-moment home-family-moment home-family-moment--${index + 1}`} key={image}>
                  <img alt={`A happy family with their new puppy: ${caption}`} loading="lazy" src={image} />
                  <figcaption>{caption}</figcaption>
                </figure>
              ))}
            </div>
            <p className="home-family-gallery-end">Every one of them was a Teddy Pup once <PawPrint aria-hidden="true" size={18} /></p>
          </div>
        </section>

        <section aria-labelledby="faq-title" className="home-faq-section px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
          <div className="home-faq-layout mx-auto max-w-7xl">
            <div className="home-faq-intro">
              <div aria-hidden="true" className="home-celestial home-celestial--faq">
                <Moon />
                <Sparkles />
              </div>
              <p className="eyebrow">A few helpful answers</p>
              <h2 id="faq-title">Questions, answered</h2>
              <Link className="home-faq-link" to="/faq">
                Read all questions <ArrowRight aria-hidden="true" size={18} />
              </Link>
              <div aria-hidden="true" className="home-faq-art">
                <span>?</span>
                <PawPrint />
              </div>
            </div>
            <div className="home-faq-list">
              {faqs.map((item) => (
                <article className="home-faq-item" key={item.question}>
                  <h3><span aria-hidden="true">✦</span>{item.question}</h3>
                  <p>{item.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="home-contact px-5 py-14 text-center sm:px-8 sm:py-16">
          <p className="eyebrow">Your new best friend is waiting</p>
          <h2 className="mx-auto mt-3 max-w-3xl font-display text-4xl font-bold sm:text-5xl">
            Ready to say hello?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-brown">
            Tell us what you are looking for. We will be happy to help you find your little match.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              className="button button--primary"
              href="https://wa.me/971541676733?text=Hello%2C%20I%27d%20love%20to%20know%20more%20about%20your%20puppies."
              rel="noreferrer"
              target="_blank"
            >
              Enquire on WhatsApp <ArrowRight aria-hidden="true" size={18} />
            </a>
            <Link className="button button--outline" to="/contact">
              Visit & contact
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
      <a
        className="fixed bottom-3 left-3 right-3 z-30 mx-auto flex max-w-md items-center justify-center gap-2 rounded-full bg-[#18865b] px-6 py-4 text-center font-bold text-white shadow-xl sm:hidden"
        href="https://wa.me/971541676733"
        rel="noreferrer"
        target="_blank"
      >
        <PawPrint aria-hidden="true" size={19} /> WhatsApp us
      </a>
    </div>
  )
}
