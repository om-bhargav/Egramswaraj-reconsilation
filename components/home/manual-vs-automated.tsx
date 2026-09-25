import { RefreshCw } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Section, SectionHeading, Wrap } from "./section";

const MANUAL_STEPS = [
  "Log in to the GP",
  "Find each record",
  "Reconcile each record, one by one",
  "Close the day book or month book",
];

const AUTOMATED_STEPS: { label: string; who: "You" | "Software" }[] = [
  { label: "Select the GPs", who: "You" },
  { label: "Log in to each GP", who: "Software" },
  { label: "Find each record", who: "Software" },
  { label: "Reconcile each record", who: "Software" },
  { label: "Close the day book or month book", who: "Software" },
  { label: "Move on to the next GP", who: "Software" },
];

const itemClass =
  "flex items-center gap-3.5 border-t border-line py-[11px] text-[15.5px]";
const indexClass =
  "w-[22px] flex-none text-[13px] font-bold tabular-nums text-faint";

/** Side-by-side comparison of the manual and automated reconciliation loops. */
function ManualVsAutomated() {
  return (
    <Section id="overview">
      <Wrap>
        <SectionHeading title="Manual reconciliation takes time." className="mb-8 md:mb-12">
          <p>
            Done by hand, reconciliation means logging in to each Gram Panchayat
            separately, finding every record, reconciling them one at a time, and then
            closing the day book or month book. With several GPs to handle, the same
            steps repeat again and again.
          </p>
        </SectionHeading>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card className="min-w-0 gap-0 rounded-[10px] border border-line bg-transparent ring-0 p-[22px] shadow-none md:p-7">
            <h3 className="mb-1.5 text-[17px] font-bold text-navy">Manual workflow</h3>
            <p className="mb-5 text-sm text-subtle">
              Done by hand, for every Gram Panchayat.
            </p>
            <ol className="m-0 list-none p-0">
              {MANUAL_STEPS.map((step, index) => (
                <li key={step} className={cn(itemClass, "text-subtle")}>
                  <span className={indexClass}>{index + 1}</span>
                  {step}
                </li>
              ))}
              <li className={cn(itemClass, "font-semibold text-ink")}>
                <span className={indexClass}>
                  <RefreshCw aria-hidden="true" className="size-[18px] text-amber" />
                </span>
                Repeat for the next GP
              </li>
            </ol>
          </Card>

          <Card className="min-w-0 gap-0 rounded-[10px] border border-line-strong bg-surface ring-0 p-[22px] shadow-none md:p-7">
            <h3 className="mb-1.5 text-[17px] font-bold text-navy">
              With eGramSwaraj Automation
            </h3>
            <p className="mb-5 text-sm text-subtle">
              You only select the GPs. The software does every step after that.
            </p>
            <ol className="m-0 list-none p-0">
              {AUTOMATED_STEPS.map((step, index) => (
                <li key={step.label} className={cn(itemClass, "justify-between")}>
                  <span className="flex min-w-0 items-center gap-3.5">
                    <span className={indexClass}>{index + 1}</span>
                    {step.label}
                  </span>
                  <Badge
                    className={cn(
                      "h-auto flex-none rounded px-2 py-[3px] text-xs font-semibold",
                      step.who === "Software"
                        ? "bg-green-soft text-green-dark"
                        : "bg-[#EEF1F5] text-navy",
                    )}
                  >
                    {step.who}
                  </Badge>
                </li>
              ))}
            </ol>
          </Card>
        </div>

        <p className="mt-7 rounded-r-md border-l-[3px] border-green bg-green-soft px-[22px] py-[18px] font-semibold text-navy">
          Select the GPs and start. From login to book closing, every step is handled
          for you, one Gram Panchayat after another.
        </p>
      </Wrap>
    </Section>
  );
}

export { ManualVsAutomated };
