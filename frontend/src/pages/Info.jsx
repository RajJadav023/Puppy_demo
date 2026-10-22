import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  ArrowDown,
  ArrowRight,
  ChevronDown,
  Heart,
  HeartHandshake,
  House,
  Mail,
  MapPin,
  MessageCircle,
  PackageCheck,
  PawPrint,
  Plane,
  Phone,
  Search,
  Truck,
} from 'lucide-react'
import SiteFooter from '../components/SiteFooter.jsx'
import SiteHeader from '../components/SiteHeader.jsx'
import { familyMoments } from '../data/happyFamilies.js'
import { puppies } from '../data/puppies.js'

const questions = [
  {
    question: 'Are your puppies vaccinated and health-checked?',
    answer: 'Yes. All our puppies come with a verified health certificate from licensed vets. Every puppy is vaccinated, dewormed, and thoroughly checked before joining your family.',
  },
  {
    question: 'Can I meet a puppy before I decide?',
    answer: 'Yes. Come meet our locally available puppies in our Downtown Dubai showroom and spend time bonding before making your decision.',
  },
  {
    question: 'Can I take my puppy home the same day?',
    answer: 'Local puppies are available immediately, so you can take your puppy home the same day.',
  },
  {
    question: 'Do you import puppies from abroad?',
    answer: 'Yes. Through our Order Upon Request service we source rare and premium teacup breeds from the most reputable, certified breeders across Europe, Korea, and beyond — and we handle the import for you.',
  },
  {
    question: 'How does an imported puppy travel to Dubai?',
    answer: 'We manage every part of the import process, including health checks, travel arrangements, and the necessary documentation, so your puppy arrives happy, healthy, and stress-free.',
  },
  {
    question: 'Will I see photos and health details first?',
    answer: 'Yes. Photos, videos, and health certificates are shared before your puppy travels, and our team sends real photos and health details directly on WhatsApp.',
  },
  {
    question: 'Do you deliver?',
    answer: 'Yes. We deliver within Dubai, and our trusted international cargo partners deliver puppies safely to loving homes all around the world.',
  },
  {
    question: 'Which breeds do you usually have?',
    answer: 'Breeds we regularly have include Maltipoo, Pomeranian, Poodle and Bichon, plus rare teacup lines such as Korean teacup poodles, Maltese, Pom and Yorkie.',
  },
  {
    question: 'Is there help after my puppy comes home?',
    answer: 'Yes. Our team is available 24/7 and offers advice on training, nutrition, and general care to ensure a smooth transition for you and your new furry friend.',
  },
]

function PageIntro({ eyebrow, title, children }) {
  return (
    <section className="info-page-hero">
      <div>
        <p className="info-handwriting">{eyebrow}</p>
        <h1 className="info-page-title">{title}</h1>
      </div>
      <div className="info-page-intro-copy">{children}</div>
    </section>
  )
}

