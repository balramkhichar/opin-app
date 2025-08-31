import { Button, Icon, Link } from '@/components';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';

export const dynamic = 'force-dynamic';

export default function AuthErrorPage() {
  return (
    <Card>
      <CardHeader className="text-center">
        <div className="bg-accent mx-auto flex h-12 w-12 items-center justify-center rounded-full">
          <Icon name="close" size="lg" className="text-destructive" />
        </div>
        <CardTitle>Something went wrong</CardTitle>
        <CardDescription>
          There was an issue with your authentication. This could be due to:
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ul className="text-muted-foreground space-y-2 text-left">
          <li>• Invalid or expired confirmation link</li>
          <li>• Email confirmation already completed</li>
          <li>• Network connectivity issues</li>
          <li>• Invalid or expired password reset link</li>
        </ul>
      </CardContent>

      <CardFooter className="flex-col space-y-4">
        <Link href="/" className="w-full">
          <Button className="w-full">Return to Home</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
