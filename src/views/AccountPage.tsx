import { Button, Flex, Title, createStyles, rem } from "@mantine/core";
import useStore from "../states/user";
import { useDisclosure } from "@mantine/hooks";
import MoneyCard from "../components/MoneyCard";
import ChangeAmoutModal from "../components/ChangeAmountModal";
import { useEffect, useState } from "react";

function AccountPage() {
  const useStyles = createStyles((theme) => ({
    page: {
      padding: `${rem(20)} ${rem(24)}`,
    },
  }));
  const { classes } = useStyles();
  const username = useStore((state) => state.username);
  const totalAmount = useStore((state) => state.totalAmount);
  const [data, setData] = useState<Partial<User>>({});

interface User {
  username: string;
  totalAmount: number | string;
  allProceeds: any[];
  allExpenses: any[];
}

const [newUser, setNewUser] = useState<User>({
  username: `${username}`,
  totalAmount: `${totalAmount}`,
  allProceeds: [],
  allExpenses: [],
});

useEffect(() => {
  const storedData = JSON.parse(window.localStorage.getItem("mojeWydatki") || "{}");
  setData(storedData);
  console.log("Dane", storedData);
}, []);

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div className={classes.page}>
      <ChangeAmoutModal opened={opened} close={close} />
      <Flex align="center" direction="row" justify="space-between" mb="md">
        <Title order={3} weight={500}>
          Witaj, {data?.username}!
        </Title>
        <Button variant="light" color="green" radius="xl" onClick={open}>
          Dodaj nowy wpływ/wydatek
        </Button>
      </Flex>
      <Flex justify="space-evenly" mt="xl">
        <MoneyCard sum={totalAmount}></MoneyCard>
      </Flex>
      <Button onClick={() => console.log(newUser)}>ok</Button>
    </div>
  );
}

export default AccountPage;
