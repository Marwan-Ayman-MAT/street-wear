import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200",
  secondary:
    "border border-black bg-white text-black hover:bg-black hover:text-white dark:border-white dark:bg-black dark:text-white dark:hover:bg-white dark:hover:text-black",
  ghost:
    "bg-transparent text-black hover:bg-zinc-100 dark:text-white dark:hover:bg-zinc-900",
  muted:
    "bg-zinc-100 text-black hover:bg-zinc-200 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800"
};

const sizes = {
  sm: "h-9 px-3 text-xs",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-sm",
  icon: "size-10 p-0"
};

type BaseProps = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  children: ReactNode;
  className?: string;
};

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement>;
type LinkButtonProps = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "focus-ring inline-flex items-center justify-center gap-2 rounded-md font-semibold uppercase tracking-widecaps transition",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
}

export function LinkButton({
  variant = "primary",
  size = "md",
  className,
  href,
  ...props
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "focus-ring inline-flex items-center justify-center gap-2 rounded-md font-semibold uppercase tracking-widecaps transition",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
}
