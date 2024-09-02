import { SidebarsProviders } from "@/context/SidebarsContext";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { RequestsProvider } from "@/context/RequestsContext";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider

        attribute="class"
        defaultTheme="system"
        enableSystem

        disableTransitionOnChange
      >
        <RequestsProvider>
          <SidebarsProviders>{children}</SidebarsProviders>
        </RequestsProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}

export default Providers;
