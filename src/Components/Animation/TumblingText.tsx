'use client';
import { useEffect, useRef } from 'react';
import { animate } from 'animejs';

const TumblingTextAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lines = ['FutureEra', 'Research'];
  const colors = ['#ff2c2c', '#2cff62', '#2c91ff']; // RGB

  useEffect(() => {
    const letters = containerRef.current?.querySelectorAll('.letter') || [];

    const tumbleIn = () => {
      letters.forEach((letter, i) => {
        const rotateX = Math.random() * 90 - 45;
        const rotateY = Math.random() * 90 - 45;
        const rotateZ = Math.random() * 90 - 45;

        const el = letter as HTMLElement;
        el.dataset.rotateX = String(rotateX);
        el.dataset.rotateY = String(rotateY);
        el.dataset.rotateZ = String(rotateZ);

        animate(letter, {
          rotateX: [0, rotateX],
          rotateY: [0, rotateY],
          rotateZ: [0, rotateZ],
          duration: 250,
          delay: i * 15,
          easing: 'easeOutCubic',
        });
      });
    };

    const tumbleOut = () => {
      letters.forEach((letter, i) => {
        const el = letter as HTMLElement;
        animate(letter, {
          rotateX: [parseFloat(el.dataset.rotateX || '0'), 0],
          rotateY: [parseFloat(el.dataset.rotateY || '0'), 0],
          rotateZ: [parseFloat(el.dataset.rotateZ || '0'), 0],
          duration: 250,
          delay: i * 15,
          easing: 'easeOutCubic',
        });
      });
    };

    const sequence = () => {
      setTimeout(() => {
        tumbleIn();
        setTimeout(() => {
          tumbleOut();
        }, 500); // 250ms tumble + 250ms stay
      }, 250); // initial 250ms delay
    };

    sequence();
  }, []);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div
        ref={containerRef}
        className="text-center leading-none flex flex-col gap-2 items-center perspective-[1000px]"
      >
        {lines.map((line, i) => (
          <div key={i} className="whitespace-nowrap">
            {line.split('').map((char, j) => (
              <span
                key={j}
                className="relative inline-block letter transform-style-[preserve-3d] text-[80px] font-black"
              >
                {/* RGB Side Layers */}
                {colors.map((color, k) => (
                  <span
                    key={`${j}-${color}`}
                    className="absolute top-0 left-0 pointer-events-none select-none"
                    style={{
                      color,
                      transform: `translate(${(k - 1) * 1.5}px, ${(k - 1) * 1.5}px)`,
                      zIndex: 0,
                    }}
                  >
                    {char}
                  </span>
                ))}

                {/* Main Black Front Face */}
                <span className="relative text-black z-10 pointer-events-none select-none">{char}</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TumblingTextAnimation;
