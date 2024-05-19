import React from "react";
import { Info, MinusCircle, PlusCircle } from "lucide-react";
import CurrencyInput from "react-currency-input-field";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

type Props = {
  value: string;
  onChange: (value: string | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
};
export const AmountInputs = ({
  value,
  onChange,
  placeholder,
  disabled,
}: Props) => {
  const parsedValue = parseFloat(value);
  const isIncome = parsedValue > 0;
  const isExpense = parsedValue < 0;

  const onReversedValue = () => {
    if (!value) {
      return;
    }
    onChange((parseFloat(value) * -1).toString());
  };
  return (
    <div className="relative">
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={onReversedValue}
              className={cn(
                `bg-slate-400 hover:bg-slate-500 absolute top-1.5 
              left-1.5 rounded-md p-2 flex items-center justify-center 
              transition`,
                isIncome && "bg-emerald-600 hover:bg-emerald-600",
                isExpense && "bg-rose-800 hover:bg-rose-600"
              )}
            >
              {!parsedValue && <Info className="size-3 text-white" />}
              {isIncome && <PlusCircle className="size-3 text-white" />}
              {isExpense && <MinusCircle className="size-3 text-white" />}
            </button>
          </TooltipTrigger>
          <TooltipContent>
            Use [+] for income and [-] for expenses
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <CurrencyInput
        prefix="£"
        className={`
          flex h-10 w-full pl-10 rounded-md border border-input bg-background px-3 py-2
          text-sm ring-offset-background file:border-0 file:bg-transparent mb-2
          file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none
          focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
          disabled:cursor-not-allowed disabled:opacity-50`}
        placeholder={placeholder}
        value={value}
        decimalsLimit={2}
        decimalScale={2}
        onValueChange={onChange}
        disabled={disabled}
      />
      {isIncome && <p>This will count as Income</p>}
      {isExpense && <p>This will count as Expense</p>}
    </div>
  );
};