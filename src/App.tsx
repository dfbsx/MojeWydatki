import { MantineProvider, Text } from '@mantine/core';
import { useState } from 'react';

export default function App() {
  const [colorTheme,setColorTheme]=useState();
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme: 'dark' }}>
      <Text>Welcome to Mantine!</Text>
    </MantineProvider>
  );
}