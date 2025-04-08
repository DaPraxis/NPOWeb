'use client';
import { useEffect, useRef, useState } from 'react';
import cn from 'clsx';
import TrueFocus from "../../blocks/TextAnimations/TrueFocus/TrueFocus"
import { CircleArrowRight, Sparkles} from 'lucide-react';
import { Button } from '../ui/button';
import SpotLightCard from '@/blocks/Components/SpotlightCard/SpotlightCard'

export const CardWithZoom = ({ number, text, detail, image, className = '', inverted = false, blank = false, front = false}) => {
  const ref = useRef();
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = window.innerWidth / 2;
      const cardCenter = rect.left + rect.width / 2;
      const distance = Math.abs(centerX - cardCenter);

      // 👇 scale between 1 and 1.2 (closer to center = larger)
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
  }, []);

  const paper = <div
    ref={ref}
    className={cn(
      'transition-transform duration-200 ease-out origin-center',
      'min-w-[400px] mr-[60px] ml-[60px] mt-[300px] rounded-xl backdrop-blur p-6 border',
      inverted ? 'bg-white text-black border-black' : 'bg-black text-white border-white',
      className
    )}
    style={{ transform: `scale(${scale})` }}
  >
    <p className="text-4xl font-bold mb-2">{number}</p>
    <p className="text-xl">{text}</p>
    <div className={inverted? "mt-4 text-sm text-black":"mt-4 text-sm text-gray-300"}>
    {image && <img src={image} alt="" className="w-full mt-3 rounded mb-2" />}
        {detail}
    </div>
  </div>
  var blanks = null
  if (front) {
    blanks = <div
      ref={ref}
      className={cn(
        'min-w-[500px] mr-[80px] ml-[80px] mt-[400px] p-6 border-none leading-tight'
      )}
      style={{ transform: `scale(${scale})` }}
    >
      {/* <h1 className="text-4xl font-bold pl-8 leading-tight mt-1/2 ">{text}</h1> */}
      <div>
        <TrueFocus
          sentence={text}
          manualMode={false}
          blurAmount={4}
          borderColor="rgba(0, 216, 255, 0.6)"
          animationDuration={0.5}
          pauseBetweenAnimations={1}
          />
      </div>
    </div>
  }
  else{
    blanks = 
    <SpotLightCard
      ref={ref}
      className={cn(
        'min-w-[500px] mr-128 ml-[80px] mt-[300px] p-6 items-start border-none flex flex-col items-center justify-center rounded-2xl bg-[#111] shadow-lg',
        'custom-spotlight-card'
      )}
      spotlightColor="rgba(255, 255, 255, 1)"
    >
      {/* Icon aligned left */}
      <Sparkles className="w-8 h-8 text-white mb-4" />

      {/* Heading aligned left */}
      <h2 className="text-2xl font-semibold text-white mb-2 text-left">
        Boost Your Experience
      </h2>

      {/* Paragraph also left-aligned */}
      <p className="text-sm text-gray-400 mb-6 max-w-sm text-left">
        Design and submit you own program, get supported by our mentors.
      </p>
      <a href="/students" className='text-left'>
        <Button variant="default" className="gap-2 px-6 py-2">
          Explore All Programs
          <CircleArrowRight className="w-4 h-4 text-white" />
        </Button>
      </a>
    </SpotLightCard>
  }
  if (blank) {
    return blanks
  }
  else{
    return paper
  }
};
