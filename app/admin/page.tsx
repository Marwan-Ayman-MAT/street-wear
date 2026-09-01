import type { Metadata } from "next";
import { BarChart3, Boxes, CircleDollarSign, PackageCheck, Star, UsersRound } from "lucide-react";
import { categories, products } from "@/lib/catalog";
import { formatCurrency } from "@/lib/utils";

const metricCards = [
  {
    icon: CircleDollarSign,
    label: "Revenue",
    value: formatCurrency(48240),
    note: "+18.4% vs last month"
  },
  {
    icon: PackageCheck,
    label: "Orders",
    value: "318",
    note: "92% on-time fulfillment"
  },
  {
    icon: BarChart3,
    label: "Conversion",
    value: "4.8%",
    note: "Mobile checkout leads"
  },
  {
    icon: Boxes,
    label: "Inventory",
    value: products.reduce((sum, product) => sum + product.inventoryCount, 0).toString(),
    note: "8 active SKUs"
  }
];

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description:
    "Admin dashboard for analytics, product CRUD, categories, orders, customers, inventory, coupons, and reviews."
};

export default function AdminPage() {
  return (
    <section className="container-pad py-10">
      <div className="mb-8 border-b border-black/10 pb-6 dark:border-white/10">
        <p className="text-xs font-bold uppercase tracking-widecaps text-zinc-500">Admin</p>
        <h1 className="mt-2 font-display text-4xl font-black uppercase leading-none sm:text-6xl">
          Commerce Command
        </h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metricCards.map(({ icon: Icon, label, value, note }) => (
          <div key={label} className="border border-black/10 p-5 dark:border-white/10">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-widecaps text-zinc-500">
                {label}
              </p>
              <Icon className="size-5" />
            </div>
            <p className="mt-4 font-display text-4xl font-black uppercase">{value}</p>
            <p className="mt-2 text-sm text-zinc-500">{note}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid min-w-0 gap-8 xl:grid-cols-[1fr_360px]">
        <div className="grid min-w-0 gap-8">
          <section className="min-w-0 border border-black/10 p-5 dark:border-white/10">
            <div className="mb-5 flex items-center justify-between gap-4">
              <h2 className="font-display text-2xl font-black uppercase">Products CRUD</h2>
              <button className="focus-ring rounded-md bg-black px-4 py-2 text-xs font-bold uppercase tracking-widecaps text-white dark:bg-white dark:text-black">
                Add product
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[860px] text-left text-sm">
                <thead className="border-b border-black/10 text-xs uppercase tracking-widecaps text-zinc-500 dark:border-white/10">
                  <tr>
                    <th className="py-3">Product</th>
                    <th>SKU</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Inventory</th>
                    <th>Rating</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b border-black/10 dark:border-white/10">
                      <td className="py-4 font-semibold">{product.name}</td>
                      <td>{product.sku}</td>
                      <td>{product.category}</td>
                      <td>{formatCurrency(product.salePrice ?? product.price)}</td>
                      <td>{product.inventoryCount}</td>
                      <td>{product.rating.toFixed(1)}</td>
                      <td className="text-right">
                        <div className="inline-flex gap-2">
                          <button className="rounded-md border border-black/10 px-3 py-1 text-xs font-semibold dark:border-white/15">
                            Edit
                          </button>
                          <button className="rounded-md border border-black/10 px-3 py-1 text-xs font-semibold dark:border-white/15">
                            Archive
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-2">
            <div className="border border-black/10 p-5 dark:border-white/10">
              <h2 className="font-display text-2xl font-black uppercase">Categories CRUD</h2>
              <div className="mt-5 grid gap-3">
                {categories.map((category) => (
                  <div
                    key={category.slug}
                    className="flex items-center justify-between gap-4 border-b border-black/10 pb-3 text-sm dark:border-white/10"
                  >
                    <div>
                      <p className="font-semibold">{category.name}</p>
                      <p className="text-zinc-500">{category.slug}</p>
                    </div>
                    <button className="rounded-md border border-black/10 px-3 py-1 text-xs font-semibold dark:border-white/15">
                      Manage
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-black/10 p-5 dark:border-white/10">
              <h2 className="font-display text-2xl font-black uppercase">Orders Management</h2>
              <div className="mt-5 grid gap-3 text-sm">
                {[
                  ["SW-10492", "Processing", "$252", "Reserve carrier label"],
                  ["SW-10491", "Paid", "$164", "Pick puffer vest"],
                  ["SW-10490", "Shipped", "$72", "Track DHL-8921"]
                ].map(([id, status, total, action]) => (
                  <div key={id} className="grid grid-cols-[1fr_auto] gap-3 border-b border-black/10 pb-3 dark:border-white/10">
                    <div>
                      <p className="font-semibold">{id} / {status}</p>
                      <p className="text-zinc-500">{action}</p>
                    </div>
                    <p className="font-bold">{total}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-2">
            <div className="border border-black/10 p-5 dark:border-white/10">
              <h2 className="font-display text-2xl font-black uppercase">Customers</h2>
              <div className="mt-5 grid gap-3 text-sm">
                {[
                  ["Maya A.", "VIP", "$1,248 lifetime value"],
                  ["Jon R.", "Returning", "$532 lifetime value"],
                  ["Farah M.", "New", "$96 lifetime value"]
                ].map(([name, segment, value]) => (
                  <div key={name} className="flex items-center justify-between gap-4 border-b border-black/10 pb-3 dark:border-white/10">
                    <div>
                      <p className="font-semibold">{name}</p>
                      <p className="text-zinc-500">{segment}</p>
                    </div>
                    <p className="text-zinc-500">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-black/10 p-5 dark:border-white/10">
              <h2 className="font-display text-2xl font-black uppercase">Reviews Moderation</h2>
              <div className="mt-5 grid gap-3 text-sm">
                {products.slice(0, 3).map((product) => (
                  <div key={product.id} className="border-b border-black/10 pb-3 dark:border-white/10">
                    <div className="flex items-center gap-2">
                      <Star className="size-4 fill-black dark:fill-white" />
                      <p className="font-semibold">{product.reviews[0]?.title}</p>
                    </div>
                    <p className="mt-1 text-zinc-500">{product.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        <aside className="grid h-fit gap-8 xl:sticky xl:top-24">
          <section className="border border-black/10 p-5 dark:border-white/10">
            <h2 className="font-display text-2xl font-black uppercase">Inventory</h2>
            <div className="mt-5 grid gap-4">
              {products
                .slice()
                .sort((a, b) => a.inventoryCount - b.inventoryCount)
                .slice(0, 5)
                .map((product) => (
                  <div key={product.id}>
                    <div className="flex justify-between gap-3 text-sm">
                      <span className="font-semibold">{product.name}</span>
                      <span>{product.inventoryCount}</span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-900">
                      <div
                        className="h-full bg-black dark:bg-white"
                        style={{ width: `${Math.min(product.inventoryCount, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </section>

          <section className="border border-black/10 p-5 dark:border-white/10">
            <h2 className="font-display text-2xl font-black uppercase">Coupons</h2>
            <div className="mt-5 grid gap-3 text-sm">
              {[
                ["STREET15", "15% off first order", "Active"],
                ["DROP25", "$25 off capsules", "Active"],
                ["VIPSHIP", "Free express shipping", "Scheduled"]
              ].map(([code, description, status]) => (
                <div key={code} className="border-b border-black/10 pb-3 dark:border-white/10">
                  <p className="font-semibold">{code}</p>
                  <p className="text-zinc-500">{description}</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-widecaps">{status}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="border border-black/10 p-5 dark:border-white/10">
            <div className="mb-5 flex items-center gap-2">
              <UsersRound className="size-5" />
              <h2 className="font-display text-2xl font-black uppercase">Segments</h2>
            </div>
            <div className="grid gap-3 text-sm">
              {[
                ["Mobile first shoppers", "62% of revenue"],
                ["Fleece repeat buyers", "34% reorder rate"],
                ["High AOV capsule buyers", "$218 average order"]
              ].map(([segment, value]) => (
                <div key={segment} className="flex justify-between gap-4 border-b border-black/10 pb-3 dark:border-white/10">
                  <span>{segment}</span>
                  <span className="font-semibold">{value}</span>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </section>
  );
}
