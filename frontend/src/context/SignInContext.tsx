"use client";

import { createContext, useContext, useState } from "react";

interface SignInContextType {
  code: string | null;
  setCode: (code: string) => void;
}

const SignInContext = createContext<SignInContextType | undefined>(undefined);

function SignInProvider({ children }: { children: React.ReactNode }) {
  const [code, setCode] = useState<string | null>(null);

  return (
    <SignInContext.Provider value={{ code, setCode }}>
      {children}
    </SignInContext.Provider>
  );
}

const useSignInContext = () => {
  const context = useContext(SignInContext);
  if (context === undefined) {
    throw new Error("useSignIn must be used within a SignInProvider");
  }
  return context;
};

export { SignInProvider, useSignInContext };
