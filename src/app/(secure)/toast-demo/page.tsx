'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { toast } from '@/components/Toast';

export default function ToastDemoPage() {
  const handleSuccessToast = () => {
    toast.success('Success!', 'Your action was completed successfully.');
  };

  const handleErrorToast = () => {
    toast.error('Error!', 'Something went wrong. Please try again.');
  };

  const handleInfoToast = () => {
    toast.info('Information', 'Here is some useful information for you.');
  };

  const handleToastWithAction = () => {
    toast.success('Success!', 'Your action was completed successfully.', {
      action: {
        label: 'Undo',
        onClick: () => {
          toast.info('Undo', 'Action has been undone.');
        },
      },
    });
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mx-auto max-w-2xl space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Toast Demo</CardTitle>
            <CardDescription>
              Test the different toast notification variants.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Button onClick={handleSuccessToast} variant="default">
                Show Success Toast
              </Button>
              <Button onClick={handleErrorToast} variant="destructive">
                Show Error Toast
              </Button>
              <Button onClick={handleInfoToast} variant="outline">
                Show Info Toast
              </Button>
              <Button onClick={handleToastWithAction} variant="secondary">
                Show Toast with Action
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
