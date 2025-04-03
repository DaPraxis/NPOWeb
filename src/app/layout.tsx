// app/layout.tsx (NO "use client" here)
import './globals.css'
import type { Metadata } from 'next'
import { Inter, Roboto_Mono } from 'next/font/google'
import LenisLayout from './lenis-layout' // client component

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
})

const mono = Roboto_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'FutureEra – Youth Research. Real Impact.',
  description: 'FutureEra connects high school students to world-class university labs, competitions, and startup grants through research mentorship and STEM pathways.',
  keywords: [
    'high school research',
    'youth STEM',
    'university lab matching',
    'research competitions',
    'student startup',
    'nonprofit',
    'FutureEra',
  ],
  metadataBase: new URL('https://futureera.foundation/'), // replace with your live domain
  openGraph: {
    title: 'FutureEra – Youth Research. Real Impact.',
    description: 'Join research labs, win competitions, launch your startup. FutureEra helps students turn ideas into impact.',
    url: 'https://futureera.foundation/',
    siteName: 'FutureEra',
    images: [
      {
        url: '/assets/og-image.jpg', // Add this OG image (1200x630) to your public/assets
        width: 1200,
        height: 630,
        alt: 'FutureEra – Youth Research. Real Impact.',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FutureEra – Youth Research. Real Impact.',
    description: 'Mentorship. Research Labs. Competitions. Scholarships. Turn your ideas into impact with FutureEra.',
    images: ['/assets/og-image.jpg'], // Same as above
    creator: '@FutureEraOrg', // Optional: your Twitter handle
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <head>
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="cb358b90-c182-4a0f-9767-b4fedf5a636c"
        />
        <script 
          data-goatcounter="https://futureera.goatcounter.com/count"
          async src="//gc.zgo.at/count.js">
        </script>
        {/* ✅ Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* ✅ Charset & Viewport */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* ✅ Canonical URL */}
        <link rel="canonical" href="https://futureera.foundation/" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "FutureEra",
            "url": "https://futureera.foundation",
            "logo": "https://futureera.foundation/assets/logo.png",
            "sameAs": [
              "https://www.instagram.com/yourhandle",
              "https://www.linkedin.com/company/futureera",
              "https://twitter.com/yourhandle"
            ],
            "description": "FutureEra is a nonprofit connecting high school students with research labs, competitions, grants, and startups through STEM mentorship."
          })
        }} />
      </head>
      <body className="antialiased bg-white text-black">
        <LenisLayout>
          {children}
        </LenisLayout>
      </body>
    </html>
  )
}
