import { LinkButton } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="container-pad grid min-h-[60vh] place-items-center py-16 text-center">
      <div>
        <p className="text-xs font-bold uppercase tracking-widecaps text-zinc-500">404</p>
        <h1 className="mt-3 font-display text-5xl font-black uppercase">Page not found</h1>
        <p className="mt-4 text-sm text-zinc-500">
          The product or page you requested is no longer available.
        </p>
        <LinkButton href="/shop" className="mt-6">
          Shop products
        </LinkButton>
      </div>
    </section>
  );
}
