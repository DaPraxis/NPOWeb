'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import Sketch from 'react-p5';
import p5Types from 'p5';

// let NUM_LAYERS = 6;
const LAYER_HEIGHT_FACTOR = 0.22;
const NOISE_SCALE = 0.0015;
const NOISE_DETAIL = 0.001;
let colorPalettes: [number, number, number][][] = [];
let currentPalette: [number, number, number][] = [];
let seed: number;
let timeOffset = 0;
const speed = 0.08;
const colorShiftSpeed = 0.02;
let baseHue = 0;

const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
const NUM_LAYERS = isMobile ? 4 : 6;

let layerGraphics: p5Types.Graphics[] = [];
let preRendered = false;

export default function GenerativeLandscape() {
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.pixelDensity(1);
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    p5.colorMode(p5.HSB, 360, 100, 100, 100);
    initializeColorPalettes();
    regenerateLandscape(p5);
    p5.noSmooth(); // in setup
  };

  const draw = (p5: p5Types) => {
    if (document.hidden) return; // skip drawing when tab is inactive
    if (!preRendered) {
        preRenderLayers(p5);
        preRendered = true;
      }

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
      const c = p5.lerpColor(c1, c2, inter);
      p5.stroke(c);
      p5.line(0, y, p5.width, y);
    }
  };

  const preRenderLayers = (p5: p5Types) => {
    layerGraphics = [];
  
    for (let i = NUM_LAYERS - 1; i >= 0; i--) {
      const g = p5.createGraphics(p5.width, p5.height);
      g.colorMode(p5.HSB, 360, 100, 100, 100);
      const [baseH, s, b] = currentPalette[i % currentPalette.length];
      g.noStroke();
      g.fill(baseH, s, b);
  
      g.beginShape();
      g.vertex(0, p5.height);
  
      const yBase = p5.height * (1 - LAYER_HEIGHT_FACTOR * (i / (NUM_LAYERS - 1)));
      const mouseFactorY = 0; // optional: lock or vary if needed
  
      for (let x = 0; x <= p5.width; x += 10) {
        const n = g.noise(x * NOISE_SCALE + i * 100, i * 100 * NOISE_DETAIL);
        const yOffset = p5.map(n, 0, 1, -160, 160);
        const y = yBase + yOffset + mouseFactorY * (i / NUM_LAYERS);
        g.vertex(x, y);
      }
  
      g.vertex(p5.width, p5.height);
      g.endShape(p5.CLOSE);
      layerGraphics.push(g);
    }
  };

  const drawMountainLayer = (p5: p5Types, layerIndex: number) => {
    p5.noStroke();
    const paletteColor = currentPalette[layerIndex % currentPalette.length];
    const h = (p5.hue(paletteColor) + baseHue) % 360;
    const s = p5.saturation(paletteColor);
    const b = p5.brightness(paletteColor);
    p5.fill(h, s, b);

    p5.beginShape();
    p5.vertex(0, p5.height);
    const layerOffset = p5.map(layerIndex, 0, NUM_LAYERS - 1, 0, 1);
    const verticalPos = p5.height * (1 - LAYER_HEIGHT_FACTOR * layerOffset);
    const mouseFactorY = p5.map(p5.mouseY, 0, p5.height, -80, 80);

    for (let x = 0; x <= p5.width; x += 4) {
      const noiseVal = p5.noise(
        x * NOISE_SCALE + layerIndex * 100,
        (timeOffset + layerIndex * 100) * NOISE_DETAIL
      );
      const yOff = p5.map(noiseVal, 0, 1, -180, 180);
      const finalY = verticalPos + yOff + mouseFactorY * (layerIndex / NUM_LAYERS);
      p5.vertex(x, finalY);
    }

    p5.vertex(p5.width, p5.height);
    p5.endShape(p5.CLOSE);
  };

  const initializeColorPalettes = () => {
    colorPalettes = [
      [
        [20, 80, 60],
        [40, 80, 70],
        [60, 80, 80],
        [80, 80, 70],
        [100, 80, 60],
        [120, 80, 50],
      ],
      [
        [5, 90, 90],
        [25, 90, 90],
        [45, 90, 80],
        [65, 90, 70],
        [85, 90, 60],
        [105, 70, 50],
      ],
      [
        [180, 40, 90],
        [200, 40, 80],
        [220, 40, 70],
        [240, 40, 60],
        [260, 40, 50],
        [280, 40, 40],
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
  };

  return (
    <div className="absolute inset-0 z-0">
      <Sketch setup={setup} draw={draw} windowResized={windowResized} />
    </div>
  )}