import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Icon } from '@/components/Icon';
import Link from 'next/link';

export default function UserPage() {
  return (
    <div className="container py-2">
      <div className="flex justify-start gap-4">
        {/* Profile Card */}
        <Link href="/user/profile">
          <Card className="aspect-square w-48">
            <CardHeader className="flex h-full flex-col items-center justify-center text-center">
              <div className="bg-muted mb-4 rounded-lg p-2">
                <Icon name="user" size="lg" />
              </div>
              <CardTitle>Profile</CardTitle>
              <CardDescription>
                View and edit your personal information
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>

        {/* Security Card */}
        <Link href="/user/security">
          <Card className="aspect-square w-48">
            <CardHeader className="flex h-full flex-col items-center justify-center text-center">
              <div className="bg-muted mb-4 rounded-lg p-2">
                <Icon name="shield" size="lg" />
              </div>
              <CardTitle>Security</CardTitle>
              <CardDescription>
                Manage your account security & password
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  );
}
