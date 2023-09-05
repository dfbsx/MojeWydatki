import {
  Button,
  Card,
  Flex,
  Text,
  Title,
  createStyles,
  rem,
} from "@mantine/core";
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
    historyCard: {
      display: "flex",
      flexDirection: "row",
      height: 1.5,
      borderBottom: "1px lightGray solid",
      alignItems: "center",
    },
    descCard: {
      display: "flex",
      flexDirection: "row",
      height: 1.5,
      borderBottom: "1px lightGray solid",
      alignItems: "center",
      padding:"2px",
      backgroundColor:"#A5D8FF",
      color:`{blue.3}`,
    },
    wide: {
      flex: 1.3,
      display: "flex",
      alignItems: "center",
      justifyContent: "left",
      textAlign: "justify",
    },
    narrow: {
      flex: 1,
      display: "flex",
      justifyContent: "left",
      alignItems: "center",
      textAlign: "justify",
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

  const proceedsSum = data?.allProceeds?.reduce(
    (accumulator, item) => accumulator + item.amount,
    0
  )

  const expensesSum = data?.allExpenses?.reduce(
    (accumulator, item) => accumulator + item.amount,
    0
  )

  const [allHistory, setAllHistory] = useState<any[]>([]);



  useEffect(() => {
    const storedUser = localStorage.getItem("mojeWydatki");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      const updatedUser = { ...newUser, ...parsedUser };
      setData(updatedUser);
      localStorage.setItem("mojeWydatki", JSON.stringify(updatedUser));
    } else {
      localStorage.setItem("mojeWydatki", JSON.stringify(newUser));
      setData(newUser);
    }
  }, [newUser, totalAmount]);

  useEffect(() => {
    setAllHistory(
      data?.allExpenses !== undefined && data?.allProceeds !== undefined
        ? [...data.allExpenses, ...data.allProceeds]
        : []
    );
  }, [data?.allProceeds, data?.allExpenses]);

  const [opened, { open, close }] = useDisclosure(false);

  const displayHistory = allHistory.map((item, index) => (
    <Card
      key={index}
      className={classes.historyCard}
      radius="none"
      pl="lg"
      pr="rg"
    >
      <Text className={classes.wide}>{item.title}</Text>
      <Text className={classes.narrow}>{item.date}</Text>
      <Text className={classes.narrow}>{item.amount}</Text>
    </Card>
  ));

  return (
    <div className={classes.page}>
      <ChangeAmoutModal opened={opened} close={close} />
      <Flex align="center" direction="row" justify="space-between" mb="md">
        <Title order={3} weight={500}>
          Witaj, {data?.username}!
        </Title>
        <Button variant="light" color="blue" radius="xl" onClick={open}>
          Dodaj nowy wpływ/wydatek
        </Button>
      </Flex>
      <Flex justify="space-evenly" mt="xl" columnGap="xl">
        <MoneyCard
          color="black"
          sum={data.totalAmount}
          title="Dostępne środki"
        ></MoneyCard>
        <MoneyCard
          color="red"
          sum={expensesSum}
          title="Wszystkie wydatki"
        ></MoneyCard>
        <MoneyCard
          color="green"
          sum={proceedsSum}
          title="Wszystkie wpływy"
        ></MoneyCard>
      </Flex>
      <Title order={4} weight={400} mt="xl">
        Historia wydatków
      </Title>
      <Flex direction="column" gap="md" justify="center" mt="xl">
        <Card className={classes.descCard} radius="xl" shadow="sm" withBorder>
          <Text className={classes.wide}>Tytuł</Text>
          <Text className={classes.narrow}>Data</Text>
          <Text className={classes.narrow}>Kwota</Text>
        </Card>
        {displayHistory}
      </Flex>
    </div>
  );
}

export default AccountPage;
