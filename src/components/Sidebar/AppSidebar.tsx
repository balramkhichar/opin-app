'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';
import { signOut } from '@/lib/auth';
import {
  Sidebar,
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
  HomeIcon,
  LogOutIcon,
  BarChartIcon,
  ChevronSelectorVerticalIcon,
  UserIcon,
  SettingsIcon,
} from '@/components/Icon';

// Navigation items
const navigationItems = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: HomeIcon,
  },
  {
    title: 'Analytics',
    url: '/analytics',
    icon: BarChartIcon,
  },
];

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

interface UserError {
  message: string;
}

export function AppSidebar() {
  const { resolvedTheme } = useTheme();
  const pathname = usePathname();
  const { state } = useSidebar();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<UserError | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const getUser = async () => {
      try {
        setError(null);
        const supabase = createClient();
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) {
          throw userError;
        }

        setUser(user);
      } catch (error) {
        console.error('Error fetching user:', error);
        setError({
          message:
            error instanceof Error ? error.message : 'Failed to fetch user',
        });
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      window.location.href = '/auth/sign-in';
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

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

  if (!mounted) {
    return null;
  }

  return (
    <Sidebar collapsible="icon">
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
                    <DropdownMenuItem asChild>
                      <Link
                        href="/profile"
                        className="flex cursor-pointer items-center gap-2"
                      >
                        <UserIcon />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/settings"
                        className="flex cursor-pointer items-center gap-2"
                      >
                        <SettingsIcon />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator />

                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      onClick={handleSignOut}
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
    </Sidebar>
  );
}
