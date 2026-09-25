import type { ComponentProps, ReactNode } from "react";
import Image from "next/image";
import { Check, ChevronDown, Clock3, CircleCheck, PieChart } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* Window chrome                                                              */
/* -------------------------------------------------------------------------- */

const MENU_ITEMS = ["File", "Edit", "View", "Tools", "Help"];

const WINDOW_CONTROLS = [
  <path key="minimise" d="M1 5h8" stroke="currentColor" />,
  <rect
    key="maximise"
    x="1.5"
    y="1.5"
    width="7"
    height="7"
    fill="none"
    stroke="currentColor"
  />,
  <path key="close" d="M1.5 1.5l7 7M8.5 1.5l-7 7" stroke="currentColor" />,
];

/**
 * The fake desktop-application window used to illustrate the product.
 * Everything inside is sample markup, not a screenshot.
 */
function AppWindow({
  title,
  label,
  className,
  children,
}: {
  title: string;
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "overflow-hidden rounded-lg border border-[#BFC5CC] bg-white font-app text-[12px] text-[#222] shadow-[0_1px_2px_rgba(27,43,69,.06),0_18px_40px_-18px_rgba(27,43,69,.28)] sm:text-[12.5px]",
        className,
      )}
    >
      <div className="flex h-8 min-w-0 items-center bg-navy pl-2.5 text-xs text-[#E9EDF3]">
        <Image
          src="/app-icon.png"
          alt=""
          width={16}
          height={16}
          className="mr-2 size-4 flex-none object-contain"
        />
        <span className="min-w-0 flex-1 truncate">{title}</span>
        <span aria-hidden="true" className="flex h-full flex-none">
          {WINDOW_CONTROLS.map((shape) => (
            <span
              key={shape.key}
              className="flex w-[30px] items-center justify-center text-[#C8D0DC] sm:w-[38px]"
            >
              <svg viewBox="0 0 10 10" className="size-2.5">
                {shape}
              </svg>
            </span>
          ))}
        </span>
      </div>

      <div
        aria-hidden="true"
        className="flex flex-wrap gap-x-4 gap-y-1 border-b border-win-border bg-win-chrome px-3 py-[5px] text-[#333]"
      >
        {MENU_ITEMS.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>

      {children}
    </div>
  );
}

