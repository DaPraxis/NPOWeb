"use client";
import dynamic from "next/dynamic";
import { Card } from "../Components/Card/Card";

const Lanyard = dynamic(() => import("@/blocks/Components/Lanyard/Lanyard"), {
  ssr: false,
  loading: () => <div className="text-white">Loading 3D scene...</div>,
});

export default function Home() {
  return (
    <div className="relative">
      {/* 👇 Interactive 3D canvas, fixed behind content */}
      <div className="absolute top-0 left-1/2 w-1/2 h-full z-0">
        <Lanyard position={[0, 0, 20]} gravity={[0, -30, 0]} />
      </div>

      {/* 👇 Foreground content that scrolls but doesn't block canvas */}
      <div className="relative z-10 pointer-events-none flex flex-col gap-8 p-6 min-h-screen">
        <Card
          className="pointer-events-auto"
          number="01"
          text="Loss of performance budget due to using CSS transforms --"
          inverted={true}
        />
        <Card
          className="pointer-events-auto"
          number="02"
          text="Render blocking resources causing layout shift"
          inverted={false}
        />
        <Card
          className="pointer-events-auto"
          number="03"
          text="Inefficient animation triggering reflow"
          inverted={true}
        />
        <Card
          className="pointer-events-auto"
          number="04"
          text="GPU overdraw caused by layering"
          inverted={false}
        />
        <Card
          className="pointer-events-auto"
          number="05"
          text="LCP element shifting due to transform: translateZ(0)"
          inverted={true}
        />
      </div>
    </div>
  );
}
