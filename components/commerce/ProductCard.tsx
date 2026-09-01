"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/components/commerce/CartProvider";
import { buildCartLine, productPrice } from "@/lib/commerce";
import type { Product } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const { addLine, toggleWishlist, wishlist } = useCart();
  const wished = wishlist.includes(product.id);
  const activePrice = productPrice(product);

  return (
    <article className="group">
      <div className="relative overflow-hidden bg-zinc-100 dark:bg-zinc-900">
        <Link href={`/product/${product.slug}`} aria-label={`View ${product.name}`}>
          <Image
            src={product.images[0]}
            alt={product.name}
            width={900}
            height={1200}
            priority={priority}
            className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-[1.035]"
          />
        </Link>
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          {product.salePrice ? (
            <span className="rounded-full bg-black px-3 py-1 text-[11px] font-bold uppercase tracking-widecaps text-white">
              Sale
            </span>
          ) : null}
          {product.newArrival ? (
            <span className="rounded-full bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-widecaps text-black">
              New
            </span>
          ) : null}
        </div>
        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          className="focus-ring absolute right-3 top-3 inline-flex size-10 items-center justify-center rounded-full bg-white text-black shadow-crisp transition hover:scale-105"
          aria-label={wished ? `Remove ${product.name} from wishlist` : `Save ${product.name}`}
          title={wished ? "Remove from wishlist" : "Save to wishlist"}
        >
          <Heart className={wished ? "size-4 fill-black" : "size-4"} />
        </button>
        <div className="absolute inset-x-3 bottom-3 translate-y-0 opacity-100 transition duration-300 sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
          <Button
            type="button"
            className="w-full shadow-lift"
            onClick={() =>
              addLine(
                buildCartLine(product, {
                  size: product.sizes[0],
                  color: product.colors[0].name
                })
              )
            }
          >
            <ShoppingBag className="size-4" />
            Quick add
          </Button>
        </div>
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <Link
            href={`/product/${product.slug}`}
            className="font-semibold uppercase tracking-[0.03em] hover:text-zinc-500"
          >
            {product.name}
          </Link>
          <p className="mt-1 text-sm text-zinc-500">{product.category}</p>
          <div className="mt-2 flex items-center gap-1 text-xs text-zinc-500">
            <Star className="size-3 fill-black text-black dark:fill-white dark:text-white" />
            <span>{product.rating.toFixed(1)}</span>
            <span>({product.reviewCount})</span>
          </div>
        </div>
        <div className="text-right text-sm font-bold">
          {product.salePrice ? (
            <div className="grid gap-1">
              <span>{formatCurrency(activePrice)}</span>
              <span className="text-xs font-medium text-zinc-500 line-through">
                {formatCurrency(product.price)}
              </span>
            </div>
          ) : (
            <span>{formatCurrency(activePrice)}</span>
          )}
        </div>
      </div>
    </article>
  );
}
