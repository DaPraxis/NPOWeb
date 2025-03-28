'use client'

import dynamic from 'next/dynamic'
import { Card } from '../Components/Card/Card'
import { HorizontalSlides } from '../Components/HorizontalSlides/HorizontalSlides'
import { useRect } from '@studio-freight/hamo'
import { useEffect, useRef, useState } from 'react'
import { useStore } from '../Components/lib/store'
import { useWindowSize } from 'react-use'
import { useScroll} from '../Components/hooks/use-scroll'
import {Parallax} from '../Components/Parallax/Parallax'
import { Link } from '../Components/Link/Link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Lanyard = dynamic(() => import('@/blocks/Components/Lanyard/Lanyard'), {
  ssr: false,
  loading: () => <div className="text-white">Loading 3D scene...</div>,
})

export default function Home() {
  const [hasScrolled, setHasScrolled] = useState()
  const zoomRef = useRef(null)
  const [zoomWrapperRectRef, zoomWrapperRect] = useRect()
  const [cardsRectRef, cardsRect] = useRect()
  const addThreshold = useStore(({ addThreshold }) => addThreshold)
  const { height: windowHeight } = useWindowSize()
  const [whyRectRef, whyRect] = useRect()

  useScroll(({ scroll }) => {
    setHasScrolled(scroll > 10)
    if (!zoomWrapperRect.top) return

    const start = zoomWrapperRect.top + windowHeight * 0.5
    const end = zoomWrapperRect.top + zoomWrapperRect.height - windowHeight

    const progress = clamp(0, mapRange(start, end, scroll, 0, 1), 1)
    const center = 0.6
    const progress1 = clamp(0, mapRange(0, center, progress, 0, 1), 1)
    const progress2 = clamp(0, mapRange(center - 0.055, 1, progress, 0, 1), 1)
    setTheme(progress2 === 1 ? 'light' : 'dark')

    zoomRef.current.style.setProperty('--progress1', progress1)
    zoomRef.current.style.setProperty('--progress2', progress2)

    if (progress === 1) {
      zoomRef.current.style.setProperty('background-color', 'currentColor')
    } else {
      zoomRef.current.style.removeProperty('background-color')
    }
  })

  useEffect(() => {
    addThreshold({ id: 'top', value: 0 })
  }, [])

  useEffect(() => {
    const top = whyRect.top - windowHeight / 2
    addThreshold({ id: 'why-start', value: top })
    addThreshold({
      id: 'why-end',
      value: top + whyRect.height,
    })
  }, [whyRect])


  useEffect(() => {
    const top = cardsRect.top - windowHeight / 2
    addThreshold({ id: 'cards-start', value: top })
    addThreshold({ id: 'cards-end', value: top + cardsRect.height })
    addThreshold({
      id: 'red-end',
      value: top + cardsRect.height + windowHeight,
    })
  }, [cardsRect])

  const lenis = useStore(({ lenis }) => lenis)

  useEffect(() => {
    const top = lenis?.limit
    addThreshold({ id: 'end', value: top })
  }, [lenis?.limit])

  useScroll((e) => {
    console.log(e)
  })

  useEffect(() => {
    const pinTarget = document.querySelector('.sticky-title')
    const content = document.getElementById('why-content')
    const wrapper = document.getElementById('why-wrapper')
  
    if (!pinTarget || !content || !wrapper) return
  
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: wrapper,
        start: 'top 33%',
        end: () => `+=${content.scrollHeight}`,
        pin: pinTarget,
        pinSpacing: false,
        scrub: true,
        invalidateOnRefresh: true,
      })
    })
  
    return () => ctx.revert()
  }, [])
  


  return (
    <div>
      {/* ✅ Fixed 3D canvas background */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <Lanyard position={[0, 0, 20]} gravity={[0, -30, 0]} />
      </div>

      {/* ✅ Initial vertical scroll section */}
      <section className="z-10 min-h-screen flex flex-col gap-8 p-6 pointer-events-none">
        <Card
          className="pointer-events-auto"
          number="01"
          text="Loss of performance budget due to using CSS transforms --"
          inverted
        />
        <Card
          className="pointer-events-auto"
          number="02"
          text="Render blocking resources causing layout shift"
        />
        <Card
          className="pointer-events-auto"
          number="03"
          text="Inefficient animation triggering reflow"
          inverted
        />
        <Card
          className="pointer-events-auto"
          number="04"
          text="GPU overdraw caused by layering"
        />
        <Card
          className="pointer-events-auto"
          number="05"
          text="LCP element shifting due to transform: translateZ(0)"
          inverted
        />
      </section>
      <section className="relative">
        <div className="grid grid-cols-12 gap-4 px-4 lg:px-24" id="why-wrapper">
          {/* Sticky Title on the Left */}
          <div
            className="hidden lg:block col-span-4"
            id="why-sticky"
          >
            <p className="sticky-title text-2xl font-bold border-l-4 border-black pl-8 leading-tight">
              Why<br />smooth<br />scroll?
            </p>
          </div>

          {/* Scrollable Feature Content on the Right */}
          <aside
            className="col-span-12 lg:col-start-7 lg:col-span-6 space-y-32 mt-12 lg:mt-64"
            id="why-content"
            ref={whyRectRef}
          >
            <div>
              <p className="text-base">
              We’ve heard all the reasons to not use smooth scroll. It feels
                hacky. It’s inaccessible. It’s not performant. It’s
                over-engineered. And historically, those were all true. But we
                like to imagine things as they could be, then build them. So,
                why should you use smooth scroll?
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4">
                Create more immersive interfaces
              </h4>
              <p>Unlock the creative potential and impact of your web
                experiences. Smoothing the scroll pulls users into the flow of
                the experience that feels so substantial that they forget
                they’re navigating a web page.</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4">
              Normalize all your user inputs
              </h4>
              <p>Give all your users the same (dope) experience whether they’re
                using trackpads, mouse wheels, or otherwise. With smooth scroll,
                you control how silky, heavy, or responsive the experience
                should be — no matter the input. Magic!</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4">
                Make your animations flawless
              </h4>
              <p>Synchronization with native scroll is not reliable. Those jumps
                and delays with scroll-linked animations are caused by
                multi-threading, where modern browsers run animations/effects
                asynchronously with the scroll. Smooth scroll fixes this.</p>
            </div>
          </aside>
        </div>
      </section>


      <section className="rethink">
        {/* Top Section: Highlight + Comparison */}
        <div className="grid grid-cols-12 gap-4 mb-40 lg:mb-[240px] px-10 lg:px-24 mt-[480px]">
          {/* Highlight Text (with left border on desktop) */}
          <Parallax speed={-0.5}>
            <p className="h1">Rethinking smooth scroll</p>
          </Parallax>

          {/* Comparison Text */}
          <div className="col-span-12 lg:col-start-7 lg:col-span-4 mt-12 lg:mt-[128px]">
            <Parallax speed={0.5}>
              <p className="p">
                We have to give props to libraries like{' '}
                <Link
                  className="contrast semi-bold"
                  href="https://github.com/locomotivemtl/locomotive-scroll"
                >
                  Locomotive Scroll
                </Link>{' '}
                and{' '}
                <Link
                  className="contrast semi-bold"
                  href="https://greensock.com/docs/v3/Plugins/ScrollSmoother"
                >
                  GSAP ScrollSmoother
                </Link>
                . They’re well built and well documented – and we’ve used them a
                lot. But they still have issues that keep them from being
                bulletproof.
              </p>
            </Parallax>
          </div>
        </div>
      </section>

      {/* <section className="h-screen h-full flex items-center justify-center z-10 relative"> */}
        {/* ✅ Horizontal scroll section */}
        <div ref={cardsRectRef} className='HS'>
          <HorizontalSlides>
            <Card
              className="min-w-[400px] mr-[60px] ml-[60px] mt-[300px] pointer-events-auto"
              number="01"
              text="Horizontal Card 1"
              inverted
            />
            <Card
              className="min-w-[400px] mr-[60px] ml-[60px] mt-[300px] pointer-events-auto"
              number="02"
              text="Horizontal Card 2"
            />
            <Card
              className="min-w-[400px] mr-[60px] ml-[60px] mt-[300px] pointer-events-auto"
              number="03"
              text="Horizontal Card 3"
              inverted
            />
            <Card
              className="min-w-[400px] mr-[60px] ml-[60px] mt-[300px] pointer-events-auto"
              number="04"
              text="Horizontal Card 4"
            />
            <Card
              className="min-w-[400px] mr-[60px] ml-[60px] mt-[300px] pointer-events-auto"
              number="05"
              text="Horizontal Card 5"
              inverted
            />
          </HorizontalSlides>
        </div>
      {/* </section> */}

      {/* ✅ Final vertical scroll section */}
      <section className="h-screen bg-gray-200 flex items-center justify-center z-10">
        <h2 className="text-3xl">Back to vertical scroll ⬇️</h2>
      </section>
    </div>
  )
}
