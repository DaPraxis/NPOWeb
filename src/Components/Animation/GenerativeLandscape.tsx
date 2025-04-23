'use client';

import React, { useRef, useEffect, useState } from 'react';
import Sketch from 'react-p5';
import p5Types from 'p5';

const LAYER_HEIGHT_FACTOR = 0.22;
const NOISE_SCALE = 0.0015;
const NOISE_DETAIL = 0.001;
const speed = 0.08;
const colorShiftSpeed = 0.02;

let seed: number;
let baseHue = 0;
let timeOffset = 0;

const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
const NUM_LAYERS = isMobile ? 3 : 5;

let currentPalette: [number, number, number][] = [];
let colorPalettes: [number, number, number][][] = [];
let layerVertices: { x: number; y: number }[][] = [];

export default function GenerativeLandscape() {
  const [ready, setReady] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const initWhenIdle = () => {
      requestIdleCallback?.(() => setReady(true)) || setTimeout(() => setReady(true), 300);
    };

    if ('IntersectionObserver' in window && containerRef.current) {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          initWhenIdle();
          observer.disconnect();
        }
      });
      observer.observe(containerRef.current);
    } else {
      initWhenIdle(); // fallback for unsupported browsers
    }
  }, []);

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.pixelDensity(1); // avoid retina overdraw
    p5.noSmooth();
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    p5.colorMode(p5.HSB, 360, 100, 100, 100);
    initializeColorPalettes();
    regenerateLandscape(p5);

    // defer preRenderLayers until canvas is idle
    requestIdleCallback?.(() => preRenderLayers(p5)) || setTimeout(() => preRenderLayers(p5), 100);

    p5.frameRate(isMobile ? 24 : 60);
  };

  const draw = (p5: p5Types) => {
    if (document.hidden || layerVertices.length === 0) return;

    p5.background(0, 0, 0, 100);
    baseHue += colorShiftSpeed * p5.deltaTime;
    drawSkyGradient(p5);

    for (let i = 0; i < NUM_LAYERS; i++) {
      const layerIndex = NUM_LAYERS - 1 - i;
      drawMountainLayer(p5, layerIndex);
    }

    timeOffset += speed * p5.deltaTime;
  };

  const drawSkyGradient = (p5: p5Types) => {
    const c1 = p5.color((baseHue + 200) % 360, 40, 30);
    const c2 = p5.color((baseHue + 280) % 360, 80, 70);
    for (let y = 0; y < p5.height; y++) {
      const inter = p5.map(y, 0, p5.height, 0, 1);
      p5.stroke(p5.lerpColor(c1, c2, inter));
      p5.line(0, y, p5.width, y);
    }
  };

  const preRenderLayers = (p5: p5Types) => {
    layerVertices = [];

    for (let i = NUM_LAYERS - 1; i >= 0; i--) {
      const points: { x: number; y: number }[] = [];
      const yBase = p5.height * (1 - LAYER_HEIGHT_FACTOR * (i / (NUM_LAYERS - 1)));

      for (let x = 0; x <= p5.width; x += 12) { // fewer points
        const n = p5.noise(x * NOISE_SCALE + i * 100, i * 100 * NOISE_DETAIL);
        const yOffset = p5.map(n, 0, 1, -160, 160);
        points.push({ x, y: yBase + yOffset });
      }

      layerVertices.push(points);
    }
  };

  const drawMountainLayer = (p5: p5Types, layerIndex: number) => {
    const [h0, s, b] = currentPalette[layerIndex % currentPalette.length];
    const h = (h0 + baseHue) % 360;

    p5.noStroke();
    p5.fill(h, s, b);

    const points = layerVertices[NUM_LAYERS - 1 - layerIndex];
    const mouseFactorY = p5.map(p5.mouseY, 0, p5.height, -80, 80);

    p5.beginShape();
    p5.vertex(0, p5.height);
    for (let { x, y } of points) {
      p5.vertex(x, y + mouseFactorY * (layerIndex / NUM_LAYERS));
    }
    p5.vertex(p5.width, p5.height);
    p5.endShape(p5.CLOSE);
  };

  const initializeColorPalettes = () => {
    colorPalettes = [
      [
        [20, 80, 60], [40, 80, 70], [60, 80, 80],
        [80, 80, 70], [100, 80, 60], [120, 80, 50]
      ],
      [
        [5, 90, 90], [25, 90, 90], [45, 90, 80],
        [65, 90, 70], [85, 90, 60], [105, 70, 50]
      ],
      [
        [180, 40, 90], [200, 40, 80], [220, 40, 70],
        [240, 40, 60], [260, 40, 50], [280, 40, 40]
      ]
    ];
  };

  const regenerateLandscape = (p5: p5Types) => {
    seed = p5.floor(p5.random(100000));
    p5.randomSeed(seed);
    p5.noiseSeed(seed);
    currentPalette = p5.random(colorPalettes);
    if (p5.random() < 0.5) currentPalette.reverse();
  };

  const windowResized = (p5: p5Types) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    preRenderLayers(p5);
  };

  return (
    <div className="absolute inset-0 z-0 pointer-events-none" ref={containerRef}>
      {ready && <Sketch setup={setup} draw={draw} windowResized={windowResized} />}
    </div>
  );
}
