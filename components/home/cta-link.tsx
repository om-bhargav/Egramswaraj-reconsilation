import type { ReactNode } from "react";
import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DOWNLOAD_LINK } from "./site-data";

type CtaLinkProps = {
  href: string;
  tone?: "primary" | "secondary" | "inverse";
  className?: string;
  children: ReactNode;
};

/**
 * The page-level call to action. Sized larger than the default shadcn button
 * so it keeps the marketing proportions of the original design.
 */
function CtaLink({ tone = "primary", className, href, children }: CtaLinkProps) {
  return (
    <Button
      size="lg"
      variant={tone === "secondary" ? "outline" : "default"}
      className={cn(
        "h-auto gap-2 rounded-lg px-5 py-[13px] text-[15px] leading-[1.2] font-semibold max-sm:w-full",
        tone === "primary" && "bg-green text-white hover:bg-green-dark",
        tone === "secondary" &&
          "border-line-strong bg-surface text-navy hover:border-navy hover:bg-surface hover:text-navy",
        tone === "inverse" && "bg-white text-navy hover:bg-green-soft",
        className,
      )}
      nativeButton={false}
      render={<a href={href} />}
    >
      {children}
    </Button>
  );
}

/** Download CTA with its icon — used in the nav, hero, trial band and footer. */
function DownloadTrialButton({
  tone = "primary",
  className,
  children = "Download Trial",
}: Partial<Omit<CtaLinkProps, "href">>) {
  return (
    <CtaLink tone={tone} href={DOWNLOAD_LINK} className={className}>
      <Download aria-hidden="true" className="size-4" />
      {children}
    </CtaLink>
  );
}

export { CtaLink, DownloadTrialButton };
