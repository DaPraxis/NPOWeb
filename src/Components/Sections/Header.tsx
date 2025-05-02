'use client'

import * as React from "react"
import Link from "next/link"
import { useEffect, useState } from "react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/Components/ui/navigation-menu"
import { cn } from "@/lib/utils"

export function Header() {
  const [showNav, setShowNav] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const isScrollingUp = currentScrollY < lastScrollY || currentScrollY < 50
  
      setShowNav(isScrollingUp)
  
      // Only collapse mobile menu — don’t auto-expand!
      if (!isScrollingUp && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
  
      setLastScrollY(currentScrollY)
    }
  
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY, isMobileMenuOpen])
  

  const handleMobileLinkClick = () => setIsMobileMenuOpen(false)

  return (
    <div className={cn(
      "fixed top-0 left-0 z-50 w-full bg-white transition-transform duration-300 shadow-md",
      showNav ? "translate-y-0" : "-translate-y-full"
    )}>
      <div className="mx-auto flex max-w-screen-xl items-center justify-between py-2 px-5 xl:px-0">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <img src="/assets/logo.svg" alt="FutureEra logo" className="h-10 w-auto" />
          {/* <span className="text-lg font-bold">FutureEra</span> */}
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:block">
        <NavigationMenu>
          <NavigationMenuList>
            {/* Impact */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>Our Impact</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] md:grid-cols-1">
                  {/* <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-green-100 to-white p-6 no-underline outline-none focus:shadow-md"
                        href="/publication/CYJ-AI4Sci-2026"
                      >
                        <div className="mb-2 mt-4 text-lg font-medium">Impact Stories</div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Read how our students are making a difference.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li> */}
                  <ListItem href="/publication/CYJ-AI4Sci-2026">
                    <div className="flex items-center gap-4 w-full">
                      {/* Text section */}
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900">
                          Canadian Youth Journal of AI for Science 2026
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Foster youth research and science advancement.
                        </p>
                      </div>

                      {/* Image aligned with text block */}
                      <img
                        src="/assets/papers/pub1.png"
                        alt="Journal Cover"
                        className="h-[80px] w-auto object-contain"
                      />
                    </div>
                  </ListItem>

                  <ListItem href="/publication/rubric" title="Judging Rubrics">
                    Updated publication rubrics @ 2026, how to excel in research
                  </ListItem>

                  {/* <ListItem href="/publication/committee" title="Publication Committee">
                    Action Research Committee for Peer-Review & Research @ 2026
                  </ListItem> */}

                  {/* <ListItem href="/publication/CYJ-AI4Sci-2026" title="Canadian Youth Journal of AI for Science 2026">
                    Foster youth research and science advancement.
                  </ListItem>
                  <ListItem href="/publication/CYJ-AI4Sci-2026" title="Canadian Youth Journal of AI for Science 2026">
                    Foster youth research and science advancement.
                  </ListItem> */}
                  {/* <ListItem href="/news" title="News & Highlights">
                    Our milestones, awards, and community outreach.
                  </ListItem>
                  <ListItem href="/impact#outreach" title="Outreach">
                    School visits, events, and workshops.
                  </ListItem> */}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* For Students */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>For Students</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-4">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-blue-100 to-white p-6 no-underline outline-none focus:shadow-md"
                        href="/students"
                      >
                        <div className="mb-2 mt-4 text-lg font-medium">Explore All Programs</div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Mentorships, research labs, and grants for high school students.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/students#scholarships" title="Scholarships">
                    View all scholarship opportunities.
                  </ListItem>
                  <ListItem href="/students#lab-matching" title="Lab Matching">
                    Get mentored by university researchers.
                  </ListItem>
                  <ListItem href="/students#competitions" title="Competitions">
                    Join national & global research competitions.
                  </ListItem>
                  <ListItem href="/students#grants" title="Grants & Startups">
                    Apply for funding to launch your idea.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* For Partners */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>For Partners</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-yellow-100 to-white p-6 no-underline outline-none focus:shadow-md"
                        href="/partners"
                      >
                        <div className="mb-2 mt-4 text-lg font-medium">Partner With Us</div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Work with us to support student innovation and equity.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/partners/opportunities" title="Opportunities">
                    Sponsor, co-host, or mentor a program.
                  </ListItem>
                  <ListItem href="/partners/support" title="Support Us">
                    Be Part of the Impact.
                  </ListItem>
                  <ListItem href="/partners/contact" title="Contact Us">
                    Reach out for collaborations or school inquiries.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* About */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>Get Involved</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-5">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-purple-100 to-white p-6 no-underline outline-none focus:shadow-md"
                        href="/careers"
                      >
                        <div className="mb-2 mt-4 text-lg font-medium">Join Us!</div>
                        <p className="text-sm leading-tight text-muted-foreground">
                        Shine bright. Make change. Start here.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/careers/instructors" title="Become an Instructor">
                    Teach. Inspire. Grow.
                  </ListItem>
                  <ListItem href="/careers/outreach" title="Outreach">
                    Careers with purpose, impact, and heart.
                  </ListItem>
                  <ListItem href="/careers/network" title="Network">
                    Stay connected with our community.
                  </ListItem>
                  <ListItem href="/careers/volunteer" title="Volunteers">
                    Start small. Spark change.
                  </ListItem>
                  <ListItem href="/careers/contact" title="Connect with Us">
                    Stay in tune.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

          </NavigationMenuList>
        </NavigationMenu>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-gray-600 hover:text-black focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isMobileMenuOpen
                ? "M6 18L18 6M6 6l12 12"
                : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md border-t border-gray-200 px-6 py-6">
          <div className="space-y-6">

            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Our Impact</p>
              <ul className="space-y-2">
                <li>
                  <Link href="/publication/CYJ-AI4Sci-2026" onClick={handleMobileLinkClick} className="block text-gray-800 font-medium hover:text-blue-700">
                    Canadian Youth Journal
                  </Link>
                </li>
                <li>
                  <Link href="/publication/rubric" onClick={handleMobileLinkClick} className="block text-gray-800 hover:text-blue-700">
                    Judging Rubrics
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">For Students</p>
              <ul className="space-y-2">
                <li><Link href="/students#scholarships" onClick={handleMobileLinkClick} className="block hover:text-blue-700">Scholarships</Link></li>
                <li><Link href="/students#lab-matching" onClick={handleMobileLinkClick} className="block hover:text-blue-700">Lab Matching</Link></li>
                <li><Link href="/students#competitions" onClick={handleMobileLinkClick} className="block hover:text-blue-700">Competitions</Link></li>
                <li><Link href="/students#grants" onClick={handleMobileLinkClick} className="block hover:text-blue-700">Grants</Link></li>
              </ul>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">For Partners</p>
              <ul className="space-y-2">
                <li><Link href="/partners/opportunities" onClick={handleMobileLinkClick} className="block hover:text-blue-700">Opportunities</Link></li>
                <li><Link href="/partners/support" onClick={handleMobileLinkClick} className="block hover:text-blue-700">Support Us</Link></li>
                <li><Link href="/partners/contact" onClick={handleMobileLinkClick} className="block hover:text-blue-700">Contact</Link></li>
              </ul>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Get Involved</p>
              <ul className="space-y-2">
                <li><Link href="/careers/instructors" onClick={handleMobileLinkClick} className="block hover:text-blue-700">Become an Instructor</Link></li>
                <li><Link href="/careers/volunteer" onClick={handleMobileLinkClick} className="block hover:text-blue-700">Volunteers</Link></li>
                <li><Link href="/careers/contact" onClick={handleMobileLinkClick} className="block hover:text-blue-700">Connect with Us</Link></li>
              </ul>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}

// Desktop dropdown group
function Dropdown({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>{title}</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-3 p-4 md:w-[400px]">{children}</ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { title?: string; className?: string }
>(({ title, children, className, ...props }, ref) => (
  <li>
    <NavigationMenuLink asChild>
      <a
        ref={ref}
        className={cn(
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
          className
        )}
        {...props}
      >
        {title && <div className="text-sm font-medium leading-none">{title}</div>}
        {children && <p className="line-clamp-2 text-sm text-muted-foreground">{children}</p>}
      </a>
    </NavigationMenuLink>
  </li>
))

