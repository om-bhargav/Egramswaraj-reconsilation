import { CtaLink, DownloadTrialButton } from "./cta-link";
import { HeroAppPreview } from "./hero-app-preview";
import { Wrap } from "./section";

function Hero() {
  return (
    <section id="top" className="scroll-mt-[72px] py-10 pb-14 lg:pt-[72px] lg:pb-[88px]">
      <Wrap className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
        <div>
          <p className="mb-[18px] text-[13px] font-bold tracking-[0.08em] text-green">
            BANK RECONCILIATION AUTOMATION
          </p>
          <h1 className="max-w-[18ch] text-[clamp(2rem,4.2vw,3.15rem)] leading-[1.1] font-extrabold tracking-[-0.025em] text-navy lg:max-w-[15ch]">
            Spend less time reconciling. Get more work done.
          </h1>
          <p className="mt-5 max-w-[36ch] text-[clamp(17px,2vw,19px)] leading-[1.45] font-semibold text-ink">
            Automate repetitive bank reconciliation tasks around your eGramSwaraj
            accounting workflow.
          </p>
          <p className="mt-4 max-w-[48ch] text-subtle">
            For every Gram Panchayat in your list, the software logs in, finds each
            record, reconciles it, and closes the day book or month book. The trial
            version lets you see it work before deciding whether it fits your daily
            process.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <DownloadTrialButton />
            <CtaLink tone="secondary" href="#how-it-works">
              See How It Works
            </CtaLink>
          </div>

          <p className="mt-5 flex flex-col gap-0.5 text-sm text-subtle">
            <strong className="font-semibold text-ink">Trial version available</strong>
            <span>Download &bull; Install &bull; Test the workflow</span>
          </p>
        </div>

        <HeroAppPreview />
      </Wrap>
    </section>
  );
}

export { Hero };
