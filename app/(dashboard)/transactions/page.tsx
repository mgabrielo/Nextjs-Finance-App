"use client";
import React, { useState } from "react";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction";
import { useBulkDeleteTransactions } from "@/features/transactions/api/use-bulk-delete-transactions";
import { useGetTransactions } from "@/features/transactions/api/use-get-transactions";
import { UploadButton } from "./upload-button";
import { ImportCard } from "./import-card";
import { transactions as TransactionSchema } from "@/db/schema";
import { useSelectAccount } from "@/features/accounts/hooks/use-select-account";
import { toast } from "sonner";
import { useBulkCreateTransactions } from "@/features/transactions/api/use-bulk-create-transactions";

enum Variants {
  LIST = "LIST",
  IMPORT = "IMPORT",
}
const initialImportResults = {
  data: [],
  errors: [],
  meta: {},
};

const TransactionsPage = () => {
  const [variant, setVariant] = useState<Variants>(Variants.LIST);
  const [importResults, setImportResults] = useState(initialImportResults);
  const [AccountDialog, confirm] = useSelectAccount();

  const onUpload = (result: typeof initialImportResults) => {
    console.log(result);
    setImportResults(result);
    setVariant(Variants.IMPORT);
  };
  const onCancelImport = () => {
    setImportResults(initialImportResults);
    setVariant(Variants.LIST);
  };
  const newTransaction = useNewTransaction();
  const transactionQuery = useGetTransactions();
  const deleteTransactions = useBulkDeleteTransactions();
  const bulkCreateMutation = useBulkCreateTransactions();
  const disabled = transactionQuery.isLoading || deleteTransactions.isPending;

  if (transactionQuery.isLoading) {
    return (
      <div className=" max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent>
            <div className="h-[500px] w-full flex items-center justify-center">
              <Loader2 className="size-5 text-slate-300 animate-spin" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const onSubmitImport = async (
    values: (typeof TransactionSchema.$inferInsert)[]
  ) => {
    const accountId = await confirm();
    if (!accountId) {
      toast.error("Please Select An Account");
    }
    const data = values.map((value) => ({
      ...value,
      accountId: accountId as string,
    }));

    bulkCreateMutation.mutate(data, {
      onSuccess: () => {
        onCancelImport();
      },
    });
  };

  if (variant === Variants.IMPORT) {
    return (
      <>
        <AccountDialog />
        <ImportCard
          data={importResults.data}
          onCancel={onCancelImport}
          onSubmit={onSubmitImport}
        />
      </>
    );
  }
  return (
    <div className=" max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">
            Transaction History for the Past 30 days
          </CardTitle>
          <div className="flex flex-col gap-x-2 lg:flex-row gap-y-2 items-center ">
            <Button
              size={"sm"}
              className="w-full lg:w-auto"
              onClick={() => newTransaction.onOpen()}
            >
              <Plus className="size-4 mr-2" />
              Add New Transaction
            </Button>
            <UploadButton onUpload={onUpload} />
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={transactionQuery.data || []}
            filterKey="payee"
            onDelete={(rows) => {
              const ids = rows?.map((r) => r.original.id);
              deleteTransactions.mutate({ ids });
            }}
            disabled={disabled}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionsPage;
