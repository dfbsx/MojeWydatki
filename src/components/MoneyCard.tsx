import { Card, Text, Title } from '@mantine/core'
import React from 'react'

function MoneyCard({sum}: {sum:number}) {
    
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Title order={6} weight={200}>Dostępne środki</Title>
        <Text mt="s"  fz="xl">{sum} zł</Text>
      </Card>)
}

export default MoneyCard