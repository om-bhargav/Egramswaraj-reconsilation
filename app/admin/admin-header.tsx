"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ADMIN_LINKS = [
  { href: "/admin/dashboard", label: "Overview" },
  { href: "/admin/activities", label: "Activities" },
  { href: "/admin/requests", label: "Requests" },
] as const;

/** Bar shared by every admin page: brand, section links, sign out. */
function AdminHeader() {
  const pathname = usePathname();

  return (
    <header className="fixed w-full border-b border-line bg-surface z-100">
      <div className="mx-auto flex w-full max-w-[1400px] flex-wrap items-center justify-between gap-x-6 gap-y-3 px-5 py-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-2.5">
          <Image
            src="/logo.png"
            alt="eGramSwaraj Automation"
            width={36}
            height={36}
            priority
            className="size-9 flex-none object-contain"
          />
        </div>

        <nav className="order-3 -mx-1 flex min-w-0 flex-1 items-center gap-1 overflow-x-auto sm:order-none sm:mx-0 sm:justify-center">
          {ADMIN_LINKS.map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-sm font-medium whitespace-nowrap no-underline transition-colors",
                  active
                    ? "bg-green-soft text-green-dark"
                    : "text-subtle hover:bg-paper hover:text-navy",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <Button
          variant="outline"
          size="sm"
          className="border-line text-subtle"
          nativeButton={false}
          render={<Link href="/admin/login" />}
        >
          <LogOut className="size-3.5" />
          Sign out
        </Button>
      </div>
    </header>
  );
}

export { AdminHeader };