function HappyFamiliesPage() {
  const galleryRef = useRef(null)
  const [showAllFamilies, setShowAllFamilies] = useState(false)

  useEffect(() => {
    const gallery = galleryRef.current
    if (!gallery) return undefined

    gallery.dataset.revealReady = 'true'
    let animationFrame = 0

    function revealVisibleMoments() {
      animationFrame = 0
      gallery.querySelectorAll('.family-moment[data-revealed="false"]').forEach((moment) => {
        const bounds = moment.getBoundingClientRect()
        if (bounds.bottom > 0 && bounds.top < window.innerHeight) {
          moment.dataset.revealed = 'true'
        }
      })
    }

    function handleScroll() {
      if (animationFrame) return
      animationFrame = window.requestAnimationFrame(revealVisibleMoments)
    }

    revealVisibleMoments()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      if (animationFrame) window.cancelAnimationFrame(animationFrame)
    }
  }, [showAllFamilies])

  return (
    <>
      <section aria-labelledby="family-hero-title" className="family-hero">
        <div className="family-hero__copy">
          <p className="info-handwriting">our wall of happy endings</p>
          <h1 className="info-page-title" id="family-hero-title">
            <span>Happy<br />families</span>
            <Heart aria-hidden="true" className="family-hero__heart" />
          </h1>
          <p className="family-hero__intro">
            Nothing makes us happier than seeing our puppies in loving homes! Here are some beautiful
            moments shared by our amazing clients after welcoming their furry friends.
          </p>
          <a className="info-scroll-link" href="#family-gallery">
            64 moments and counting <ArrowDown aria-hidden="true" size={17} />
          </a>
        </div>
        <div className="family-hero__visual">
          <article aria-label="A TeddyPups family story" className="family-feature-quote">
            <span aria-hidden="true" className="family-feature-quote__heart"><Heart fill="currentColor" size={24} /></span>
            <blockquote>
              “TeddyPups truly made our dream a reality. They supported us at every step of the import
              journey. Our Maltipoo arrived healthy, cheerful, and absolutely perfect. Having 24/7
              support throughout the process gave us complete peace of mind.”
            </blockquote>
            <p>Sarah M., Dubai, UAE</p>
          </article>
        </div>
      </section>
      <section aria-labelledby="family-gallery-title" className="family-gallery-section" id="family-gallery">
        <div className="info-section-heading">
          <div>
            <p className="info-handwriting">every one of them was a Teddy Pup once</p>
            <h2 id="family-gallery-title">Little paws, big love</h2>
          </div>
          <p>Real moments shared by our TeddyPups families.</p>
        </div>
        <div className="family-gallery" ref={galleryRef}>
          {familyMoments.slice(0, 12).map(({ image, caption }, index) => (
            <figure
              className={`family-moment family-moment--${index + 1}`}
              data-revealed="false"
              key={image}
              style={{ '--family-moment-delay': `${index % 4 * 90}ms` }}
            >
              <img alt={`A happy TeddyPups family with their new puppy: ${caption}`} loading="lazy" src={image} />
              <figcaption>{caption}</figcaption>
            </figure>
          ))}
          {!showAllFamilies && familyMoments.length > 12 && (
            <button
              aria-label={`See all ${familyMoments.length} happy family photos`}
              className="family-gallery-more"
              onClick={() => setShowAllFamilies(true)}
              type="button"
            >
              See all happy families <ArrowDown aria-hidden="true" size={18} />
            </button>
          )}
          {showAllFamilies && familyMoments.slice(12).map(({ image, caption }, index) => {
            const momentIndex = index + 12
            return (
              <figure
                className={`family-moment family-moment--${momentIndex + 1}`}
                data-revealed="false"
                key={image}
                style={{ '--family-moment-delay': `${momentIndex % 4 * 90}ms` }}
              >
                <img alt={`A happy TeddyPups family with their new puppy: ${caption}`} loading="lazy" src={image} />
                <figcaption>{caption}</figcaption>
              </figure>
            )
          })}
        </div>
        <p className="family-gallery-end">every one of them was a Teddy Pup once <PawPrint aria-hidden="true" size={17} /></p>
      </section>
      <section className="info-cta-panel">
        <div>
          <p className="info-handwriting">your happy ending starts here</p>
          <h2>Ready to meet your little friend?</h2>
        </div>
        <Link className="button button--primary" to="/puppies">
          Meet the puppies <ArrowRight aria-hidden="true" size={18} />
        </Link>
      </section>
    </>
  )
}

