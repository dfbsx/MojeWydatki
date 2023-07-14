import { Card, Text, Title } from '@mantine/core'
import React from 'react'

function MoneyCard({sum}: {sum:number}) {
    
  return (
    <Card shadow="sm" padding="xl" radius="md" withBorder>
        <Title order={6} weight={200} mb="md">Dostępne środki</Title>
        <Text mt="s" fz="xl" weight={600}>{sum} zł</Text>
      </Card>)
}

export default MoneyCard