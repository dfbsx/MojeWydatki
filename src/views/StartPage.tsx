import {
  Paper,
  TextInput,
  Button,
  ColorScheme,
  Title,
  createStyles,
  rem,
  Text,
} from "@mantine/core";
import { useColorScheme, useHotkeys } from "@mantine/hooks";
import { useState } from "react";

export default function StartPage() {
  const useStyles = createStyles((theme) => ({
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: `${rem(8)} ${rem(12)}`,
    },
    wrapper: {
      height: "calc(100vh - 60px)",
      backgroundSize: "75% auto",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "right",
      backgroundImage:
        "url(https://images.unsplash.com/photo-1538356343135-65849f66b4a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=873&q=80)",
    },

    form: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      height: "calc(100vh - 60px)",
      borderRight: `${rem(1)} solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[3]
      }`,
      maxWidth: rem(500),
      [theme.fn.smallerThan("sm")]: {
        maxWidth: "100%",
      },
    },
  }));

  const { classes } = useStyles();
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] =
    useState<ColorScheme>(preferredColorScheme);

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title
          order={2}
          ta="center"
          mt="md"
          mb={50}
          style={{ marginTop: "-25%" }}
        >
          Zacznij śledzić swój stan konta!
        </Title>
        <TextInput label="Jak masz na imię?" placeholder="Ania" size="md" />
        <TextInput
          label="Od jakiej kwoty zaczynamy śledzenie?"
          placeholder="500"
          mt="md"
          size="md"
        />
        <Button
          fullWidth
          mt="xl"
          size="md"
          variant="gradient"
          gradient={{ from: "teal", to: "lime", deg: 105 }}
          radius="xl"
        >
          Zaczynamy
        </Button>
        <Text fz="xs" ta="center" mt="md" mb={50} c="dimmed">
          Twoje dane będą dostępne tylko dla Ciebie na Twoim komputerze
        </Text>
      </Paper>
    </div>
  );
}
