"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Eye, FlaskConical, Users } from "lucide-react";

import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AdminHeader } from "../admin-header";

const STATS = [
  {
    label: "Trial users",
    value: "128",
    detail: "Inside the 48 hour window",
    icon: FlaskConical,
  },
  {
    label: "Purchased users",
    value: "64",
    detail: "Paid, unlimited access",
    icon: BadgeCheck,
  },
  {
    label: "Total users",
    value: "192",
    detail: "Machines that ran the app",
    icon: Users,
  },
  {
    label: "Total visits",
    value: "4,318",
    detail: "Website visits so far",
    icon: Eye,
  },
];

/** Dummy activity rows — replace with the Records table once the DB is wired up. */
const RECORDS = [
  { mac: "A4:83:E7:2B:91:0C", purchased: true, firstUsed: "24 Sep 2026, 10:42 AM" },
  { mac: "F0:18:98:4D:22:B7", purchased: false, firstUsed: "24 Sep 2026, 09:15 AM" },
  { mac: "3C:22:FB:07:E5:AA", purchased: false, firstUsed: "23 Sep 2026, 06:58 PM" },
  { mac: "8C:85:90:11:74:1E", purchased: true, firstUsed: "23 Sep 2026, 02:30 PM" },
  { mac: "D8:3B:BF:6A:C3:59", purchased: false, firstUsed: "22 Sep 2026, 11:05 AM" },
  { mac: "60:F2:62:9C:08:3D", purchased: true, firstUsed: "21 Sep 2026, 04:47 PM" },
];

export default function AdminDashboardPage() {
  const [records, setRecords] = useState(RECORDS);

  function togglePurchased(mac: string, purchased: boolean) {
    // TODO: persist the change to the Records table.
    setRecords((current) =>
      current.map((record) =>
        record.mac === mac ? { ...record, purchased } : record,
      ),
    );
  }

  return (
      <div className="mx-auto w-full max-w-[1400px] px-5 py-8 sm:px-6 sm:py-10">
        <h1 className="text-[clamp(1.4rem,2.4vw,1.9rem)] leading-tight font-extrabold tracking-[-0.015em] text-navy">
          Overview
        </h1>
        <p className="mt-1.5 text-sm text-subtle">
          Licence and usage figures for eGramSwaraj Automation.
        </p>

        <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-line bg-surface p-5"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-[13px] font-semibold tracking-[0.02em] text-subtle uppercase">
                  {stat.label}
                </span>
                <span className="flex size-8 flex-none items-center justify-center rounded-lg bg-green-soft text-green">
                  <stat.icon className="size-4" />
                </span>
              </div>
              <p className="mt-3 text-[2rem] leading-none font-extrabold tracking-[-0.02em] text-navy">
                {stat.value}
              </p>
              <p className="mt-2 text-[13px] text-faint">{stat.detail}</p>
            </div>
          ))}
        </section>

        <section className="mt-8 overflow-hidden rounded-xl border border-line bg-surface">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-5 py-4">
            <div>
              <h2 className="text-base font-bold tracking-[-0.01em] text-navy">
                Latest activity
              </h2>
              <p className="mt-0.5 text-[13px] text-subtle">
                Machines that recently contacted the licence server.
              </p>
            </div>
            <Link
              href="/admin/activities"
              className="flex items-center gap-1.5 text-[13px] font-medium text-green no-underline hover:text-green-dark"
            >
              View all activities
              <ArrowRight className="size-3.5" />
            </Link>
          </div>

          <Table>
            <TableHeader>
              <TableRow className="border-line hover:bg-transparent">
                <TableHead className="px-5 text-[12px] font-semibold tracking-[0.04em] text-faint uppercase">
                  MAC address
                </TableHead>
                <TableHead className="text-[12px] font-semibold tracking-[0.04em] text-faint uppercase">
                  Purchased
                </TableHead>
                <TableHead className="px-5 text-right text-[12px] font-semibold tracking-[0.04em] text-faint uppercase">
                  First used
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {records.map((record) => (
                <TableRow key={record.mac} className="border-line">
                  <TableCell className="px-5 py-3 font-mono text-[13px] text-ink">
                    {record.mac}
                  </TableCell>
                  <TableCell className="py-3">
                    <div className="flex items-center gap-2.5">
                      <Switch
                        checked={record.purchased}
                        onCheckedChange={(checked) =>
                          togglePurchased(record.mac, checked)
                        }
                        aria-label={`Purchased status for ${record.mac}`}
                      />
                      <span
                        className={
                          record.purchased
                            ? "text-[13px] font-semibold text-green"
                            : "text-[13px] font-medium text-amber"
                        }
                      >
                        {record.purchased ? "Purchased" : "Trial"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-5 py-3 text-right text-[13px] whitespace-nowrap text-subtle">
                    {record.firstUsed}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      </div>
  );
}
