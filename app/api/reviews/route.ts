import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { products } from "@/lib/catalog";

const reviewSchema = z.object({
  productId: z.string(),
  rating: z.number().int().min(1).max(5),
  title: z.string().min(3).max(80),
  body: z.string().min(10).max(1000),
  author: z.string().min(2)
});

export async function POST(request: NextRequest) {
  const parsed = reviewSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json(
      { message: "Invalid review payload", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const product = products.find((item) => item.id === parsed.data.productId);
  if (!product) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(
    {
      message: "Review submitted for moderation.",
      data: {
        id: `rev-${Date.now()}`,
        approved: false,
        createdAt: new Date().toISOString(),
        ...parsed.data
      }
    },
    { status: 201 }
  );
}
