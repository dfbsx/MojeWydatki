import {
  Checkbox,
  Modal,
  Flex,
  Button,
  TextInput,
  NumberInput,
} from "@mantine/core";
import { useEffect, useState } from "react";
import useStore from "../states/user";
import { isInRange, isNotEmpty, useForm } from "@mantine/form";

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
  const [newAmountObject, setNewAmountObject] = useState({
    title: "",
    date: "",
    amount: 0,
  });

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

  const [data, setData] = useState<UserData>({
    username: "",
    totalAmount: 0,
    allProceeds: [],
    allExpenses: [],
  });

  const updateObject = (values: any) => {
    setNewAmountObject({
      title: values.title,
      amount: values.amount,
      date: new Date().toLocaleDateString("pl-PL"),
    });
  };

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
    setValue([]);
    close();
  };

  const form = useForm({
    validate: {
      title: isNotEmpty("Podaj nazwę"),
      amount: isInRange({ min: 1 }, "Wartość musi wynosić więcej niż 1"),
    },
    validateInputOnChange: true,
  });

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
          <Checkbox
            value="add"
            label="Nowy wpływ"
            radius="lg"
            size="md"
            disabled={
              value.length !== 0 && value[0] !== "add" ? true : undefined
            }
          />
          <Checkbox
            value="subtract"
            label="Nowy wydatek"
            radius="lg"
            size="md"
            disabled={
              value.length !== 0 && value[0] !== "subtract" ? true : undefined
            }
          />
        </Flex>
      </Checkbox.Group>
      <form onSubmit={updateTotalAmount}>
        <TextInput
          mt="lg"
          label="Podaj nazwę"
          placeholder="Zakupy w Biedronce"
          size="sm"
          withAsterisk
          {...form.getInputProps("title")}
        />
        <NumberInput
          mt="lg"
          label="Podaj kwotę"
          placeholder="500"
          size="sm"
          withAsterisk
          {...form.getInputProps("amount")}
        />
        <Button
          fullWidth
          mt="xl"
          size="md"
          variant="gradient"
          gradient={{ from: "teal", to: "lime", deg: 105 }}
          radius="xl"
          onClick={() => updateObject(form.values)}
          type="submit"
        >
          Dodaj
        </Button>
      </form>
    </Modal>
  );
}

export default ChangeAmoutModal;
