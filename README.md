# STREET WEAR

Premium streetwear e-commerce platform built with Next.js 15, React, TypeScript, Tailwind CSS, Prisma, Auth.js, Stripe, Paymob, and Cloudinary-ready configuration.

## What Is Included

- Mobile-first storefront with home, shop, product detail, cart, checkout, auth, customer dashboard, and admin dashboard routes
- Advanced shop filtering: search, category, price, color, size, sorting, and pagination
- Product detail UX: image gallery, zoom, size/color selection, quantity, add to cart, buy now, wishlist, ratings, reviews, related products
- Persistent cart, coupon support, shipping estimate, tax calculation, checkout summary, and local wishlist/recently viewed state
- Admin surfaces for analytics, product CRUD, categories, orders, customers, inventory, coupons, and reviews moderation
- Prisma schema for users, products, categories, orders, order items, reviews, coupons, addresses, wishlist, cart, and payments
- API routes for products, reviews, Stripe checkout, and Paymob checkout
- SEO foundations: dynamic metadata, Open Graph, Twitter cards, product JSON-LD, sitemap, and robots file
- Light/dark mode and responsive layouts for mobile, tablet, desktop, and large desktop

## Tech Stack

- Next.js 15 App Router
- React 19
- TypeScript
- Tailwind CSS
- Prisma ORM with PostgreSQL
- Auth.js credentials provider with Prisma adapter
- Stripe Checkout route
- Paymob route contract
- Cloudinary environment configuration

## Project Structure

```txt
app/
  api/
    auth/[...nextauth]/
    checkout/paymob/
    checkout/stripe/
    products/
    reviews/
  actions/
  admin/
  cart/
  checkout/
  dashboard/
  forgot-password/
  login/
  product/[slug]/
  register/
  shop/
components/
  commerce/
  layout/
  ui/
docs/
lib/
prisma/
```

## Local Setup

```bash
npm install
cp .env.example .env
npx prisma generate
npm run dev
```

For a real deployment, set `DATABASE_URL`, `AUTH_SECRET`, Stripe keys, Paymob credentials, Cloudinary credentials, and `NEXT_PUBLIC_SITE_URL`.

## Database

The Prisma schema is in `prisma/schema.prisma`. It includes:

- Users and Auth.js account/session tables
- Products, categories, images, colors, sizes, inventory, reviews
- Orders, order items, coupons, addresses, wishlist, cart items, payments

Run migrations with:

```bash
npx prisma migrate dev
```

## Payment Notes

The Stripe and Paymob routes run in simulation mode when keys are unset or still use the values from `.env.example`. Once credentials are provided:

- Stripe route creates a Checkout Session
- Paymob route is structured for auth token, order creation, payment key, and iframe redirect flow

## Production Checklist

- Connect PostgreSQL and run Prisma migrations
- Seed the product catalog into the database
- Replace demo customer/admin dashboard data with database queries
- Configure Stripe webhook fulfillment
- Configure Paymob callback validation
- Configure Cloudinary signed uploads for product imagery
- Add transactional email provider for receipts, password reset, and shipment updates
- Protect `/admin` with role-based middleware
- Run Lighthouse and tune image sizes against final production assets
