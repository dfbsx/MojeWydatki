import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import ColorThemeButton from "./components/ColorThemeButton";
import { useColorScheme, useHotkeys } from "@mantine/hooks";
import { useState } from "react";

export default function App() {
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] =
    useState<ColorScheme>(preferredColorScheme);
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useHotkeys([["mod+J", () => toggleColorScheme()]]);
  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{
          colorScheme,
          colors: {
            lightYellow: ["#FFEC99"],
          },
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        Mantine
        <ColorThemeButton />
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
