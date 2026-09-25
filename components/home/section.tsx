import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** Centred content column — the old `.wrap` rule. */
function Wrap({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[1400px] px-5 sm:px-6", className)}
      {...props}
    />
  );
}

/**
 * A page section. `alt` gives the tinted, rule-bounded band that alternates
 * down the page (the old `.section.alt`).
 */
function Section({
  className,
  alt = false,
  ...props
}: ComponentProps<"section"> & { alt?: boolean }) {
  return (
    <section
      className={cn(
        "scroll-mt-[72px] py-16 md:py-24",
        alt && "border-y border-line bg-surface",
        className,
      )}
      {...props}
    />
  );
}

/** Section eyebrow + heading + intro paragraph — the old `.sec-head`. */
function SectionHeading({
  title,
  children,
  className,
  ...props
}: Omit<ComponentProps<"div">, "title"> & { title: string }) {
  return (
    <div className={cn("max-w-[660px]", className)} {...props}>
      <h2 className="text-[clamp(1.6rem,3vw,2.3rem)] leading-[1.2] font-extrabold tracking-[-0.015em] text-navy">
        {title}
      </h2>
      {children ? (
        <div className="mt-4 text-subtle [&_p+p]:mt-4">{children}</div>
      ) : null}
    </div>
  );
}

export { Wrap, Section, SectionHeading };
