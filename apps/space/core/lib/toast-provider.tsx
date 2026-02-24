import { useTheme } from "next-themes";
// planner imports
import { Toast } from "@planner/propel/toast";
import { resolveGeneralTheme } from "@planner/utils";

export function ToastProvider({ children }: { children: React.ReactNode }) {
  // themes
  const { resolvedTheme } = useTheme();

  return (
    <>
      <Toast theme={resolveGeneralTheme(resolvedTheme)} />
      {children}
    </>
  );
}
