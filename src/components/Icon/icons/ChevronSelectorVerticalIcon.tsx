import React from 'react';

interface ChevronSelectorVerticalIconProps {
  className?: string;
  size?: number;
  color?: string;
}

export function ChevronSelectorVerticalIcon({
  className = '',
  size = 24,
  color = 'currentColor',
}: ChevronSelectorVerticalIconProps) {
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
        d="M7 15L12 20L17 15M7 9L12 4L17 9"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
