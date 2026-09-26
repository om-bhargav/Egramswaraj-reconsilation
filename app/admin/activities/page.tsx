"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
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

type Filter = "all" | "purchased" | "trial";

/** Dummy entries — replace with every row of the Records table. */
const RECORDS = [
  { mac: "A4:83:E7:2B:91:0C", purchased: true, firstUsed: "24 Sep 2026, 10:42 AM", lastSeen: "25 Sep 2026, 09:10 AM" },
  { mac: "F0:18:98:4D:22:B7", purchased: false, firstUsed: "24 Sep 2026, 09:15 AM", lastSeen: "25 Sep 2026, 08:02 AM" },
  { mac: "3C:22:FB:07:E5:AA", purchased: false, firstUsed: "23 Sep 2026, 06:58 PM", lastSeen: "24 Sep 2026, 07:31 PM" },
  { mac: "8C:85:90:11:74:1E", purchased: true, firstUsed: "23 Sep 2026, 02:30 PM", lastSeen: "25 Sep 2026, 11:47 AM" },
  { mac: "D8:3B:BF:6A:C3:59", purchased: false, firstUsed: "22 Sep 2026, 11:05 AM", lastSeen: "22 Sep 2026, 04:19 PM" },
  { mac: "60:F2:62:9C:08:3D", purchased: true, firstUsed: "21 Sep 2026, 04:47 PM", lastSeen: "24 Sep 2026, 10:05 AM" },
  { mac: "1C:69:7A:0D:B4:82", purchased: false, firstUsed: "21 Sep 2026, 10:12 AM", lastSeen: "21 Sep 2026, 01:55 PM" },
  { mac: "E4:5F:01:3A:66:D1", purchased: true, firstUsed: "20 Sep 2026, 03:24 PM", lastSeen: "25 Sep 2026, 10:38 AM" },
  { mac: "B0:25:AA:47:19:F4", purchased: false, firstUsed: "19 Sep 2026, 05:40 PM", lastSeen: "20 Sep 2026, 09:27 AM" },
  { mac: "48:E7:DA:5C:2F:90", purchased: false, firstUsed: "19 Sep 2026, 09:03 AM", lastSeen: "19 Sep 2026, 06:14 PM" },
  { mac: "9C:B6:D0:81:E3:27", purchased: true, firstUsed: "18 Sep 2026, 12:19 PM", lastSeen: "23 Sep 2026, 02:41 PM" },
  { mac: "2C:F0:5D:96:AB:63", purchased: false, firstUsed: "17 Sep 2026, 04:08 PM", lastSeen: "18 Sep 2026, 11:22 AM" },
  { mac: "70:85:C2:34:7D:05", purchased: true, firstUsed: "16 Sep 2026, 11:36 AM", lastSeen: "24 Sep 2026, 05:09 PM" },
  { mac: "AC:DE:48:00:11:22", purchased: false, firstUsed: "15 Sep 2026, 08:50 AM", lastSeen: "15 Sep 2026, 03:33 PM" },
  { mac: "5C:E0:C5:6B:94:8E", purchased: false, firstUsed: "14 Sep 2026, 06:21 PM", lastSeen: "16 Sep 2026, 10:44 AM" },
];

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "purchased", label: "Purchased" },
  { value: "trial", label: "Trial" },
];

export default function AdminActivitiesPage() {
  const [records, setRecords] = useState(RECORDS);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  function togglePurchased(mac: string, purchased: boolean) {
    // TODO: persist the change to the Records table.
    setRecords((current) =>
      current.map((record) =>
        record.mac === mac ? { ...record, purchased } : record,
      ),
    );
  }

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return records.filter((record) => {
      if (filter === "purchased" && !record.purchased) return false;
      if (filter === "trial" && record.purchased) return false;
      if (needle && !record.mac.toLowerCase().includes(needle)) return false;
      return true;
    });
  }, [records, query, filter]);

  const purchasedCount = records.filter((record) => record.purchased).length;

  return (

      <div className="mx-auto w-full max-w-[1400px] px-5 py-8 sm:px-6 sm:py-10">
        <h1 className="text-[clamp(1.4rem,2.4vw,1.9rem)] leading-tight font-extrabold tracking-[-0.015em] text-navy">
          Activities
        </h1>
        <p className="mt-1.5 text-sm text-subtle">
          Every machine that has contacted the licence server — {records.length} in
          total, {purchasedCount} purchased and {records.length - purchasedCount} on
          trial.
        </p>

        <div className="mt-6 overflow-hidden rounded-xl border border-line bg-surface">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4">
            <div className="relative w-full sm:max-w-[280px]">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-faint" />
              <Input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search MAC address"
                aria-label="Search by MAC address"
                className="h-9 pl-8"
              />
            </div>

            <div className="flex items-center gap-1">
              {FILTERS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFilter(option.value)}
                  aria-pressed={filter === option.value}
                  className={
                    filter === option.value
                      ? "rounded-lg bg-green-soft px-3 py-1.5 text-sm font-medium text-green-dark"
                      : "rounded-lg px-3 py-1.5 text-sm font-medium text-subtle transition-colors hover:bg-paper hover:text-navy"
                  }
                >
                  {option.label}
                </button>
              ))}
            </div>
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
                <TableHead className="text-[12px] font-semibold tracking-[0.04em] text-faint uppercase">
                  First used
                </TableHead>
                <TableHead className="px-5 text-right text-[12px] font-semibold tracking-[0.04em] text-faint uppercase">
                  Last seen
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visible.map((record) => (
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
                  <TableCell className="py-3 text-[13px] whitespace-nowrap text-subtle">
                    {record.firstUsed}
                  </TableCell>
                  <TableCell className="px-5 py-3 text-right text-[13px] whitespace-nowrap text-subtle">
                    {record.lastSeen}
                  </TableCell>
                </TableRow>
              ))}

              {visible.length === 0 ? (
                <TableRow className="border-line hover:bg-transparent">
                  <TableCell colSpan={4} className="px-5 py-10 text-center text-sm text-faint">
                    No machine matches that search.
                  </TableCell>
                </TableRow>
              ) : null}
            </TableBody>
          </Table>

          <div className="border-t border-line px-5 py-3 text-[13px] text-faint">
            Showing {visible.length} of {records.length} entries
          </div>
        </div>
      </div>
  );
}
