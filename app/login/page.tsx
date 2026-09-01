import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { signIn } from "@/lib/auth";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to your STREET WEAR account."
};

export default function LoginPage() {
  async function login(formData: FormData) {
    "use server";
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false
    });
    redirect("/dashboard");
  }

  return (
    <section className="container-pad grid min-h-[70vh] place-items-center py-12">
      <div className="w-full max-w-md border border-black/10 p-6 dark:border-white/10">
        <p className="text-xs font-bold uppercase tracking-widecaps text-zinc-500">Account</p>
        <h1 className="mt-3 font-display text-4xl font-black uppercase">Login</h1>
        <form action={login} className="mt-6 grid gap-4">
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
            Sign in
          </Button>
        </form>
        <div className="mt-5 flex justify-between gap-4 text-sm">
          <Link href="/register" className="font-semibold hover:text-zinc-500">
            Create account
          </Link>
          <Link href="/forgot-password" className="font-semibold hover:text-zinc-500">
            Forgot password
          </Link>
        </div>
      </div>
    </section>
  );
}
