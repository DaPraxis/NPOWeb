'use client';

import React from 'react';
import Sketch from 'react-p5';
import p5Types from 'p5';

const NUM_LAYERS = 7;
const LAYER_HEIGHT_FACTOR = 0.22;
const NOISE_SCALE = 0.0015;
const NOISE_DETAIL = 0.001;

const speed = 0.08;
const colorShiftSpeed = 0.02;

let seed: number;
let timeOffset = 0;
let baseHue = 0;

// Store color as [h, s, b] tuples
let colorPalettes: [number, number, number][][] = [];
let currentPalette: [number, number, number][] = [];

export default function GenerativeLandscape() {
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    p5.colorMode(p5.HSB, 360, 100, 100, 100);
    initializeColorPalettes();
    regenerateLandscape(p5);
  };

  const draw = (p5: p5Types) => {
    p5.background(0, 0, 0, 100); // Slightly transparent for trail effect

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

  const drawMountainLayer = (p5: p5Types, layerIndex: number) => {
    const [baseH, s, b] = currentPalette[layerIndex % currentPalette.length];
    const h = (baseH + baseHue) % 360;

    p5.noStroke();
    p5.fill(h, s, b);

    p5.beginShape();
    p5.vertex(0, p5.height);

    const layerOffset = p5.map(layerIndex, 0, NUM_LAYERS - 1, 0, 1);
    const verticalPos = p5.height * (1 - LAYER_HEIGHT_FACTOR * layerOffset);
    const mouseFactorY = p5.map(p5.mouseY, 0, p5.height, -80, 80);

    for (let x = 0; x <= p5.width; x += 2) {
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
      // Earthy
      [
        [20, 80, 60],
        [40, 80, 70],
        [60, 80, 80],
        [80, 80, 70],
        [100, 80, 60],
        [120, 80, 50],
      ],
      // Sunset
      [
        [5, 90, 90],
        [25, 90, 90],
        [45, 90, 80],
        [65, 90, 70],
        [85, 90, 60],
        [105, 70, 50],
      ],
      // Cool
      [
        [180, 40, 90],
        [200, 40, 80],
        [220, 40, 70],
        [240, 40, 60],
        [260, 40, 50],
        [280, 40, 40],
      ],
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
  );
}
