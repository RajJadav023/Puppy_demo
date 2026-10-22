import { useMemo, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, Heart, PawPrint, Search, SlidersHorizontal, Star } from 'lucide-react'
import PuppyCircleCard from '../components/PuppyCircleCard.jsx'
import PuppyGallery from '../components/PuppyGallery.jsx'
import SiteFooter from '../components/SiteFooter.jsx'
import SiteHeader from '../components/SiteHeader.jsx'
import { familyMoments } from '../data/happyFamilies.js'
import { puppies } from '../data/puppies.js'

export default function Puppies() {
  const { slug } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('featured')
  const [gender, setGender] = useState('')
  const selected = puppies.find((puppy) => puppy.slug === slug || puppy.aliases?.includes(slug))
  const selectedIndex = selected ? puppies.findIndex((puppy) => puppy.slug === selected.slug) : -1
  const previousPuppy = selected ? puppies[(selectedIndex - 1 + puppies.length) % puppies.length] : null
  const nextPuppy = selected ? puppies[(selectedIndex + 1) % puppies.length] : null
  const breed = searchParams.get('breed') || ''
  const origin = searchParams.get('origin') || ''
  const filtered = useMemo(
    () => {
      const normalizedBreed = (value) => value.toLowerCase().replace(/[^a-z]/g, '')
      const result = puppies.filter((puppy) => {
        const matchesBreed = !breed || normalizedBreed(puppy.breed).includes(normalizedBreed(breed))
        const matchesOrigin = !origin
          || (origin === 'local' && puppy.origin === 'Dubai')
          || (origin === 'imported' && puppy.origin !== 'Dubai')
          || (origin === 'korea' && puppy.origin === 'Korea')
        const matchesGender = !gender
          || (gender === 'boys' ? puppy.detail.toLowerCase().includes('boy') : puppy.detail.toLowerCase().includes('girl'))
        const searchableText = `${puppy.name} ${puppy.breed} ${puppy.origin} ${puppy.detail}`.toLowerCase()
        const matchesSearch = !search.trim() || search.toLowerCase().trim().split(/\s+/).every((term) => searchableText.includes(term))
        return matchesBreed && matchesOrigin && matchesGender && matchesSearch
      })
      if (sortBy === 'name') result.sort((first, second) => first.name.localeCompare(second.name))
      if (sortBy === 'age-young') result.sort((first, second) => Number.parseFloat(first.age) - Number.parseFloat(second.age))
      if (sortBy === 'age-old') result.sort((first, second) => Number.parseFloat(second.age) - Number.parseFloat(first.age))
      return result
    },
    [breed, gender, origin, search, sortBy],
  )

  function setFilter(name, value) {
    const next = new URLSearchParams(searchParams)
    if (value) next.set(name, value)
    else next.delete(name)
    setSearchParams(next)
  }

  function sendPuppyEnquiry(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const message = [
      'Dear TeddyPups,',
      `My name is ${formData.get('name')}, and you can reach me on ${formData.get('phone')}.`,
      formData.get('email') ? `My email is ${formData.get('email')}.` : '',
      formData.get('area') ? `I live in ${formData.get('area')}.` : '',
      `I'm asking about ${selected.name} (${selected.breed}, ${selected.detail.toLowerCase()}).`,
      formData.get('message') ? `Message: ${formData.get('message')}` : '',
    ].filter(Boolean).join('\n')
    window.open(`https://wa.me/971541676733?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="min-h-screen bg-cream text-ink">
      <SiteHeader />
      <main className={selected ? 'mx-auto max-w-7xl px-5 pb-20 pt-8 sm:px-8 lg:px-12' : 'puppies-directory'}>
        {selected ? (
          <>
            <section className="puppy-profile">
              <div className="puppy-profile__heading">
                <Link className="inline-flex items-center gap-2 text-sm font-bold text-caramel hover:underline" to="/puppies">
                  <ArrowLeft aria-hidden="true" size={17} /> Available puppies
                </Link>
                <p className="eyebrow mt-6">A little friend with a big heart</p>
                <h1 className="mt-2 font-display text-5xl font-bold sm:text-6xl">{selected.name}</h1>
                <p className="mt-3 text-lg text-brown">{selected.breed} · {selected.detail} · {selected.age}</p>
              </div>
              <div className="puppy-profile__layout">
                <div className="puppy-profile__gallery">
                  <p className="puppy-profile-panel__kicker puppy-profile__gallery-kicker"><span>1</span> Hello, it’s me</p>
                  <PuppyGallery images={selected.gallery} key={selected.slug} name={selected.name} breed={selected.breed} />
                </div>
                <div className="puppy-profile__side-column">
                  <aside className="puppy-profile__details">
                    <p className="puppy-profile__eyebrow">A little introduction</p>
                    <h2 className="font-display text-3xl font-bold">Meet {selected.name}</h2>
                    <div className="puppy-facts">
                      <div><span>Breed</span><strong>{selected.breed}</strong></div>
                      <div><span>Gender</span><strong>{selected.detail}</strong></div>
                      <div><span>Age</span><strong>{selected.age}</strong></div>
                      <div><span>Where</span><strong>{selected.origin === 'Dubai' ? 'Dubai' : 'Imported for you'}</strong></div>
                    </div>
                    <p className="mt-5 leading-relaxed text-brown">
                      Get in touch to learn about this puppy, ask about care details, and confirm
                      current availability with our team.
                    </p>
                    <div className="puppy-profile__actions">
                      <a
                        className="button button--primary puppy-profile__whatsapp"
                        href={`https://wa.me/971541676733?text=${encodeURIComponent(`Hello, I would like to ask about ${selected.name} the ${selected.breed}.` )}`}
                        rel="noreferrer"
                        target="_blank"
                      >
                        Ask about this puppy on WhatsApp
                      </a>
                      <a className="puppy-profile__enquiry-link" href="#puppy-enquiry">Send an enquiry</a>
                    </div>
                  </aside>
                  <svg aria-hidden="true" className="puppy-profile__stitch" preserveAspectRatio="none" viewBox="0 0 300 34">
                    <path d="M 5 2 C 20 2, 16 31, 55 31 S 90 3, 130 3 S 165 31, 205 31 S 245 3, 295 3" />
                  </svg>
                  <section aria-labelledby="puppy-care-title" className="puppy-profile-panel puppy-care-panel">
                    <p className="puppy-profile-panel__kicker"><span>2</span> What comes with this {selected.breed}</p>
                    <h2 id="puppy-care-title">Every Teddy Pup comes</h2>
                    <ul className="puppy-care-list">
                      {[
                        'Vaccinated',
                        'Dewormed',
                        'Verified health certificate from licensed vets',
                        'Thoroughly checked before joining your family',
                      ].map((item) => (
                        <li key={item}><Check aria-hidden="true" size={22} />{item}</li>
                      ))}
                    </ul>
                  </section>
                </div>
              </div>
            </section>

            <section aria-labelledby="puppy-journey-title" className="puppy-way-home">
              <p className="puppy-profile-panel__kicker"><span>3</span> The way home</p>
              <h2 id="puppy-journey-title">{selected.origin === 'Dubai' ? 'A lovely journey home' : 'Coming home from abroad'}</h2>
              <div aria-hidden="true" className="puppy-way-home__track">
                {Array.from({ length: 24 }, (_, index) => <PawPrint key={index} />)}
              </div>
              <ol className="puppy-way-home__steps">
                {[
                  ['Reserve your puppy', 'Tell us which puppy has captured your heart.'],
                  ['Personalized consultation', 'We finalize details with you and share updates on your puppy’s journey.'],
                  [selected.origin === 'Dubai' ? 'Meet and collect' : 'Import and arrival', selected.origin === 'Dubai' ? 'Arrange a visit and plan a comfortable trip home.' : 'We manage health checks, travel arrangements, and documentation.'],
                  ['Welcome home', 'We help your new puppy settle in and ensure a smooth transition into your home.'],
                ].map(([title, copy], index) => (
                  <li key={title}>
                    <span className="puppy-way-home__number">{index + 1}</span>
                    <h3>{title}</h3>
                    <p>{copy}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section aria-labelledby="puppy-enquiry-title" className="puppy-enquiry" id="puppy-enquiry">
              <div className="puppy-enquiry__intro">
                <p className="puppy-profile-panel__kicker"><span>4</span> Dear TeddyPups...</p>
                <h2 id="puppy-enquiry-title">Ask about this puppy</h2>
                <p>Leave your details and our team will get back to you promptly — or message us on WhatsApp for the quickest reply.</p>
              </div>
              <form className="puppy-enquiry__form" key={selected.slug} onSubmit={sendPuppyEnquiry}>
                <label>Your name *<input autoComplete="name" name="name" required /></label>
                <label>Phone or WhatsApp *<input autoComplete="tel" name="phone" placeholder="+971 50 123 4567" required /><small>With country code, e.g. +971 50 123 4567</small></label>
                <label>Email (optional)<input autoComplete="email" name="email" type="email" /></label>
                <label>Your area (optional)<input autoComplete="address-level2" name="area" placeholder="e.g. Dubai Marina" /></label>
                <label className="puppy-enquiry__message">Message (optional)<textarea defaultValue={`Hi! I'd love to know more about ${selected.name}.`} name="message" rows="4" /></label>
                <button className="button button--primary puppy-enquiry__submit" type="submit">Send enquiry <ArrowRight aria-hidden="true" size={18} /></button>
                <p className="puppy-enquiry__fine-print">Your message will open in WhatsApp so our team can get back to you.</p>
              </form>
            </section>

            <nav aria-label="Browse puppies" className="puppy-profile-pagination">
              {[['Previous pup', previousPuppy, 'previous'], ['Next pup', nextPuppy, 'next']].map(([label, puppy, direction]) => (
                <Link className={`puppy-profile-pagination__card puppy-profile-pagination__card--${direction}`} key={direction} to={`/puppies/${puppy.slug}`}>
                  {direction === 'previous' && <img alt="" loading="lazy" src={puppy.gallery[0]} />}
                  <span><small>{label}</small><strong>{puppy.name}</strong></span>
                  {direction === 'next' && <img alt="" loading="lazy" src={puppy.gallery[0]} />}
                </Link>
              ))}
            </nav>
          </>
        ) : (
          <>
            <section aria-labelledby="puppies-page-title" className="puppies-hero">
              <div className="puppies-hero__inner">
                <div className="puppies-hero__intro">
                  <div className="puppies-hero__copy">
                    <p className="puppies-hero__eyebrow">From Teddy’s sketchbook</p>
                    <h1 id="puppies-page-title">Available puppies</h1>
                    <span aria-hidden="true" className="puppies-hero__underline" />
                    <p className="puppies-hero__description">
                      Every listing shows photos of the puppy. Open a profile to see details, then
                      ask our team any questions.
                    </p>
                  </div>
                  <div className="puppies-hero__portrait">
                    <span aria-hidden="true" className="puppies-hero__speech">hm?</span>
                    <span className="puppies-hero__portrait-ring">
                      <img alt="A little puppy portrait" src={puppies[0].image} />
                    </span>
                    <span className="puppies-hero__portrait-caption">self-portrait</span>
                    <PawPrint aria-hidden="true" className="puppies-hero__paw" />
                    <Star aria-hidden="true" className="puppies-hero__star" />
                  </div>
                </div>

                <div aria-label="Filter available puppies" className="puppies-filter-board">
                  <span aria-hidden="true" className="puppies-filter-board__tape" />
                  <div className="puppies-filter-board__row">
                    <span className="puppies-filter-board__label">where</span>
                    <div className="puppies-filter-board__choices">
                      {[['Everywhere', ''], ['Imported', 'imported'], ['Korean Teacup', 'korea']].map(([label, value]) => (
                        <button aria-pressed={origin === value} className="puppies-filter-chip" key={label} onClick={() => setFilter('origin', value)} type="button">{label}</button>
                      ))}
                    </div>
                  </div>
                  <div className="puppies-filter-board__row">
                    <span className="puppies-filter-board__label">breed</span>
                    <div className="puppies-filter-board__choices">
                      {['Maltipoo', 'Pomeranian', 'Poodle', 'Cavapoo', 'Shih Tzu'].map((label) => (
                        <button aria-pressed={breed.toLowerCase() === label.toLowerCase()} className="puppies-filter-chip" key={label} onClick={() => setFilter('breed', breed.toLowerCase() === label.toLowerCase() ? '' : label)} type="button">{label}</button>
                      ))}
                    </div>
                  </div>
                  <div className="puppies-filter-board__row">
                    <span className="puppies-filter-board__label">boy or girl</span>
                    <div className="puppies-filter-board__choices">
                      {['Boys', 'Girls'].map((label) => {
                        const value = label.toLowerCase()
                        return <button aria-pressed={gender === value} className="puppies-filter-chip" key={value} onClick={() => setGender(gender === value ? '' : value)} type="button">{label}</button>
                      })}
                      {(breed || origin || gender || search) && <button className="puppies-filter-clear" onClick={() => { setSearch(''); setGender(''); setSearchParams({}) }} type="button">Clear filters</button>}
                    </div>
                  </div>
                  <div className="puppies-filter-board__tools">
                    <label className="puppies-search">
                      <Search aria-hidden="true" size={18} />
                      <span className="sr-only">Search puppies</span>
                      <input onChange={(event) => setSearch(event.target.value)} placeholder="Search puppies" type="search" value={search} />
                    </label>
                    <label className="puppies-sort">
                      <SlidersHorizontal aria-hidden="true" size={17} />
                      <span className="sr-only">Sort puppies</span>
                      <select onChange={(event) => setSortBy(event.target.value)} value={sortBy}>
                        <option value="featured">Featured</option>
                        <option value="name">Name A–Z</option>
                        <option value="age-young">Youngest first</option>
                        <option value="age-old">Oldest first</option>
                      </select>
                    </label>
                  </div>
                </div>
              </div>
            </section>

            <section aria-label="Available puppies" className="puppies-listing">
              <div className="puppies-listing__inner">
                <p className="puppies-listing__count">{filtered.length} puppies looking for a home</p>
                {filtered.length
                  ? <div aria-label="Puppies looking for a home" className="puppy-list-grid">{filtered.map((puppy) => <PuppyCircleCard key={puppy.slug} puppy={puppy} />)}</div>
                  : <p className="puppies-listing__empty">No puppies match those filters yet. Try a different breed or location.</p>}
              </div>
            </section>

            <section aria-labelledby="gone-home-title" className="puppies-gone-home">
              <div className="puppies-gone-home__inner">
                <div className="puppies-gone-home__copy">
                  <h2 id="gone-home-title">Already gone home</h2>
                  <p>These puppies have found their families.</p>
                  <Link className="button button--primary" to="/happy-families">
                    See the puppies who’ve gone home <ArrowRight aria-hidden="true" size={18} />
                  </Link>
                </div>
                <div aria-label="Happy families with their puppies" className="puppies-gone-home__moments">
                  {familyMoments.slice(0, 5).map(({ image, caption }, index) => (
                    <figure className={`puppies-gone-home__moment puppies-gone-home__moment--${index + 1}`} key={image}>
                      <span className="puppies-gone-home__portrait">
                        <img alt={`Happy family moment: ${caption}`} loading="lazy" src={image} />
                        <span className="puppies-gone-home__badge">gone home <Heart aria-hidden="true" size={13} /></span>
                      </span>
                      <figcaption>{caption}</figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}
      </main>
      <SiteFooter />
    </div>
  )
}
