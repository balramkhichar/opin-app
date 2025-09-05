import React from 'react';

interface ChevronSelectorVerticalIconProps {
  className?: string;
}

export const ChevronSelectorVerticalIcon: React.FC<
  ChevronSelectorVerticalIconProps
> = ({ className = 'h-4 w-4' }) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M7 15L12 20L17 15M7 9L12 4L17 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
