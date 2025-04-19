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

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
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
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

export function Header() {
  const [showNav, setShowNav] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setShowNav(currentScrollY < lastScrollY || currentScrollY < 50)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <div className={cn(
      "fixed top-0 left-0 z-50 w-full bg-white transition-transform duration-300 shadow-md",
      showNav ? "translate-y-0" : "-translate-y-full"
    )}>
      <div className="mx-auto flex max-w-8xl items-center justify-between pr-7 py-2 pl-15">
        <Link href="/" className="text-lg font-bold">
            <img src="/assets/logo.svg" alt="FutureEra logo" className="h-13 w-auto py-1" />
            <span className="sr-only">FutureEra</span> {/* for screen readers */}
        </Link>

        <NavigationMenu>
          <NavigationMenuList>
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

            {/* Impact */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>Our Impact</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-green-100 to-white p-6 no-underline outline-none focus:shadow-md"
                        href="/news"
                      >
                        <div className="mb-2 mt-4 text-lg font-medium">Impact Stories</div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Read how our students are making a difference.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/news" title="News & Highlights">
                    Our milestones, awards, and community outreach.
                  </ListItem>
                  <ListItem href="/impact#outreach" title="Outreach">
                    School visits, events, and workshops.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* About */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>Get Involved</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-4">
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
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  )
}
