'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import Sketch from 'react-p5';
import p5 from 'p5';

let colors = ['#e92f2f', '#ffd91c', '#067bc2', '#17bebb', '#ffffff'];
let motions = [];
let motionClasses = [];
let rects = [];
let sceneTimer = 0;
let resetTime = 60 * 6;

export default function MotionGrid() {
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(600, 600).parent(canvasParentRef);
    p5.rectMode(p5.CENTER);
    INIT(p5);
  };

  const draw = (p5) => {
    // p5.background(0);
    p5.clear();
    for (let m of motions) m.run();

    p5.stroke(0);
    p5.strokeWeight(p5.width * 0.003);
    for (let i of rects) p5.point(i.x, i.y);

    if (p5.frameCount % resetTime === 0) INIT(p5);
    sceneTimer++;
  };

  const INIT = (p5) => {
    sceneTimer = 0;
    motions = [];
    rects = [];
    motionClasses = [Motion01, Motion02, Motion03, Motion04, Motion05];
    tiling(p5);
    for (let i = 0; i < rects.length; i++) {
      let MotionClass = p5.random(motionClasses);
      let r = rects[i];
      let t = -p5.int(r.c * 15);
      let clr = p5.random(colors);
      motions.push(new MotionClass(p5, r.x, r.y, r.w - p5.width * 0.005, t, clr));
      r.animated = true;
    }
  };

  const tiling = (p5) => {
    let offset = p5.width * 0.1;
    let gridCountW = 24;
    let gridCountH = 24;
    let gridW = (p5.width - offset * 2) / gridCountW;
    let gridH = (p5.height - offset * 2) / gridCountH;
    let emp = gridCountW * gridCountH;
    let grids = Array.from({ length: gridCountW }, () => Array(gridCountH).fill(false));

    while (emp > 0) {
      let w = p5.int(p5.random(1, 9));
      let h = w;
      let x = p5.int(p5.random(gridCountW - w + 1));
      let y = p5.int(p5.random(gridCountH - h + 1));
      let lap = true;
      for (let j = 0; j < h; j++)
        for (let i = 0; i < w; i++)
          if (grids[x + i][y + j]) lap = false;

      if (lap) {
        for (let j = 0; j < h; j++)
          for (let i = 0; i < w; i++) grids[x + i][y + j] = true;

        let xx = offset + x * gridW;
        let yy = offset + y * gridH;
        let ww = w * gridW;
        let hh = h * gridH;
        rects.push({ x: xx + ww / 2, y: yy + hh / 2, w: ww, h: hh, c: w });
        emp -= w * h;
      }
    }
  };

  const easeInOutQuint = (x) =>
    x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;

  class Agent {
    constructor(p5, x, y, w, t, clr) {
      this.p5 = p5;
      this.x = x;
      this.y = y;
      this.w = w;
      this.t1 = 60;
      this.t2 = this.t1 + 120;
      this.t3 = this.t2 + 60;
      this.t = t;
      this.clr2 = p5.color(clr);
      this.currentColor = this.clr2;
    }

    show() {}
    move() {
      if (0 < this.t && this.t < this.t1) {
        let n = this.p5.norm(this.t, 0, this.t1 - 1);
        this.updateMotion1(easeInOutQuint(n));
      } else if (this.t2 < this.t && this.t < this.t3) {
        let n = this.p5.norm(this.t, this.t2, this.t3 - 1);
        this.updateMotion2(easeInOutQuint(n));
      }
      this.t++;
    }

    run() {
      this.show();
      this.move();
    }

    updateMotion1(n) {}
    updateMotion2(n) {}
  }

  class Motion01 extends Agent {
    constructor(p5, x, y, w, t, clr) {
      super(p5, x, y, w, t, clr);
      this.shift = this.w * 3;
      this.ang = p5.int(p5.random(4)) * (p5.TAU / 4);
      this.size = 0;
    }

    show() {
      this.p5.noStroke();
      this.p5.fill(this.currentColor);
      this.p5.square(
        this.x + this.shift * this.p5.cos(this.ang),
        this.y + this.shift * this.p5.sin(this.ang),
        this.size
      );
    }

    updateMotion1(n) {
      this.shift = this.p5.lerp(this.w * 2, 0, n);
      this.size = this.p5.lerp(0, this.w, n);
    }

    updateMotion2(n) {
      this.shift = this.p5.lerp(0, this.w * 2, n);
      this.size = this.p5.lerp(this.w, 0, n);
    }
  }

  class Motion02 extends Agent {
    constructor(p5, x, y, w, t, clr) {
      super(p5, x, y, w, t, clr);
      this.ang = p5.int(p5.random(4)) * (p5.TAU / 4);
      this.side = 0;
    }

    show() {
      this.p5.push();
      this.p5.translate(this.x, this.y);
      this.p5.rotate(this.ang);
      this.p5.noStroke();
      this.p5.fill(this.currentColor);
      this.p5.rect(0, this.w / 2 - this.side / 2, this.w, this.side);
      this.p5.pop();
    }

    updateMotion1(n) {
      this.side = this.p5.lerp(0, this.w, n);
    }

    updateMotion2(n) {
      this.side = this.p5.lerp(this.w, 0, n);
    }
  }

  class Motion03 extends Agent {
    constructor(p5, x, y, w, t, clr) {
      super(p5, x, y, w, t, clr);
      this.ang = 0;
      this.size = 0;
    }

    show() {
      this.p5.push();
      this.p5.translate(this.x, this.y);
      this.p5.rotate(this.ang);
      this.p5.noStroke();
      this.p5.fill(this.currentColor);
      this.p5.square(0, 0, this.size);
      this.p5.pop();
    }

    updateMotion1(n) {
      this.ang = this.p5.lerp(0, this.p5.PI, n);
      this.size = this.p5.lerp(0, this.w, n);
    }

    updateMotion2(n) {
      this.ang = this.p5.lerp(this.p5.PI, 0, n);
      this.size = this.p5.lerp(this.w, 0, n);
    }
  }

  class Motion04 extends Agent {
    constructor(p5, x, y, w, t, clr) {
      super(p5, x, y, w, t, clr);
      this.visibility = 0;
    }

    show() {
      if ((this.p5.sin(this.t) + 1) / 2 < this.visibility) {
        this.p5.noStroke();
        this.p5.fill(this.currentColor);
        this.p5.rect(this.x, this.y, this.w, this.w);
      }
    }

    updateMotion1(n) {
      this.visibility = n;
    }

    updateMotion2(n) {
      this.visibility = 1 - n;
    }
  }

  class Motion05 extends Agent {
    constructor(p5, x, y, w, t, clr) {
      super(p5, x, y, w, t, clr);
      this.shift = this.w / 2;
      this.size = 0;
    }

    show() {
      this.p5.push();
      this.p5.translate(this.x, this.y);
      this.p5.noStroke();
      for (let i = 0; i < 4; i++) {
        this.p5.fill(this.currentColor);
        this.p5.square(this.w / 4 + this.shift, this.w / 4 + this.shift, this.size);
        this.p5.rotate(this.p5.TAU / 4);
      }
      this.p5.pop();
    }

    updateMotion1(n) {
      this.size = this.p5.lerp(0, this.w / 2, n);
      this.shift = this.p5.lerp(this.w / 2, 0, n);
    }

    updateMotion2(n) {
      this.size = this.p5.lerp(this.w / 2, 0, n);
      this.shift = this.p5.lerp(0, this.w / 2, n);
    }
  }

  return <Sketch setup={setup} draw={draw} />;
}
