import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="relative h-16 w-full">
            <Image src="/logo.svg" alt="Opin" fill={true} priority />
          </div>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="rounded-lg border border-gray-200 bg-white px-6 py-8 text-center">
          {/* Not Found Image */}
          <div className="mb-6 flex justify-center">
            <div className="relative h-48 w-48">
              <Image
                src="/images/not-found.png"
                alt="Page not found illustration"
                fill={true}
                className="object-contain"
              />
            </div>
          </div>
          <div className="mb-6">
            <h3 className="mt-4 text-gray-900">Oops! You hit a dead end.</h3>
            <p className="mt-2 text-gray-600">
              Let&apos;s help you get back on the right path.
            </p>
          </div>
          <div className="space-y-4">
            <Button asChild variant="default" size="default" className="w-full">
              <Link href="/">Return to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
