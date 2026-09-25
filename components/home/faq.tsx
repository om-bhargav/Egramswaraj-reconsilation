"use client";

import type { ReactNode } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Section, SectionHeading, Wrap } from "./section";
import { EMAIL, EMAIL_HREF, PHONE, PHONE_HREF } from "./site-data";

const QUESTIONS: { question: string; answer: ReactNode }[] = [
  {
    question: "Is this an official eGramSwaraj or Government product?",
    answer:
      "No. eGramSwaraj Automation is independent software. eGramSwaraj itself is an application of the Ministry of Panchayati Raj, developed by NIC. This software is not made, owned or endorsed by either of them.",
  },
  {
    question: "Does the software do the whole reconciliation?",
    answer:
      "Yes. Once you select the Gram Panchayats, it logs in to each GP, finds each record, reconciles it, and closes the day book or month book, then moves on to the next GP.",
  },
  {
    question: "What is bank reconciliation in eGramSwaraj?",
    answer:
      "It is the step in the Accounting module where the Panchayat's recorded transactions are compared with the bank's records, so that any difference between the cash book balance and the bank balance is identified and explained.",
  },
  {
    question: "Can it close the day book as well as the month book?",
    answer:
      "Yes. It handles both as part of the run, so there is nothing extra to set.",
  },
  {
    question: "Can I try it before buying?",
    answer:
      "Yes. Download the trial version, install it, and test the workflow on your own system.",
  },
  {
    question: "What computer do I need?",
    answer:
      "It is a desktop application. For system requirements, call or email the developer before installing.",
  },
  {
    question: "How do I get the full version or support?",
    answer: (
      <>
        Contact Om Bhargav on <a href={PHONE_HREF}>{PHONE}</a> or at{" "}
        <a href={EMAIL_HREF} className="break-words">
          {EMAIL}
        </a>
        .
      </>
    ),
  },
];

/** Frequently asked questions, one disclosure per question. */
function Faq() {
  return (
    <Section id="faq">
      <Wrap>
        <SectionHeading title="Common questions." className="mb-8 md:mb-12" />

        <Accordion className="border-t border-line-strong">
          {QUESTIONS.map((item) => (
            <AccordionItem key={item.question} value={item.question} className="border-b border-line">
              <AccordionTrigger className="items-center gap-5 rounded-none py-5 text-[16.5px] font-bold text-navy hover:no-underline **:data-[slot=accordion-trigger-icon]:size-[18px] **:data-[slot=accordion-trigger-icon]:text-subtle">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="max-w-[68ch] pb-[22px] text-base text-subtle">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Wrap>
    </Section>
  );
}

export { Faq };
