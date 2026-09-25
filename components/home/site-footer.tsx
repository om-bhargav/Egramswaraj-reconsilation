import Image from "next/image";

import { Wrap } from "./section";
import { FOOTER_LINKS } from "./site-data";

function SiteFooter() {
  return (
    <footer className="border-t border-line pt-10 pb-12 text-sm text-subtle">
      <Wrap>
        <div className="flex flex-wrap items-center justify-between gap-5">
          <a
            href="#top"
            className="flex min-w-0 items-center gap-2.5 text-[17px] font-extrabold tracking-[-0.015em] text-navy no-underline"
          >
            <Image
              src="/logo.png"
              alt=""
              width={32}
              height={32}
              className="size-8 flex-none object-contain"
            />
            <span className="truncate">eGramSwaraj Automation</span>
          </a>

          <ul className="m-0 flex list-none flex-wrap gap-x-[22px] gap-y-3 p-0">
            {FOOTER_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="no-underline transition-colors hover:text-navy"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-7 max-w-[80ch] border-t border-line pt-5 text-[12.5px] leading-[1.55] text-faint">
          Independent automation software. This software is not an official Government
          of India, Ministry of Panchayati Raj, NIC, or eGramSwaraj product unless
          otherwise expressly authorized. The name eGramSwaraj is used only to describe
          the workflow this software supports. Screens shown on this page use sample
          data.
        </p>
      </Wrap>
    </footer>
  );
}

export { SiteFooter };
