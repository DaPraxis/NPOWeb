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
      <body className="antialiased bg-white text-black">
        <LenisLayout>
          {children}</LenisLayout>
      </body>
    </html>
  )
}
