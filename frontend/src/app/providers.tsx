import { SidebarsProviders } from "@/context/SidebarsContext";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
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
    </SessionProvider>
  );
}

export default Providers;
