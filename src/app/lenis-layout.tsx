'use client'

import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useStore } from '../Components/lib/store'

gsap.registerPlugin(ScrollTrigger)

export default function LenisLayout({ children }: { children: React.ReactNode }) {
  const setLenis = useStore((state) => state.setLenis)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      gestureOrientation: 'vertical',
      smoothWheel: true,
    })

    setLenis(lenis)
    ;(window as any).lenis = lenis // for debugging

    const raf = (time: number) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // 🌟 Link ScrollTrigger to Lenis scroll
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value?: number) {
        if (value !== undefined) {
          lenis.scrollTo(value)
        }
        return lenis.scroll
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        }
      },
      pinType: document.body.style.transform ? 'transform' : 'fixed',
    })

    lenis.on('scroll', ScrollTrigger.update)
    ScrollTrigger.defaults({ scroller: document.body })
    ScrollTrigger.refresh()

    return () => {
      lenis.destroy()
      setLenis(null)
      ScrollTrigger.killAll()
    }
  }, [setLenis])

  return <>{children}</>
}
