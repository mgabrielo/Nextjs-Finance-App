import { cn, formatCurrency } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { IconType } from "react-icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { CountUp } from "./count-up";

const boxVariant = cva("shrink-0 p-3 rounded-md", {
  variants: {
    variant: {
      default: "bg-blue-600/40",
      success: "bg-emerald-600/40",
      danger: "bg-rose-600/40",
      warning: "bg-yellow-600/40",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
const iconVariant = cva("size-6", {
  variants: {
    variant: {
      default: "fill-blue-600",
      success: "fill-emerald-600",
      danger: "fill-rose-600",
      warning: "fill-yellow-600",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type BoxVariants = VariantProps<typeof boxVariant>;
type IconVariants = VariantProps<typeof iconVariant>;

interface DataCardProps extends BoxVariants, IconVariants {
  icon: IconType;
  title: string;
  value?: number;
  dateRange: string;
  percentageChange?: number;
}

export const DataCard = ({
  icon: Icon,
  title,
  value = 0,
  dateRange,
  variant,
  percentageChange = 0,
}: DataCardProps) => {
  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between gap-x-3">
        <div className="space-y-2">
          <CardTitle className="text-2xl line-clamp-1">{title}</CardTitle>
          <CardDescription className="line-clamp-1">
            {dateRange}
          </CardDescription>
        </div>
        <div className={cn(boxVariant({ variant }))}>
          <Icon className={cn(iconVariant({ variant }))} />
        </div>
      </CardHeader>
      <CardContent>
        <h1 className="font-bold text-2xl mb-2 line-clamp-1 break-all">
          <CountUp
            preserveValue
            start={0}
            end={value}
            decimalPlaces={2}
            decimals={2}
            formattingFn={formatCurrency}
          />
        </h1>
      </CardContent>
    </Card>
  );
};
