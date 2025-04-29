'use client';

import { useEffect, useRef } from 'react';

const PublicationCover = ({ preSeed = 1, coverText = 'Weekly Creative Code Challenge', coverText2 = '' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    let p5Instance;

    const loadP5 = async () => {
      const p5 = (await import('p5')).default;

      p5.prototype.flex = function () {
        this.drawingContext.imageSmoothingEnabled = false;
        this.pixelDensity(1);
        this.noSmooth();
      };

      p5.prototype.shadow = function (color = '#000', blur = 20, xOff = 0, yOff = 0) {
        this.drawingContext.shadowColor = this.color(color);
        this.drawingContext.shadowBlur = blur;
        this.drawingContext.shadowOffsetX = xOff;
        this.drawingContext.shadowOffsetY = yOff;
      };

      p5.prototype.noShadow = function () {
        this.drawingContext.shadowColor = 'transparent';
        this.drawingContext.shadowBlur = 0;
        this.drawingContext.shadowOffsetX = 0;
        this.drawingContext.shadowOffsetY = 0;
      };

      const PALETTE = [
        ['#db2f27', '#f5f5f5', '#e6c700', '#00e6c7'],
        ['#457c39', '#bbf5f5', '#fef9f7', '#ffeb00'],
        ['#e7b300', '#003535', '#e6e6c7', '#6e9f29'],
        ['#003535', '#7ff5f5', '#e5e7de', '#f54123'],
        ['#121212', '#dbb700', '#eaded0', '#f54123'],
        ['#e0e5db', '#de3d83', '#00b8b8', '#e4bd0b'],
        ['#de3d83', '#ebebeb', '#f0fa00', '#00faf0'],
        ['#e1e0dd', '#35342f', '#37bbe4', '#121212'],
        ['#08327d', '#fbfbfb', '#559a86', '#121212'],
      ];

      const PRESET = {
        WCCCa: [
          [1,0,1,0,1,0,1,1,1,1,1,1],
          [1,0,1,0,1,0,1,0,0,0,0,0],
          [1,0,1,0,1,0,1,0,1,1,1,1],
          [1,0,1,0,1,0,1,0,1,0,0,0],
          [1,0,1,0,1,0,1,0,1,0,1,1],
          [1,0,1,0,1,0,1,0,1,0,1,0],
          [1,0,1,0,1,0,1,0,1,0,1,1],
          [1,0,1,0,1,0,1,0,1,0,0,0],
          [1,0,1,0,1,0,1,0,1,1,1,1],
          [1,0,1,0,1,0,1,0,0,0,0,0],
          [1,1,1,1,1,0,1,1,1,1,1,1],
        ],
        BIRB: [
          [1,1,1,1,0,1,0,1,1,1,1,1],
          [1,0,0,1,0,1,0,1,0,0,0,1],
          [1,0,0,1,0,1,0,1,1,1,1,1],
          [1,0,0,1,0,1,0,1,0,0,1,0],
          [1,0,0,1,0,0,0,1,0,0,1,1],
          [1,1,1,1,1,1,0,0,0,0,0,0],
          [1,0,0,0,0,1,0,1,1,1,0,0],
          [1,0,0,0,0,1,0,1,0,1,0,0],
          [1,0,0,0,0,1,0,1,1,1,1,1],
          [1,1,1,1,1,1,0,1,0,0,0,1],
          [0,0,1,0,1,0,0,1,1,1,1,1],
        ],
      };

      const drawWShape = (p, gfx, size, color) => {
        const points = [
          [-0.5, -0.5], [-0.3, 0.5], [-0.1, 0.5], [0, -0.2],
          [0.1, 0.5], [0.3, 0.5], [0.5, -0.5], [0.3, -0.5],
          [0.2, 0.2], [0.1, -0.5], [-0.1, -0.5], [-0.2, 0.2],
          [-0.3, -0.5], [-0.5, -0.5]
        ];
        gfx.push();
        gfx.translate(0, 0);
        gfx.scale(size * 2.4); // <-- fix here!
        gfx.fill(color);
        gfx.noStroke();
        gfx.beginShape();
        points.forEach(([x, y]) => gfx.vertex(x, y));
        gfx.endShape(p.CLOSE);
        gfx.pop();
      };
      
      
      const drawCShape = (p, gfx, size, color, bgColor) => {
        gfx.push();
        gfx.translate(0, 0);
        gfx.noStroke();
        gfx.fill(color);
        gfx.arc(0, 0, size, size, p.radians(30), p.radians(330), p.PIE);
        gfx.fill(bgColor);
        gfx.circle(0, 0, size * 0.5);
        gfx.pop();
      };
      

      const sketch = (p) => {
        p.randomSeed(preSeed);

        const containerWidth = canvasRef.current.offsetWidth || 600;
        const POSTER_WIDTH = containerWidth * 0.6;
        const POSTER_HEIGHT = POSTER_WIDTH * 4 / 3;
        const CANVAS_SIZE = POSTER_HEIGHT * 1.2;

        let gfx, dustLayer;
        let bgColor, fgColor, colorA, colorB;

        const drawDust = () => {
            dustLayer.background(0, 0); // fully transparent background
            dustLayer.loadPixels();
            for (let i = 0; i < dustLayer.width; i++) {
              for (let j = 0; j < dustLayer.height; j++) {
                const index = 4 * (i + j * dustLayer.width);
                const noiseVal = p.random(255);
                dustLayer.pixels[index] = noiseVal;     // R
                dustLayer.pixels[index + 1] = noiseVal; // G
                dustLayer.pixels[index + 2] = noiseVal; // B
                dustLayer.pixels[index + 3] = p.random() < 0.08 ? 50 : 0; // Alpha (visible only some pixels)
              }
            }
            dustLayer.updatePixels();
          };

          const drawRandomGrid = () => {
            const gridType = p.random(['circle', 'square', 'diamond', 'mix', 'preset', 'wccc']);
            const reservedTextHeight = 200;
            const availableHeight = POSTER_HEIGHT - reservedTextHeight;
            const cols = p.floor(p.random(3, 6));
            const cellSize = (POSTER_WIDTH - 90) / cols;
            const rows = Math.floor(availableHeight / cellSize);
            const offsetX = (POSTER_WIDTH - cols * cellSize) / 2;
            const offsetY = 50;
        
            gfx.push();
            gfx.translate(offsetX, offsetY);
        
            if (gridType === 'preset') {
              const grid = p.random([PRESET.WCCCa, PRESET.BIRB]);
              const presetCols = 12;
              const presetCellSize = (POSTER_WIDTH - 90) / presetCols;
              const presetOffsetX = (POSTER_WIDTH - presetCols * presetCellSize) / 2;
              gfx.translate(presetOffsetX - offsetX, 0);
              grid.forEach((row, y) => {
                row.forEach((col, x) => {
                  gfx.fill(col === 1 ? colorA : bgColor);
                  gfx.square(x * presetCellSize, y * presetCellSize, presetCellSize);
                });
              });
            } else {
              const mainColor = colorA;
              const accentColor = colorB;
              for (let y = 0; y < rows; y++) {
                for (let x = 0; x < cols; x++) {
                  const posX = x * cellSize;
                  const posY = y * cellSize;
                  gfx.push();
                  gfx.translate(posX + cellSize / 2, posY + cellSize / 2);
                  const useAccent = p.random() < 0.2;
                  const shapeColor = useAccent ? accentColor : mainColor;
                  gfx.fill(shapeColor);
                  const shape = (gridType === 'mix') ? p.random(['circle', 'square', 'diamond']) : gridType;
        
                  if (shape === 'circle') gfx.circle(0, 0, cellSize * 0.8);
                  else if (shape === 'square') gfx.square(-cellSize * 0.4, -cellSize * 0.4, cellSize * 0.8);
                  else if (shape === 'diamond') {
                    gfx.rotate(p.radians(45));
                    gfx.square(-cellSize * 0.4, -cellSize * 0.4, cellSize * 0.8);
                  } else if (shape === 'wccc') {
                    if (p.random() < 0.5) drawWShape(p, gfx, 0.4 * cellSize, shapeColor);
                    else drawCShape(p, gfx, 0.8 * cellSize, shapeColor, bgColor);
                  }
        
                  gfx.pop();
                }
              }
            }
        
            gfx.pop();
          };

        p.setup = () => {
            p.createCanvas(CANVAS_SIZE, CANVAS_SIZE);
            p.flex();
        
            [bgColor, fgColor, colorA, colorB] = p.random(PALETTE);
            gfx = p.createGraphics(POSTER_WIDTH, POSTER_HEIGHT);
            dustLayer = p.createGraphics(POSTER_WIDTH, POSTER_HEIGHT);
            dustLayer.pixelDensity(1);
            gfx.background(bgColor);
            gfx.noStroke();
            gfx.textFont('Verdana');
        
            drawRandomGrid();
        
            gfx.fill(fgColor);
            gfx.textAlign(gfx.RIGHT, gfx.CENTER);
            gfx.textSize(18);
            gfx.text(coverText, POSTER_WIDTH - 40, POSTER_HEIGHT - 120);
            gfx.text(coverText2, POSTER_WIDTH - 40, POSTER_HEIGHT - 100);
            gfx.textSize(10);

            gfx.textAlign(gfx.RIGHT, gfx.CENTER);
            gfx.text('#FutureEra_Research', POSTER_WIDTH - 40, POSTER_HEIGHT - 70);
        
            const bannerText = "Volume 1 | Issue 1 | Spring 2026";
            const bannerY = POSTER_HEIGHT - 28;
            const bannerHeight = 45;
            const bannerPadding = 0;

            gfx.fill(colorB);
            gfx.noStroke();
            gfx.rectMode(p.CENTER);
            gfx.rect(
            POSTER_WIDTH / 2,
            bannerY,
            POSTER_WIDTH - bannerPadding * 2,
            bannerHeight,
            0 // rounded corners
            );

            gfx.fill(bgColor); // Text matches background for contrast
            gfx.textAlign(gfx.CENTER, gfx.CENTER);
            gfx.textSize(14);
            gfx.text(bannerText, POSTER_WIDTH / 2, bannerY);
        
            drawDust(); // Create dust only once
          };

        p.draw = () => {
            p.background('transparent');
            p.shadow('#000', 30, 10, 10);
            p.imageMode(p.CENTER);
            p.image(gfx, p.width / 2, p.height / 2, POSTER_WIDTH, POSTER_HEIGHT);
            // dust effect
            p.push();
            p.blendMode(p.ADD); // or try MULTIPLY or OVERLAY
            p.image(dustLayer, p.width / 2, p.height / 2, POSTER_WIDTH, POSTER_HEIGHT);
            p.pop();
            p.tint(255, 60); // Light opacity blend
            p.image(dustLayer, p.width / 2, p.height / 2, POSTER_WIDTH, POSTER_HEIGHT);
            p.noTint();
            p.noShadow();
        };
      };

      if (canvasRef.current) canvasRef.current.innerHTML = '';
      p5Instance = new p5(sketch, canvasRef.current);
    };

    loadP5();

    return () => {
      if (p5Instance) p5Instance.remove();
    };
  }, [preSeed, coverText]);

  return (
    <div className="flex justify-center items-center w-full">
      <div ref={canvasRef} className="overflow-hidden bg-transparent" />
    </div>
  );
};

export default PublicationCover;
