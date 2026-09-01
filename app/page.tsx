import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductRail } from "@/components/commerce/ProductRail";
import { categories, instagramShots, products, testimonials } from "@/lib/catalog";
import { formatCurrency } from "@/lib/utils";

const serviceHighlights = [
  { icon: Truck, title: "Free shipping", body: "Complimentary delivery above $175" },
  { icon: ShieldCheck, title: "Secure checkout", body: "Stripe and Paymob payment routing" },
  { icon: Sparkles, title: "Limited drops", body: "Capsule runs with live inventory" }
];

export default function HomePage() {
  const newCollection = products.filter((product) => product.newArrival || product.featured).slice(0, 4);
  const bestSellers = products.filter((product) => product.bestseller).slice(0, 4);
  const trending = products.filter((product) => product.trending || product.salePrice).slice(0, 4);
  const heroProduct = products[0];

  return (
    <>
      <section className="relative min-h-[70vh] overflow-hidden bg-black text-white">
        <Image
          src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1800&q=85"
          alt="STREET WEAR city editorial campaign"
          fill
          priority
          className="object-cover opacity-70"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/10" />
        <div className="container-pad relative flex min-h-[70vh] items-end pb-8 pt-28">
          <div className="max-w-4xl">
            <Badge className="border-white/20 bg-white text-black">New season capsule</Badge>
            <h1 className="mt-6 font-display text-6xl font-black uppercase leading-[0.88] text-balance sm:text-8xl lg:text-[118px]">
              Own the Street
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-200 sm:text-lg">
              Premium Streetwear Designed For Everyday Confidence.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="/shop" className="bg-white text-black hover:bg-zinc-200">
                Shop now
              </LinkButton>
              <LinkButton
                href="/shop?sort=new"
                variant="secondary"
                className="border-white bg-transparent text-white hover:bg-white hover:text-black"
              >
                New collection
              </LinkButton>
            </div>
          </div>
        </div>
      </section>

      <section className="container-pad grid gap-4 border-b border-black/10 py-5 dark:border-white/10 md:grid-cols-3">
        {serviceHighlights.map(({ icon: Icon, title, body }) => (
          <div key={title} className="flex items-center gap-3">
            <Icon className="size-5" />
            <div>
              <p className="text-sm font-bold uppercase tracking-widecaps">{title}</p>
              <p className="text-sm text-zinc-500">{body}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="container-pad py-14">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="New collection"
            title="Heavy fabrics. Clean lines. City energy."
            body="A tight capsule of fleece, shells, denim, and technical staples built for repeated wear."
          />
          <Link
            href="/shop?sort=new"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widecaps"
          >
            View all
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <ProductRail products={newCollection} />
      </section>

      <section className="bg-zinc-100 py-14 dark:bg-zinc-950">
        <div className="container-pad grid min-w-0 gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative min-h-[520px] min-w-0 overflow-hidden bg-black">
            <Image
              src={heroProduct.images[1]}
              alt={heroProduct.name}
              fill
              className="object-cover opacity-90"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
          <div className="min-w-0 overflow-hidden bg-white p-6 dark:bg-black sm:p-10 lg:flex lg:flex-col lg:justify-center">
            <p className="text-xs font-bold uppercase tracking-widecaps text-zinc-500">
              Featured product
            </p>
            <h2 className="mt-4 break-words font-display text-4xl font-black uppercase leading-none sm:text-5xl">
              {heroProduct.name}
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-6 text-zinc-600 dark:text-zinc-300">
              {heroProduct.description}
            </p>
            <p className="mt-5 text-2xl font-black">{formatCurrency(heroProduct.salePrice ?? heroProduct.price)}</p>
            <div className="mt-7">
              <LinkButton href={`/product/${heroProduct.slug}`}>Shop the fit</LinkButton>
            </div>
          </div>
        </div>
      </section>

      <section className="container-pad py-14">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Best sellers"
            title="Pieces customers reorder"
            body="The high-conversion staples: heavyweight fleece, sharp denim, and refined cargo silhouettes."
          />
          <Link href="/shop?sort=bestsellers" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widecaps">
            Best sellers
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <ProductRail products={bestSellers} />
      </section>

      <section className="container-pad border-t border-black/10 py-14 dark:border-white/10">
        <SectionHeading
          eyebrow="Categories"
          title="Shop by uniform"
          body="Organized for fast product discovery across mobile and desktop shoppers."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/shop?category=${category.slug}`}
              className="group relative min-h-[360px] overflow-hidden bg-black"
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover opacity-75 transition duration-500 group-hover:scale-105"
                sizes="(min-width: 1024px) 25vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <h3 className="font-display text-3xl font-black uppercase">{category.name}</h3>
                <p className="mt-2 text-sm text-zinc-200">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-black py-14 text-white">
        <div className="container-pad grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <SectionHeading
            eyebrow="Brand story"
            title="Luxury streetwear without the noise"
            body="STREET WEAR is built around precise silhouettes, premium-feeling materials, and fast purchase flows. The brand experience is minimal, confident, and made for shoppers who know what they want."
          />
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ["95+", "Target Lighthouse performance"],
              ["14 days", "Easy return window"],
              ["8", "Capsule products ready to ship"]
            ].map(([value, label]) => (
              <div key={value} className="border border-white/10 p-5">
                <p className="font-display text-4xl font-black uppercase">{value}</p>
                <p className="mt-2 text-sm text-zinc-400">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-pad py-14">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Trending now"
            title="High-intent picks"
            body="Products surfaced for urgency, margin, and outfit-building potential."
          />
          <Link href="/shop?sort=rating" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widecaps">
            Trending
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <ProductRail products={trending} />
      </section>

      <section className="bg-zinc-100 py-14 dark:bg-zinc-950">
        <div className="container-pad">
          <SectionHeading
            eyebrow="Customer proof"
            title="Trust signals that sell"
            body="Real product confidence, clear delivery policies, and social proof close the loop."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <article key={testimonial.name} className="bg-white p-6 dark:bg-black">
                <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                  {testimonial.quote}
                </p>
                <p className="mt-5 font-semibold">{testimonial.name}</p>
                <p className="text-sm text-zinc-500">{testimonial.role}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-pad py-14">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <SectionHeading
              eyebrow="Instagram gallery"
              title="Styled in the wild"
              body="Campaign-ready imagery for product discovery, social validation, and editorial brand texture."
            />
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {instagramShots.map((image, index) => (
              <Image
                key={image}
                src={image}
                alt={`STREET WEAR social look ${index + 1}`}
                width={420}
                height={520}
                className="aspect-[4/5] w-full object-cover"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="container-pad pb-14">
        <div className="grid gap-6 bg-black p-6 text-white sm:p-10 lg:grid-cols-[1fr_420px] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-widecaps text-zinc-400">
              Newsletter
            </p>
            <h2 className="mt-3 font-display text-4xl font-black uppercase leading-none">
              Get first access to the next drop
            </h2>
          </div>
          <form className="flex gap-2">
            <label className="sr-only" htmlFor="home-email">
              Email
            </label>
            <input
              id="home-email"
              type="email"
              className="focus-ring min-w-0 flex-1 rounded-md border border-white/20 bg-white px-3 text-sm text-black"
            />
            <button className="focus-ring inline-flex size-11 items-center justify-center rounded-md bg-white text-black">
              <Mail className="size-4" />
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
