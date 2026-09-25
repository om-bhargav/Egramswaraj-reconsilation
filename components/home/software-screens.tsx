"use client";

import { Building2, Eye, Search, Settings } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Section, SectionHeading, Wrap } from "./section";
import {
  AppBody,
  AppButton,
  AppCheckbox,
  AppField,
  AppFigure,
  AppGoButton,
  AppMain,
  AppSettingsGroup,
  AppSidebar,
  AppSidebarItem,
  AppStatus,
  AppStatusBar,
  AppTable,
  AppTd,
  AppTh,
  AppToolbar,
  AppTr,
  AppWindow,
} from "./app-window";

const GP_ROWS = [
  { name: "Gram Panchayat A", block: "Block 1", selected: true, login: "Saved" },
  { name: "Gram Panchayat B", block: "Block 1", selected: false, login: "Saved" },
  { name: "Gram Panchayat C", block: "Block 1", selected: true, login: "Saved" },
  { name: "Gram Panchayat D", block: "Block 2", selected: true, login: "Saved" },
  { name: "Gram Panchayat E", block: "Block 2", selected: false, login: "Saved" },
  { name: "Gram Panchayat F", block: "Block 2", selected: false, login: "Saved" },
  { name: "Gram Panchayat G", block: "Block 3", selected: true, login: "Saved" },
  { name: "Gram Panchayat H", block: "Block 3", selected: false, login: "Not set" },
];

const GP_LOGINS = [
  { name: "Gram Panchayat A", username: "gp_a_sample", password: "••••••••", action: "Edit" },
  { name: "Gram Panchayat B", username: "gp_b_sample", password: "••••••••", action: "Edit" },
  { name: "Gram Panchayat C", username: "gp_c_sample", password: "••••••••", action: "Edit" },
  { name: "Gram Panchayat H", username: "Not set", password: "Not set", action: "Add", unset: true },
];

const gpIcon = <Building2 strokeWidth={1.4} />;
const settingsIcon = <Settings strokeWidth={1.4} />;

function GramPanchayatScreen() {
  return (
    <AppWindow
      title="eGramSwaraj Automation (Trial) &ndash; Gram Panchayats"
      label="Placeholder screen: list of Gram Panchayats with checkboxes. Four are selected, and a button runs the automation for the selected GPs."
    >
      <AppBody>
        <AppSidebar>
          <AppSidebarItem active icon={gpIcon}>
            Gram Panchayats
          </AppSidebarItem>
          <AppSidebarItem icon={settingsIcon}>Settings</AppSidebarItem>
        </AppSidebar>

        <AppMain>
          <AppToolbar>
            <AppField
              label="Search"
              placeholder="Search Gram Panchayat"
              icon={<Search strokeWidth={1.6} />}
              className="max-sm:col-span-full"
            />
            <AppGoButton className="max-sm:col-span-full">Run for 4 selected</AppGoButton>
          </AppToolbar>

          <div className="flex-1">
            <AppTable
              head={
                <>
                  <AppTh className="w-[34px] pr-0">
                    <AppCheckbox state="partial" />
                  </AppTh>
                  <AppTh>Gram Panchayat</AppTh>
                  <AppTh className="max-sm:hidden">Block</AppTh>
                  <AppTh>Login</AppTh>
                </>
              }
            >
              {GP_ROWS.map((row) => (
                <AppTr key={row.name} selected={row.selected}>
                  <AppTd className="w-[34px] pr-0">
                    <AppCheckbox state={row.selected ? "on" : "off"} />
                  </AppTd>
                  <AppTd>{row.name}</AppTd>
                  <AppTd className="max-sm:hidden">{row.block}</AppTd>
                  <AppTd>
                    <AppStatus tone={row.login === "Saved" ? "done" : "warn"} showIcon={false}>
                      {row.login}
                    </AppStatus>
                  </AppTd>
                </AppTr>
              ))}
            </AppTable>
          </div>

          <AppStatusBar>
            <span>4 of 8 Gram Panchayats selected</span>
            <span className="max-sm:hidden">1 GP needs login details</span>
          </AppStatusBar>
        </AppMain>
      </AppBody>
    </AppWindow>
  );
}

