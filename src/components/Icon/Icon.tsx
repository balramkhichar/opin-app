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
  AlertSquareIcon,
  CheckSquareIcon,
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
  alertSquare: AlertSquareIcon,
  checkSquare: CheckSquareIcon,
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

  // Handle different icon prop interfaces
  const iconProps: Record<string, unknown> = {
    className,
    color,
  };

  // Only add size prop if the component accepts it
  // We'll pass the numeric size for components that expect it
  if (
    name === 'user' ||
    name === 'check' ||
    name === 'close' ||
    name === 'logIn' ||
    name === 'logOut' ||
    name === 'mail' ||
    name === 'home' ||
    name === 'eye' ||
    name === 'eyeOff' ||
    name === 'settings' ||
    name === 'barChart' ||
    name === 'chevronSelectorVertical'
  ) {
    iconProps.size = sizeMap[size];
  } else if (name === 'alertSquare' || name === 'checkSquare') {
    // These components expect size as string
    iconProps.size = size;
  }
  // For other icons (like plus, menu), we don't pass size prop

  return <IconComponent {...iconProps} />;
}
