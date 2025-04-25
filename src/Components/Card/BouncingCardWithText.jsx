'use client';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { Avatar } from 'antd';
import { useMediaQuery } from '@studio-freight/hamo'; // ✅ ADD this!

export default function BounceCardsWithText({
  className = '',
  testimonials = [],
  containerWidth = 600,
  containerHeight = 300,
  animationDelay = 0.5,
  animationStagger = 0.06,
  easeType = 'elastic.out(1, 0.8)',
  transformStyles = [],
  enableHover = false,
}) {
  const isMobile = useMediaQuery('(max-width: 768px)'); // ✅ Detect mobile

  useEffect(() => {
    gsap.fromTo(
      '.card',
      { scale: 0 },
      {
        scale: 1,
        stagger: animationStagger,
        ease: easeType,
        delay: animationDelay,
      }
    );
  }, [animationDelay, animationStagger, easeType]);

  const getNoRotationTransform = (transformStr) => {
    const hasRotate = /rotate\([\s\S]*?\)/.test(transformStr);
    if (hasRotate) {
      return transformStr.replace(/rotate\([\s\S]*?\)/, 'rotate(0deg)');
    } else if (transformStr === 'none') {
      return 'rotate(0deg)';
    } else {
      return `${transformStr} rotate(0deg)`;
    }
  };

  const getPushedTransform = (baseTransform, offsetX) => {
    const translateRegex = /translate\(([-0-9.]+)px\)/;
    const match = baseTransform.match(translateRegex);
    if (match) {
      const currentX = parseFloat(match[1]);
      const newX = currentX + offsetX;
      return baseTransform.replace(translateRegex, `translate(${newX}px)`);
    } else {
      return baseTransform === 'none'
        ? `translate(${offsetX}px)`
        : `${baseTransform} translate(${offsetX}px)`;
    }
  };

  const pushSiblings = (hoveredIdx) => {
    if (!enableHover) return;
    testimonials.forEach((_, i) => {
      const selector = `.card-${i}`;
      gsap.killTweensOf(selector);
      const baseTransform = transformStyles[i] || 'none';
      if (i === hoveredIdx) {
        const noRotation = getNoRotationTransform(baseTransform);
        gsap.to(selector, {
          transform: noRotation,
          duration: 0.4,
          ease: 'back.out(1.4)',
          overwrite: 'auto',
        });
      } else {
        const offsetX = i < hoveredIdx ? -160 : 160;
        const pushedTransform = getPushedTransform(baseTransform, offsetX);
        const delay = Math.abs(hoveredIdx - i) * 0.05;
        gsap.to(selector, {
          transform: pushedTransform,
          duration: 0.4,
          ease: 'back.out(1.4)',
          delay,
          overwrite: 'auto',
        });
      }
    });
  };

  const resetSiblings = () => {
    if (!enableHover) return;
    testimonials.forEach((_, i) => {
      const selector = `.card-${i}`;
      gsap.killTweensOf(selector);
      const baseTransform = transformStyles[i] || 'none';
      gsap.to(selector, {
        transform: baseTransform,
        duration: 0.4,
        ease: 'back.out(1.4)',
        overwrite: 'auto',
      });
    });
  };

  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{
        width: containerWidth,
        height: containerHeight,
      }}
    >
      {testimonials.map((item, idx) => (
        <div
          key={idx}
          className={`card card-${idx} absolute bg-white text-black rounded-[30px] shadow-lg border border-gray-300 p-6 flex flex-col justify-between text-m`}
          style={{
            width: isMobile ? '50%' : '240px', // ✅ Responsive width!
            aspectRatio: '1/1',
            transform: transformStyles[idx] || 'none',
          }}
          onMouseEnter={() => pushSiblings(idx)}
          onMouseLeave={resetSiblings}
        >
          <p className="italic mb-4">“{item.quote}”</p>

          <div className="flex items-center gap-3 mt-auto">
            {/* <Avatar src={item.image} size={48} /> */}
            <div className="font-semibold">
              <div className="text-blue-800">{item.name}</div>
              <div className="text-gray-600 text-sm">{item.grade}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
