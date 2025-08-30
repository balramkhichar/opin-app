'use client';

import Image from 'next/image';
import { ReactNode } from 'react';

interface IconProps {
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  alt?: string;
  children?: ReactNode;
}

const sizeMap = {
  sm: { width: 16, height: 16, className: 'w-4 h-4' },
  md: { width: 20, height: 20, className: 'w-5 h-5' },
  lg: { width: 24, height: 24, className: 'w-6 h-6' },
  xl: { width: 32, height: 32, className: 'w-8 h-8' },
};

export function Icon({
  name,
  size = 'md',
  className = '',
  alt = '',
  children,
}: IconProps) {
  const sizeConfig = sizeMap[size];
  const iconPath = `/icons/${name}.svg`;

  const combinedClassName = `${sizeConfig.className} ${className}`.trim();

  return (
    <Image
      src={iconPath}
      alt={alt}
      width={sizeConfig.width}
      height={sizeConfig.height}
      className={combinedClassName}
      aria-hidden={!alt}
    />
  );
}
