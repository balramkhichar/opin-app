# Setup Guide

This guide will help you set up the Opin application on your local machine.

## Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun
- Git

## Installation

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd opin-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set up Environment Variables

```bash
cp env.example .env.local
```

Edit `.env.local` and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional: Turnstile CAPTCHA (for additional security)
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_turnstile_site_key
TURNSTILE_SECRET_KEY=your_turnstile_secret_key
```

### 4. Start the Development Server

```bash
npm run dev
```

### 5. Open in Browser

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variable Loading

The project uses `@next/env` to load environment variables outside of the Next.js runtime. This ensures consistent environment variable loading across the application.

### How it Works

1. **envConfig.ts**: Loads environment variables using `@next/env` in the root directory
2. **Import in Files**: Import `envConfig.ts` in files that need environment variables
3. **Automatic Loading**: Environment variables are loaded before your code runs
4. **Build Integration**: The `envConfig.ts` file is automatically imported during the build process

### Usage

```typescript
// Import at the top of files that need environment variables
import '../envConfig'; // Adjust path as needed

// Then use process.env as normal
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
```

### Environment Variable Priority

According to [Next.js documentation](https://nextjs.org/docs/app/guides/environment-variables), environment variables are loaded in this order:

1. `process.env`
2. `.env.$(NODE_ENV).local`
3. `.env.local` (Not checked when `NODE_ENV` is `test`)
4. `.env.$(NODE_ENV)`
5. `.env`

## Supabase Setup

Before running the application, you need to set up a Supabase project. See [Authentication Documentation](./authentication.md) for detailed Supabase setup instructions.

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run type-check   # Check TypeScript types
npm run format       # Format with Prettier
npm run format:check # Check Prettier formatting
```

## Development Workflow

### Code Quality Tools

- **ESLint**: Run `npm run lint` to check for code quality issues
- **Prettier**: Run `npm run format` to format all files (includes Tailwind CSS class sorting)
- **Auto-fix**: Run `npm run lint:fix` to automatically fix linting issues
- **Type Checking**: Run `npm run type-check` to check TypeScript types
- **CSS Support**: Configured for proper CSS formatting and syntax

### Pre-commit Hooks

The project uses Husky and lint-staged to automatically:

- Run ESLint on staged files
- Format code with Prettier
- Prevent commits with linting errors

This ensures consistent code quality across the project.

## Project Configuration

- ✅ TypeScript support
- ✅ Tailwind CSS v4 for styling
- ✅ CSS support with proper formatting
- ✅ ESLint for code quality
- ✅ Prettier for code formatting (with Tailwind CSS class sorting)
- ✅ Pre-commit hooks with lint-staged
- ✅ App Router (Next.js 15+)
- ✅ Supabase authentication and database
- ✅ TanStack React Form for form handling
- ✅ Cloudflare Turnstile CAPTCHA protection
- ✅ @next/env for environment variable loading
- ✅ Optimized for Vercel deployment with `vercel.json`

## Troubleshooting

### Common Issues

1. **Environment Variables Not Loading**
   - Ensure `.env.local` file exists in the root directory
   - Restart the development server after adding environment variables

2. **Supabase Connection Issues**
   - Verify your Supabase URL and anon key are correct
   - Check that your Supabase project is active
   - Ensure your site URL is configured in Supabase authentication settings

3. **Build Errors**
   - Run `npm run lint:fix` to fix linting issues
   - Check TypeScript errors with `npx tsc --noEmit`

4. **Authentication Not Working**
   - Verify Supabase authentication is enabled
   - Check that email/password authentication is enabled in Supabase
   - Ensure redirect URLs are properly configured
