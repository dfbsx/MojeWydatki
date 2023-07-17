import { Checkbox, Modal, Flex, Button, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import useStore from "../states/user";

function ChangeAmoutModal({
  opened,
  close,
}: {
  opened: boolean;
  close: () => void;
}) {
  const [value, setValue] = useState<string[]>([]);
  const totalAmount = useStore((state) => state.totalAmount);
  const { increase, subtract, setTotalAmount } = useStore();
  interface UserData {
    username: string;
    totalAmount: number;
    allProceeds: any[];
    allExpenses: any[];
  }

  const [data, setData] = useState<UserData>({
    username: "",
    totalAmount: 0,
    allProceeds: [],
    allExpenses: [],
  });

  const [newAmountObject, setNewAmountObject] = useState({
    title: "",
    date: "",
    amount: 0,
  });

  const updateTotalAmount = () => {
    if (value[0] === "add") {
      increase(newAmountObject.amount);
      const addedData = {
        ...data,
        allProceeds: [...data.allProceeds, newAmountObject],
      };
      setData(addedData);
      localStorage.setItem("mojeWydatki", JSON.stringify(addedData));
    } else {
      subtract(newAmountObject.amount);
      const updatedData = {
        ...data,
        allExpenses: [...data.allExpenses, newAmountObject],
      };
      setData(updatedData);
      localStorage.setItem("mojeWydatki", JSON.stringify(updatedData));
    }
    setNewAmountObject({
      ...newAmountObject,
      date: new Date().toLocaleDateString("pl-PL"),
    });
    close();
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("mojeWydatki") || "{}");
    setData(storedData);
    if (totalAmount === 0) {
      setTotalAmount(storedData.totalAmount);
    }
    if (totalAmount !== 0) {
      storedData.totalAmount = totalAmount;
      localStorage.setItem("mojeWydatki", JSON.stringify(storedData));
    }
  }, [totalAmount]);

  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Dodaj nowy wpływ/wydatek"
      padding="lg"
    >
      <Checkbox.Group
        value={value}
        onChange={setValue}
        label="Wybierz rodzaj zmiany salda"
        withAsterisk
      >
        <Flex align="center" direction="row" justify="space-evenly" mt="md">
          <Checkbox value="add" label="Nowy wpływ" radius="lg" size="md" />
          <Checkbox
            value="subtract"
            label="Nowy wydatek"
            radius="lg"
            size="md"
          />
        </Flex>
      </Checkbox.Group>
      <TextInput
        mt="lg"
        label="Podaj nazwę"
        placeholder="Zakupy w Biedronce"
        size="sm"
        withAsterisk
        onChange={(event) =>
          setNewAmountObject({
            ...newAmountObject,
            title: event.currentTarget.value,
          })
        }
      />
      <TextInput
        mt="lg"
        label="Podaj kwotę"
        placeholder="500"
        size="sm"
        onChange={(event) =>
          setNewAmountObject({
            ...newAmountObject,
            amount: Number(event.currentTarget.value),
          })
        }
        withAsterisk
      />
      <Button
        fullWidth
        mt="xl"
        size="md"
        variant="gradient"
        gradient={{ from: "teal", to: "lime", deg: 105 }}
        radius="xl"
        type="submit"
        onClick={updateTotalAmount}
      >
        Dodaj
      </Button>
    </Modal>
  );
}

export default ChangeAmoutModal;
