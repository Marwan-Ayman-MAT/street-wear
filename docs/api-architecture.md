# API Architecture

## Routes

| Route | Method | Purpose |
| --- | --- | --- |
| `/api/products` | `GET` | List products with search, category, and featured filters |
| `/api/products` | `POST` | Validate product creation payload for admin CRUD |
| `/api/products/[id]` | `GET` | Fetch product by ID or slug |
| `/api/products/[id]` | `PUT` | Validate product update payload |
| `/api/products/[id]` | `DELETE` | Archive a product |
| `/api/reviews` | `POST` | Submit a product review for moderation |
| `/api/checkout/stripe` | `POST` | Create Stripe Checkout session or return simulation response |
| `/api/checkout/paymob` | `POST` | Validate Paymob checkout payload and return integration next step |
| `/api/auth/[...nextauth]` | `GET/POST` | Auth.js session and credentials flow |

## Server Actions

| Action | Purpose |
| --- | --- |
| `registerCustomer` | Hashes password and creates customer account |
| `requestPasswordReset` | Validates reset request and provides safe response |
| `createCheckoutQuote` | Validates cart payload and calculates subtotal, discount, shipping, tax, and total |

## Production Data Flow

1. Storefront reads products from Prisma-backed product queries.
2. Customer adds products to a local cart for speed.
3. Checkout validates line items server-side against current inventory and prices.
4. Payment route creates a Stripe Checkout Session or Paymob payment key.
5. Webhook marks payment as paid and creates a durable `Order`.
6. Inventory is decremented in a transaction.
7. Email notification sends receipt and tracking updates.

## Security

- Use Auth.js JWT sessions for customer areas.
- Use Prisma role checks for admin operations.
- Validate all request bodies with Zod before persistence.
- Verify Stripe and Paymob webhooks with provider signatures.
- Never trust client-side price, coupon, or inventory values during live checkout.
