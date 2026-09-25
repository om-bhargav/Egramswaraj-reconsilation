import { Quote } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Section, SectionHeading, Wrap } from "./section";
import { FEEDBACK_HREF } from "./site-data";

const TESTIMONIALS = [
  {
    name: "Rajesh Kumar",
    quote:
      "Bank reconciliation used to take hours every month. This software has made the process much faster and reduced the amount of manual checking.",
  },
  {
    name: "Sandeep Sharma",
    quote:
      "The software is simple to use and makes it much easier to identify unmatched transactions. It has saved us a lot of time.",
  },
  {
    name: "Priya Verma",
    quote:
      "A very useful automation tool for handling large numbers of bank transactions. It makes reconciliation faster and more organized.",
  },
  {
    name: "Amit Singh",
    quote:
      "We were spending a lot of time comparing bank statements with our records. This software has made the entire reconciliation process much more efficient.",
  },
  {
    name: "Manish Kumar",
    quote:
      "Clean, straightforward and practical. It helps us quickly identify unmatched entries and complete our reconciliation work with less manual effort.",
  },
];

function QuoteCard({ name, quote }: { name: string; quote: string }) {
  return (
    <Card className="flex w-[280px] flex-none flex-col gap-0 rounded-[10px] border border-line bg-surface p-[22px] whitespace-normal ring-0 sm:w-[340px] sm:p-7">
      <Quote aria-hidden="true" className="size-[26px] text-green opacity-60" />
      <blockquote className="mt-3.5 flex-1 text-[16.5px] leading-[1.6] text-ink">
        {quote}
      </blockquote>
      <div className="mt-6 border-t border-line pt-[18px] text-sm text-subtle">
        <strong className="block text-[15px] text-navy">{name}</strong>
      </div>
    </Card>
  );
}

/**
 * Continuously scrolling testimonial strip. The list is rendered twice so the
 * -50% translation loops seamlessly; the copy is hidden from assistive tech.
 */
function Testimonials() {
  return (
    <Section alt id="testimonials" className="overflow-hidden">
      <Wrap>
        <SectionHeading title="From people using it." className="mb-8 md:mb-12">
          <p>What users say about using it for their reconciliation work.</p>
        </SectionHeading>
      </Wrap>

      <div
        aria-label="User feedback"
        className="group relative flex w-full overflow-hidden py-1"
      >
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1 ? "true" : undefined}
            className="flex flex-none gap-5 pr-5 motion-safe:animate-marquee motion-safe:group-hover:[animation-play-state:paused]"
          >
            {TESTIMONIALS.map((item) => (
              <QuoteCard key={item.name} {...item} />
            ))}
          </div>
        ))}
      </div>

      <Wrap>
        <p className="mt-7 text-[15px] text-subtle">
          Used the trial?{" "}
          <a
            href={FEEDBACK_HREF}
            className="font-semibold text-green-dark underline-offset-2 hover:underline"
          >
            Send your feedback
          </a>
          .
        </p>
      </Wrap>
    </Section>
  );
}

export { Testimonials };
