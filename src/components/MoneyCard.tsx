import { Card, Text, Title } from '@mantine/core'
import React from 'react'

function MoneyCard({sum}: {sum:number | string | undefined}) {
    
  return (
    <Card shadow="sm"  radius="md" withBorder pr="xl" pl="xl">
        <Title order={6} weight={200} mb="md">Dostępne środki</Title>
        <Text mt="s" fz="xl" weight={600}>{sum} zł</Text>
      </Card>)
}

export default MoneyCard