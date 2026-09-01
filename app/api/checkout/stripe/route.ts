import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { z } from "zod";
import { calculateQuote } from "@/lib/commerce";

const lineSchema = z.object({
  name: z.string(),
  slug: z.string(),
  image: z.string().url(),
  price: z.number().positive(),
  quantity: z.number().int().positive(),
  productId: z.string(),
  size: z.enum(["XS", "S", "M", "L", "XL", "XXL"]),
  color: z.string(),
  sku: z.string()
});

const checkoutSchema = z.object({
  lines: z.array(lineSchema).min(1),
  couponCode: z.string().optional(),
  delivery: z.enum(["standard", "express"]).default("standard")
});

export async function POST(request: NextRequest) {
  const parsed = checkoutSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json(
      { message: "Invalid checkout payload", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const quote = calculateQuote(
    parsed.data.lines.map((line) => ({
      productId: line.productId,
      slug: line.slug,
      name: line.name,
      image: line.image,
      price: line.price,
      size: line.size,
      color: line.color,
      quantity: line.quantity,
      sku: line.sku
    })),
    parsed.data.couponCode,
    parsed.data.delivery
  );

  if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY.includes("replace")) {
    return NextResponse.json({
      mode: "simulation",
      provider: "stripe",
      quote,
      checkoutUrl: "/checkout?stripe=simulated"
    });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?checkout=success`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cart?checkout=cancelled`,
    line_items: parsed.data.lines.map((line) => ({
      quantity: line.quantity,
      price_data: {
        currency: "usd",
        unit_amount: Math.round(line.price * 100),
        product_data: {
          name: `${line.name} / ${line.color} / ${line.size}`
        }
      }
    }))
  });

  return NextResponse.json({
    provider: "stripe",
    quote,
    checkoutUrl: session.url
  });
}