/** Wraps a window with its "sample data" caption. */
function AppFigure({
  caption,
  className,
  children,
  ...props
}: ComponentProps<"figure"> & { caption?: string }) {
  return (
    <figure className={cn("m-0 min-w-0", className)} {...props}>
      {children}
      {caption ? (
        <figcaption className="mt-3 text-[13px] text-faint max-md:text-left md:text-right">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

/** Body split into the left rail and the main pane. */
function AppBody({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:min-h-[360px] md:grid-cols-[172px_minmax(0,1fr)]">
      {children}
    </div>
  );
}

function AppSidebar({ children }: { children: ReactNode }) {
  return (
    <div
      aria-hidden="true"
      className="flex flex-row gap-0.5 border-b border-win-border bg-win-chrome p-1.5 md:flex-col md:border-r md:border-b-0 md:px-2 md:py-2.5"
    >
      {children}
    </div>
  );
}

function AppSidebarItem({
  active = false,
  icon,
  children,
}: {
  active?: boolean;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "flex items-center gap-2 rounded-[3px] px-2 py-[7px] whitespace-nowrap text-[#444] [&_svg]:size-3.5",
        active && "bg-[#DCE6F2] font-semibold text-navy",
      )}
    >
      {icon}
      {children}
    </span>
  );
}

function AppMain({ children }: { children: ReactNode }) {
  return <div className="flex min-w-0 flex-col">{children}</div>;
}

/* -------------------------------------------------------------------------- */
/* Form chrome                                                                */
/* -------------------------------------------------------------------------- */

/** A read-only Windows-style labelled field. */
function AppField({
  label,
  value,
  placeholder,
  icon,
  className,
}: {
  label: string;
  value?: string;
  placeholder?: string;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("min-w-0", className)}>
      <span className="mb-1 block text-[11px] text-win-label">{label}</span>
      <div className="flex h-7 items-center justify-between gap-1.5 overflow-hidden rounded-[3px] border border-win-field bg-white px-2 whitespace-nowrap">
        <span className={cn("min-w-0 truncate", placeholder && "text-[#8A919B]")}>
          {value ?? placeholder}
        </span>
        {icon ? (
          <span className="flex-none text-[#666] [&_svg]:size-2.5">{icon}</span>
        ) : null}
      </div>
    </div>
  );
}

/** Flat, in-progress looking button. */
function AppRunState({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-7 items-center justify-center rounded-[3px] border border-win-field bg-[#EEF0F3] px-3 text-xs font-semibold whitespace-nowrap text-[#555]">
      {children}
    </div>
  );
}

/** Primary in-app action button. */
function AppGoButton({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex h-7 items-center justify-center rounded-[3px] border border-green-dark bg-green px-3 text-xs font-semibold whitespace-nowrap text-white",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Secondary in-app action button. */
function AppButton({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex h-[26px] items-center rounded-[3px] border border-win-field bg-white px-2.5 text-xs font-medium whitespace-nowrap text-[#333]">
      {children}
    </span>
  );
}

/** Toolbar above a table: a growing field plus a trailing action. */
function AppToolbar({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-2 items-end gap-2.5 border-b border-win-line bg-win-panel p-3 sm:grid-cols-[minmax(0,1fr)_auto]">
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Summary tiles, tables, status bar                                          */
/* -------------------------------------------------------------------------- */

/** Row of KPI tiles above the run table. */
function AppSummary({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-2 border-b border-win-line sm:grid-cols-4">
      {children}
    </div>
  );
}

function AppSummaryTile({
  label,
  value,
  tone,
  pill,
  className,
}: {
  label: string;
  value?: string;
  tone?: "ok" | "warn";
  pill?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "min-w-0 border-win-line px-3 py-2.5 max-sm:not-nth-[2n]:border-r max-sm:nth-[-n+2]:border-b sm:border-r sm:last:border-r-0",
        className,
      )}
    >
      <div className="text-[11px] text-win-label">{label}</div>
      {pill ? (
        <Badge className="mt-1 h-auto rounded-[3px] bg-[#E4ECF5] px-2 py-[3px] text-[11px] font-semibold text-win-blue">
          {pill}
        </Badge>
      ) : (
        <div
          className={cn(
            "mt-0.5 text-[17px] font-semibold tabular-nums text-win-ink",
            tone === "ok" && "text-green",
            tone === "warn" && "text-amber",
          )}
        >
          {value}
        </div>
      )}
    </div>
  );
}

/** Windows-grid styled table built on the shadcn table primitives. */
function AppTable({
  head,
  children,
  className,
}: {
  head: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Table className={cn("tabular-nums max-[480px]:text-[11px]", className)}>
      <TableHeader>
        <TableRow className="border-b border-win-border bg-win-chrome hover:bg-win-chrome">
          {head}
        </TableRow>
      </TableHeader>
      <TableBody>{children}</TableBody>
    </Table>
  );
}

function AppTh({ className, ...props }: ComponentProps<typeof TableHead>) {
  return (
    <TableHead
      className={cn(
        "h-auto px-2 py-[7px] text-left text-[11.5px] font-semibold whitespace-nowrap text-[#4B525C] max-[480px]:text-[10.5px] sm:px-2.5",
        className,
      )}
      {...props}
    />
  );
}

function AppTr({
  selected = false,
  className,
  ...props
}: ComponentProps<typeof TableRow> & { selected?: boolean }) {
  return (
    <TableRow
      className={cn(
        "border-b border-[#EEF0F2] even:bg-[#FBFBFC] hover:bg-transparent even:hover:bg-[#FBFBFC]",
        selected &&
          "bg-win-sel even:bg-win-sel hover:bg-win-sel even:hover:bg-win-sel",
        className,
      )}
      {...props}
    />
  );
}

function AppTd({
  className,
  numeric = false,
  dim = false,
  ...props
}: ComponentProps<"td"> & { numeric?: boolean; dim?: boolean }) {
  return (
    <td
      className={cn(
        "px-2 py-[7px] align-middle whitespace-nowrap sm:px-2.5",
        numeric && "text-right",
        dim && "text-win-dim",
        className,
      )}
      {...props}
    />
  );
}

const STATUS_TONES = {
  done: "text-green",
  running: "text-win-blue",
  waiting: "font-medium text-[#8A919B]",
  warn: "text-amber",
  error: "text-brand-red",
} as const;

/** Inline status label with its leading glyph. */
function AppStatus({
  tone,
  children,
  icon,
  showIcon = true,
}: {
  tone: keyof typeof STATUS_TONES;
  children: ReactNode;
  icon?: ReactNode;
  showIcon?: boolean;
}) {
  const fallback =
    tone === "done" ? (
      <CircleCheck strokeWidth={1.6} />
    ) : tone === "running" ? (
      <PieChart strokeWidth={1.6} />
    ) : tone === "waiting" ? (
      <Clock3 strokeWidth={1.6} />
    ) : null;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-[11.5px] font-semibold max-[480px]:text-[10.5px] sm:gap-1.5 [&_svg]:size-2.5 sm:[&_svg]:size-3",
        STATUS_TONES[tone],
      )}
    >
      {showIcon ? (icon ?? fallback) : null}
      {children}
    </span>
  );
}

/** Footer strip of the window. */
function AppStatusBar({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-wrap justify-between gap-x-3 gap-y-1 border-t border-win-border bg-win-chrome px-3 py-1.5 text-[11.5px] text-[#555]">
      {children}
    </div>
  );
}

/** Progress bar in the status strip. */
function AppProgress({ children }: { children: ReactNode }) {
  return (
    <span className="flex items-center gap-2">
      <span className="h-1.5 w-[90px] overflow-hidden rounded-sm bg-[#DDE1E6]">
        <span className="block h-full w-1/2 origin-left bg-green motion-safe:animate-bar-fill" />
      </span>
      {children}
    </span>
  );
}

/** Checkbox glyph used in the Gram Panchayat picker. */
function AppCheckbox({ state = "off" }: { state?: "off" | "on" | "partial" }) {
  return (
    <span
      className={cn(
        "inline-flex size-3.5 items-center justify-center rounded-[2px] border border-[#9AA2AC] bg-white align-middle",
        state !== "off" && "border-win-blue bg-win-blue text-white",
      )}
    >
      {state === "on" ? <Check strokeWidth={3} className="size-2.5" /> : null}
      {state === "partial" ? <span className="h-0.5 w-2 bg-white" /> : null}
    </span>
  );
}

/** Radio glyph used in the settings screen. */
function AppRadio({
  checked = false,
  children,
}: {
  checked?: boolean;
  children: ReactNode;
}) {
  return (
    <span className="flex items-center gap-1.5">
      <span
        className={cn(
          "inline-block size-[13px] rounded-full border border-[#9AA2AC] bg-white",
          checked && "border-4 border-win-blue",
        )}
      />
      {children}
    </span>
  );
}

/** Grouped block of settings inside the settings screen. */
function AppSettingsGroup({
  title,
  action,
  children,
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="border-b border-win-line p-3">
      <div className="mb-2 flex items-center justify-between">
        <h4 className="text-[12.5px] font-semibold text-win-ink">{title}</h4>
        {action}
      </div>
      {children}
    </div>
  );
}

const ChevronGlyph = <ChevronDown strokeWidth={1.6} />;

export {
  AppWindow,
  AppFigure,
  AppBody,
  AppSidebar,
  AppSidebarItem,
  AppMain,
  AppField,
  AppRunState,
  AppGoButton,
  AppButton,
  AppToolbar,
  AppSummary,
  AppSummaryTile,
  AppTable,
  AppTh,
  AppTr,
  AppTd,
  AppStatus,
  AppStatusBar,
  AppProgress,
  AppCheckbox,
  AppRadio,
  AppSettingsGroup,
  ChevronGlyph,
};
