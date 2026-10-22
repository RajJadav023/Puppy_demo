import { useLayoutEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Info from './pages/Info.jsx'
import Home from './pages/Home.jsx'
import Puppies from './pages/Puppies.jsx'
import PawPointerTrail from './components/PawPointerTrail.jsx'
import PuppyTraveler from './components/PuppyTraveler.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  return null
}

export default function App() {
  const { pathname } = useLocation()

  return (
    <>
      <ScrollToTop />
      <PawPointerTrail />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/puppies" element={<Puppies />} />
        <Route path="/puppies/:slug" element={<Puppies />} />
        <Route path="/how-it-works" element={<Info />} />
        <Route path="/happy-families" element={<Info />} />
        <Route path="/faq" element={<Info />} />
        <Route path="/contact" element={<Info />} />
        <Route path="*" element={<Info />} />
      </Routes>
      {pathname === '/' && <PuppyTraveler />}
    </>
  )
}
