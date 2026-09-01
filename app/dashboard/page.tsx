import type { Metadata } from "next";
import Link from "next/link";
import { Heart, MapPin, Package, Settings, UserRound } from "lucide-react";
import { products } from "@/lib/catalog";
import { formatCurrency } from "@/lib/utils";

const dashboardNav = [
  { icon: UserRound, label: "Profile" },
  { icon: Package, label: "Orders" },
  { icon: MapPin, label: "Addresses" },
  { icon: Heart, label: "Wishlist" },
  { icon: Settings, label: "Settings" }
];

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Customer profile, orders, addresses, wishlist, and account settings."
};

export default function DashboardPage() {
  const orders = [
    {
      id: "SW-10492",
      date: "May 23, 2026",
      status: "Processing",
      total: 252,
      items: "Origin Heavyweight Hoodie, Monolith Box Tee"
    },
    {
      id: "SW-10318",
      date: "April 29, 2026",
      status: "Delivered",
      total: 148,
      items: "Night Market Denim"
    }
  ];

  return (
    <section className="container-pad py-10">
      <div className="mb-8 border-b border-black/10 pb-6 dark:border-white/10">
        <p className="text-xs font-bold uppercase tracking-widecaps text-zinc-500">Account</p>
        <h1 className="mt-2 font-display text-4xl font-black uppercase leading-none sm:text-6xl">
          Dashboard
        </h1>
      </div>

      <div className="grid min-w-0 gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="h-fit border border-black/10 p-4 dark:border-white/10 lg:sticky lg:top-24">
          {dashboardNav.map(({ icon: Icon, label }) => (
            <a
              key={label}
              href={`#${label.toLowerCase()}`}
              className="flex items-center gap-3 rounded-md px-3 py-3 text-sm font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-900"
            >
              <Icon className="size-4" />
              {label}
            </a>
          ))}
        </aside>

        <div className="grid min-w-0 gap-6">
          <section id="profile" className="border border-black/10 p-5 dark:border-white/10">
            <h2 className="font-display text-2xl font-black uppercase">Profile</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {[
                ["Name", "Maya Street"],
                ["Email", "maya@example.com"],
                ["Phone", "+20 100 000 0000"],
                ["Style profile", "Oversized tops, tapered bottoms, black palette"]
              ].map(([label, value]) => (
                <div key={label} className="border-b border-black/10 pb-3 dark:border-white/10">
                  <p className="text-xs font-bold uppercase tracking-widecaps text-zinc-500">
                    {label}
                  </p>
                  <p className="mt-1 text-sm font-semibold">{value}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="orders" className="min-w-0 border border-black/10 p-5 dark:border-white/10">
            <h2 className="font-display text-2xl font-black uppercase">Orders</h2>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[680px] text-left text-sm">
                <thead className="border-b border-black/10 text-xs uppercase tracking-widecaps text-zinc-500 dark:border-white/10">
                  <tr>
                    <th className="py-3">Order</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Items</th>
                    <th className="text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-black/10 dark:border-white/10">
                      <td className="py-4 font-semibold">{order.id}</td>
                      <td>{order.date}</td>
                      <td>{order.status}</td>
                      <td>{order.items}</td>
                      <td className="text-right font-semibold">{formatCurrency(order.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="addresses" className="border border-black/10 p-5 dark:border-white/10">
            <h2 className="font-display text-2xl font-black uppercase">Addresses</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {[
                ["Home", "Zamalek, Cairo, Egypt", "Default shipping"],
                ["Studio", "Downtown Cairo, Egypt", "Returns and gifting"]
              ].map(([label, address, note]) => (
                <div key={label} className="border border-black/10 p-4 dark:border-white/10">
                  <p className="font-semibold">{label}</p>
                  <p className="mt-2 text-sm text-zinc-500">{address}</p>
                  <p className="mt-1 text-sm text-zinc-500">{note}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="wishlist" className="border border-black/10 p-5 dark:border-white/10">
            <h2 className="font-display text-2xl font-black uppercase">Wishlist</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {products.slice(0, 3).map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  className="border border-black/10 p-4 text-sm dark:border-white/10"
                >
                  <p className="font-semibold">{product.name}</p>
                  <p className="mt-2 text-zinc-500">{formatCurrency(product.salePrice ?? product.price)}</p>
                </Link>
              ))}
            </div>
          </section>

          <section id="settings" className="border border-black/10 p-5 dark:border-white/10">
            <h2 className="font-display text-2xl font-black uppercase">Settings</h2>
            <div className="mt-5 grid gap-3 text-sm">
              {["Drop alerts", "Order status emails", "SMS delivery notifications"].map((setting) => (
                <label key={setting} className="flex items-center justify-between gap-4 border-b border-black/10 pb-3 dark:border-white/10">
                  <span>{setting}</span>
                  <input type="checkbox" defaultChecked className="size-4 accent-black dark:accent-white" />
                </label>
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
