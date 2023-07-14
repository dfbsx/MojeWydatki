import {
  Button,
  Flex,
  Title,
  createStyles,
  rem,
} from "@mantine/core";
import useStore from "../states/user";
import { useDisclosure } from "@mantine/hooks";
import MoneyCard from "../components/MoneyCard";
import { useState } from "react";
import ChangeAmoutModal from "../components/ChangeAmountModal";

function AccountPage() {
  const useStyles = createStyles((theme) => ({
    page: {
      padding: `${rem(20)} ${rem(24)}`,
    },
  }));
  const { classes } = useStyles();
  const username = useStore((state) => state.username);
  const totalAmount = useStore((state) => state.totalAmount);
  const [opened, { open, close }] = useDisclosure(false);
  const [value, setValue] = useState<string[]>([]);

  return (
    <div className={classes.page}>
      <ChangeAmoutModal opened={opened} close={close} />
      <Flex align="center" direction="row" justify="space-between">
        <Title order={3} weight={500}>
          Witaj, {username}!
        </Title>
        <Button variant="light" color="blue" radius="xl" onClick={open}>
          Dodaj nowy wpływ/wydatek
        </Button>
      </Flex>
      <Flex justify="space-evenly" mt="xl">
        <MoneyCard sum={totalAmount}></MoneyCard>
      </Flex>
    </div>
  );
}

export default AccountPage;
