import { FileCheck2, ListChecks, Lock, SearchCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Section, SectionHeading, Wrap } from "./section";

const STEPS: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: ListChecks,
    title: "Select",
    body: "Tick the Gram Panchayats you want to reconcile. That is the only thing you need to do.",
  },
  {
    icon: Lock,
    title: "Log in",
    body: "The software logs in to each GP in turn, so you don't have to sign in and out yourself.",
  },
  {
    icon: SearchCheck,
    title: "Reconcile",
    body: "It finds each record and reconciles it, one by one, the same way you would by hand.",
  },
  {
    icon: FileCheck2,
    title: "Close the book",
    body: "It closes the day book or month book, then moves on to the next GP in your list.",
  },
];

/** Four-step walkthrough of a run, connected by a rule on wide screens. */
function HowItWorks() {
  return (
    <Section id="how-it-works">
      <Wrap>
        <SectionHeading title="A simpler reconciliation workflow." className="mb-8 md:mb-12" />

        <ol className="relative m-0 grid list-none grid-cols-1 gap-x-8 p-0 sm:grid-cols-2 sm:gap-y-11 lg:grid-cols-4 lg:before:absolute lg:before:top-[22px] lg:before:right-[12%] lg:before:left-11 lg:before:h-px lg:before:bg-line-strong lg:before:content-['']">
          {STEPS.map(({ icon: Icon, title, body }, index) => (
            <li
              key={title}
              className="relative min-w-0 grid grid-cols-[44px_minmax(0,1fr)] gap-x-[18px] pb-7 before:absolute before:top-11 before:bottom-0 before:left-[22px] before:w-px before:bg-line-strong before:content-[''] last:before:hidden sm:block sm:pb-0 sm:before:hidden"
            >
              <span className="relative row-span-3 flex size-11 items-center justify-center rounded-lg border border-line-strong bg-surface text-green">
                <Icon strokeWidth={1.6} aria-hidden="true" className="size-[22px]" />
              </span>
              <span className="block text-[13px] font-bold text-faint sm:mt-[22px]">
                Step {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-1 text-[19px] leading-[1.2] font-bold tracking-[-0.015em] text-navy">
                {title}
              </h3>
              <p className="mt-2 text-[15.5px] text-subtle">{body}</p>
            </li>
          ))}
        </ol>
      </Wrap>
    </Section>
  );
}

export { HowItWorks };
