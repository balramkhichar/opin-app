'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar as SidebarPrimitive,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  LogOutIcon,
  ChevronSelectorVerticalIcon,
  UserIcon,
  SettingsIcon,
} from '@/components/Icon';

interface NavigationItem {
  title: string;
  url: string;
  icon: React.ComponentType;
}

interface UserMenuItem {
  title: string;
  url: string;
  icon: React.ComponentType;
}

interface User {
  id: string;
  email?: string;
  user_metadata?: {
    first_name?: string;
    last_name?: string;
    full_name?: string;
    avatar_url?: string;
  };
}

interface SidebarProps {
  navigationItems: NavigationItem[];
  userMenuItems: UserMenuItem[];
  user: User | null;
  loading: boolean;
  onSignOut: () => void;
}

export function Sidebar({
  navigationItems,
  userMenuItems,
  user,
  loading,
  onSignOut,
}: SidebarProps) {
  const { resolvedTheme } = useTheme();
  const pathname = usePathname();
  const { state } = useSidebar();

  const getUserDisplayName = () => {
    if (!user) return 'User';

    const { first_name, last_name, full_name } = user.user_metadata || {};

    // Construct name from first_name and last_name
    if (first_name && last_name) {
      return `${first_name} ${last_name}`;
    }

    // Fallback to full_name if available
    if (full_name) {
      return full_name;
    }

    // Fallback to first_name only
    if (first_name) {
      return first_name;
    }

    // Fallback to email username
    if (user.email) {
      return user.email.split('@')[0];
    }

    return 'User';
  };

  const getUserInitials = () => {
    const name = getUserDisplayName();
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const UserProfileDisplay = ({ className = '' }: { className?: string }) => {
    if (!user) return null;

    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <Avatar className="size-8 rounded-md">
          <AvatarImage
            src={user.user_metadata?.avatar_url}
            alt={getUserDisplayName()}
          />
          <AvatarFallback className="rounded-md text-xs">
            {getUserInitials()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-xs font-semibold">{getUserDisplayName()}</span>
          {user.email && (
            <span className="text-muted-foreground text-xs">{user.email}</span>
          )}
        </div>
      </div>
    );
  };

  return (
    <SidebarPrimitive collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-2 group-data-[collapsible=icon]:px-1">
          <Link href="/dashboard" className="flex items-center gap-2">
            {state === 'collapsed' ? (
              <Image
                src={
                  resolvedTheme === 'dark'
                    ? '/logo-small-light.svg'
                    : '/logo-small.svg'
                }
                alt="Opin Logo"
                width={32}
                height={32}
                className="h-8 w-8"
              />
            ) : (
              <Image
                src={resolvedTheme === 'dark' ? '/logo-light.svg' : '/logo.svg'}
                alt="Opin Logo"
                width={120}
                height={32}
                className="h-8 w-auto"
              />
            )}
          </Link>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    tooltip={item.title}
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        {loading ? null : user ? (
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    tooltip={getUserDisplayName()}
                  >
                    <UserProfileDisplay className="flex-1 text-left" />
                    <ChevronSelectorVerticalIcon className="ml-auto size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" side="right" className="w-56">
                  {/* User Profile Header */}
                  <DropdownMenuLabel>
                    <UserProfileDisplay />
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator />

                  <DropdownMenuGroup>
                    {userMenuItems.map(item => {
                      const IconComponent = item.icon;
                      return (
                        <DropdownMenuItem key={item.url} asChild>
                          <Link
                            href={item.url}
                            className="flex cursor-pointer items-center gap-2"
                          >
                            <IconComponent />
                            {item.title}
                          </Link>
                        </DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator />

                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      onClick={onSignOut}
                      className="flex cursor-pointer items-center gap-2"
                    >
                      <LogOutIcon />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        ) : null}
      </SidebarFooter>
      <SidebarRail />
    </SidebarPrimitive>
  );
}
