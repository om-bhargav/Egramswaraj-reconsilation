import { AdminHeader } from '../admin-header';

export default function Loading() {
  return (

      <div className="mx-auto w-full max-w-[1400px] px-5 py-8 sm:px-6 sm:py-10">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="h-7 w-28 animate-pulse rounded-md bg-surface" />

            <div className="h-4 w-80 max-w-full animate-pulse rounded bg-surface" />
          </div>

          <div className="flex gap-1">
            <div className="h-8 w-12 animate-pulse rounded-lg bg-surface" />
            <div className="h-8 w-12 animate-pulse rounded-lg bg-surface" />
            <div className="h-8 w-16 animate-pulse rounded-lg bg-surface" />
          </div>
        </div>

        {/* Requests */}
        <div className="mt-6 grid max-w-[980px] gap-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="rounded-xl border border-line bg-surface p-5 sm:p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="h-5 w-40 animate-pulse rounded bg-paper" />

                  <div className="mt-3 flex flex-wrap gap-4">
                    <div className="h-4 w-48 animate-pulse rounded bg-paper" />
                    <div className="h-4 w-28 animate-pulse rounded bg-paper" />
                  </div>
                </div>

                <div className="hidden space-y-2 sm:block">
                  <div className="ml-auto h-3 w-20 animate-pulse rounded bg-paper" />
                  <div className="ml-auto h-3 w-32 animate-pulse rounded bg-paper" />
                </div>
              </div>

              <div className="mt-4 border-t border-line pt-4">
                <div className="h-4 w-full animate-pulse rounded bg-paper" />
                <div className="mt-2 h-4 w-4/5 animate-pulse rounded bg-paper" />
              </div>

              <div className="mt-4 flex items-center justify-between gap-3">
                <div className="h-14 w-40 animate-pulse rounded-lg bg-paper" />

                <div className="h-9 w-32 animate-pulse rounded-md bg-paper" />
              </div>
            </div>
          ))}
        </div>
      </div>
  );
}