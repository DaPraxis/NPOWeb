import cn from 'clsx';

export const Card = ({
  number,
  text,
  className,
  inverted,
  background = 'rgba(14, 14, 14, 0.15)',
}) => {
  return (
    <div
      className={cn(
        'flex flex-col justify-between aspect-square border backdrop-blur',
        'text-theme-secondary border-current p-6 w-[343px] md:w-[440px] md:p-6',
        inverted && 'text-theme-primary bg-theme-secondary',
        className
      )}
      style={{ backgroundColor: background }}
    >
      {number && (
        <p className="text-theme-contrast font-black leading-[86%] tracking-[-0.02em] text-[56px] md:text-[56px] font-condensed">
          {number.toString().padStart(2, '0')}
        </p>
      )}
      {text && (
        <p className="uppercase leading-[100%] tracking-[-0.01em] text-[20px] md:text-[28px] font-expanded">
          {text}
        </p>
      )}
    </div>
  );
};
