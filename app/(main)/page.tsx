import {
  CommonDifferences,
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
      </main>

  );
}
