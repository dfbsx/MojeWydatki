import { Card, Text, Title, createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  card: {
    flexGrow: 0.25,
  },
}));

function MoneyCard({
  sum,
  title,
  color,
}: {
  sum: number | string | undefined;
  title: string;
  color: string;
}) {
  const { classes } = useStyles();

  return (
    <Card
      className={classes.card}
      shadow="sm"
      radius="md"
      withBorder
      pr="xl"
      pl="xl"
    >
      <Title order={6} weight={200} mb="md">
        {title}
      </Title>
      <Text color={color} mt="s" fz="xl" weight={600}>
        {sum} zł
      </Text>
    </Card>
  );
}

export default MoneyCard;
