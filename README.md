# Opin

AI-powered platform for analyzing NPS and CSAT surveys with actionable insights.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + SCSS
- **Code Quality**: ESLint + Prettier
- **Git Hooks**: Husky + lint-staged
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd opin-app
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development Workflow

### Code Quality Tools

- **ESLint**: Run `npm run lint` to check for code quality issues
- **Prettier**: Run `npm run format` to format all files (includes Tailwind CSS class sorting)
- **Auto-fix**: Run `npm run lint:fix` to automatically fix linting issues
- **SCSS Support**: Configured for proper SCSS formatting and syntax

### Pre-commit Hooks

The project uses Husky and lint-staged to automatically:

- Run ESLint on staged files
- Format code with Prettier
- Prevent commits with linting errors

This ensures consistent code quality across the project.

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format with Prettier
npm run format:check # Check Prettier formatting
```

## Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   ├── globals.scss    # Global styles (SCSS)
│   └── styles/         # Additional styles
├── components/         # Reusable components
├── lib/               # Utility functions
└── types/             # TypeScript type definitions
```

## Deployment

### Deploy on Vercel

This project is optimized for deployment on Vercel. Here are the steps to deploy:

#### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in your project directory
3. Follow the prompts to connect your GitHub repository

#### Option 2: Deploy via Vercel Dashboard

1. Push your code to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "New Project" and import your repository
4. Vercel will automatically detect it's a Next.js project and configure the build settings

### Project Configuration

- ✅ TypeScript support
- ✅ Tailwind CSS v4 for styling
- ✅ SCSS support with proper formatting
- ✅ ESLint for code quality
- ✅ Prettier for code formatting (with Tailwind CSS class sorting)
- ✅ Pre-commit hooks with lint-staged
- ✅ App Router (Next.js 15+)
- ✅ Optimized for Vercel deployment with `vercel.json`

The project includes a `vercel.json` configuration file that optimizes:

- Build and development commands
- Function timeout settings
- Deployment regions
