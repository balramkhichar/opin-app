import * as React from 'react';
import NextLink from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface LinkProps extends React.ComponentProps<typeof NextLink> {
  size?: 'sm' | 'default';
  className?: string;
  children: React.ReactNode;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ size = 'sm', className, children, ...props }, ref) => {
    return (
      <Button
        variant="link"
        size={size}
        asChild
        className={cn('h-auto px-1', className)}
      >
        <NextLink ref={ref} {...props}>
          {children}
        </NextLink>
      </Button>
    );
  }
);

Link.displayName = 'Link';

export { Link };
