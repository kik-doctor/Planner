import type { Config } from "tailwindcss";
import sharedConfig from "@planner/tailwind-config/tailwind.config";

export default {
  ...sharedConfig,
  content: ["./src/**/*.{ts,tsx}"],
} satisfies Config;
