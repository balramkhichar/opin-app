'use client';

import React from 'react';
import {
  MenuIcon,
  UserIcon,
  CheckIcon,
  CloseIcon,
  LogInIcon,
  LogOutIcon,
  MailIcon,
  HomeIcon,
  EyeIcon,
  EyeOffIcon,
  SettingsIcon,
  PlusIcon,
  BarChartIcon,
  ChevronSelectorVerticalIcon,
} from './icons';

interface IconProps {
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  color?: string;
}

const sizeMap = {
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
};

const iconComponents = {
  menu: MenuIcon,
  user: UserIcon,
  check: CheckIcon,
  close: CloseIcon,
  logIn: LogInIcon,
  logOut: LogOutIcon,
  mail: MailIcon,
  home: HomeIcon,
  eye: EyeIcon,
  eyeOff: EyeOffIcon,
  settings: SettingsIcon,
  plus: PlusIcon,
  barChart: BarChartIcon,
  chevronSelectorVertical: ChevronSelectorVerticalIcon,
};

export function Icon({
  name,
  size = 'md',
  className = '',
  color = 'currentColor',
}: IconProps) {
  const IconComponent = iconComponents[name as keyof typeof iconComponents];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <IconComponent size={sizeMap[size]} className={className} color={color} />
  );
}
