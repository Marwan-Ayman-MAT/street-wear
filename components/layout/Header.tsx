"use client";

import Link from "next/link";
import { Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { useMemo, useState } from "react";
import { products } from "@/lib/catalog";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/components/commerce/CartProvider";

const nav = [
  { href: "/shop", label: "Shop" },
  { href: "/shop?category=hoodies", label: "Hoodies" },
  { href: "/shop?category=outerwear", label: "Outerwear" },
  { href: "/admin", label: "Admin" }
];

export function Header() {
  const { itemCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");

  const searchResults = useMemo(() => {
    if (query.trim().length < 2) return [];
    const normalized = query.toLowerCase();
    return products
      .filter((product) =>
        [product.name, product.category, product.sku, product.tags.join(" ")]
          .join(" ")
          .toLowerCase()
          .includes(normalized)
      )
      .slice(0, 4);
  }, [query]);

  const searchBox = (variant: "desktop" | "mobile") => (
    <label className="relative block w-full">
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className="focus-ring h-10 w-full rounded-md border border-black/10 bg-zinc-50 pl-10 pr-3 text-sm outline-none transition placeholder:text-zinc-400 dark:border-white/15 dark:bg-zinc-950"
        aria-label="Search products"
        placeholder="Search products"
      />
      {searchResults.length > 0 ? (
        <div
          className={
            variant === "desktop"
              ? "absolute right-0 top-12 z-50 w-full overflow-hidden rounded-md border border-black/10 bg-white shadow-lift dark:border-white/10 dark:bg-zinc-950"
              : "mt-2 overflow-hidden rounded-md border border-black/10 bg-white dark:border-white/10 dark:bg-zinc-950"
          }
        >
          {searchResults.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="block border-b border-black/5 px-4 py-3 text-sm last:border-0 hover:bg-zinc-50 dark:border-white/10 dark:hover:bg-zinc-900"
              onClick={() => {
                setQuery("");
                setMenuOpen(false);
              }}
            >
              <span className="font-semibold">{product.name}</span>
              <span className="ml-2 text-xs text-zinc-500">{product.category}</span>
            </Link>
          ))}
        </div>
      ) : null}
    </label>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/95 backdrop-blur dark:border-white/10 dark:bg-black/90">
      <div className="container-pad flex h-16 items-center justify-between gap-2 sm:gap-4">
        <Link
          href="/"
          className="shrink-0 font-display text-lg font-black uppercase tracking-widecaps sm:text-xl"
          onClick={() => setMenuOpen(false)}
        >
          STREET WEAR
        </Link>

        <nav className="hidden items-center gap-7 text-xs font-bold uppercase tracking-widecaps md:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-zinc-500">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden flex-1 justify-end lg:flex">
          <div className="w-full max-w-xs">{searchBox("desktop")}</div>
        </div>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Link
            href="/dashboard"
            className="focus-ring hidden size-10 items-center justify-center rounded-md transition hover:bg-zinc-100 dark:hover:bg-zinc-900 sm:inline-flex"
            aria-label="Open account dashboard"
            title="Account"
          >
            <UserRound className="size-4" />
          </Link>
          <Link
            href="/cart"
            className="focus-ring relative inline-flex size-10 items-center justify-center rounded-md transition hover:bg-zinc-100 dark:hover:bg-zinc-900"
            aria-label="Open cart"
            title="Cart"
          >
            <ShoppingBag className="size-4" />
            {itemCount > 0 ? (
              <span className="absolute -right-1 -top-1 inline-flex size-5 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white dark:bg-white dark:text-black">
                {itemCount}
              </span>
            ) : null}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </Button>
        </div>
      </div>

      {menuOpen ? (
        <div className="border-t border-black/10 bg-white px-4 py-5 dark:border-white/10 dark:bg-black md:hidden">
          <div className="mb-4">{searchBox("mobile")}</div>
          <nav className="grid gap-2 text-sm font-bold uppercase tracking-widecaps">
            {[...nav, { href: "/dashboard", label: "Account" }, { href: "/cart", label: "Cart" }].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-3 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
