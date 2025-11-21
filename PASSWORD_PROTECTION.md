# Password Protection Setup

This site has password protection that can be easily enabled or disabled.

## How to Enable Password Protection

1. **Add environment variables in Vercel:**
   - Go to your Vercel project → Settings → Environment Variables
   - Add these two variables:
     - `ENABLE_PASSWORD_PROTECTION` = `true`
     - `SITE_PASSWORD` = `your-password-here`
   - Make sure to select all environments (Production, Preview, Development)
   - Save and redeploy

2. **For local development, add to `.env.local`:**
   ```
   ENABLE_PASSWORD_PROTECTION=true
   SITE_PASSWORD=your-password-here
   ```

## How to Disable Password Protection (When Going Public)

Simply remove or set the environment variable:

1. **In Vercel:**
   - Go to Settings → Environment Variables
   - Either delete `ENABLE_PASSWORD_PROTECTION` or set it to `false`
   - Save and redeploy

2. **For local development:**
   - Remove `ENABLE_PASSWORD_PROTECTION` from `.env.local` or set it to `false`

That's it! The middleware will automatically allow all traffic when password protection is disabled.

## Files Involved

- `middleware.ts` - Handles the password protection logic
- `app/login/page.tsx` - The login page
- `app/login/actions.ts` - Server action for authentication

## Notes

- The password is stored server-side only (not exposed to the client)
- Authentication cookie lasts 7 days
- The protection can be toggled on/off without code changes

