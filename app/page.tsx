import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";
import DebugPage from "./debug-supabase/page";

export default function Home() {
  return (
    <main className="">
      <DebugPage></DebugPage>
    </main>
  );
}
