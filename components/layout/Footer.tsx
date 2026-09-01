import Link from "next/link";
import { Instagram, Mail, ShieldCheck, Truck, Undo2 } from "lucide-react";

const footerLinks = [
  ["Shop", "/shop"],
  ["New Collection", "/shop?sort=new"],
  ["Best Sellers", "/shop?sort=bestsellers"],
  ["Dashboard", "/dashboard"],
  ["Admin", "/admin"]
];

const trustItems = [
  { icon: Truck, label: "Free shipping over $175" },
  { icon: Undo2, label: "14 day returns" },
  { icon: ShieldCheck, label: "Secure checkout" }
];

export function Footer() {
  return (
    <footer className="border-t border-black/10 bg-black text-white dark:border-white/10">
      <div className="container-pad grid gap-10 py-12 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <p className="font-display text-3xl font-black uppercase tracking-widecaps">
            STREET WEAR
          </p>
          <p className="mt-4 max-w-md text-sm leading-6 text-zinc-300">
            Premium streetwear for confident everyday movement. Heavy fabrics, sharp fits,
            secure checkout, and service that respects your time.
          </p>
          <div className="mt-6 grid max-w-xl gap-3 sm:grid-cols-3">
            {trustItems.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 rounded-md border border-white/10 px-3 py-2 text-xs text-zinc-300"
              >
                <Icon className="size-4" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-widecaps text-zinc-400">Explore</h2>
          <div className="mt-4 grid gap-3 text-sm">
            {footerLinks.map(([label, href]) => (
              <Link key={href} href={href} className="text-zinc-300 hover:text-white">
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-widecaps text-zinc-400">
            Join the drop list
          </h2>
          <p className="mt-4 text-sm leading-6 text-zinc-300">
            Early access to capsule releases, private sale windows, and styling edits.
          </p>
          <form className="mt-5 flex gap-2">
            <label className="sr-only" htmlFor="footer-email">
              Email
            </label>
            <input
              id="footer-email"
              type="email"
              className="focus-ring min-w-0 flex-1 rounded-md border border-white/15 bg-white px-3 text-sm text-black outline-none"
            />
            <button className="focus-ring inline-flex size-10 items-center justify-center rounded-md bg-white text-black">
              <Mail className="size-4" />
            </button>
          </form>
          <a
            href="https://instagram.com"
            className="mt-5 inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-white"
          >
            <Instagram className="size-4" />
            @streetwear
          </a>
        </div>
      </div>
    </footer>
  );
}
