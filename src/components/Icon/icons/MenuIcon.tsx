import React from 'react';

interface MenuIconProps {
  className?: string;
  size?: number;
  color?: string;
}

export function MenuIcon({
  className = '',
  size = 24,
  color = 'currentColor',
}: MenuIconProps) {
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
        d="M3 12H21M3 6H21M3 18H21"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