function SettingsScreen() {
  return (
    <AppWindow
      title="eGramSwaraj Automation (Trial) &ndash; Settings"
      label="Placeholder screen: settings with manager login details, and a table of Gram Panchayat logins."
    >
      <AppBody>
        <AppSidebar>
          <AppSidebarItem icon={gpIcon}>Gram Panchayats</AppSidebarItem>
          <AppSidebarItem active icon={settingsIcon}>
            Settings
          </AppSidebarItem>
        </AppSidebar>

        <AppMain>
          <AppSettingsGroup title="Manager (MGR) login">
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              <AppField label="Username" value="mgr_sample" />
              <AppField
                label="Password"
                value="••••••••••"
                icon={<Eye strokeWidth={1.6} />}
              />
            </div>
          </AppSettingsGroup>

          <AppSettingsGroup
            title="Gram Panchayat logins"
            action={<AppButton>+ Add GP login</AppButton>}
          >
            <div className="overflow-hidden rounded-[3px] border border-win-line">
              <AppTable
                head={
                  <>
                    <AppTh>Gram Panchayat</AppTh>
                    <AppTh className="max-[400px]:hidden">Username</AppTh>
                    <AppTh>Password</AppTh>
                    <AppTh />
                  </>
                }
              >
                {GP_LOGINS.map((row) => (
                  <AppTr key={row.name} selected={row.unset}>
                    <AppTd>{row.name}</AppTd>
                    <AppTd dim={row.unset} className="max-[400px]:hidden">
                      {row.username}
                    </AppTd>
                    <AppTd dim={row.unset}>{row.password}</AppTd>
                    <AppTd className="text-right font-semibold text-win-blue">
                      {row.action}
                    </AppTd>
                  </AppTr>
                ))}
              </AppTable>
            </div>
          </AppSettingsGroup>

          <div className="mt-auto flex justify-end gap-2 bg-win-panel p-3">
            <AppButton>Cancel</AppButton>
            <AppGoButton>Save settings</AppGoButton>
          </div>
        </AppMain>
      </AppBody>
    </AppWindow>
  );
}

const SCREENS = [
  {
    value: "gp",
    tab: "Gram Panchayats",
    title: "Pick the GPs and run",
    body: "Every Gram Panchayat is listed in one place. Tick the ones you want and start the run. Nothing else needs to be chosen.",
    screen: <GramPanchayatScreen />,
  },
  {
    value: "settings",
    tab: "Settings",
    title: "Save login details once",
    body: "Add the manager (MGR) login and the login for each Gram Panchayat. The software uses these to sign in to each GP during a run, so you don't have to type them every time.",
    screen: <SettingsScreen />,
  },
];

/**
 * Tabbed tour of the two screens that do most of the work. These are
 * placeholder renderings with sample data, not real screenshots.
 */
function SoftwareScreens() {
  return (
    <Section alt id="screens">
      <Wrap>
        <SectionHeading title="Inside the software." className="mb-8 md:mb-12">
          <p>
            Two screens do most of the work: one to pick the Gram Panchayats and start
            the run, and one to store the login details the software uses.
          </p>
        </SectionHeading>

        <Tabs defaultValue="gp">
          <TabsList
            variant="line"
            aria-label="Software screens"
            className="h-auto w-full justify-start overflow-x-auto rounded-none border-b border-line-strong p-0"
          >
            {SCREENS.map((screen) => (
              <TabsTrigger
                key={screen.value}
                value={screen.value}
                className="h-auto flex-none px-4 py-3 text-[15px] font-semibold text-subtle hover:text-navy data-active:text-navy after:bottom-[-1px]! after:bg-green!"
              >
                {screen.tab}
              </TabsTrigger>
            ))}
          </TabsList>

          {SCREENS.map((screen) => (
            <TabsContent key={screen.value} value={screen.value} className="mt-6 md:mt-8">
              <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,9fr)] lg:gap-12">
                <div>
                  <h3 className="text-xl leading-[1.2] font-bold tracking-[-0.015em] text-navy">
                    {screen.title}
                  </h3>
                  <p className="mt-2.5 text-subtle">{screen.body}</p>
                </div>
                <div>
                  <AppFigure>{screen.screen}</AppFigure>
                  <p className="mt-3 text-[13px] text-faint max-md:text-left md:text-right">
                    Placeholder screens with sample data
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
