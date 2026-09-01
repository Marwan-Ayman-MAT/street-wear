import { cn } from "@/lib/utils";

export function Badge({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-black/10 bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-widecaps text-black dark:border-white/15 dark:bg-black/80 dark:text-white",
        className
      )}
    >
      {children}
    </span>
  );
}
