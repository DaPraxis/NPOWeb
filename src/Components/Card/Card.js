import cn from 'clsx';

export const Card = ({
  number,
  text,
  className,
  inverted,
  image,
  background = 'rgba(14, 14, 14, 0.15)',
}) => {
  return (
    <div
      className={cn(
        'relative overflow-visible flex flex-col justify-between aspect-square border backdrop-blur rounded-xl',
        'text-theme-secondary border-current p-6 w-[343px] md:w-[440px] md:p-6',
        inverted && 'text-theme-primary bg-theme-secondary',
        className
      )}
      style={{ backgroundColor: background }}
    >
      {number && (
        <p className="text-theme-contrast font-black leading-[86%] tracking-[-0.02em] text-[56px] md:text-[56px] font-condensed z-12">
          {number.toString().padStart(2, '0')}
        </p>
      )}
      {text && (
        <p className="leading-[100%] tracking-[-0.01em] text-[20px] md:text-[24px] font-expanded z-12">
          {text}
        </p>
      )}

      {image && (
        <img
          src={image}
          alt=""
          className="absolute left-1/5 top-1/2 transform -translate-y-1/2 w-150 h-150 md:w-150 md:h-150 object-contain z-10 drop-shadow-xl"
        />
      )}
    </div>
  );
};
