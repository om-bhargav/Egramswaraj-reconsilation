import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Section, SectionHeading, Wrap } from "./section";

const FACTS = [
  "Launched on National Panchayati Raj Day, 24 April 2020.",
  "Used by more than 2.7 lakh Panchayati Raj Institutions across 28 States and 6 Union Territories.",
  "Accounting follows the Model Accounting System (MAS) introduced by the Ministry with the C&AG, using voucher-based, digitally signed transactions.",
  "Cash book and bank account reconciliation are done from the recorded transactions and book closings, and bank balances are typically reconciled with the pass book every month.",
];

const MODULES = [
  {
    name: "Accounting",
    description:
      "Scheme mapping, vendor and employee details, vouchers, cash book, and bank account reconciliation.",
    focus: true,
  },
  {
    name: "Panchayat Profile",
    description: "General profile, elected members, committees and employees.",
  },
  {
    name: "Planning",
    description: "Works approved in the Gram Sabha, entered as activities.",
  },
  {
    name: "Progress Reporting",
    description: "Physical and financial progress of planned activities.",
  },
  {
    name: "Asset Directory",
    description: "Status of Panchayat assets as they change.",
  },
  {
    name: "User Management",
    description: "User accounts and access levels.",
  },
];

/** Positions bank reconciliation within the six eGramSwaraj modules. */
function EgramswarajContext() {
  return (
    <Section alt id="egramswaraj">
      <Wrap className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
        <SectionHeading title="Where bank reconciliation fits in eGramSwaraj.">
          <p>
            eGramSwaraj is the Ministry of Panchayati Raj&apos;s work-based accounting
            application for Panchayati Raj Institutions. Bank reconciliation is part of
            its Accounting module, and it is the part this software is built to help
            with.
          </p>
          <ul className="m-0 mt-7 list-none p-0">
            {FACTS.map((fact) => (
              <li
                key={fact}
                className="border-t border-line py-3.5 text-[15.5px] text-ink last:border-b last:border-line"
              >
                {fact}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[13px] text-faint">
            Source:{" "}
            <a
              href="https://panchayat.gov.in/en/e-gramswaraj/"
              target="_blank"
              rel="noopener"
              className="text-subtle underline-offset-2 hover:underline"
            >
              Ministry of Panchayati Raj, eGramSwaraj page
            </a>
          </p>
        </SectionHeading>

        <div>
          <p className="mb-3.5 text-sm font-semibold text-subtle">
            The six modules of eGramSwaraj
          </p>
          <ul className="m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2">
            {MODULES.map((module) => (
              <li
                key={module.name}
                className={cn(
                  "min-w-0 rounded-lg border border-line bg-paper px-[18px] py-4",
                  module.focus &&
                    "border-[1.5px] border-green bg-surface sm:col-span-full",
                )}
              >
                <strong className="block text-[15.5px] text-navy">{module.name}</strong>
                <span className="mt-1 block text-sm leading-[1.5] text-subtle">
                  {module.description}
                </span>
                {module.focus ? (
                  <Badge className="mt-2.5 h-auto rounded bg-green-soft px-2 py-[3px] text-[12.5px] font-bold text-green-dark">
                    This software works here
                  </Badge>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </Wrap>
    </Section>
  );
}

export { EgramswarajContext };
