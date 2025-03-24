"use client";
import dynamic from "next/dynamic";

const Lanyard = dynamic(() => import("@/blocks/Components/Lanyard/Lanyard"), {
  ssr: false,
  loading: () => <div className="text-white">Loading 3D scene...</div>,
});


export default function Home() {
        return (<div className="w-screen h-screen overflow-hidden"><Lanyard/></div>)
}
