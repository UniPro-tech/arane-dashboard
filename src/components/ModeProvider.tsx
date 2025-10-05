"use client";
import * as React from "react";

type Mode = string;

interface ModeContextValue {
  mode: Mode;
  setMode: React.Dispatch<React.SetStateAction<Mode>>;
}

const ModeContext = React.createContext<ModeContextValue | undefined>(
  undefined
);

export function ModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = React.useState<Mode>("arane");

  const value = React.useMemo(() => ({ mode, setMode }), [mode]);

  return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>;
}

export function useMode() {
  const ctx = React.useContext(ModeContext);
  if (!ctx) {
    throw new Error("useMode must be used within a ModeProvider");
  }
  return ctx;
}

export default ModeProvider;
