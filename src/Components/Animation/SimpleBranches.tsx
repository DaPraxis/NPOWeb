'use client';

import React from 'react';
import Sketch from 'react-p5';
import p5Types from 'p5';
import { makeNoise2D } from 'open-simplex-noise';

const colors = ['#1c4d32', '#537c59', '#2c3a60', '#9e523c', '#dd995c', '#4a3111', '#d6c5b6'];
let nodes: p5Types.Vector[] = [];
const noise2D = makeNoise2D(Date.now());

export default function SimplexBranches({ canvasSize = 400 }: { canvasSize?: number }) {
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(canvasSize, canvasSize).parent(canvasParentRef);
    p5.background('#D8D5BD');
    nodes = [];

    // Adjusted layout based on canvas size
    const midX = canvasSize / 2;
    const startY = canvasSize * 0.9;
    const endY = canvasSize * 0.5;
    const branchLength = canvasSize * 0.25;

    branch(p5, midX, startY, midX, endY, branchLength, -p5.HALF_PI);

    // Border fill
    p5.fill('#f4f1de');
    p5.noStroke();
    const edge = canvasSize * 0.15;
    p5.rect(0, 0, canvasSize, edge);
    p5.rect(0, 0, edge, canvasSize);
    p5.rect(canvasSize - edge, 0, edge, canvasSize);
    p5.rect(0, canvasSize - edge, canvasSize, edge);

    // Footer text
    p5.fill(100);
    p5.noStroke();
    p5.textSize(canvasSize * 0.05);
    const today = new Date();
    const dateStr = `${(today.getMonth() + 1)
      .toString()
      .padStart(2, '0')}.${today.getDate().toString().padStart(2, '0')}`;
    p5.text(dateStr, 20, canvasSize - 20);

    p5.noLoop(); // Render once
  };

  const draw = () => { /* Intentionally blank */ };

  const branch = (
    p5: p5Types,
    x: number,
    y: number,
    x2: number,
    y2: number,
    length: number,
    angle: number
  ) => {
    for (let i = 0; i <= 1; i += 0.05) {
      const c1 = colorPicker(p5, x, y);
      const c2 = colorPicker(p5, x2, y2);
      const c = p5.lerpColor(c1, c2, i);
      const s = p5.lerp(length, length / 2, i);
      const p1 = p5.createVector(x, y);
      const p2 = p5.createVector(x2, y2);
      const pLerp = lerpVector(p5, p1, p2, i);

      p5.fill(c);
      p5.noStroke();
      p5.ellipse(pLerp.x, pLerp.y, s);
    }

    nodes.push(p5.createVector(x2, y2));
    if (length > 6) {
      const newL = length * 0.5;
      for (let i = 0; i < 10; i++) {
        const newAngle = angle + p5.random(-p5.PI / 3, p5.PI / 3);
        const newPos = p5.createVector(
          x2 + p5.cos(newAngle) * newL,
          y2 + p5.sin(newAngle) * newL
        );

        const isFarEnough = nodes.every(n => p5.dist(newPos.x, newPos.y, n.x, n.y) >= length / 4);
        if (isFarEnough) {
          branch(p5, x2, y2, newPos.x, newPos.y, newL, newAngle);
        }
      }
    }
  };

  const colorPicker = (p5: p5Types, x: number, y: number) => {
    const noiseVal = noise2D(x * 0.01, y * 0.01);
    const index = p5.floor(p5.constrain(noiseVal * colors.length, 0, colors.length - 1));
    return p5.color(colors[index]);
  };

  const lerpVector = (
    p5: p5Types,
    v1: p5Types.Vector,
    v2: p5Types.Vector,
    amt: number
  ): p5Types.Vector => {
    return p5.createVector(
      p5.lerp(v1.x, v2.x, amt),
      p5.lerp(v1.y, v2.y, amt)
    );
  };

  return <Sketch setup={setup} draw={draw} />;
}
