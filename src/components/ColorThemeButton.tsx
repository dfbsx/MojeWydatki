import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';

function ColorThemeButton() {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  return (
    <ActionIcon
    variant="outline"
    color={dark ? 'yellow.1' : 'blue'}
    onClick={() => toggleColorScheme()}
    title="Toggle color scheme"
  >
    {dark ? <IconSun size="1.1rem" /> : <IconMoonStars size="1.1rem" />}
  </ActionIcon>
  )
}

export default ColorThemeButton