# Opin

AI-powered platform for analyzing NPS and CSAT surveys with actionable insights.

## Quick Start

1. **Setup**: Follow the [Setup Guide](./docs/setup.md) to get started
2. **Authentication**: Configure Supabase using the [Authentication Guide](./docs/authentication.md)
3. **Deploy**: Use the [Deployment Guide](./docs/deployment.md) to deploy to production

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + SCSS
- **Authentication & Database**: Supabase
- **Form Handling**: TanStack React Form
- **CAPTCHA Protection**: Cloudflare Turnstile
- **Environment Loading**: @next/env
- **Code Quality**: ESLint + Prettier
- **Git Hooks**: Husky + lint-staged
- **Deployment**: Vercel

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format with Prettier
npm run format:check # Check Prettier formatting
```

## Documentation

📚 **Complete documentation is available in the [docs](./docs/) folder:**

- [📚 Setup Guide](./docs/setup.md) - Installation and configuration
- [🔐 Authentication](./docs/authentication.md) - Supabase setup and usage
- [🏗️ Architecture](./docs/architecture.md) - Project structure and components
- [🚀 Deployment](./docs/deployment.md) - Production deployment guide

## Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── layout.tsx      # Root layout with AuthProvider
│   ├── page.tsx        # Login page
│   ├── dashboard/      # Protected dashboard page
│   ├── globals.scss    # Global styles (SCSS)
│   └── middleware.ts   # Authentication middleware
├── components/         # Reusable components
│   ├── Button/         # Button component
│   ├── Form/           # Form components
│   └── Turnstile/      # CAPTCHA component
├── lib/               # Utility functions
│   ├── supabase.ts    # Supabase client configuration
│   ├── auth.ts        # Authentication utilities
│   └── auth-context.tsx # React context for auth state
└── types/             # TypeScript type definitions
```

## Getting Help

If you encounter issues:

1. Check the troubleshooting sections in the [Setup Guide](./docs/setup.md)
2. Review the [Authentication Guide](./docs/authentication.md) for Supabase issues
3. Ensure your environment variables are correctly configured
4. Verify your Supabase project settings
