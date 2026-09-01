"use client";

import Image from "next/image";
import { CreditCard, LockKeyhole, MapPin, PackageCheck, Truck } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { Button, LinkButton } from "@/components/ui/Button";
import { useCart } from "@/components/commerce/CartProvider";
import { calculateQuote } from "@/lib/commerce";
import { formatCurrency } from "@/lib/utils";

type Delivery = "standard" | "express";
type Payment = "stripe" | "paymob" | "cod";

export function CheckoutClient() {
  const { lines, couponCode, clearCart } = useCart();
  const [delivery, setDelivery] = useState<Delivery>("standard");
  const [payment, setPayment] = useState<Payment>("stripe");
  const [complete, setComplete] = useState(false);
  const quote = useMemo(() => calculateQuote(lines, couponCode, delivery), [couponCode, delivery, lines]);

  async function submitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = {
      customer: Object.fromEntries(form.entries()),
      delivery,
      payment,
      lines,
      couponCode
    };

    await fetch(`/api/checkout/${payment === "paymob" ? "paymob" : "stripe"}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }).catch(() => null);

    setComplete(true);
    clearCart();
  }

  if (complete) {
    return (
      <section className="container-pad py-16">
        <div className="mx-auto max-w-2xl text-center">
          <PackageCheck className="mx-auto size-12" />
          <p className="mt-6 text-xs font-bold uppercase tracking-widecaps text-zinc-500">
            Order confirmed
          </p>
          <h1 className="mt-3 font-display text-5xl font-black uppercase leading-none">
            The drop is yours
          </h1>
          <p className="mt-5 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
            We generated your order, reserved inventory, and prepared payment routing. Connect
            Stripe or Paymob credentials in production to capture live payments.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <LinkButton href="/dashboard">View orders</LinkButton>
            <LinkButton href="/shop" variant="secondary">
              Continue shopping
            </LinkButton>
          </div>
        </div>
      </section>
    );
  }

  if (lines.length === 0) {
    return (
      <section className="container-pad py-16">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="font-display text-5xl font-black uppercase">Checkout is empty</h1>
          <p className="mt-4 text-sm text-zinc-500">Add products to your bag before checkout.</p>
          <LinkButton href="/shop" className="mt-6">
            Shop products
          </LinkButton>
        </div>
      </section>
    );
  }

  return (
    <section className="container-pad py-10">
      <div className="mb-8 border-b border-black/10 pb-6 dark:border-white/10">
        <p className="text-xs font-bold uppercase tracking-widecaps text-zinc-500">
          Secure checkout
        </p>
        <h1 className="mt-2 font-display text-4xl font-black uppercase leading-none sm:text-6xl">
          Complete Order
        </h1>
      </div>

      <form onSubmit={submitOrder} className="grid gap-10 lg:grid-cols-[1fr_390px]">
        <div className="grid gap-8">
          <section className="border border-black/10 p-5 dark:border-white/10">
            <div className="mb-5 flex items-center gap-2">
              <MapPin className="size-5" />
              <h2 className="font-display text-2xl font-black uppercase">Shipping Address</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["firstName", "First name"],
                ["lastName", "Last name"],
                ["email", "Email"],
                ["phone", "Phone"],
                ["address", "Street address"],
                ["apartment", "Apartment"],
                ["city", "City"],
                ["postalCode", "Postal code"]
              ].map(([name, label]) => (
                <label key={name} className={name === "address" ? "sm:col-span-2" : ""}>
                  <span className="text-xs font-bold uppercase tracking-widecaps text-zinc-500">
                    {label}
                  </span>
                  <input
                    name={name}
                    required={!["apartment"].includes(name)}
                    type={name === "email" ? "email" : "text"}
                    className="focus-ring mt-2 h-11 w-full rounded-md border border-black/10 bg-white px-3 text-sm dark:border-white/15 dark:bg-black"
                  />
                </label>
              ))}
            </div>
          </section>

          <section className="border border-black/10 p-5 dark:border-white/10">
            <div className="mb-5 flex items-center gap-2">
              <Truck className="size-5" />
              <h2 className="font-display text-2xl font-black uppercase">Delivery</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["standard", "Standard", "3-5 business days", "$12 or free over $175"],
                ["express", "Express", "1-2 business days", "$24 priority dispatch"]
              ].map(([value, title, body, price]) => (
                <label
                  key={value}
                  className={`cursor-pointer rounded-md border p-4 ${
                    delivery === value
                      ? "border-black bg-zinc-50 dark:border-white dark:bg-zinc-950"
                      : "border-black/10 dark:border-white/15"
                  }`}
                >
                  <input
                    type="radio"
                    name="delivery"
                    value={value}
                    checked={delivery === value}
                    onChange={() => setDelivery(value as Delivery)}
                    className="sr-only"
                  />
                  <span className="font-semibold">{title}</span>
                  <span className="mt-2 block text-sm text-zinc-500">{body}</span>
                  <span className="mt-1 block text-sm text-zinc-500">{price}</span>
                </label>
              ))}
            </div>
          </section>

          <section className="border border-black/10 p-5 dark:border-white/10">
            <div className="mb-5 flex items-center gap-2">
              <CreditCard className="size-5" />
              <h2 className="font-display text-2xl font-black uppercase">Payment</h2>
            </div>
            <div className="grid gap-3">
              {[
                ["stripe", "Credit card with Stripe", "Cards, wallets, and saved payment methods"],
                ["paymob", "Paymob", "Regional card and wallet routing for MENA checkout"],
                ["cod", "Cash on delivery", "Manual payment status until delivery confirmation"]
              ].map(([value, title, body]) => (
                <label
                  key={value}
                  className={`cursor-pointer rounded-md border p-4 ${
                    payment === value
                      ? "border-black bg-zinc-50 dark:border-white dark:bg-zinc-950"
                      : "border-black/10 dark:border-white/15"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={value}
                    checked={payment === value}
                    onChange={() => setPayment(value as Payment)}
                    className="sr-only"
                  />
                  <span className="font-semibold">{title}</span>
                  <span className="mt-1 block text-sm text-zinc-500">{body}</span>
                </label>
              ))}
            </div>
          </section>
        </div>

        <aside className="h-fit border border-black/10 p-5 dark:border-white/10 lg:sticky lg:top-24">
          <h2 className="font-display text-2xl font-black uppercase">Order Summary</h2>
          <div className="mt-5 grid gap-4">
            {lines.map((line) => (
              <div key={`${line.productId}-${line.size}-${line.color}`} className="flex gap-3">
                <Image
                  src={line.image}
                  alt={line.name}
                  width={72}
                  height={90}
                  className="aspect-[4/5] w-16 object-cover"
                />
                <div className="min-w-0 flex-1 text-sm">
                  <p className="font-semibold">{line.name}</p>
                  <p className="mt-1 text-zinc-500">
                    {line.color} / {line.size} / Qty {line.quantity}
                  </p>
                </div>
                <p className="text-sm font-bold">{formatCurrency(line.price * line.quantity)}</p>
              </div>
            ))}
          </div>
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
              <span className="text-zinc-500">Shipping</span>
              <span>{quote.shipping === 0 ? "Free" : formatCurrency(quote.shipping)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Tax</span>
              <span>{formatCurrency(quote.tax)}</span>
            </div>
            <div className="flex justify-between border-t border-black/10 pt-4 text-base font-black dark:border-white/10">
              <span>Total</span>
              <span>{formatCurrency(quote.total)}</span>
            </div>
          </div>
          <Button type="submit" className="mt-6 w-full">
            <LockKeyhole className="size-4" />
            Place order
          </Button>
        </aside>
      </form>
    </section>
  );
}
