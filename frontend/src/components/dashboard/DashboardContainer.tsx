import { useSignInContext } from "@/context/SignInContext";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

function DashboardContainer() {
  return (
    <section className="flex grow flex-col border-dark bg-light p-4 text-dark dark:border-light dark:bg-dark dark:text-light lg:border-x">
      <h1 className="py-6 text-xl">Dashboard</h1>
      <p className="text-lg">Here goes the feed or any other stuff</p>
    </section>
  );
}

export default DashboardContainer;
