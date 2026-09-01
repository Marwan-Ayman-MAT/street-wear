import { ProductCard } from "@/components/commerce/ProductCard";
import type { Product } from "@/lib/types";

export function ProductRail({ products }: { products: Product[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} priority={index < 2} />
      ))}
    </div>
  );
}
