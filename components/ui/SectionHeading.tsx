import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  body,
  className
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow ? (
        <p className="mb-3 text-xs font-bold uppercase tracking-widecaps text-zinc-500">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-3xl font-black uppercase leading-none text-balance sm:text-5xl">
        {title}
      </h2>
      {body ? <p className="mt-4 text-sm leading-6 text-zinc-600 dark:text-zinc-300">{body}</p> : null}
    </div>
  );
}
