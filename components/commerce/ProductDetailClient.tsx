"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Heart, Minus, Plus, Ruler, ShieldCheck, Star, Truck, X, ZoomIn } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ProductRail } from "@/components/commerce/ProductRail";
import { useCart } from "@/components/commerce/CartProvider";
import { buildCartLine, productPrice, stockLabel } from "@/lib/commerce";
import type { Product, Size } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

export function ProductDetailClient({
  product,
  related
}: {
  product: Product;
  related: Product[];
}) {
  const router = useRouter();
  const { addLine, toggleWishlist, wishlist, trackRecentlyViewed } = useCart();
  const [activeImage, setActiveImage] = useState(product.images[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0].name);
  const [selectedSize, setSelectedSize] = useState<Size>(product.sizes[1] ?? product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [zoomOpen, setZoomOpen] = useState(false);
  const wished = wishlist.includes(product.id);
  const activePrice = productPrice(product);

  useEffect(() => {
    trackRecentlyViewed(product.slug);
  }, [product.slug, trackRecentlyViewed]);

  const color = useMemo(
    () => product.colors.find((item) => item.name === selectedColor) ?? product.colors[0],
    [product.colors, selectedColor]
  );

  function addToCart() {
    addLine(
      buildCartLine(product, {
        size: selectedSize,
        color: selectedColor,
        quantity
      })
    );
  }

  function buyNow() {
    addToCart();
    router.push("/checkout");
  }

  return (
    <div>
      <section className="container-pad grid gap-10 py-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(380px,0.9fr)] lg:py-12">
        <div className="grid gap-4 lg:grid-cols-[88px_1fr]">
          <div className="order-2 flex gap-3 overflow-auto lg:order-1 lg:grid lg:content-start">
            {product.images.map((image) => (
              <button
                key={image}
                type="button"
                onClick={() => setActiveImage(image)}
                className={`focus-ring shrink-0 overflow-hidden rounded-md border ${
                  activeImage === image ? "border-black dark:border-white" : "border-transparent"
                }`}
                aria-label={`Select image for ${product.name}`}
              >
                <Image
                  src={image}
                  alt={product.name}
                  width={160}
                  height={200}
                  className="aspect-[4/5] w-20 object-cover"
                />
              </button>
            ))}
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative overflow-hidden bg-zinc-100 dark:bg-zinc-900">
              <Image
                src={activeImage}
                alt={product.name}
                width={1200}
                height={1500}
                priority
                className="aspect-[4/5] w-full object-cover"
              />
              <Button
                type="button"
                variant="muted"
                size="icon"
                onClick={() => setZoomOpen(true)}
                className="absolute bottom-4 right-4 rounded-full"
                aria-label="Zoom product image"
                title="Zoom"
              >
                <ZoomIn className="size-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="flex flex-wrap gap-2">
            {product.bestseller ? <Badge>Best seller</Badge> : null}
            {product.trending ? <Badge>Trending</Badge> : null}
            {product.newArrival ? <Badge>New arrival</Badge> : null}
          </div>

          <h1 className="mt-5 font-display text-4xl font-black uppercase leading-none sm:text-6xl">
            {product.name}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className={`size-4 ${
                    index + 1 <= Math.round(product.rating)
                      ? "fill-black text-black dark:fill-white dark:text-white"
                      : "text-zinc-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-zinc-500">
              {product.rating.toFixed(1)} from {product.reviewCount} reviews
            </span>
          </div>

          <div className="mt-6 flex items-end gap-3">
            <p className="text-2xl font-black">{formatCurrency(activePrice)}</p>
            {product.salePrice ? (
              <p className="pb-1 text-sm text-zinc-500 line-through">
                {formatCurrency(product.price)}
              </p>
            ) : null}
          </div>

          <p className="mt-5 text-base leading-7 text-zinc-600 dark:text-zinc-300">
            {product.description}
          </p>

          <div className="mt-7 grid gap-6 border-y border-black/10 py-6 dark:border-white/10">
            <div>
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-widecaps text-zinc-500">
                  Color
                </p>
                <p className="text-sm font-semibold">{color.name}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((item) => (
                  <button
                    type="button"
                    key={item.name}
                    onClick={() => setSelectedColor(item.name)}
                    className={`focus-ring inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm ${
                      selectedColor === item.name
                        ? "border-black dark:border-white"
                        : "border-black/10 dark:border-white/15"
                    }`}
                  >
                    <span
                      aria-hidden
                      className="size-4 rounded-full border border-black/20"
                      style={{ background: item.hex }}
                    />
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-widecaps text-zinc-500">
                  Size
                </p>
                <a href="#size-guide" className="inline-flex items-center gap-1 text-sm font-semibold">
                  <Ruler className="size-4" />
                  Guide
                </a>
              </div>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                {product.sizes.map((size) => (
                  <button
                    type="button"
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`focus-ring h-11 rounded-md border text-sm font-bold ${
                      selectedSize === size
                        ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                        : "border-black/10 dark:border-white/15"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="inline-flex h-12 items-center rounded-md border border-black/10 dark:border-white/15">
                <button
                  type="button"
                  className="focus-ring inline-flex size-12 items-center justify-center"
                  onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                  aria-label="Decrease quantity"
                >
                  <Minus className="size-4" />
                </button>
                <span className="w-10 text-center font-bold">{quantity}</span>
                <button
                  type="button"
                  className="focus-ring inline-flex size-12 items-center justify-center"
                  onClick={() => setQuantity((current) => Math.min(10, current + 1))}
                  aria-label="Increase quantity"
                >
                  <Plus className="size-4" />
                </button>
              </div>
              <span className="text-sm font-semibold text-zinc-500">
                {stockLabel(product.inventoryCount)}
              </span>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
            <Button type="button" onClick={addToCart} className="w-full">
              Add to cart
            </Button>
            <Button type="button" variant="secondary" onClick={buyNow} className="w-full">
              Buy now
            </Button>
            <Button
              type="button"
              variant="muted"
              size="icon"
              onClick={() => toggleWishlist(product.id)}
              aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
              title={wished ? "Remove from wishlist" : "Wishlist"}
            >
              <Heart className={wished ? "size-4 fill-black dark:fill-white" : "size-4"} />
            </Button>
          </div>

          <div className="mt-6 grid gap-3 text-sm text-zinc-600 dark:text-zinc-300 sm:grid-cols-2">
            <div className="flex items-center gap-2">
              <Truck className="size-4 text-black dark:text-white" />
              Free shipping over $175
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-black dark:text-white" />
              Encrypted payment
            </div>
          </div>
        </div>
      </section>

      <section className="container-pad grid gap-8 border-t border-black/10 py-12 dark:border-white/10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h2 className="font-display text-3xl font-black uppercase">Construction</h2>
          <ul className="mt-5 grid gap-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
            {product.details.map((detail) => (
              <li key={detail} className="border-b border-black/10 pb-3 dark:border-white/10">
                {detail}
              </li>
            ))}
          </ul>
        </div>
        <div id="size-guide">
          <h2 className="font-display text-3xl font-black uppercase">Fit Guide</h2>
          <div className="mt-5 overflow-hidden rounded-md border border-black/10 dark:border-white/10">
            {[
              ["XS", "Chest 34-36 in", "Relaxed cropped fit"],
              ["S", "Chest 36-38 in", "Clean regular fit"],
              ["M", "Chest 38-40 in", "Signature box fit"],
              ["L", "Chest 40-42 in", "Oversized drape"],
              ["XL", "Chest 42-44 in", "Loose oversized fit"],
              ["XXL", "Chest 44-46 in", "Maximum layering room"]
            ].map((row) => (
              <div
                key={row[0]}
                className="grid grid-cols-3 border-b border-black/10 text-sm last:border-0 dark:border-white/10"
              >
                {row.map((cell) => (
                  <div key={cell} className="px-3 py-3">
                    {cell}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-pad border-t border-black/10 py-12 dark:border-white/10">
        <h2 className="font-display text-3xl font-black uppercase">Reviews</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {product.reviews.map((review) => (
            <article key={`${review.author}-${review.createdAt}`} className="border border-black/10 p-5 dark:border-white/10">
              <div className="flex items-center justify-between gap-3">
                <p className="font-semibold">{review.author}</p>
                <p className="text-sm text-zinc-500">{review.createdAt}</p>
              </div>
              <div className="mt-3 flex gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className={`size-4 ${
                      index + 1 <= review.rating
                        ? "fill-black text-black dark:fill-white dark:text-white"
                        : "text-zinc-300"
                    }`}
                  />
                ))}
              </div>
              <h3 className="mt-4 font-semibold">{review.title}</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                {review.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      {related.length > 0 ? (
        <section className="container-pad border-t border-black/10 py-12 dark:border-white/10">
          <h2 className="mb-6 font-display text-3xl font-black uppercase">Related Products</h2>
          <ProductRail products={related} />
        </section>
      ) : null}

      {zoomOpen ? (
        <div className="fixed inset-0 z-[90] bg-black/95 p-4">
          <Button
            type="button"
            variant="secondary"
            size="icon"
            onClick={() => setZoomOpen(false)}
            className="absolute right-4 top-4 z-10 rounded-full"
            aria-label="Close zoom"
          >
            <X className="size-4" />
          </Button>
          <div className="flex h-full items-center justify-center">
            <Image
              src={activeImage}
              alt={product.name}
              width={1600}
              height={2000}
              className="max-h-full w-auto object-contain"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
