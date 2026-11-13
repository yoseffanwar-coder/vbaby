interface BrandMarkProps {
  size?: 'sm' | 'md';
}

export function BrandMark({ size = 'md' }: BrandMarkProps) {
  const iconDimensions = size === 'sm' ? 'w-7 h-7' : 'w-8 h-8';
  const textSize = size === 'sm' ? 'text-lg' : 'text-xl';

  return (
    <span className="inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 select-none">
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={iconDimensions}
        aria-hidden="true"
      >
        <rect width="40" height="40" rx="12" fill="#E8F6FC" />
        <path
          d="M11 14.5L20 26.5L29 14.5"
          stroke="#173746"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.5 11.5C17.2 9.8 22.8 9.8 24.5 11.5"
          stroke="#F2B800"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <circle cx="20" cy="11.5" r="1.6" fill="#F48FB1" />
      </svg>
      <span
        dir="ltr"
        className={`font-latin font-extrabold tracking-tight text-[#173746] ${textSize}`}
      >
        V BABY
      </span>
    </span>
  );
}
