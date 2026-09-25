import {
  CommonDifferences,
  Contact,
  EgramswarajContext,
  Faq,
  Features,
  Hero,
  HighlightStrip,
  HowItWorks,
  ManualVsAutomated,
  SiteFooter,
  SiteHeader,
  SoftwareScreens,
  Testimonials,
  Trial,
} from "@/components/home";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col overflow-x-hidden bg-paper text-[16px] leading-[1.6] text-ink sm:text-[17px]">
      <SiteHeader />

      <main id="main" className="flex-1 mt-8 md:mt-16">
        <Hero />
        <HighlightStrip />
        <ManualVsAutomated />
        <EgramswarajContext />
        <HowItWorks />
        <SoftwareScreens />
        <CommonDifferences />
        <Features />
        <Testimonials />
        <Trial />
        <Faq />
        <Contact />
      </main>

      <SiteFooter />
    </div>
  );
}
