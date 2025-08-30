import type { Metadata } from 'next';
import { Lato, Montserrat } from 'next/font/google';
import './globals.scss';
import { AuthProvider } from '@/lib/auth-context';
import { ThemeProvider } from '@/components/theme-provider';

// Force all pages to be dynamic
export const dynamic = 'force-dynamic';

// Configure Lato font
const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  display: 'swap',
  variable: '--font-lato',
});

// Configure Montserrat font
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: 'Opin | AI-Powered NPS & CSAT Surveys',
  description:
    'AI-powered platform for analyzing NPS and CSAT surveys with actionable insights.',
  keywords: [
    'NPS',
    'CSAT',
    'customer satisfaction',
    'AI insights',
    'survey analysis',
  ],
  publisher: 'Opin',
  icons: {
    icon: [
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/favicon.ico', sizes: 'any' },
    ],
    shortcut: '/favicon/favicon.ico',
    apple: '/favicon/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Opin | AI-Powered NPS & CSAT Surveys',
    description:
      'Transform your customer feedback into actionable insights with AI-powered NPS and CSAT analysis.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Opin | AI-Powered NPS & CSAT Surveys',
    description:
      'Transform your customer feedback into actionable insights with AI-powered NPS and CSAT analysis.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${lato.variable} ${montserrat.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
