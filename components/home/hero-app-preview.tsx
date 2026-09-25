import {
  AppField,
  AppFigure,
  AppProgress,
  AppRunState,
  AppStatus,
  AppStatusBar,
  AppSummary,
  AppSummaryTile,
  AppTable,
  AppTd,
  AppTh,
  AppTr,
  AppWindow,
  ChevronGlyph,
} from "./app-window";

type RunRow = {
  gp: string;
  records: string;
  reconciled: string;
  book: string;
  bookDim?: boolean;
  status: "done" | "running" | "waiting";
  statusLabel: string;
  selected?: boolean;
};

const RUN_ROWS: RunRow[] = [
  { gp: "Gram Panchayat A", records: "48", reconciled: "48", book: "Month book closed", status: "done", statusLabel: "Done" },
  { gp: "Gram Panchayat B", records: "36", reconciled: "36", book: "Month book closed", status: "done", statusLabel: "Done" },
  { gp: "Gram Panchayat C", records: "52", reconciled: "52", book: "Month book closed", status: "done", statusLabel: "Done" },
  { gp: "Gram Panchayat D", records: "41", reconciled: "27", book: "Pending", bookDim: true, status: "running", statusLabel: "Reconciling", selected: true },
  { gp: "Gram Panchayat E", records: "–", reconciled: "–", book: "–", bookDim: true, status: "waiting", statusLabel: "Waiting" },
  { gp: "Gram Panchayat F", records: "–", reconciled: "–", book: "–", bookDim: true, status: "waiting", statusLabel: "Waiting" },
];

/** Hero illustration: a run in progress across six Gram Panchayats. */
function HeroAppPreview() {
  return (
    <AppFigure caption="Illustrative screen with sample data">
      <AppWindow
        title="eGramSwaraj Automation (Trial) &ndash; Bank Reconciliation"
        label="Sample screen of the desktop application running reconciliation for six selected Gram Panchayats: three are done with the month book closed, one is being reconciled, and two are waiting."
      >
        <div className="grid grid-cols-1 items-end gap-3 border-b border-win-line bg-win-panel p-3 sm:grid-cols-[minmax(0,1fr)_auto]">
          <AppField label="Gram Panchayats" value="6 selected" icon={ChevronGlyph} />
          <AppRunState>Running&hellip;</AppRunState>
        </div>

        <AppSummary>
          <AppSummaryTile label="GPs in this run" value="6" />
          <AppSummaryTile label="GPs completed" value="3" tone="ok" />
          <AppSummaryTile label="Records reconciled" value="163" />
          <AppSummaryTile label="Status" pill="Running" />
        </AppSummary>

        <AppTable
          head={
            <>
              <AppTh>Gram Panchayat</AppTh>
              <AppTh className="text-right max-[400px]:hidden">Records</AppTh>
              <AppTh className="text-right">Reconciled</AppTh>
              <AppTh className="max-sm:hidden">Book</AppTh>
              <AppTh>Status</AppTh>
            </>
          }
        >
          {RUN_ROWS.map((row, index) => (
            <AppTr key={row.gp} selected={row.selected}>
              <AppTd>{row.gp}</AppTd>
              <AppTd numeric dim={row.records === "–"} className="max-[400px]:hidden">
                {row.records}
              </AppTd>
              <AppTd numeric dim={row.reconciled === "–"}>
                {row.reconciled}
              </AppTd>
              <AppTd dim={row.bookDim} className="max-sm:hidden">
                {row.book}
              </AppTd>
              <AppTd
                style={{ animationDelay: `${550 + index * 150}ms` }}
                className="motion-safe:animate-in motion-safe:fade-in motion-safe:fill-mode-both motion-safe:duration-300"
              >
                <AppStatus tone={row.status}>{row.statusLabel}</AppStatus>
              </AppTd>
            </AppTr>
          ))}
        </AppTable>

        <AppStatusBar>
          <AppProgress>3 of 6 GPs done</AppProgress>
          <span>GP D: record 28 of 41</span>
          <span className="max-sm:hidden">Trial version</span>
        </AppStatusBar>
      </AppWindow>
    </AppFigure>
  );
}

export { HeroAppPreview };
