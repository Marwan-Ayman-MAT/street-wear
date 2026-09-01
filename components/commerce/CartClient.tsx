"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button, LinkButton } from "@/components/ui/Button";
import { useCart } from "@/components/commerce/CartProvider";
import { freeShippingThreshold } from "@/lib/commerce";
import { formatCurrency } from "@/lib/utils";

export function CartClient() {
  const { lines, itemCount, quote, updateQuantity, removeLine, couponCode, setCouponCode, lineKey } =
    useCart();
  const remainingForFreeShipping = Math.max(freeShippingThreshold - quote.subtotal, 0);
  const progress = Math.min((quote.subtotal / freeShippingThreshold) * 100, 100);

  if (lines.length === 0) {
    return (
      <section className="container-pad py-16">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-xs font-bold uppercase tracking-widecaps text-zinc-500">Cart</p>
          <h1 className="mt-3 font-display text-5xl font-black uppercase leading-none">
            Your bag is empty
          </h1>
          <p className="mt-5 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
            Build a fit from heavy fleece, structured cargos, and clean outerwear.
          </p>
          <LinkButton href="/shop" className="mt-7">
            Shop now
          </LinkButton>
        </div>
      </section>
    );
  }

  return (
    <section className="container-pad py-10">
      <div className="mb-8 border-b border-black/10 pb-6 dark:border-white/10">
        <p className="text-xs font-bold uppercase tracking-widecaps text-zinc-500">Cart</p>
        <h1 className="mt-2 font-display text-4xl font-black uppercase leading-none sm:text-6xl">
          Shopping Bag
        </h1>
        <p className="mt-3 text-sm text-zinc-500">{itemCount} items selected</p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_390px]">
        <div className="grid gap-5">
          {lines.map((line) => {
            const key = lineKey(line);
            return (
              <article
                key={key}
                className="grid gap-4 border border-black/10 p-3 dark:border-white/10 sm:grid-cols-[132px_1fr_auto]"
              >
                <Link href={`/product/${line.slug}`} className="block overflow-hidden bg-zinc-100">
                  <Image
                    src={line.image}
                    alt={line.name}
                    width={264}
                    height={330}
                    className="aspect-[4/5] w-full object-cover"
                  />
                </Link>
                <div className="min-w-0">
                  <Link href={`/product/${line.slug}`} className="font-semibold uppercase">
                    {line.name}
                  </Link>
                  <p className="mt-2 text-sm text-zinc-500">
                    {line.color} / {line.size}
                  </p>
                  <p className="mt-1 text-sm text-zinc-500">{line.sku}</p>
                  <div className="mt-5 inline-flex h-10 items-center rounded-md border border-black/10 dark:border-white/15">
                    <button
                      type="button"
                      className="focus-ring inline-flex size-10 items-center justify-center"
                      onClick={() => updateQuantity(key, line.quantity - 1)}
                      aria-label="Decrease quantity"
                    >
                      <Minus className="size-4" />
                    </button>
                    <span className="w-10 text-center text-sm font-bold">{line.quantity}</span>
                    <button
                      type="button"
                      className="focus-ring inline-flex size-10 items-center justify-center"
                      onClick={() => updateQuantity(key, line.quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      <Plus className="size-4" />
                    </button>
                  </div>
                </div>
                <div className="flex items-start justify-between gap-4 sm:block sm:text-right">
                  <p className="font-bold">{formatCurrency(line.price * line.quantity)}</p>
                  <button
                    type="button"
                    className="focus-ring mt-0 inline-flex size-10 items-center justify-center rounded-md text-zinc-500 hover:bg-zinc-100 hover:text-black dark:hover:bg-zinc-900 dark:hover:text-white sm:mt-8"
                    onClick={() => removeLine(key)}
                    aria-label={`Remove ${line.name}`}
                    title="Remove"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        <aside className="h-fit border border-black/10 p-5 dark:border-white/10 lg:sticky lg:top-24">
          <h2 className="font-display text-2xl font-black uppercase">Order Summary</h2>
          <div className="mt-5">
            <div className="h-2 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-900">
              <div className="h-full bg-black dark:bg-white" style={{ width: `${progress}%` }} />
            </div>
            <p className="mt-2 text-sm text-zinc-500">
              {remainingForFreeShipping > 0
                ? `${formatCurrency(remainingForFreeShipping)} away from free shipping`
                : "Free shipping unlocked"}
            </p>
          </div>

          <label className="mt-6 block text-xs font-bold uppercase tracking-widecaps text-zinc-500">
            Coupon code
          </label>
          <input
            value={couponCode}
            onChange={(event) => setCouponCode(event.target.value)}
            className="focus-ring mt-2 h-11 w-full rounded-md border border-black/10 bg-white px-3 text-sm uppercase dark:border-white/15 dark:bg-black"
            aria-label="Coupon code"
          />

          <div className="mt-6 grid gap-3 border-t border-black/10 pt-5 text-sm dark:border-white/10">
            <div className="flex justify-between">
              <span className="text-zinc-500">Subtotal</span>
              <span>{formatCurrency(quote.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Discount</span>
              <span>-{formatCurrency(quote.discount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Shipping estimate</span>
              <span>{quote.shipping === 0 ? "Free" : formatCurrency(quote.shipping)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Tax estimate</span>
              <span>{formatCurrency(quote.tax)}</span>
            </div>
            <div className="flex justify-between border-t border-black/10 pt-4 text-base font-black dark:border-white/10">
              <span>Total</span>
              <span>{formatCurrency(quote.total)}</span>
            </div>
          </div>

          <LinkButton href="/checkout" className="mt-6 w-full">
            Secure checkout
          </LinkButton>
          <Button variant="ghost" className="mt-2 w-full" onClick={() => setCouponCode("")}>
            Clear coupon
          </Button>
        </aside>
      </div>
    </section>
  );
}
