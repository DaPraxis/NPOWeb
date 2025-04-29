'use client';

import { useEffect, useRef, useState } from 'react';
import cn from 'clsx';
import TrueFocus from "../../blocks/TextAnimations/TrueFocus/TrueFocus";
import { CircleArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import SpotLightCard from '@/blocks/Components/SpotlightCard/SpotlightCard';
import { useMediaQuery } from '@studio-freight/hamo';

export const CardWithZoom = ({ number, text, detail, image, className = '', inverted = false, blank = false, front = false }) => {
  const ref = useRef();
  const [scale, setScale] = useState(1);
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    if (isMobile) return; // ✅ Disable zoom on mobile

    const handleScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = window.innerWidth / 2;
      const cardCenter = rect.left + rect.width / 2;
      const distance = Math.abs(centerX - cardCenter);

      const maxScale = 1.2;
      const minScale = 1;
      const scaleRange = maxScale - minScale;
      const maxDistance = window.innerWidth / 2;
      const distanceRatio = Math.min(distance / maxDistance, 1);

      const newScale = maxScale - scaleRange * distanceRatio;
      setScale(newScale);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  const paper = (
    <div
      ref={ref}
      className={cn(
        'transition-transform duration-200 ease-out origin-center',
        'w-full sm:min-w-[400px] mx-auto mr-[20px] ml-[20px] sm:mr-[60px] sm:ml-[60px] mt-20 sm:mt-[300px] rounded-xl backdrop-blur p-6 border',
        inverted ? 'bg-white text-black border-black' : 'bg-black text-white border-white',
        className
      )}
      style={{ transform: isMobile ? undefined : `scale(${scale})` }} // ✅ Only apply scale on desktop
    >
      <p className="text-4xl font-bold mb-2">{number}</p>
      <p className="text-xl">{text}</p>
      <div className={inverted ? "mt-4 text-m text-black" : "mt-4 text-sm text-gray-300"}>
        {detail}
        {image && <img src={image} alt="" className="w-full mt-3 rounded mb-2" />}
      </div>
    </div>
  );

  let blanks = null;

  if (front) {
    blanks = (
      <div
        ref={ref}
        className={cn(
          'w-full sm:min-w-[500px] mx-auto p-6 border-none leading-tight mt-20 sm:mt-[400px]'
        )}
        style={{ transform: isMobile ? undefined : `scale(${scale})` }}
      >
        <TrueFocus
          sentence={text}
          manualMode={false}
          blurAmount={4}
          borderColor="rgba(0, 216, 255, 0.6)"
          animationDuration={0.5}
          pauseBetweenAnimations={1}
        />
      </div>
    );
  } else {
    blanks = (
      <SpotLightCard
        ref={ref}
        className={cn(
          'w-full sm:min-w-[500px] mx-auto p-6 mt-20 sm:mt-[300px] flex flex-col items-center justify-center rounded-2xl bg-[#111] shadow-lg custom-spotlight-card mr-10 sm:mr-3'
        )}
        spotlightColor="rgba(255, 255, 255, 1)"
        style={{ transform: isMobile ? undefined : `scale(${scale})` }}
      >
        <Sparkles className="w-8 h-8 text-white mb-4" />
        <h2 className="text-2xl font-semibold text-white mb-2 text-left">Boost Your Experience</h2>
        <p className="text-sm text-gray-400 mb-6 max-w-sm text-left">
          Design and submit your own program, get supported by our mentors.
        </p>
        <a href="/students" aria-label="Explore all student programs" className="text-left">
          <Button variant="default" className="gap-2 px-6 py-2">
            Explore All Programs
            <CircleArrowRight className="w-4 h-4 text-white" />
          </Button>
        </a>
      </SpotLightCard>
    );
  }

  return blank ? blanks : paper;
};
