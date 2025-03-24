// LanyardClientOnly.tsx
"use client";
import Lanyard from "./Lanyard";

export default function LanyardClientOnlyWrapper() {
  return <Lanyard position={[0, 0, 10000]} gravity={[0, -40, 0]} />;
}
