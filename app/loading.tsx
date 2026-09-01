export default function Loading() {
  return (
    <div className="container-pad grid min-h-[60vh] place-items-center py-16">
      <div className="w-full max-w-4xl animate-pulse">
        <div className="h-8 w-40 bg-zinc-200 dark:bg-zinc-900" />
        <div className="mt-4 h-20 w-full bg-zinc-200 dark:bg-zinc-900" />
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="h-72 bg-zinc-200 dark:bg-zinc-900" />
          <div className="h-72 bg-zinc-200 dark:bg-zinc-900" />
          <div className="h-72 bg-zinc-200 dark:bg-zinc-900" />
        </div>
      </div>
    </div>
  );
}
