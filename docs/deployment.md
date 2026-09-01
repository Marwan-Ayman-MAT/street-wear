# Deployment Guide

## Vercel

1. Push the repository to GitHub.
2. Import the project in Vercel.
3. Add environment variables from `.env.example`.
4. Provision PostgreSQL and set `DATABASE_URL`.
5. Run `npx prisma migrate deploy` during deployment.
6. Configure Stripe and Paymob webhook URLs.
7. Set `NEXT_PUBLIC_SITE_URL` to the production domain.

## Required Environment Variables

- `DATABASE_URL`
- `AUTH_SECRET`
- `AUTH_URL`
- `NEXT_PUBLIC_SITE_URL`
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `PAYMOB_API_KEY`
- `PAYMOB_INTEGRATION_ID`
- `PAYMOB_IFRAME_ID`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

## Launch QA

- Run `npm run typecheck`
- Run `npm run build`
- Validate `/sitemap.xml` and `/robots.txt`
- Test mobile cart, checkout, and filter drawer
- Test Stripe and Paymob sandbox flows
- Confirm admin role protection before public launch
