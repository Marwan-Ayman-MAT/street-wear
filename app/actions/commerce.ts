"use server";

import { z } from "zod";
import { calculateQuote } from "@/lib/commerce";

const cartLineSchema = z.object({
  productId: z.string(),
  slug: z.string(),
  name: z.string(),
  image: z.string().url(),
  price: z.number().positive(),
  size: z.enum(["XS", "S", "M", "L", "XL", "XXL"]),
  color: z.string(),
  quantity: z.number().int().positive(),
  sku: z.string()
});

const checkoutSchema = z.object({
  lines: z.array(cartLineSchema).min(1),
  couponCode: z.string().optional(),
  delivery: z.enum(["standard", "express"]),
  payment: z.enum(["stripe", "paymob", "cod"]),
  customer: z.record(z.string(), z.string())
});

export async function createCheckoutQuote(payload: unknown) {
  const parsed = checkoutSchema.safeParse(payload);
  if (!parsed.success) {
    return { ok: false, message: "Checkout payload is invalid." };
  }

  return {
    ok: true,
    quote: calculateQuote(parsed.data.lines, parsed.data.couponCode, parsed.data.delivery)
  };
}
