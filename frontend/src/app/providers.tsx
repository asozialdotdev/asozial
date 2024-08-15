import { SidebarsProviders } from "@/context/SidebarsContext";
// import { ThemeProvider } from "@/context/ThemeContext";
import { UserProvider } from "@/context/UserContext";

import { ThemeProvider } from "next-themes";
import { SignInProvider } from "@/context/SignInContext";
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
          <SignInProvider>
            <UserProvider>{children}</UserProvider>
          </SignInProvider>
        </ThemeProvider>
      </SidebarsProviders>
    </SessionProvider>
  );
}

export default Providers;
