import {
  Columns2,
  FileCheck2,
  ListOrdered,
  Lock,
  Monitor,
  Search,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Section, SectionHeading, Wrap } from "./section";

const FEATURES: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Lock,
    title: "Automatic login",
    body: "Logs in to each Gram Panchayat one after another, without you signing in and out.",
  },
  {
    icon: Search,
    title: "Finds every record",
    body: "Locates each record that needs reconciling, so nothing has to be searched for by hand.",
  },
  {
    icon: Columns2,
    title: "Record-by-record reconciliation",
    body: "Reconciles each record individually, following the same steps you would take manually.",
  },
  {
    icon: FileCheck2,
    title: "Day book and month book closing",
    body: "Closes the day book or the month book once the records are reconciled.",
  },
  {
    icon: ListOrdered,
    title: "Every GP in one run",
    body: "Works through your whole list of Gram Panchayats, one after another, instead of you repeating each step per GP.",
  },
  {
    icon: Monitor,
    title: "Desktop workflow",
    body: "Designed as a practical desktop automation utility for users who work with accounting and reconciliation tasks.",
  },
];

/** Feature grid, drawn as a bordered lattice rather than separate cards. */
function Features() {
  return (
    <Section id="features">
      <Wrap>
        <SectionHeading title="Built around the work you already do." className="mb-8 md:mb-12" />

        <div className="grid grid-cols-1 border-t border-line-strong border-l-line sm:grid-cols-2 sm:border-l lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="min-w-0 border-r border-b border-line px-5 py-6 sm:px-7 sm:py-8"
            >
              <Icon strokeWidth={1.6} aria-hidden="true" className="size-6 text-green" />
              <h3 className="mt-[18px] text-[17px] leading-[1.2] font-bold tracking-[-0.015em] text-navy">
                {title}
              </h3>
              <p className="mt-2 text-[15.5px] text-subtle">{body}</p>
            </div>
          ))}
        </div>
      </Wrap>
    </Section>
  );
}

export { Features };
