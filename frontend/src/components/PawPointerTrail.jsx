import { useEffect, useRef, useState } from 'react'
import { PawPrint } from 'lucide-react'

export default function PawPointerTrail() {
  const [prints, setPrints] = useState([])
  const previousPointRef = useRef(null)
  const printIdRef = useRef(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    function handlePointerMove(event) {
      if (event.pointerType === 'touch') return

      const previous = previousPointRef.current
      const current = { x: event.clientX, y: event.clientY }
      previousPointRef.current = current
      if (!previous) return

      const dx = current.x - previous.x
      const dy = current.y - previous.y
      if (Math.hypot(dx, dy) < 30) return

      const print = {
        id: printIdRef.current++,
        x: current.x,
        y: current.y,
        rotation: Math.atan2(dy, dx) * (180 / Math.PI) + 90 + (printIdRef.current % 2 ? 18 : -18),
      }
      setPrints((previousPrints) => [...previousPrints.slice(-3), print])
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [])

  return (
    <div aria-hidden="true" className="paw-pointer-trail">
      {prints.map((print) => (
        <span
          className="paw-pointer-trail__print"
          key={print.id}
          onAnimationEnd={() => setPrints((previousPrints) => previousPrints.filter((item) => item.id !== print.id))}
          style={{ left: print.x, top: print.y, '--paw-rotation': `${print.rotation}deg` }}
        >
          <PawPrint size={20} strokeWidth={2.5} />
        </span>
      ))}
    </div>
  )
}
