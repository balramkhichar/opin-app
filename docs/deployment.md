# Deployment

This project is optimized for deployment on Vercel. Here are the steps to deploy your application.

## Deploy on Vercel

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:

   ```bash
   npm i -g vercel
   ```

2. Run `vercel` in your project directory:

   ```bash
   vercel
   ```

3. Follow the prompts to connect your GitHub repository

### Option 2: Deploy via Vercel Dashboard

1. Push your code to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "New Project" and import your repository
4. Vercel will automatically detect it's a Next.js project and configure the build settings

## Environment Variables

Make sure to add your environment variables in the Vercel dashboard:

1. Go to your project settings in Vercel
2. Navigate to **Environment Variables**
3. Add the following variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

## Supabase Configuration

After deployment, update your Supabase authentication settings:

1. Go to your Supabase dashboard
2. Navigate to **Authentication** → **Settings**
3. Add your production domain to the **Site URL** field
4. Add your production domain to the **Redirect URLs** list

## Build Configuration

The project includes a `vercel.json` configuration file that optimizes:

- Build and development commands
- Function timeout settings
- Deployment regions

## Performance Optimization

The project is configured for optimal performance:

- **Turbopack**: Enabled for faster builds and development
- **Image Optimization**: Next.js Image component with WebP/AVIF support
- **Compression**: Enabled for production builds
- **Security**: Powered-by header disabled

## Monitoring

After deployment, you can monitor your application:

- **Vercel Analytics**: Built-in performance monitoring
- **Function Logs**: View serverless function execution logs
- **Real-time Updates**: Automatic deployments on git push

## Custom Domains

To use a custom domain:

1. Go to your Vercel project settings
2. Navigate to **Domains**
3. Add your custom domain
4. Update your Supabase authentication settings with the new domain

## Troubleshooting

### Common Deployment Issues

1. **Build Failures**
   - Check the build logs in Vercel dashboard
   - Ensure all dependencies are properly installed
   - Verify TypeScript compilation passes locally

2. **Environment Variables**
   - Ensure all required environment variables are set in Vercel
   - Check that variable names match exactly (case-sensitive)

3. **Supabase Connection**
   - Verify Supabase URL and keys are correct
   - Check that your Supabase project is active
   - Ensure authentication settings include your production domain

4. **Performance Issues**
   - Monitor function execution times
   - Check for unnecessary re-renders
   - Optimize images and assets
