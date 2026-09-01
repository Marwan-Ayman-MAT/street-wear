"use client";

import { SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/commerce/ProductCard";
import { getProductFilters } from "@/lib/catalog";
import type { Product, Size } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

type Sort = "featured" | "new" | "price-asc" | "price-desc" | "rating";

export function ShopExperience({
  products,
  initialCategory
}: {
  products: Product[];
  initialCategory?: string;
}) {
  const filters = getProductFilters();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(initialCategory ?? "all");
  const [color, setColor] = useState("all");
  const [size, setSize] = useState<Size | "all">("all");
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice);
  const [sort, setSort] = useState<Sort>("featured");
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    const normalized = query.toLowerCase().trim();
    const filteredProducts = products.filter((product) => {
      const matchesQuery =
        !normalized ||
        [product.name, product.description, product.category, product.tags.join(" ")]
          .join(" ")
          .toLowerCase()
          .includes(normalized);
      const matchesCategory = category === "all" || product.categorySlug === category;
      const matchesColor =
        color === "all" || product.colors.some((productColor) => productColor.name === color);
      const matchesSize = size === "all" || product.sizes.includes(size);
      const matchesPrice = (product.salePrice ?? product.price) <= maxPrice;

      return matchesQuery && matchesCategory && matchesColor && matchesSize && matchesPrice;
    });

    return filteredProducts.sort((a, b) => {
      if (sort === "new") return Number(Boolean(b.newArrival)) - Number(Boolean(a.newArrival));
      if (sort === "price-asc") return (a.salePrice ?? a.price) - (b.salePrice ?? b.price);
      if (sort === "price-desc") return (b.salePrice ?? b.price) - (a.salePrice ?? a.price);
      if (sort === "rating") return b.rating - a.rating;
      return (
        Number(Boolean(b.featured)) +
        Number(Boolean(b.bestseller)) -
        (Number(Boolean(a.featured)) + Number(Boolean(a.bestseller)))
      );
    });
  }, [category, color, maxPrice, products, query, size, sort]);

  const perPage = 8;
  const pageCount = Math.max(Math.ceil(filtered.length / perPage), 1);
  const visibleProducts = filtered.slice((page - 1) * perPage, page * perPage);

  function resetFilters() {
    setQuery("");
    setCategory("all");
    setColor("all");
    setSize("all");
    setMaxPrice(filters.maxPrice);
    setSort("featured");
    setPage(1);
  }

  const filterPanel = (
    <div className="grid gap-6">
      <div>
        <label className="text-xs font-bold uppercase tracking-widecaps text-zinc-500">
          Search
        </label>
        <input
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setPage(1);
          }}
          className="focus-ring mt-2 h-11 w-full rounded-md border border-black/10 bg-white px-3 text-sm dark:border-white/15 dark:bg-black"
          aria-label="Search products"
        />
      </div>

      <div>
        <label className="text-xs font-bold uppercase tracking-widecaps text-zinc-500">
          Category
        </label>
        <div className="mt-3 grid gap-2">
          {[{ name: "All", slug: "all" }, ...filters.categories].map((item) => (
            <button
              type="button"
              key={item.slug}
              onClick={() => {
                setCategory(item.slug);
                setPage(1);
              }}
              className={`rounded-md border px-3 py-2 text-left text-sm transition ${
                category === item.slug
                  ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                  : "border-black/10 hover:border-black dark:border-white/15 dark:hover:border-white"
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between gap-3">
          <label className="text-xs font-bold uppercase tracking-widecaps text-zinc-500">
            Price
          </label>
          <span className="text-sm font-semibold">{formatCurrency(maxPrice)}</span>
        </div>
        <input
          type="range"
          min={50}
          max={filters.maxPrice}
          value={maxPrice}
          onChange={(event) => {
            setMaxPrice(Number(event.target.value));
            setPage(1);
          }}
          className="mt-3 w-full accent-black dark:accent-white"
        />
      </div>

      <div>
        <label className="text-xs font-bold uppercase tracking-widecaps text-zinc-500">
          Color
        </label>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setColor("all")}
            className={`rounded-full border px-3 py-2 text-xs font-bold uppercase tracking-widecaps ${
              color === "all" ? "border-black bg-black text-white dark:bg-white dark:text-black" : "border-black/10"
            }`}
          >
            All
          </button>
          {filters.colors.map((item) => (
            <button
              type="button"
              key={item.name}
              onClick={() => {
                setColor(item.name);
                setPage(1);
              }}
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold ${
                color === item.name
                  ? "border-black dark:border-white"
                  : "border-black/10 dark:border-white/15"
              }`}
            >
              <span
                aria-hidden
                className="size-3 rounded-full border border-black/20"
                style={{ background: item.hex }}
              />
              {item.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-xs font-bold uppercase tracking-widecaps text-zinc-500">
          Size
        </label>
        <div className="mt-3 grid grid-cols-4 gap-2">
          {["all", ...filters.sizes].map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => {
                setSize(item as Size | "all");
                setPage(1);
              }}
              className={`rounded-md border px-2 py-2 text-xs font-bold uppercase ${
                size === item
                  ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                  : "border-black/10 dark:border-white/15"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <Button type="button" variant="secondary" onClick={resetFilters}>
        Reset filters
      </Button>
    </div>
  );

  return (
    <section className="container-pad py-10">
      <div className="mb-8 flex flex-col justify-between gap-4 border-b border-black/10 pb-6 dark:border-white/10 md:flex-row md:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-widecaps text-zinc-500">Shop</p>
          <h1 className="mt-2 font-display text-4xl font-black uppercase leading-none sm:text-6xl">
            All Products
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="secondary"
            className="lg:hidden"
            onClick={() => setFiltersOpen(true)}
          >
            <SlidersHorizontal className="size-4" />
            Filters
          </Button>
          <label className="sr-only" htmlFor="sort-products">
            Sort products
          </label>
          <select
            id="sort-products"
            value={sort}
            onChange={(event) => {
              setSort(event.target.value as Sort);
              setPage(1);
            }}
            className="focus-ring h-11 rounded-md border border-black/10 bg-white px-3 text-sm dark:border-white/15 dark:bg-black"
          >
            <option value="featured">Featured</option>
            <option value="new">New arrivals</option>
            <option value="price-asc">Price low to high</option>
            <option value="price-desc">Price high to low</option>
            <option value="rating">Top rated</option>
          </select>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block">{filterPanel}</aside>
        <div>
          <div className="mb-5 flex items-center justify-between text-sm text-zinc-500">
            <span>{filtered.length} products</span>
            <span>
              Page {page} of {pageCount}
            </span>
          </div>
          {visibleProducts.length > 0 ? (
            <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {visibleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="border border-black/10 px-6 py-16 text-center dark:border-white/10">
              <h2 className="font-display text-2xl font-black uppercase">No matches</h2>
              <p className="mt-2 text-sm text-zinc-500">
                Try a broader search or reset the filters.
              </p>
              <Button type="button" className="mt-6" onClick={resetFilters}>
                Reset filters
              </Button>
            </div>
          )}

          <div className="mt-10 flex justify-center gap-3">
            <Button
              type="button"
              variant="secondary"
              disabled={page === 1}
              onClick={() => setPage((current) => Math.max(current - 1, 1))}
            >
              Previous
            </Button>
            <Button
              type="button"
              variant="secondary"
              disabled={page === pageCount}
              onClick={() => setPage((current) => Math.min(current + 1, pageCount))}
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      {filtersOpen ? (
        <div className="fixed inset-0 z-[80] bg-black/50 lg:hidden">
          <div className="absolute right-0 top-0 h-full w-full max-w-sm overflow-auto bg-white p-5 dark:bg-black">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-2xl font-black uppercase">Filters</h2>
              <Button variant="ghost" size="icon" onClick={() => setFiltersOpen(false)}>
                <X className="size-4" />
              </Button>
            </div>
            {filterPanel}
          </div>
        </div>
      ) : null}
    </section>
  );
}
