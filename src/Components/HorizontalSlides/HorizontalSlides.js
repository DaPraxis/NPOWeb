'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useMediaQuery } from '@studio-freight/hamo'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export const HorizontalSlides = ({ children }) => {
  const elementRef = useRef(null)
  const wrapperRef = useRef(null)
  const isMobile = useMediaQuery('(max-width: 800px)')

  useEffect(() => {
    if (!elementRef.current || !wrapperRef.current || isMobile) return

    const totalWidth = elementRef.current.scrollWidth
    const viewportWidth = window.innerWidth
    const scrollDistance = totalWidth - viewportWidth

    const ctx = gsap.context(() => {
      gsap.to(elementRef.current, {
        x: -scrollDistance,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top+=100 top',
          end: () => `+=${totalWidth}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
    }, wrapperRef)

    return () => ctx.revert()
  }, [isMobile])

  return (
    <div ref={wrapperRef} className="relative w-full">
      {!isMobile ? (
        <div className="sticky top-0 h-screen overflow-hidden">
          <div
            ref={elementRef}
            className="inline-flex will-change-transform px-4 sm:px-8 gap-4"
          >
            {children}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center px-4 sm:px-8 gap-12 py-12">
          {children}
        </div>
      )}
    </div>
  )
}