function HowItWorksPage() {
  const [selectedWay, setSelectedWay] = useState('local')
  const chapters = [
    ['1', 'Two ways home', '#two-ways'],
    ['2', 'Our premium puppy promise', '#promise'],
    ['3', 'Delivery & collection', '#delivery'],
    ['4', 'Why choose us', '#why-us'],
  ]
  const steps = [
    [Search, 'Explore puppies', 'Browse available puppies and ask us about the latest photos, details, and availability.'],
    [MessageCircle, 'Personal guidance', 'We will answer your questions and help you understand the next steps for your chosen puppy.'],
    [PackageCheck, 'Plan collection or travel', 'Arrange a Dubai visit or discuss delivery options, travel timing, and documentation with our team.'],
    [HeartHandshake, 'Welcome home', 'Get in touch for support as your new puppy settles in with your family.'],
  ]
  const promises = [
    [HeartHandshake, 'Hand-selected breeders', 'We work only with breeders who uphold the highest ethical and health standards.'],
    [Plane, 'Full transparency', 'Photos, videos, and health certificates are shared before your puppy travels.'],
    [MessageCircle, 'Safe, stress-free delivery', 'We handle every detail of the import process, so your puppy arrives happy, healthy, and ready to love you.'],
  ]
  const deliveryOptions = [
    [House, 'Take your puppy home the same day', 'Local puppies are available immediately — visit, fall in love, and go home together.'],
    [Truck, 'Delivery within Dubai', 'Prefer to stay home? We deliver your puppy to your door within Dubai, safely and comfortably.'],
    [PackageCheck, 'Safe international cargo', 'We handle all the paperwork and ensure comfortable travel so your puppy arrives happy and stress-free.'],
    [Heart, 'Worldwide delivery', 'We safely deliver puppies to loving homes all around the world with trusted international cargo partners.'],
  ]
  const reasonsToChooseUs = [
    [Plane, 'International cargo', 'We safely deliver puppies to loving homes all around the world. Our trusted international cargo partners ensure your new furry friend travels comfortably and arrives safely, no matter the distance.'],
    [MessageCircle, 'Support 24/7', 'Our team is available around the clock to answer questions and help at every step, from choosing your puppy to post-delivery support.'],
    [HeartHandshake, 'Health guarantee', 'Every puppy comes with a verified health certificate from licensed vets and is vaccinated, dewormed, and thoroughly checked before joining your family.'],
  ]

  return (
    <>
      <section aria-labelledby="how-page-title" className="how-page-hero">
        <div className="how-page-hero__intro">
          <h1 className="info-page-title" id="how-page-title">How it works</h1>
          <p>Whether you choose to visit us locally or order a premium breed from overseas, TeddyPups is here to make the experience unforgettable.</p>
        </div>
        <nav aria-label="How it works sections" className="info-chapter-nav info-chapter-nav--how">
          {chapters.map(([number, label, href]) => (
            <a href={href} key={number}><span>{number}</span>{label}</a>
          ))}
        </nav>
      </section>
      <section aria-labelledby="two-ways-title" className="info-section" id="two-ways">
        <div className="two-ways-heading">
          <div>
            <p className="info-handwriting">choose your way</p>
            <h1 id="two-ways-title">Two ways home</h1>
          </div>
        </div>
        <div aria-live="polite" className={`two-ways-detail two-ways-detail--${selectedWay}`}>
          <div className="two-ways-detail__copy">
            <p className="info-handwriting">{selectedWay === 'local' ? 'Downtown Dubai' : 'Europe · Korea · beyond'}</p>
            <h3>{selectedWay === 'local' ? 'Meet your puppy in person' : 'Order upon request'}</h3>
            <p>
              {selectedWay === 'local'
                ? 'Step into our Downtown Dubai showroom and experience choosing a puppy face-to-face. Ask our team about the puppies currently available and plan a visit.'
                : 'Looking for a rare or premium breed? Ask our team about sourcing options from trusted breeders overseas, plus health checks, travel arrangements, and timing before you decide.'}
            </p>
            <Link className="info-text-link" to="/contact">
              {selectedWay === 'local' ? 'Plan a visit' : 'Ask about a puppy'} <ArrowRight aria-hidden="true" size={17} />
            </Link>
          </div>
          <div className="two-ways-art-column">
            <div aria-label="Choose how to meet your puppy" className="two-ways-switch" role="group">
              <button aria-pressed={selectedWay === 'local'} className={selectedWay === 'local' ? 'is-selected' : ''} onClick={() => setSelectedWay('local')} type="button">
                <strong>In Dubai</strong><span>meet in person</span>
              </button>
              <button aria-pressed={selectedWay === 'imported'} className={selectedWay === 'imported' ? 'is-selected' : ''} onClick={() => setSelectedWay('imported')} type="button">
                <strong>Imported</strong><span>order upon request</span>
              </button>
            </div>
            <div aria-label={selectedWay === 'local' ? 'Illustration of the Dubai skyline' : 'Illustration of a puppy travel route to Dubai'} className="two-ways-art" role="img">
              {selectedWay === 'local' ? (
                <>
                  <span className="two-ways-art__sun" />
                  <svg aria-hidden="true" className="two-ways-art__city" viewBox="0 0 600 240" preserveAspectRatio="none">
                    <path d="M18 230h564M40 230v-82h45v82m20 0V104h42v126m20 0v-63h44v63m41 0V110l29-19v139m25 0V61l16-18 16 18v169m26 0V111l30 18v101m25 0v-70h43v70m24 0v-105h42v105m22 0v-61h47v61" />
                  </svg>
                </>
              ) : (
                <>
                  <svg aria-hidden="true" className="two-ways-art__route" viewBox="0 0 600 300" preserveAspectRatio="none">
                    <path d="M75 255C175 55 400 45 520 245" />
                  </svg>
                  <Plane aria-hidden="true" className="two-ways-art__plane" size={66} />
                  <span className="two-ways-art__origin">Europe · Korea</span>
                  <span className="two-ways-art__destination">Dubai</span>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="how-journey" id="journey">
          <div className="how-journey__heading">
            <p className="info-handwriting">from first hello to home</p>
            <h3>Your puppy journey</h3>
          </div>
          <ol className="how-journey__cards">
            {steps.map(([Icon, title, copy], index) => (
              <li className={`how-journey__card how-journey__card--${index + 1}`} key={title}>
                <span className="how-journey__icon"><Icon aria-hidden="true" size={28} /></span>
                <span className="how-journey__step">Step {index + 1}</span>
                <h4>{title}</h4>
                <p>{copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section aria-labelledby="promise-title" className="info-section info-section--tint info-promise-section" id="promise">
        <div className="info-section-heading">
          <div><p className="info-handwriting">puppy passport</p><h2 id="promise-title">Our premium puppy promise</h2></div>
          <p>Care, clarity, and support from the first conversation.</p>
        </div>
        <div className="info-card-grid info-card-grid--three">
          {promises.map(([Icon, title, copy]) => (
            <article className="info-value-card" key={title}>
              <span className="info-value-card__icon"><Icon aria-hidden="true" size={26} /></span>
              <h3>{title}</h3><p>{copy}</p>
            </article>
          ))}
        </div>
      </section>
      <section aria-labelledby="delivery-title" className="info-section" id="delivery">
        <div className="delivery-layout">
          <div className="delivery-layout__copy">
            <div className="info-section-heading">
              <div><p className="info-handwriting">a safe journey, all the way home</p><h2 id="delivery-title">Delivery & collection</h2></div>
              <p>From a same-day visit in Downtown Dubai to a flight from Korea, every puppy travels comfortably and arrives safely.</p>
            </div>
            <div className="delivery-options">
              {deliveryOptions.map(([Icon, title, copy]) => (
                <article className="info-delivery-card" key={title}>
                  <Icon aria-hidden="true" className="info-delivery-card__icon" size={27} />
                  <h3>{title}</h3><p>{copy}</p>
                </article>
              ))}
            </div>
          </div>
          <svg aria-label="A rocket travels from Korea to Dubai above the city skyline" className="delivery-illustration" role="img" viewBox="0 0 600 360">
            <path className="delivery-illustration__skyline" d="M18 330h564M45 330v-80h38v80m22 0V205h42v125m18 0v-54h35v54m35 0V220l27-18v128m25 0V160l17-20 17 20v170m28 0V222l29 16v92m25 0v-63h42v63m24 0V194h42v136m22 0v-47h48v47" />
            <path className="delivery-illustration__route" d="M72 276C164 95 389 72 526 205" />
            <circle className="delivery-illustration__origin" cx="72" cy="276" r="7" />
            <circle className="delivery-illustration__destination" cx="526" cy="205" r="7" />
            <text className="delivery-illustration__label delivery-illustration__label--origin" x="48" y="308">Korea</text>
            <text className="delivery-illustration__label delivery-illustration__label--destination" x="506" y="236">Dubai</text>
            <g className="delivery-illustration__flight">
              <path className="delivery-illustration__flame" d="M-26 0c-9-8-16-5-21 0 5 5 12 8 21 0Z" />
              <path className="delivery-illustration__rocket-body" d="M-26 0c8-12 28-16 46-7l10 7-10 7C2 16-18 12-26 0Z" />
              <path className="delivery-illustration__rocket-fin" d="m-12-8-7-13 16 8m-9 21-7 13 16-8" />
              <circle className="delivery-illustration__rocket-window" cx="8" cy="0" r="4" />
              <animateMotion dur="7s" path="M72 276C164 95 389 72 526 205" rotate="auto" repeatCount="indefinite" />
            </g>
            <g className="delivery-illustration__static-rocket" transform="translate(526 205) rotate(35)">
              <path className="delivery-illustration__flame" d="M-26 0c-9-8-16-5-21 0 5 5 12 8 21 0Z" />
              <path className="delivery-illustration__rocket-body" d="M-26 0c8-12 28-16 46-7l10 7-10 7C2 16-18 12-26 0Z" />
              <path className="delivery-illustration__rocket-fin" d="m-12-8-7-13 16 8m-9 21-7 13 16-8" />
              <circle className="delivery-illustration__rocket-window" cx="8" cy="0" r="4" />
            </g>
          </svg>
        </div>
      </section>
      <section aria-labelledby="why-us-title" className="info-section why-us-section" id="why-us">
        <div className="why-us-section__intro">
          <p className="info-handwriting">every puppy is family</p>
          <h2 id="why-us-title">Why choose us</h2>
          <p className="why-us-copy">
            We’re here to help you find a new family member. From the moment you visit our site to
            the joyful day your puppy arrives at your door, we’re with you every step of the way.
            Our mission is to make the entire adoption process smooth, transparent, and full of love.
          </p>
        </div>
        <div className="why-us-points">
          {reasonsToChooseUs.map(([Icon, title, copy]) => (
            <article key={title}>
              <Icon aria-hidden="true" size={34} />
              <div><h3>{title}</h3><p>{copy}</p></div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

function FaqPage() {
  const [openQuestion, setOpenQuestion] = useState(questions[0].question)
  const [search, setSearch] = useState('')
  const visibleQuestions = questions.filter(({ question, answer }) => (
    `${question} ${answer}`.toLowerCase().includes(search.trim().toLowerCase())
  ))

  return (
    <>
      <PageIntro eyebrow="a little help, whenever you need it" title="Questions & answers">
        <p>Can’t find what you’re looking for? Message us on WhatsApp — our team is available 24/7.</p>
        <a className="info-scroll-link" href="https://wa.me/971541676733" rel="noreferrer" target="_blank">
          Ask our team <MessageCircle aria-hidden="true" size={17} />
        </a>
      </PageIntro>
      <section aria-label="Frequently asked questions" className="faq-layout">
        <aside className="faq-aside">
          <p className="info-handwriting">sniff out a question</p>
          <label className="faq-search">
            <span className="sr-only">Search questions</span>
            <input onChange={(event) => setSearch(event.target.value)} placeholder="Search questions..." type="search" value={search} />
            <span aria-hidden="true">⌕</span>
          </label>
          <p className="faq-count">{visibleQuestions.length} notes on the board</p>
          <div aria-hidden="true" className="faq-aside-art">
            <span>?</span><PawPrint size={56} /><span>!</span>
          </div>
          <h2>Ask your own question</h2>
          <p>Our team is always happy to help you plan your puppy journey.</p>
          <Link className="info-text-link" to="/contact">Get in touch <ArrowRight aria-hidden="true" size={17} /></Link>
        </aside>
        <div className="faq-list">
          {visibleQuestions.length ? visibleQuestions.map(({ question, answer }) => {
            const expanded = openQuestion === question
            return (
              <article className={`faq-item${expanded ? ' is-open' : ''}`} key={question}>
                <h2>
                  <button aria-expanded={expanded} onClick={() => setOpenQuestion(expanded ? '' : question)} type="button">
                    <span>{question}</span>
                    <ChevronDown aria-hidden="true" className="faq-item__toggle" size={21} />
                  </button>
                </h2>
                {expanded && <p className="faq-item__answer">{answer}</p>}
              </article>
            )
          }) : <p className="faq-empty">No questions match that search. Try a different word or ask our team directly.</p>}
        </div>
      </section>
    </>
  )
}

function ContactPage() {
  function sendMessage(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const message = [
      'Dear TeddyPups,',
      `My name is ${formData.get('name')}, and you can reach me on ${formData.get('phone')}.`,
      formData.get('email') ? `My email is ${formData.get('email')}.` : '',
      formData.get('area') ? `I live in ${formData.get('area')}.` : '',
      `I'm curious about ${formData.get('puppy') || 'any puppy (not sure yet)'}.`,
      formData.get('message') ? `Message: ${formData.get('message')}` : '',
    ].filter(Boolean).join('\n')
    window.open(`https://wa.me/971541676733?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <>
      <PageIntro eyebrow="we’d love to hear from you" title="Get in touch with us">
        <p>
          Have questions about our puppies or adoption process? Fill out the form, and our team
          will get back to you promptly. Whether ready to adopt or just seeking info, we’d love to
          hear from you!
        </p>
      </PageIntro>
      <section aria-label="Contact TeddyPups" className="contact-layout">
        <div className="contact-details">
          <a className="contact-whatsapp" href="https://wa.me/971541676733?text=Hi%20TeddyPups!%20I%27d%20love%20to%20know%20more%20about%20your%20puppies." rel="noreferrer" target="_blank">
            WhatsApp +971 54 167 6733 <ArrowRight aria-hidden="true" size={18} />
          </a>
          <dl className="contact-direct-list">
            <div><dt>call us</dt><dd><Phone aria-hidden="true" size={16} /><a href="tel:+971541676733">+971 54 167 6733</a></dd></div>
            <div><dt>email</dt><dd><Mail aria-hidden="true" size={16} /><a href="mailto:teddypupsadmin@gmail.com">teddypupsadmin@gmail.com</a></dd></div>
          </dl>
          <article aria-labelledby="showroom-title" className="showroom-card">
            <img alt="A TeddyPups puppy at the Dubai showroom" loading="lazy" src="/images/puppy-showroom.jpg" />
            <div>
              <p className="info-handwriting">come say hello</p>
              <h2 id="showroom-title">Visit us in Downtown Dubai</h2>
              <p>Step into our Downtown Dubai showroom and experience the joy of choosing your puppy face-to-face.</p>
              <p className="showroom-card__address"><MapPin aria-hidden="true" size={17} />Downtown Dubai, United Arab Emirates</p>
              <a className="info-text-link" href="https://maps.app.goo.gl/ZdJvwHBSQWWZT54s7" rel="noreferrer" target="_blank">
                Open in Google Maps <ArrowRight aria-hidden="true" size={16} />
              </a>
            </div>
          </article>
        </div>
        <form className="contact-letter" onSubmit={sendMessage}>
          <PawPrint aria-hidden="true" className="contact-letter__stamp" size={28} />
          <p className="contact-letter__greeting">Dear TeddyPups,</p>
          <div className="contact-letter__sentence">
            <label>my name is <input autoComplete="name" name="name" placeholder="your name" required /></label>
            <label>and you can reach me on <input autoComplete="tel" name="phone" placeholder="+971 50 123 4567" required /></label>
            <label>or by email at <input autoComplete="email" name="email" placeholder="optional" type="email" /></label>
          </div>
          <div className="contact-letter__sentence">
            <label>I live in <input autoComplete="address-level2" name="area" placeholder="e.g. Dubai Marina" /></label>
            <label className="contact-letter__select-label">
              and I’m curious about
              <select defaultValue="" name="puppy">
                <option value="">any puppy (not sure yet)</option>
                {puppies.map((puppy) => <option key={puppy.slug} value={`${puppy.name} (${puppy.breed}, ${puppy.detail.toLowerCase()})`}>{puppy.name} ({puppy.breed}, {puppy.detail.toLowerCase()})</option>)}
              </select>
            </label>
          </div>
          <label className="contact-letter__message">
            Your message (optional)
            <textarea name="message" placeholder="Anything else you’d like to tell us…" rows="4" />
          </label>
          <p className="contact-letter__signoff">with love, a future puppy parent</p>
          <button className="button button--primary contact-letter__submit" type="submit">
            Post my letter <ArrowRight aria-hidden="true" size={18} />
          </button>
          <p className="contact-letter__fine-print">Your message will open in WhatsApp so our team can get back to you.</p>
        </form>
      </section>
    </>
  )
}

export default function Info() {
  const { pathname } = useLocation()
  const page = pathname === '/happy-families'
    ? <HappyFamiliesPage />
    : pathname === '/faq'
      ? <FaqPage />
      : pathname === '/contact'
        ? <ContactPage />
        : <HowItWorksPage />

  return (
    <div className={`info-page min-h-screen text-ink${pathname === '/faq' ? ' info-page--faq' : ''}${pathname === '/contact' ? ' info-page--contact' : ''}${pathname === '/happy-families' ? ' info-page--families' : ''}${pathname === '/how-it-works' ? ' info-page--how' : ''}`}>
      <SiteHeader />
      <main className={`info-page-main${pathname === '/how-it-works' ? ' info-page-main--how' : ''}`}>{page}</main>
      <SiteFooter />
    </div>
  )
}
