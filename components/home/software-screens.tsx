"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Section, SectionHeading, Wrap } from "./section";

const SCREENS = [
  {
    value: "gp",
    tab: "Gram Panchayats",
    title: "Pick the GPs and run",
    body: "Every Gram Panchayat is listed in one place. Tick the ones you want and start the run. Nothing else needs to be chosen.",
    image: "/1.png",
  },
  {
    value: "settings",
    tab: "Settings",
    title: "Save login details once",
    body: "Add the manager (MGR) login and the login for each Gram Panchayat. The software uses these to sign in to each GP during a run, so you don't have to type them every time.",
    image: "/2.png",
  },
];

function SoftwareScreens() {
  return (
    <Section alt id="screens">
      <Wrap>
        <SectionHeading
          title="Inside the software."
          className="mb-8 md:mb-12"
        >
          <p>
            Two screens do most of the work: one to pick the Gram Panchayats
            and start the run, and one to store the login details the software
            uses.
          </p>
        </SectionHeading>

        <Tabs defaultValue="gp">
          <TabsList
            variant="line"
            aria-label="Software screens"
            className="h-auto w-full justify-start overflow-x-auto rounded-none border-b border-line-strong p-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {SCREENS.map((screen) => (
              <TabsTrigger
                key={screen.value}
                value={screen.value}
                className="h-auto flex-none px-4 py-1 text-[15px] font-semibold text-subtle hover:text-navy data-active:text-navy after:bottom-0! after:bg-green!"
              >
                {screen.tab}
              </TabsTrigger>
            ))}
          </TabsList>

          {SCREENS.map((screen) => (
            <TabsContent
              key={screen.value}
              value={screen.value}
              className="mt-6 md:mt-8"
            >
              <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,9fr)] lg:gap-12">
                <div>
                  <h3 className="text-xl leading-[1.2] font-bold tracking-[-0.015em] text-navy">
                    {screen.title}
                  </h3>

                  <p className="mt-2.5 text-subtle">
                    {screen.body}
                  </p>
                </div>

                <div>
                  <div className="overflow-hidden rounded-lg">
                    <img
                      src={screen.image}
                      alt={screen.tab}
                      className="block h-auto w-full"
                    />
                  </div>

                  <p className="mt-3 text-[13px] text-faint max-md:text-left md:text-right">
                    Software screen preview
                  </p>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </Wrap>
    </Section>
  );
}

export { SoftwareScreens };