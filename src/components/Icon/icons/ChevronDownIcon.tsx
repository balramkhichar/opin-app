import React from 'react';

interface ChevronDownIconProps {
  size?: number;
  color?: string;
  className?: string;
}

export function ChevronDownIcon({
  size = 24,
  color = 'currentColor',
  className = '',
}: ChevronDownIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M6 9L12 15L18 9"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
