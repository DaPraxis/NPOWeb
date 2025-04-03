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
  title: 'Lenis + Next.js App',
  description: 'A smooth scroll experience with GSAP and Lenis',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <head>
        {/* ✅ Umami Analytics Script */}
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="cb358b90-c182-4a0f-9767-b4fedf5a636c"
        />
      </head>
      <body className="antialiased bg-white text-black">
        <script 
          data-goatcounter="https://futureera.goatcounter.com/count"
          async src="//gc.zgo.at/count.js">
        </script>
        <LenisLayout>
          {children}
        </LenisLayout>
      </body>
    </html>
  )
}
