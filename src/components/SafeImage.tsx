import { useState } from 'react';
import { Shirt } from 'lucide-react';

interface SafeImageProps {
  src: string;
  alt: string;
  fallbackTitle: string;
  className?: string;
}

export function SafeImage({
  src,
  alt,
  fallbackTitle,
  className = '',
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#EBF7FC] via-[#FFF6F8] to-[#FFFBEA] text-[#244858] p-6 text-center ${className}`}
      >
        <div className="w-12 h-12 rounded-2xl bg-white/90 border border-[#D9ECF5] flex items-center justify-center text-[#257A99]">
          <Shirt className="w-6 h-6" strokeWidth={1.75} />
        </div>
        <span className="text-sm font-bold text-[#173746]">{fallbackTitle}</span>
        <span className="font-latin text-[11px] tracking-wider text-[#526875]">
          V BABY
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading="lazy"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
