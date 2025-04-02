'use client'

import dynamic from 'next/dynamic'
import { Card } from '../Components/Card/Card'
import { CardWithZoom } from '../Components/Card/CardWithZoom'
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
import { NavigationMenuDemo } from '@/Components/Navigation/NavigationBar'
import BounceCardsWithText from '@/Components/Card/BouncingCardWithText'

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
  const [minDelayPassed, setMinDelayPassed] = useState(false)

  useEffect(() => {
  const timer = setTimeout(() => {
    setMinDelayPassed(true)
  }, 2400)

  return () => clearTimeout(timer)
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
  
  const showLoading = (lanyardLoaded && minDelayPassed)

  const testimonials = [
    {
      quote: "I never imagined working with university researchers in high school.",
      name: "Leila Zhang",
      grade: "Grade 11, Toronto",
    },
    {
      quote: "My project on air quality just won an award thanks to mentorship!",
      name: "Raymond W.",
      grade: "Grade 12, Vancouver",
    },
    {
      quote: "As a girl in STEM, I felt supported building a VR empathy simulator.",
      name: "Sofia A.",
      grade: "Grade 10, Waterloo",
    },
    {
      quote: "FutureEra helped me write my first research proposal and win funding.",
      name: "Daniel K.",
      grade: "Grade 11, Ottawa",
    },
    {
      quote: "This changed the way I think about data science and ethics.",
      name: "Fatima S.",
      grade: "Grade 12, Mississauga",
    },
  ];

  const transformStyles = [
    "rotate(5deg) translate(-150px)",
    "rotate(0deg) translate(-70px)",
    "rotate(-5deg)",
    "rotate(5deg) translate(70px)",
    "rotate(-5deg) translate(150px)",
  ];

  return (
    <div>
      <div
        className={`fixed inset-0 z-50 bg-[#FFFDFF] flex items-center justify-center transition-opacity duration-700 ${
          showLoading ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <img src="/assets/landing.gif" alt="Loading animation" className="object-none w-128 m-8" />
      </div>
      {/* ✅ Fixed 3D canvas background */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <Lanyard position={[0, 0, 20]} gravity={[0, -30, 0]} onLoaded={() => setLanyardLoaded(true)}/>
      </div>

      {showLoading && <NavigationMenuDemo/>}

      {/* ✅ Initial vertical scroll section */}
      <section className="min-h-screen flex flex-col items-start justify-center text-left px-6 py-20 bg-gradient-to-br from-blue-100 to-white pl-15">
        {/* <h1 className="text-5xl md:text-6xl font-bold mb-4">Your Research Journey, Your Way.</h1>
         */}
         {showLoading &&
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

      <section className="min-h-screen flex flex-col md:flex-row items-center justify-between">
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

      <section className="min-h-screen z-10">
        <div ref={cardsRectRef} className="HS">
          <HorizontalSlides>
            <CardWithZoom
              inverted
              blank
              text="Featured PROGRAMS"
              front
            />
            <CardWithZoom
              number="🔬"
              text="Girls in STEM"
              detail="A mentorship + lab matching program supporting girls in scientific research. Weekly sessions + final project presentation."
              image="/assets/girlSTEM.png"
              inverted
            />
            <CardWithZoom
              number="🌍"
              text="Equity in Innovation"
              detail="Explore AI, data justice, and open government datasets to build research projects with social impact."
              image="/assets/equity-data.jpg"
            />
            <CardWithZoom
              number="🧠"
              text="Research Without Barriers"
              detail="Inclusive research pathways for all students. Laptops provided. 1:1 coaching for underserved communities."
              image="/assets/barrier-free.jpg"
              inverted
            />
            <CardWithZoom
              number="🌱"
              text="Local to Global"
              detail="Solve real issues in your community — and pitch your project to national competitions or grants."
              image="/assets/community-research.jpg"
            />
            <CardWithZoom
              inverted
              blank
            />
          </HorizontalSlides>
        </div>
      </section>

      <section className="min-h-screen bg-white py-24 px-6 md:px-20">
        <h2 className="text-4xl font-bold text-blue-900 mb-12 text-center">What Our Students Say</h2>
        <div className='w-full flex justify-center'>
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

      <section className="min-h-screen bg-gray-50 py-24 px-6 md:px-20">
        <h2 className="text-4xl font-bold text-blue-900 mb-12 text-center">News & Impact</h2>
        <div className="space-y-8">
          {[
            {
              date: "March 2025",
              title: "FutureEra receives $15,000 Community STEM Grant",
              summary: "Funding will expand our Girls in STEM and Open Research for All programs across Ontario.",
            },
            {
              date: "Feb 2025",
              title: "We spoke at Oakridge High School about AI & Ethics",
              summary: "An interactive workshop with 100+ students exploring the future of responsible tech.",
            },
            {
              date: "Jan 2025",
              title: "Launch of ‘Research Without Barriers’ in 3 school districts",
              summary: "Targeted mentorship and device access for underserved high school students.",
            },
          ].map((n, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-sm border">
              <p className="text-sm text-gray-500 mb-1">{n.date}</p>
              <h4 className="text-xl font-semibold text-blue-800 mb-2">{n.title}</h4>
              <p className="text-gray-700">{n.summary}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="min-h-screen bg-white py-24 px-6 md:px-20">
        <h2 className="text-4xl font-bold text-blue-900 mb-12 text-center">Scholarships & Awards</h2>
        <div className="grid md:grid-cols-2 gap-10">
          {[
            {
              title: "Excellence in Research & Innovation",
              desc: "Awarded to students demonstrating outstanding independent research or competition achievements.",
            },
            {
              title: "STEM Equity Scholarship",
              desc: "Supports students from underrepresented backgrounds in STEM who are making an impact in inclusion or accessibility.",
            },
            {
              title: "Future Founders Award",
              desc: "For students launching entrepreneurial or community-focused startups rooted in research and innovation.",
            },
            {
              title: "Girls in STEM Fellowship",
              desc: "A scholarship paired with mentorship and lab matching for girls excelling in science and technology.",
            },
          ].map((s, i) => (
            <div key={i} className="bg-blue-50 p-6 rounded-xl shadow-sm border border-blue-100">
              <h4 className="text-xl font-semibold text-blue-900 mb-2">{s.title}</h4>
              <p className="text-gray-700">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <button className="bg-blue-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-800 transition">
            Apply for Scholarship
          </button>
        </div>
      </section>

      <section className="min-h-screen bg-gray-100 py-24 px-6 md:px-20">
        <h2 className="text-4xl font-bold text-blue-900 mb-12 text-center">Partnerships & Collaborations</h2>
        <div className="grid md:grid-cols-2 gap-10 mb-12">
          {[
            {
              org: "Toronto District School Board",
              desc: "We’ve launched research mentorship programs across 10 high schools with TDSB.",
            },
            {
              org: "University of Toronto Engineering Outreach",
              desc: "Collaboration on lab matching and faculty talks to support high school STEM pathways.",
            },
            {
              org: "Code for Change",
              desc: "Partnered to offer web dev and civic tech competitions focused on social equity.",
            },
            {
              org: "AI4Youth Canada",
              desc: "Providing open-source AI research mentorship and competition coaching for students.",
            },
          ].map((p, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <h4 className="text-xl font-semibold text-blue-800 mb-2">{p.org}</h4>
              <p className="text-gray-700">{p.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <p className="text-lg mb-4 font-medium">We’re always looking to collaborate with schools, universities, and mission-aligned organizations.</p>
          <button className="bg-blue-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-800 transition">
            Become a Partner
          </button>
        </div>
      </section>
    </div>
  )
}
