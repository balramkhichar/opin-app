import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Opin | Password Reset Sent',
};

export default function ForgotPasswordSuccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
