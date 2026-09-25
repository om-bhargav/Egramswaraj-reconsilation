const HIGHLIGHTS = [
  "Built for repetitive reconciliation work",
  "Designed around eGramSwaraj-related workflows",
  "Simple desktop automation",
];

/** Three-up band of positioning statements under the hero. */
function HighlightStrip() {
  return (
    <div aria-label="About the software" className="border-y border-line bg-surface">
      <ul className="mx-auto grid max-w-[1400px] list-none grid-cols-1 px-[18px] sm:px-6 md:grid-cols-3">
        {HIGHLIGHTS.map((text, index) => (
          <li
            key={text}
            className="flex items-baseline gap-3.5 border-t border-line py-[18px] text-base font-semibold text-navy first:border-t-0 md:border-t-0 md:border-l md:px-6 md:py-[26px] md:first:border-l-0 md:first:pl-0"
          >
            <span className="text-[13px] font-bold tabular-nums text-green">
              {String(index + 1).padStart(2, "0")}
            </span>
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export { HighlightStrip };
