import { Checkbox, Modal, Flex, Button, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import useStore from "../states/user";
import { useInputState } from "@mantine/hooks";

function ChangeAmoutModal({
  opened,
  close,
}: {
  opened: boolean;
  close: () => void;
}) {
  const [newAmountValue, setNewAmountValue] = useInputState(0);
  const [value, setValue] = useState<string[]>([]);
  const totalAmount = useStore((state) => state.totalAmount);
  const { increase, subtract, setTotalAmount } = useStore();
  const [data, setData] = useState({});
  const [newAmountObject, setNewAmountObject] = useState({
    title: "",
    date: "",
    amount: "",
  });
  const updateTotalAmount = () => {
    if (value[0] === "add") {
      increase(newAmountValue);
    } else {
      subtract(newAmountValue);
    }
    close();
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("mojeWydatki") || "{}");
    if (totalAmount === 0) {
      setTotalAmount(storedData.totalAmount);
    }
    console.log("obecna suma", totalAmount);
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
      />
      <TextInput
        mt="lg"
        label="Podaj kwotę"
        placeholder="500"
        size="sm"
        onChange={(event) =>
          setNewAmountValue(Number(event.currentTarget.value))
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
