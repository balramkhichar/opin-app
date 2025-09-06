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
  AlertTriangleIcon,
  CheckSquareIcon,
  HelpSquareIcon,
} from './icons';
import { Tooltip, TooltipTrigger, TooltipContent } from '../ui/tooltip';

interface TooltipProps {
  content: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
}

interface IconProps {
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  color?: string;
  tooltip?: TooltipProps;
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
  alertTriangle: AlertTriangleIcon,
  checkSquare: CheckSquareIcon,
  helpSquare: HelpSquareIcon,
};

export function Icon({
  name,
  size = 'md',
  className = '',
  color = 'currentColor',
  tooltip,
}: IconProps) {
  const IconComponent = iconComponents[name as keyof typeof iconComponents];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  const iconElement = (
    <IconComponent className={className} size={sizeMap[size]} color={color} />
  );

  // If tooltip is provided, wrap the icon with tooltip components
  if (tooltip) {
    return (
      <Tooltip>
        <TooltipTrigger>{iconElement}</TooltipTrigger>
        <TooltipContent
          side={tooltip.side || 'top'}
          align={tooltip.align || 'center'}
        >
          {tooltip.content}
        </TooltipContent>
      </Tooltip>
    );
  }

  // Return icon without tooltip
  return iconElement;
}
