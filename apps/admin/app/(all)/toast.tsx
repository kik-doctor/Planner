import { useTheme } from "next-themes";
import { Toast } from "@planner/propel/toast";
import { resolveGeneralTheme } from "@planner/utils";

export function ToastWithTheme() {
  const { resolvedTheme } = useTheme();
  return <Toast theme={resolveGeneralTheme(resolvedTheme)} />;
}
