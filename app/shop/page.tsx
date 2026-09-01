import type { Metadata } from "next";
import { ShopExperience } from "@/components/commerce/ShopExperience";
import { products } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Shop premium streetwear with search, category filters, price filters, color filters, size filters, sorting, and pagination."
};

export default async function ShopPage({
  searchParams
}: {
  searchParams?: Promise<{ category?: string }>;
}) {
  const params = searchParams ? await searchParams : {};
  return <ShopExperience products={products} initialCategory={params.category} />;
}
