import { DownloadTrialButton } from "./cta-link";
import { Section, Wrap } from "./section";
import { EMAIL, EMAIL_HREF, PHONE, PHONE_HREF } from "./site-data";

const TRIAL_STEPS = [
  { title: "Download", detail: "Get the trial installer using the button below." },
  {
    title: "Install",
    detail: "Install it on the computer you use for reconciliation work.",
  },
  {
    title: "Test the workflow",
    detail: "Run it for your Gram Panchayats and watch each step happen.",
  },
];

/** Inverted navy band inviting the visitor to download the trial. */
function Trial() {
  return (
    <Section id="trial" className="bg-navy text-[#DCE3EC]">
      <Wrap className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
        <div>
          <h2 className="text-[clamp(1.6rem,3vw,2.3rem)] leading-[1.2] font-extrabold tracking-[-0.015em] text-white">
            Try the workflow before you decide.
          </h2>
          <p className="mt-4 max-w-[52ch] text-[#C3CDDA]">
            The trial version lets you install the software and run through the
            reconciliation workflow on your own system, so you can judge whether it fits
            your daily process.
          </p>

          <ol className="m-0 mt-8 list-none border-t border-white/15 p-0">
            {TRIAL_STEPS.map((step, index) => (
              <li
                key={step.title}
                className="flex gap-[18px] border-b border-white/15 py-4"
              >
                <span className="w-6 flex-none pt-px text-sm font-bold text-[#9FC2AB]">
                  {index + 1}
                </span>
                <span>
                  <strong className="block font-semibold text-white">{step.title}</strong>
                  <span className="text-[15px] text-[#AEB9C7]">{step.detail}</span>
                </span>
              </li>
            ))}
          </ol>

          <DownloadTrialButton tone="inverse" className="mt-8" />
        </div>

        <aside className="min-w-0 rounded-[10px] border border-white/20 p-[22px] md:p-7">
          <h3 className="text-[17px] leading-[1.2] font-bold text-white">
            Questions about the trial?
          </h3>
          <p className="mt-2.5 text-[15.5px] text-[#C3CDDA]">
            For help with installation, the full version, or whether the software suits
            your workflow, contact the developer directly.
          </p>
          <p className="mt-2.5 text-[15.5px] text-[#C3CDDA]">
            Call{" "}
            <a href={PHONE_HREF} className="font-semibold text-white">
              {PHONE}
            </a>
            <br />
            or email{" "}
            <a href={EMAIL_HREF} className="font-semibold break-words text-white">
              {EMAIL}
            </a>
          </p>
        </aside>
      </Wrap>
    </Section>
  );
}

export { Trial };
