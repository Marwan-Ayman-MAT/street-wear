import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { calculateQuote } from "@/lib/commerce";

const paymobSchema = z.object({
  lines: z
    .array(
      z.object({
        productId: z.string(),
        slug: z.string(),
        name: z.string(),
        image: z.string(),
        price: z.number().positive(),
        size: z.enum(["XS", "S", "M", "L", "XL", "XXL"]),
        color: z.string(),
        quantity: z.number().int().positive(),
        sku: z.string()
      })
    )
    .min(1),
  couponCode: z.string().optional(),
  delivery: z.enum(["standard", "express"]).default("standard"),
  customer: z.record(z.string(), z.string()).optional()
});

export async function POST(request: NextRequest) {
  const parsed = paymobSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json(
      { message: "Invalid Paymob payload", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const quote = calculateQuote(parsed.data.lines, parsed.data.couponCode, parsed.data.delivery);

  if (!process.env.PAYMOB_API_KEY || process.env.PAYMOB_API_KEY.includes("replace")) {
    return NextResponse.json({
      mode: "simulation",
      provider: "paymob",
      quote,
      iframeUrl: "/checkout?paymob=simulated"
    });
  }

  return NextResponse.json({
    provider: "paymob",
    quote,
    nextStep:
      "Exchange API key for an auth token, create an order, request a payment key, then redirect to Paymob iframe.",
    integrationId: process.env.PAYMOB_INTEGRATION_ID,
    iframeId: process.env.PAYMOB_IFRAME_ID
  });
}
