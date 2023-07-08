import {
  ColorScheme,
  ColorSchemeProvider,
  Group,
  Header,
  MantineProvider,
  Title,
  createStyles,
  rem,
} from "@mantine/core";
import ColorThemeButton from "./components/ColorThemeButton";
import { useColorScheme, useHotkeys } from "@mantine/hooks";
import { useState } from "react";
import { IconPigMoney } from '@tabler/icons-react';
import styled, { keyframes } from 'styled-components';

const pulseAnimation = keyframes`
  0% {
    opacity: 1;
    transform: scale3d(0.8, 0.8, 0.8);
  }
  50% {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
  100% {
    opacity: 1;
    transform: scale3d(0.8, 0.8, 0.8);
  }
`;

const StyledPigIcon = styled(IconPigMoney)`
  animation: ${pulseAnimation} 2s infinite;
`;

export default function App() {
  const useStyles = createStyles((theme) => ({
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: `${rem(8)} ${rem(12)}`,
    },
  }));

  const { classes } = useStyles();
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useState<ColorScheme>(preferredColorScheme);

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Header height={60} className={classes.header}>
          <Group>
          <StyledPigIcon size="2rem" strokeWidth="1.25" />
          <Title order={3}>Moje wydatki</Title>
          </Group>
          <ColorThemeButton />
        </Header>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
