import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { registerCustomer } from "@/app/actions/auth";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Register",
  description: "Create a STREET WEAR account."
};

export default function RegisterPage() {
  async function register(formData: FormData) {
    "use server";
    await registerCustomer(formData);
    redirect("/login?created=1");
  }

  return (
    <section className="container-pad grid min-h-[70vh] place-items-center py-12">
      <div className="w-full max-w-md border border-black/10 p-6 dark:border-white/10">
        <p className="text-xs font-bold uppercase tracking-widecaps text-zinc-500">Join</p>
        <h1 className="mt-3 font-display text-4xl font-black uppercase">Register</h1>
        <form action={register} className="mt-6 grid gap-4">
          <label>
            <span className="text-xs font-bold uppercase tracking-widecaps text-zinc-500">
              Name
            </span>
            <input
              name="name"
              required
              className="focus-ring mt-2 h-11 w-full rounded-md border border-black/10 bg-white px-3 text-sm dark:border-white/15 dark:bg-black"
            />
          </label>
          <label>
            <span className="text-xs font-bold uppercase tracking-widecaps text-zinc-500">
              Email
            </span>
            <input
              name="email"
              type="email"
              required
              className="focus-ring mt-2 h-11 w-full rounded-md border border-black/10 bg-white px-3 text-sm dark:border-white/15 dark:bg-black"
            />
          </label>
          <label>
            <span className="text-xs font-bold uppercase tracking-widecaps text-zinc-500">
              Password
            </span>
            <input
              name="password"
              type="password"
              required
              minLength={8}
              className="focus-ring mt-2 h-11 w-full rounded-md border border-black/10 bg-white px-3 text-sm dark:border-white/15 dark:bg-black"
            />
          </label>
          <Button type="submit" className="w-full">
            Create account
          </Button>
        </form>
        <p className="mt-5 text-sm text-zinc-500">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-black hover:text-zinc-500 dark:text-white">
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
}
