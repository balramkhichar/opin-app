'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';
import { useAuth } from '@/lib/auth-context';
import { uploadAvatar, deleteAvatar, getInitials } from '@/lib/avatar';
import { Form } from '@/components/Form';
import { FormField } from '@/components/Form/FormField';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from '@/components/Toast';
import { Icon } from '@/components/Icon';
import { Loading } from '@/components/Loading';
import type { AnyFieldApi } from '@tanstack/react-form';

interface ProfileData {
  first_name: string;
  last_name: string;
  avatar_url?: string;
}

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const [saving, setSaving] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  useEffect(() => {
    if (user?.user_metadata?.avatar_url) {
      setAvatarPreview(user.user_metadata.avatar_url);
    }
  }, [user]);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = e => {
        setAvatarPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (values: ProfileData) => {
    if (!user) return;

    setSaving(true);

    try {
      const supabase = createClient();
      let avatarUrl = user.user_metadata?.avatar_url;

      // Upload new avatar if selected
      if (avatarFile) {
        // Delete old avatar if it exists
        if (user.user_metadata?.avatar_url) {
          const deleteResult = await deleteAvatar(
            user.user_metadata.avatar_url,
            user.id
          );
          if (!deleteResult.success) {
            console.warn('Failed to delete old avatar:', deleteResult.error);
            // Continue with upload even if deletion fails
          }
        }

        const uploadResult = await uploadAvatar(avatarFile, user.id);
        if (!uploadResult.success) {
          throw new Error(uploadResult.error || 'Failed to upload avatar');
        }
        avatarUrl = uploadResult.url || undefined;
      }

      // Update user metadata
      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          first_name: values.first_name,
          last_name: values.last_name,
          avatar_url: avatarUrl,
        },
      });

      if (updateError) {
        throw updateError;
      }

      toast.success('Profile updated successfully!');
      setAvatarFile(null);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(
        'Failed to update profile',
        error instanceof Error ? error.message : 'An unexpected error occurred'
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="mx-auto max-w-2xl">
          <Loading size="lg" className="min-h-[400px]" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto py-8">
        <div className="mx-auto max-w-2xl">
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground text-center">
                Unable to load profile data. Please try refreshing the page.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const currentFirstName = user.user_metadata?.first_name || '';
  const currentLastName = user.user_metadata?.last_name || '';

  return (
    <div className="container mx-auto py-8">
      <div className="mx-auto max-w-2xl space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>
              Update your personal information and profile photo.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form
              defaultValues={{
                first_name: currentFirstName,
                last_name: currentLastName,
              }}
              onSubmit={handleSubmit}
            >
              <div className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center gap-6">
                  <Avatar className="h-20 w-20 rounded-md">
                    <AvatarImage
                      src={avatarPreview || undefined}
                      alt="Profile"
                    />
                    <AvatarFallback className="rounded-md text-lg">
                      {getInitials(currentFirstName, currentLastName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="hidden"
                        id="avatar-upload"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          document.getElementById('avatar-upload')?.click()
                        }
                      >
                        <Icon name="plus" className="mr-2 h-4 w-4" />
                        Change Photo
                      </Button>
                      {avatarFile && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setAvatarFile(null);
                            setAvatarPreview(
                              user.user_metadata?.avatar_url || null
                            );
                          }}
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                    <p className="text-muted-foreground text-xs">
                      JPEG or PNG. Max size 5MB.
                    </p>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Form.Field
                    name="first_name"
                    validators={{
                      onChange: ({ value }: { value: string }) => {
                        if (!value || value.trim().length === 0) {
                          return 'First name is required';
                        }
                        if (value.trim().length < 2) {
                          return 'First name must be at least 2 characters';
                        }
                        return undefined;
                      },
                    }}
                  >
                    {(field: AnyFieldApi) => (
                      <FormField
                        field={field}
                        label="First Name"
                        placeholder="Enter your first name"
                        autoComplete="given-name"
                      />
                    )}
                  </Form.Field>

                  <Form.Field
                    name="last_name"
                    validators={{
                      onChange: ({ value }: { value: string }) => {
                        if (!value || value.trim().length === 0) {
                          return 'Last name is required';
                        }
                        if (value.trim().length < 2) {
                          return 'Last name must be at least 2 characters';
                        }
                        return undefined;
                      },
                    }}
                  >
                    {(field: AnyFieldApi) => (
                      <FormField
                        field={field}
                        label="Last Name"
                        placeholder="Enter your last name"
                        autoComplete="family-name"
                      />
                    )}
                  </Form.Field>
                </div>

                {/* Email (Read-only) */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <div className="bg-muted/50 flex items-center gap-2 rounded-md border p-3">
                    <Icon
                      name="mail"
                      className="text-muted-foreground h-4 w-4"
                    />
                    <span className="text-sm">{user.email}</span>
                  </div>
                  <p className="text-muted-foreground text-xs">
                    Email cannot be changed. Contact support if you need to
                    update your email.
                  </p>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    loading={saving}
                    className="min-w-[120px]"
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
