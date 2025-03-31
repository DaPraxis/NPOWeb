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
import { Button } from '../Components/ui/button'
import DecryptedText from '../blocks/TextAnimations/DecryptedText/DecryptedText'
import RotatingText from '../blocks/TextAnimations/RotatingText/RotatingText'
import CountUp from '../blocks/TextAnimations/CountUp/CountUp'

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
  const [lanyardLoaded, setLanyardLoaded] = useState(false);

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
      <div
        className={`fixed inset-0 z-50 bg-white flex items-center justify-center transition-opacity duration-700 ${
          lanyardLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full" />
      </div>
      {/* ✅ Fixed 3D canvas background */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <Lanyard position={[0, 0, 20]} gravity={[0, -30, 0]} onLoaded={() => setLanyardLoaded(true)}/>
      </div>

      {/* ✅ Initial vertical scroll section */}
      <section className="min-h-screen flex flex-col items-start justify-center text-left px-6 py-20 bg-gradient-to-br from-blue-100 to-white pl-15">
        {/* <h1 className="text-5xl md:text-6xl font-bold mb-4">Your Research Journey, Your Way.</h1>
         */}
         {lanyardLoaded &&
          <DecryptedText 
            text='Your Research Journey, Your Way.'
            animateOn="view"
            speed={55}
            maxIterations={2}
            sequential={true}
            parentClassName='text-5xl md:text-6xl font-bold mb-4'
            useOriginalCharsOnly={true}
            />}
        <p className="text-xl md:text-2xl mb-8 max-w-2xl">
          Research Labs, Competitions, Grants or Startups — FutureEra helps you turn your ideas into impact.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button variant="outline">Join Our Discord</Button>
        </div>
      </section>

      <section className="min-h-screen flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-16 bg-white">
        {/* Text Content */}
        <div className="w-full md:w-1/2 z-10">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-blue-900 mb-6">
            Unlocking youth potential through STEM research.
          </h1>
          <p className="text-lg md:text-xl text-gray-800 mb-6 max-w-xl">
            FutureEra is a youth-driven nonprofit connecting high school students to world-class research labs, competitions, and startup support.
          </p>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm md:text-base text-gray-600 mb-8">
            <div>
              <span className="text-2xl font-bold text-blue-600">
                <CountUp
                  from={0}
                  to={20}
                  duration={0.5}
                  separator=","
                  direction="up"
                  className="count-up-text"
                />
                +
              </span>
              <div className="text-sm md:text-base text-gray-600">
                University Lab Partners
              </div>
            </div>
            <div>
              <span className="text-2xl font-bold text-blue-600">
                <CountUp
                  from={0}
                  to={100}
                  duration={0.5}
                  separator=","
                  direction="up"
                  className="count-up-text"
                />
                +
              </span>
              <div className="text-sm md:text-base text-gray-600">
                Mentored Research Projects
              </div>
            </div>
            <div>
              <span className="text-2xl font-bold text-blue-600">
                  <CountUp
                    from={0}
                    to={10}
                    duration={0.5}
                    separator=","
                    direction="up"
                    className="count-up-text"
                  />
                  +
                </span>
                <div className="text-sm md:text-base text-gray-600">
                  National & Global Competitions
                </div>
            </div>
            <div>
              <span className="text-2xl font-bold text-blue-600">
                    <CountUp
                      from={0}
                      to={15}
                      duration={0.5}
                      separator=","
                      direction="up"
                      className="count-up-text"
                    />
                    +
                  </span>
                  <div className="text-sm md:text-base text-gray-600">
                  Grants & Student Startups
                  </div>
            </div>
          </div>

          <button className="bg-blue-700 text-white font-semibold py-2 px-6 rounded-full hover:bg-blue-800 transition">
            Read our Story
          </button>
        </div>

        {/* Image Side */}
        <div className="w-full md:w-1/2 mt-12 md:mt-0">
          <img
            src="/assets/student1.jpg"
            alt="FutureEra student"
            className="w-full rounded-lg shadow-xl object-cover"
          />
        </div>
      </section>


      <section className="relative">
        <div className="grid grid-cols-12 gap-4 px-4 lg:px-24" id="why-wrapper">
          {/* Sticky Title on the Left */}
          <div
            className="hidden lg:block col-span-4"
            id="why-sticky"
          >
            <p className="sticky-title text-4xl font-bold border-l-4 border-black pl-8 leading-tight mt-2 text-transform: uppercase">
            Start Anywhere. Grow Everywhere.<br/>
            <span className="text-xl border-black pl-8 leading-tight mt-2 text-transform: capitalize ">Our programs are built to evolve with you. 
              Whether you're starting with an idea, a project, or a competition — you can grow in any direction.</span>
            </p>
          </div>

          {/* Scrollable Feature Content on the Right */}
          <aside
            className="col-span-12 lg:col-start-7 lg:col-span-6 space-y-32 mt-12 lg:mt-64"
            id="why-content"
            ref={whyRectRef}
          >
            <div>
            <Card
              className="min-w-[500px] mr-[10px] ml-[20px] mt-[300px] pointer-events-auto"
              number="🔬 University Lab Matching"
              text="Connect with university labs and real researchers. Explore your curiosity through project-based mentorship."
              image="/assets/lab.png"
              inverted
            />
            </div>
            <div>
              <Card
                className="min-w-[500px] mr-[10px] ml-[20px] mt-[300px] pointer-events-auto"
                number="🏆 Competition Mentorship"
                text="Join a challenge, build a team, and get coached by experts to turn ideas into award-winning projects."
                image="/assets/grant.png"
              />
            </div>
            <div>
              <Card
                className="min-w-[500px] mr-[10px] ml-[20px] mt-[300px] pointer-events-auto"
                number="💰 Grant & Startup Support"
                text="Apply for funding, build your startup, and get support from mentors in business, tech, and design."
                image="/assets/comp.png"
                inverted
              />
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
