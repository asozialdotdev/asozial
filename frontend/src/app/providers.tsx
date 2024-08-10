import { SidebarsProviders } from "@/context/SidebarsContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { UserProvider } from "@/context/UserContext";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <UserProvider>
        <SidebarsProviders>{children}</SidebarsProviders>
      </UserProvider>
    </ThemeProvider>
  );
}

export default Providers;
