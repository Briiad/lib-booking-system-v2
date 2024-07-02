import { Avatar, Text, Button, Paper } from '@mantine/core';

interface UserInfoActionProps {
  title: string;
  email: string;
  role: string;
  avatar: string;
}

export function UserAbout({ title, email, role, avatar }: UserInfoActionProps) {
  return (
    <Paper radius="md" withBorder p="lg" bg="var(--mantine-color-body)">
      <Avatar
        src={avatar}
        size={120}
        radius={120}
        mx="auto"
      />
      <Text ta="center" fz="lg" fw={500} mt="md">
        {title}
      </Text>
      <Text ta="center" c="dimmed" fz="sm">
        {email}
      </Text>

      <Button variant="default" fullWidth mt="md">
        Send message
      </Button>
    </Paper>
  );
}