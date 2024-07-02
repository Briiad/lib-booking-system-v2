import { Container, Group, ActionIcon, rem, Flex, Text, Image } from '@mantine/core';
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram, IconBookmarks } from '@tabler/icons-react';
import classes from '@/css/Footer.module.css';

export function Footer() {
  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Flex>
          {/* Change your icon here, use Image */}
          <IconBookmarks 
            size="1.5rem"
            stroke={1.5}
            color="var(--mantine-color-primary-7)"
          />
          <Text size="md" style={{ marginLeft: 10 }} fw={700} component='a' href='/'>
            RuangKita
          </Text>
        </Flex>
        <Group gap={0} className={classes.links} justify="flex-end" wrap="nowrap">
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandTwitter style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandYoutube style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandInstagram style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </div>
  );
}