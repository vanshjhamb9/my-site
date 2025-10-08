# Deployment Guide

## Vercel Deployment Issues - Troubleshooting

If Vercel is not building the latest commit or updating your site, follow these steps:

### 1. Force a Fresh Deployment

In your Vercel dashboard:

1. Go to your project settings
2. Navigate to **Deployments** tab
3. Click on **Redeploy** for the latest deployment
4. **Important**: Check "Use existing Build Cache" and **UNCHECK IT** to force a fresh build
5. Click **Redeploy**

### 2. Clear Build Cache (Recommended)

```bash
# In Vercel Dashboard:
1. Settings → General → "Clear Build Cache & Redeploy"
2. Click the button to clear cache
```

### 3. Check Environment Variables

Make sure these environment variables are set in Vercel:

```env
NODE_ENV=production
DATABASE_URL=<your-database-url>
ADMIN_PASSWORD=<your-secure-admin-password>
REPLIT_CONNECTORS_HOSTNAME=<if-using-resend>
```

To set them:
1. Go to Project Settings → Environment Variables
2. Add each variable for Production, Preview, and Development
3. Redeploy after adding variables

### 4. Verify Build Settings

In Vercel Project Settings → Build & Development Settings:

- **Framework Preset**: None (or Vite if available)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 5. Check Git Integration

1. Go to Settings → Git
2. Ensure the correct branch is selected (usually `main` or `master`)
3. Verify that "Automatic deployments" is enabled

### 6. Manual Redeployment from Git

```bash
# Trigger a new deployment by pushing an empty commit
git commit --allow-empty -m "Force Vercel rebuild"
git push origin main
```

### 7. Check Deployment Logs

1. Go to Deployments tab
2. Click on the latest deployment
3. Check the build logs for any errors
4. Look for:
   - Module not found errors
   - Build failures
   - Environment variable issues

## Common Issues & Solutions

### Issue: "Build succeeds but site not updating"

**Solution**: This is likely a CDN caching issue
1. In Vercel, go to the deployment
2. Click "Redeploy" without build cache
3. Or wait for CDN cache to expire (usually 1 hour)

### Issue: "Module not found" errors

**Solution**: 
```bash
# Delete package-lock.json and node_modules locally
rm -rf node_modules package-lock.json
npm install
git add package-lock.json
git commit -m "Update dependencies"
git push
```

### Issue: Environment variables not working

**Solution**:
1. Ensure variables are set for the correct environment
2. Variable names must match exactly (case-sensitive)
3. Redeploy after changing variables

## Admin Panel Setup

### First Admin User Setup

After deploying, you need to create the first admin user:

```bash
# Run locally or via Vercel CLI
npm run setup-admin
```

Or manually via API:

```bash
curl -X POST https://your-domain.com/api/admin/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@yourdomain.com",
    "password": "your-secure-password",
    "role": "superadmin"
  }'
```

### Accessing Admin Panel

1. Navigate to: `https://your-domain.com/admin/login`
2. Login with your admin credentials
3. You'll be redirected to the dashboard

### Admin Panel Features

- **Dashboard**: Overview of all leads and stats
- **Leads Management**: View, edit, update status, and delete leads
- **Analytics**: Visual charts and statistics for lead conversion
- **Blog Management**: Create, edit, and publish blog posts
- **Categories**: Manage blog categories

## Production Checklist

Before going live:

- [ ] Change default admin password
- [ ] Set strong ADMIN_PASSWORD environment variable
- [ ] Configure DATABASE_URL for production database
- [ ] Set up Resend for email notifications
- [ ] Configure custom domain (if applicable)
- [ ] Test all admin panel features
- [ ] Test contact form submission
- [ ] Verify email delivery
- [ ] Check all analytics and charts

## Support

For additional help:
- Check Vercel documentation: https://vercel.com/docs
- Contact support if issues persist
