"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Wrap } from "./section";
import { DownloadTrialButton } from "./cta-link";
import { NAV_LINKS } from "./site-data";

function Brand({ small = false }: { small?: boolean }) {
  return (
    <a
      href="#top"
      aria-label="eGramSwaraj Automation, back to top"
      className="flex min-w-0 items-center gap-2.5 text-[15.5px] font-extrabold tracking-[-0.015em] text-navy sm:text-[17px]"
    >
      <Image
        src="/logo.png"
        alt="eGramSwaraj Automation"
        width={44}
        height={44}
        priority={!small}
        className={
          small
            ? "size-8 flex-none object-contain"
            : "size-10 flex-none object-contain lg:size-11"
        }
      />
    </a>
  );
}

function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 h-[58px] w-full border-b border-line bg-paper/95 backdrop-blur-sm sm:h-16">
      <Wrap className="flex h-full items-center gap-7">
        <Brand />

        <nav aria-label="Primary" className="ml-auto hidden xl:block">
          <ul className="flex list-none gap-[26px] p-0">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-[15px] font-medium text-subtle no-underline transition-colors hover:text-navy"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <DownloadTrialButton className="hidden flex-none px-4 py-2.5 text-sm xl:inline-flex" />

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            nativeButton
            render={
              <Button
                variant="outline"
                size="icon-lg"
                aria-label="Open menu"
                className="ml-auto size-[42px] flex-none border-line-strong bg-transparent text-navy xl:hidden"
              />
            }
          >
            <Menu className="size-5" />
          </SheetTrigger>
          <SheetContent side="right" className="bg-paper">
            <SheetTitle className="p-4 pb-0 text-navy">Menu</SheetTitle>
            <nav aria-label="Mobile" className="overflow-y-auto px-4 pb-6">
              <ul className="m-0 list-none p-0">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <SheetClose
                      nativeButton={false}
                      render={
                        <a
                          href={link.href}
                          className="block border-b border-line py-3.5 font-semibold text-navy no-underline"
                        />
                      }
                    >
                      {link.label}
                    </SheetClose>
                  </li>
                ))}
              </ul>
              <DownloadTrialButton className="mt-5 w-full" />
            </nav>
          </SheetContent>
        </Sheet>
      </Wrap>
    </header>
  );
}

export { SiteHeader, Brand };
