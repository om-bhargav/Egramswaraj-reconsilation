import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Section, SectionHeading, Wrap } from "./section";

const DIFFERENCES = [
  {
    difference: "Cheques issued but not yet cleared",
    meaning: "The payment is in the cash book, but the bank has not debited it yet.",
  },
  {
    difference: "Deposits not yet credited",
    meaning:
      "The receipt is recorded, but the bank has not credited it within the period.",
  },
  {
    difference: "Bank charges",
    meaning:
      "The bank has debited a fee that has not been entered in the cash book.",
  },
  {
    difference: "Interest credited by the bank",
    meaning:
      "Interest appears in the pass book but has not been booked as a receipt.",
  },
  {
    difference: "Amount or entry errors",
    meaning:
      "The same transaction is recorded with a different amount, date or reference on each side.",
  },
];

/**
 * Why the cash book and pass book diverge. The table collapses to stacked
 * blocks on small screens, where the header row is dropped.
 */
function CommonDifferences() {
  return (
    <Section alt id="differences">
      <Wrap>
        <SectionHeading
          title="Why the cash book and pass book don't always agree."
          className="mb-8 md:mb-12"
        >
          <p>
            Reconciliation exists because the Panchayat&apos;s books and the
            bank&apos;s records rarely line up on their own. These are the usual
            reasons.
          </p>
        </SectionHeading>

        <Table className="overflow-hidden rounded-[10px] border border-line bg-surface max-sm:block">
          <TableHeader className="max-sm:hidden">
            <TableRow className="border-b border-line hover:bg-transparent">
              <TableHead
                scope="col"
                className="h-auto w-[30%] bg-[#FAFBFA] px-5 py-4 align-top text-[13.5px] font-bold text-subtle"
              >
                Difference
              </TableHead>
              <TableHead
                scope="col"
                className="h-auto bg-[#FAFBFA] px-5 py-4 align-top text-[13.5px] font-bold text-subtle"
              >
                What it usually means
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="max-sm:block">
            {DIFFERENCES.map((row) => (
              <TableRow
                key={row.difference}
                className="border-b border-line last:border-b-0 hover:bg-transparent max-sm:block max-sm:px-[18px] max-sm:py-4"
              >
                <TableCell className="w-[30%] px-5 py-4 align-top text-[15.5px] font-bold whitespace-normal text-navy max-sm:block max-sm:w-full max-sm:p-0">
                  {row.difference}
                </TableCell>
                <TableCell className="px-5 py-4 align-top text-[15.5px] whitespace-normal text-subtle max-sm:mt-1.5 max-sm:block max-sm:p-0">
                  {row.meaning}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Wrap>
    </Section>
  );
}

export { CommonDifferences };
