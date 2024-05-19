"use client";

import { useGetSummary } from "@/features/summary/api/use-get-summary";
import { formatDateRange } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { FaPiggyBank, FaDollarSign, FaExchangeAlt } from "react-icons/fa";
import { DataCard } from "./data-card";

export const DataGrid = () => {
  const { data } = useGetSummary();
  const params = useSearchParams();
  const to = params.get("to") || undefined;
  const from = params.get("from") || undefined;
  const dateRangeLabel = formatDateRange({ to, from });
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-4 lg:gap-8 pb-2 mb-8">
      <DataCard
        title="Remaining"
        value={data?.remainingAmount}
        percentageChange={data?.remainingChange}
        icon={FaPiggyBank}
        variant="default"
        dateRange={dateRangeLabel}
      />
      <DataCard
        title="Income"
        value={data?.incomeAmount}
        percentageChange={data?.incomeChange}
        icon={FaDollarSign}
        variant="default"
        dateRange={dateRangeLabel}
      />
      <DataCard
        title="Expense"
        value={data?.expenseAmount}
        percentageChange={data?.expenseChange}
        icon={FaExchangeAlt}
        variant="default"
        dateRange={dateRangeLabel}
      />
    </div>
  );
};
