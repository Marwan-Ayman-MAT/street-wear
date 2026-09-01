import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { products } from "@/lib/catalog";

const updateProductSchema = z.object({
  name: z.string().min(2).optional(),
  description: z.string().min(20).optional(),
  price: z.number().positive().optional(),
  salePrice: z.number().positive().nullable().optional(),
  inventoryCount: z.number().int().nonnegative().optional()
});

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const product = products.find((item) => item.id === id || item.slug === id);

  if (!product) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  return NextResponse.json({ data: product });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const product = products.find((item) => item.id === id || item.slug === id);
  if (!product) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  const parsed = updateProductSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json(
      { message: "Invalid product update", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  return NextResponse.json({
    message: "Product update validated. Persist with Prisma product.update in production.",
    data: { ...product, ...parsed.data }
  });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const product = products.find((item) => item.id === id || item.slug === id);
  if (!product) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  return NextResponse.json({
    message: "Product archived. Use a soft-delete status column in production.",
    data: { id: product.id, archived: true }
  });
}
