import React from 'react';

interface CheckIconProps {
  className?: string;
  size?: number;
  color?: string;
}

export function CheckIcon({
  className = '',
  size = 24,
  color = 'currentColor',
}: CheckIconProps) {
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
        d="M20 6L9 17L4 12"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
