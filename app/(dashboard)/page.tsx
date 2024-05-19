"use client";
import { DataGrid } from "@/components/data-grid";
import { Button } from "@/components/ui/button";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
import { SignOutButton, UserButton } from "@clerk/nextjs";

export default function DashboardPage() {
  const { data: accounts, isLoading } = useGetAccounts();
  const { onOpen } = useNewAccount();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log(accounts);

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <DataGrid />
    </div>
  );
}
