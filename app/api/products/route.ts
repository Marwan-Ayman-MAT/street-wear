import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { products } from "@/lib/catalog";

const createProductSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(20),
  price: z.number().positive(),
  category: z.string().min(2),
  sku: z.string().min(4),
  inventoryCount: z.number().int().nonnegative()
});

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const category = params.get("category");
  const search = params.get("q")?.toLowerCase();
  const featured = params.get("featured");

  const data = products.filter((product) => {
    const matchesCategory = !category || product.categorySlug === category;
    const matchesSearch =
      !search ||
      [product.name, product.description, product.category, product.tags.join(" ")]
        .join(" ")
        .toLowerCase()
        .includes(search);
    const matchesFeatured = !featured || product.featured;
    return matchesCategory && matchesSearch && matchesFeatured;
  });

  return NextResponse.json({ data, count: data.length });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = createProductSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { message: "Invalid product payload", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  return NextResponse.json(
    {
      message: "Product accepted for creation. Persist with Prisma in production.",
      data: {
        id: `prd-${Date.now()}`,
        ...parsed.data
      }
    },
    { status: 201 }
  );
}
