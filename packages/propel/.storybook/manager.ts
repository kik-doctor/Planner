import { addons } from "storybook/manager-api";
import { create } from "storybook/theming";

const plannerTheme = create({
  base: "dark",
  brandTitle: "planner UI",
  brandUrl: "https://planner.oneworkspacex.com",
  brandImage: "planner-lockup-light.svg",
  brandTarget: "_self",
});

addons.setConfig({
  theme: plannerTheme,
});
