import { SidebarsProviders } from "@/context/SidebarsContext";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { RequestsProvider } from "@/context/RequestsContext";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <RequestsProvider>
        <SidebarsProviders>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </SidebarsProviders>
      </RequestsProvider>
    </SessionProvider>
  );
}

export default Providers;
