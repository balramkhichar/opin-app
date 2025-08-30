import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Opin | Authentication Error",
};

export default function AuthErrorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
