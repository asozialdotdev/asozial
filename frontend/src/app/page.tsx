import Footer from "@/components/common/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function LandingPage() {
  return (
    <>
      <main className="h-screen w-screen p-4 text-2xl">
        <h1>This is the Landing Page</h1>

        <Button>
          <Link href="/dashboard">Go to Dashboard</Link>
        </Button>
      </main>

      <Footer />
    </>
  );
}

export default LandingPage;
