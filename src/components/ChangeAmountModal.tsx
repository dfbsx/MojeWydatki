import { Checkbox, Modal, Flex, Button, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { useState } from "react";

function ChangeAmoutModal({
  opened,
  close,
}: {
  opened: boolean;
  close: () => void;
}) {
  const [value, setValue] = useState<string[]>([]);
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
        label="Podaj kwotę"
        placeholder="100"
        size="sm"
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
      >
        Dodaj
      </Button>
    </Modal>
  );
}

export default ChangeAmoutModal;
