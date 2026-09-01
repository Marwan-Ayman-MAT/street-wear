import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { requestPasswordReset } from "@/app/actions/auth";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Request a STREET WEAR password reset email."
};

export default function ForgotPasswordPage() {
  async function reset(formData: FormData) {
    "use server";
    await requestPasswordReset(formData);
    redirect("/login?reset=requested");
  }

  return (
    <section className="container-pad grid min-h-[70vh] place-items-center py-12">
      <div className="w-full max-w-md border border-black/10 p-6 dark:border-white/10">
        <p className="text-xs font-bold uppercase tracking-widecaps text-zinc-500">Reset</p>
        <h1 className="mt-3 font-display text-4xl font-black uppercase">Forgot Password</h1>
        <p className="mt-4 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
          Enter the email connected to your account and we will route a secure reset request.
        </p>
        <form action={reset} className="mt-6 grid gap-4">
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
          <Button type="submit" className="w-full">
            Send reset link
          </Button>
        </form>
        <Link href="/login" className="mt-5 inline-block text-sm font-semibold hover:text-zinc-500">
          Back to login
        </Link>
      </div>
    </section>
  );
}
