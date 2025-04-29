'use client';

import dynamic from 'next/dynamic'
import { Card } from '../Components/Card/Card'
import { CardWithZoom } from '../Components/Card/CardWithZoom'
import { HorizontalSlides } from '../Components/HorizontalSlides/HorizontalSlides'
import { useRect } from '@studio-freight/hamo'
import { useEffect, useRef, useState } from 'react'
import { useStore } from '../Components/lib/store'
import { useWindowSize } from 'react-use'
import { useScroll } from '../Components/hooks/use-scroll'
import { Parallax } from '../Components/Parallax/Parallax'
import { Link } from '../Components/Link/Link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Button } from '../Components/ui/button'
import DecryptedText from '../blocks/TextAnimations/DecryptedText/DecryptedText'
import CountUp from '../blocks/TextAnimations/CountUp/CountUp'
import BounceCardsWithText from '@/Components/Card/BouncingCardWithText'
import Tumbling3DText from '@/Components/Animation/Tumbling3DText'
import { Popover, QRCode } from 'antd'

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
  const [lanyardLoaded, setLanyardLoaded] = useState(false)
  const [minDelayPassed, setMinDelayPassed] = useState(false)
  const [minDelayPassed2, setMinDelayPassed2] = useState(false)

  useEffect(() => {
    const navEntry = performance.getEntriesByType("navigation")[0]
    const navType = navEntry ? navEntry.type : performance.navigation.type
    const hasPlayed = sessionStorage.getItem("hasPlayedLoading")

    if (!hasPlayed || navType === "reload") {
      sessionStorage.setItem("hasPlayedLoading", "true")
      const delay1 = setTimeout(() => setMinDelayPassed(true), 3000)
      const delay2 = setTimeout(() => setMinDelayPassed2(true), 2500)
      return () => {
        clearTimeout(delay1)
        clearTimeout(delay2)
      }
    } else {
      setMinDelayPassed(true)
      setMinDelayPassed2(true)
      setLanyardLoaded(true)
    }
  }, [])

  useScroll(({ scroll }) => {
    setHasScrolled(scroll > 10)
    if (!zoomWrapperRect.top) return

    const start = zoomWrapperRect.top + windowHeight * 0.5
    const end = zoomWrapperRect.top + zoomWrapperRect.height - windowHeight
    const progress = clamp(0, mapRange(start, end, scroll, 0, 1), 1)
    const center = 0.6
    const progress1 = clamp(0, mapRange(0, center, progress, 0, 1), 1)
    const progress2 = clamp(0, mapRange(center - 0.055, 1, progress, 0, 1), 1)

    zoomRef.current?.style.setProperty('--progress1', progress1)
    zoomRef.current?.style.setProperty('--progress2', progress2)
    zoomRef.current?.style.setProperty('background-color', progress === 1 ? 'currentColor' : '')
  })

  useEffect(() => {
    addThreshold({ id: 'top', value: 0 })
  }, [])

  useEffect(() => {
    const top = whyRect.top - windowHeight / 2
    addThreshold({ id: 'why-start', value: top })
    addThreshold({ id: 'why-end', value: top + whyRect.height })
  }, [whyRect])

  useEffect(() => {
    const top = cardsRect.top - windowHeight / 2
    addThreshold({ id: 'cards-start', value: top })
    addThreshold({ id: 'cards-end', value: top + cardsRect.height })
    addThreshold({ id: 'red-end', value: top + cardsRect.height + windowHeight })
  }, [cardsRect])

  const lenis = useStore(({ lenis }) => lenis)

  useEffect(() => {
    const top = lenis?.limit
    addThreshold({ id: 'end', value: top })
  }, [lenis?.limit])

  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth < 768) return
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

  const showLoading = (lanyardLoaded && minDelayPassed)

  const testimonials = [
    {
      quote: "I never imagined working with UofT researchers!",
      name: "Leila Z.",
      grade: "Grade 11, Toronto",
      image: "/assets/students/Leila.jpg"
    },
    {
      quote: "My project on adolescent mental health just won an award thanks to mentorship!",
      name: "Bill K.",
      grade: "Grade 12, Vancouver",
      image: "/assets/students/Bill.jpg"
    },
    {
      quote: "As a girl in STEM, I felt supported building a VR meditation simulator.",
      name: "Sofia A.",
      grade: "Grade 10, Waterloo",
      image: "/assets/students/Sofia.jpg"
    },
    {
      quote: "FutureEra helped me write my first research proposal and win funding.",
      name: "Daniel K.",
      grade: "Grade 11, Ottawa",
      image: "/assets/students/Daniel.jpg"
    },
    {
      quote: "This changed the way I think about data science and ethics.",
      name: "Fatim S.",
      grade: "Grade 12, Mississauga",
      image: "/assets/students/Fitama.jpg"
    },
  ]

  const transformStyles = [
    "rotate(5deg) translate(-150px)",
    "rotate(0deg) translate(-70px)",
    "rotate(-5deg)",
    "rotate(5deg) translate(70px)",
    "rotate(-5deg) translate(150px)",
  ]

  return (
    <div>
      {!showLoading && (
        <div className="fixed inset-0 z-50 bg-[#FFFDFF] flex items-center justify-center">
          <Tumbling3DText spacing={0.05} tumbleAmount={Math.PI / 6} />
        </div>
      )}

      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
        {minDelayPassed2 && (
          <Lanyard position={[0, 0, 20]} gravity={[0, -30, 0]} onLoaded={() => setLanyardLoaded(true)} />
        )}
      </div>

      <section className="min-h-screen flex flex-col items-start justify-center text-left px-4 sm:px-16 py-20 bg-gradient-to-br from-blue-100 to-white">
        {showLoading &&
          <DecryptedText
            text='Your Research Journey, Your Way.'
            animateOn="view"
            speed={55}
            maxIterations={2}
            sequential={true}
            parentClassName='text-3xl sm:text-5xl font-bold mb-4'
            useOriginalCharsOnly={true}
          />}
        <p className="text-lg sm:text-xl mb-8 max-w-2xl">
          Research Labs, Competitions, Grants or Startups — FutureEra helps you turn your ideas into impact.
        </p>
        {showLoading &&
          <div className="flex flex-wrap gap-4 z-[60]">
            <Popover
              content={
                <QRCode
                  value="https://discord.gg/6m48TqXE"
                  bordered={false}
                  errorLevel="M"
                  icon="/assets/fav.png"
                />
              }
              trigger="focus"
              placement="bottom"
            >
              <a
                href="https://discord.gg/6m48TqXE"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Join our Discord Community"
              >
                <Button variant="outline">Join Our Community!</Button>
              </a>
            </Popover>
          </div>
        }
      </section>

      <section className="min-h-screen flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 lg:px-20 py-16 bg-white">
        <div className="w-full md:w-1/2 z-10">
          <h1 className="text-3xl sm:text-5xl font-bold leading-tight text-blue-900 mb-6">
            Unlocking youth potential through STEM research.
          </h1>
          <p className="text-base sm:text-lg text-gray-800 mb-6 max-w-xl">
            FutureEra is a youth-driven nonprofit connecting high school students to world-class research labs, competitions, and startup support.
          </p>
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm md:text-base text-gray-600 mb-8">
            {[
              { label: "University Lab Partners", value: 20 },
              { label: "Mentored Research Projects", value: 100 },
              { label: "National & Global Competitions", value: 10 },
              { label: "Grants & Student Startups", value: 15 },
            ].map(({ label, value }) => (
              <div key={label}>
                <span className="text-2xl font-bold text-blue-600">
                  <CountUp from={0} to={value} duration={0.5} separator="," direction="up" />+
                </span>
                <div>{label}</div>
              </div>
            ))}
          </div>
          {/* <a href="/about" aria-label="Read our story">
            <button className="bg-blue-700 text-white font-semibold py-2 px-6 rounded-full hover:bg-blue-800 transition">
              Read our Story
            </button>
          </a> */}
        </div>
        <div className="w-full md:w-1/2 mt-12 md:mt-0">
          <img
            src="/assets/student1.jpg"
            alt="FutureEra student presenting project"
            className="w-full rounded-lg shadow-xl object-cover"
          />
        </div>
      </section>

      <section className="min-h-screen flex flex-col md:flex-row items-center justify-between">
        <div className="grid grid-cols-12 gap-4 px-4 lg:px-24" id="why-wrapper">
          <div className="col-span-12 lg:col-span-4 mb-8 lg:mb-0 text-center lg:text-left" id="why-sticky">
            <p className="text-[#4E7CD9] sticky-title text-3xl sm:text-4xl font-bold border-l-4 border-[#4E7CD9] pl-4 lg:pl-8 leading-tight">
              Start Anywhere. Grow Everywhere.
              <br />
              <span className="text-black text-lg sm:text-xl block mt-2">
                Our programs evolve with you — whether you start with an idea, a project, or a competition.
              </span>
            </p>
          </div>
          <aside
            className="col-span-12 lg:col-start-7 lg:col-span-6 space-y-32 mt-12 lg:mt-64"
            id="why-content"
            ref={whyRectRef}
          >
            {[
              {
                number: "🔬 University Lab Matching",
                text: "Connect with university labs and real researchers. Explore your curiosity through project-based mentorship.",
                image: "/assets/lab.png",
                inverted: true
              },
              {
                number: "🏆 Competition Mentorship",
                text: "Join a challenge, build a team, and get coached by experts to turn ideas into award-winning projects.",
                image: "/assets/grant.png"
              },
              {
                number: "💰 Grant & Startup Support",
                text: "Apply for funding, build your startup, and get support from mentors in business, tech, and design.",
                image: "/assets/comp.png",
                inverted: true
              }
            ].map((props, index) => (
              <Card
                key={index}
                className="min-w-[300px] sm:min-w-[500px] mx-auto mt-[200px] pointer-events-auto"
                {...props}
              />
            ))}
          </aside>
        </div>
      </section>

      <section className="min-h-screen z-10 overflow-x-auto">
        <div ref={cardsRectRef} className="HS">
          <HorizontalSlides>
            <CardWithZoom inverted blank text="Featured PROGRAMS" front />
            <CardWithZoom number="👩🏻‍🔬" text="AI for Science + Society" detail="Call for Papers! Publish in peer-reviewed, youth-led research venue." image="/assets/ai-society.png" link="/publication" inverted />
            <CardWithZoom number="🔬" text="Girls in STEM" detail="Mentorship + lab matching for girls in research." image="/assets/girlSTEM.png" inverted />
            <CardWithZoom number="🌍" text="Equity in Innovation" detail="Build socially impactful projects with AI + open data." image="/assets/justice.jpg" inverted />
            <CardWithZoom number="🧠" text="Research Without Barriers" detail="Inclusive 1:1 research coaching." image="/assets/barrier-free.jpg" inverted />
            <CardWithZoom number="🌱" text="Local to Global" detail="Pitch community-driven projects to national competitions." image="/assets/community-research.jpg" inverted />
            <CardWithZoom inverted blank />
          </HorizontalSlides>
        </div>
      </section>

      <section className="min-h-[50vh] sm:min-h-screen bg-white py-24 px-4 sm:px-6 lg:px-20 z-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-12 text-center">What Our Students Say</h2>
        <div className="w-full flex justify-center">
          <BounceCardsWithText
            testimonials={testimonials}
            transformStyles={transformStyles}
            containerWidth={1200}
            containerHeight={400}
            animationDelay={0.8}
            animationStagger={0.08}
            easeType="elastic.out(1, 0.5)"
            enableHover={true}
          />
        </div>
      </section>
    </div>
  )
}
