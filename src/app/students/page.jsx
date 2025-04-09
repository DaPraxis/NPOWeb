'use client'

import { useState } from "react"
import { RESOURCES } from "@/config/resource-hub"
import { ResourceCard } from "@/Components/Card/ResourceCard"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/Components/ui/carousel"


export default function StudentsPage() {
  const [activeTab, setActiveTab] = useState(Object.keys(RESOURCES)[0])

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-r from-blue-700 to-purple-700 text-white py-44 px-6 md:px-20">
        <div className="max-w-4xl mx-auto text-center z-10 relative">
          <h1 className="text-5xl font-bold mb-4">Student Learning Hub</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
            Discover opportunities to join ongoing research, compete in STEM challenges, apply for grants, and collaborate with university labs.
          </p>
        </div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('/assets/barrier-free.jpg')] bg-cover bg-center" />
      </section>

      {/* Highlight Band
      <section className="bg-green-400 text-white px-6 md:px-20 py-8 my-4">
        <p className="text-2xl md:text-xl font-semibold max-w-4xl">
          Start with a project, research, or competition you're passionate about —
          and we’ll support you with the right mentor and team to help make your dream come true.
        </p>
      </section> */}

      {/* Layout */}
      <div className="flex flex-col md:flex-row px-6 md:px-20 py-16 gap-10">
        {/* Sidebar */}
        <div className="md:w-1/4">
          <h2 className="text-xl font-bold mb-6 text-blue-900">Explore Resources</h2>
          <ul className="space-y-3">
            {Object.keys(RESOURCES).map((key) => (
              <li key={key}>
                <button
                  className={`w-full text-left font-medium border-l-4 pl-4 py-2 transition ${
                    activeTab === key
                      ? "border-blue-600 bg-blue-50 text-blue-900"
                      : "border-transparent text-gray-600 hover:text-blue-700"
                  }`}
                  onClick={() => setActiveTab(key)}
                >
                  {RESOURCES[key].title}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Content */}
        <div className="md:w-3/4">
          <h3 className="text-2xl font-semibold mb-6 text-blue-800">
            {RESOURCES[activeTab].title}
          </h3>

          <Carousel className="w-full" opts={{ align: "start", loop: false }}>
            <CarouselContent>
              {RESOURCES[activeTab].items.map((item, i) => (
                <CarouselItem
                  key={i}
                  className="basis-[300px] lg:basis-[320px]"
                >
                  <ResourceCard {...item}/>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  )
}
