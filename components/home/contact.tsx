import { CtaLink } from "./cta-link";
import { Section, SectionHeading, Wrap } from "./section";
import { EMAIL, EMAIL_HREF, PHONE, PHONE_HREF } from "./site-data";

const DETAILS: { term: string; value: React.ReactNode; wrap?: boolean }[] = [
  { term: "Developer", value: "Om Bhargav" },
  { term: "Phone", value: <a href={PHONE_HREF}>{PHONE}</a> },
  { term: "Email", value: <a href={EMAIL_HREF}>{EMAIL}</a>, wrap: true },
  { term: "Funded by", value: "Kedarnath Rao" },
];

/** Contact details plus the call and email CTAs. */
function Contact() {
  return (
    <Section alt id="contact">
      <Wrap className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <SectionHeading title="Contact">
          <p>
            Reach out for trial support, the full version, or to discuss how the
            software fits your reconciliation work.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <CtaLink href={PHONE_HREF}>Call {PHONE}</CtaLink>
            <CtaLink tone="secondary" href={EMAIL_HREF}>
              Send email
            </CtaLink>
          </div>
        </SectionHeading>

        <dl className="m-0 rounded-[10px] border border-line bg-surface">
          {DETAILS.map((detail) => (
            <div
              key={detail.term}
              className="grid grid-cols-1 gap-1 border-b border-line px-5 py-[18px] last:border-b-0 sm:grid-cols-[140px_minmax(0,1fr)] sm:gap-4 sm:px-7 sm:py-[22px]"
            >
              <dt className="pt-0.5 text-sm font-medium text-subtle">{detail.term}</dt>
              <dd
                className={`m-0 min-w-0 font-semibold text-navy ${
                  detail.wrap ? "break-words" : ""
                } [&_a]:border-b [&_a]:border-line-strong [&_a]:no-underline [&_a]:hover:border-green [&_a]:hover:text-green`}
              >
                {detail.value}
              </dd>
            </div>
          ))}
        </dl>
      </Wrap>
    </Section>
  );
}

export { Contact };
