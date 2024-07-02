'use client'

import { Box, Card, Image, Stack, Title, Text, useMantineTheme } from '@mantine/core';

interface RoomListProps {
  rooms: {
    title: string;
    description: string;
    image: string;
  }[];
}

export default function RoomList({ rooms }: RoomListProps) {
  return (
    <Box
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        gap: 20,
        padding: '2rem'
      }}
    >
      {rooms.map((room, index) => (
        <Card key={index} shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section>
            <Image
              src={room.image}
              height={160}
              alt={room.title}
              fit="cover"
            />
          </Card.Section>

          <Stack>
            <Title order={3}>{room.title}</Title>
            <Text>{room.description}</Text>
          </Stack>
        </Card>
      ))}
    </Box>
  );
}
