import FinanceLogo from "@/components/(logo-icon)/logo";
import { SignIn, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="h-full lg:flex flex-col items-center justify-center px-4">
        <div className=" text-center space-y-4 pt-16">
          <h1 className=" font-bold text-3xl text-[#2E2A47]">Welcome Back</h1>
          <p className=" text-base text-[#7e8ca0]">
            Log in or Create Account to get to Dashboard
          </p>
        </div>
        <div className=" flex items-center justify-center mt-8">
          <ClerkLoaded>
            <SignIn path="/sign-in" />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="animate-spin text-muted-foreground" />
          </ClerkLoading>
        </div>
      </div>
      <div className=" h-full bg-blue-600 hidden lg:flex items-center justify-center">
        <FinanceLogo className="text-white h-20 w-20" />
      </div>
    </div>
  );
}
