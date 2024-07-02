'use client';

import Link from 'next/link';
import { Menu, Group, Center, Burger, Container, Text, useMantineTheme, Flex, Drawer, Box, ScrollArea, Image } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown, IconBookmarks } from '@tabler/icons-react';
import classes from '../css/Navbar.module.css';

const links = [
  { label: 'Beranda', link: '/' },
  { label: 'Tentang', link: '/content/about' },
  {
    label: 'Ruangan',
    link: '#2',
    links: [
      { label: 'List Ruangan', link: '/content/rooms' },
    ],
  },
  { label: 'Kontak', link: '/content/contact' },
];

export default function Navbar() {
  const theme = useMantineTheme();
  const [opened, { toggle: openNav, close: closeNav }] = useDisclosure(false);

  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Link key={item.link} href={item.link}>
        <Menu.Item>{item.label}</Menu.Item>
      </Link>
    ));

    if (menuItems) {
      return (
        <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
          <Menu.Target>
            <Link
              href={link.link}
              className={classes.link}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size="0.9rem" stroke={1.5} />
              </Center>
            </Link>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <Link
        key={link.label}
        href={link.link}
        className={classes.link}
      >
        {link.label}
      </Link>
    );
  });

  const drawerItems = links.map((link) => {
    const subLinks = link.links?.map((item) => (
      <Link key={item.link} href={item.link} className={classes.drawerLink}>
        {item.label}
      </Link>
    ));

    return (
      <div key={link.label}>
        <Link href={link.link} className={classes.drawerLink}>
          {link.label}
        </Link>
        {subLinks && <div className={classes.drawerSubLinks}>{subLinks}</div>}
      </div>
    );
  });

  return (
    <Box>
      <header className={classes.header}>
        <Container size="md">
          <div className={classes.inner}>
            <Flex>
              {/* Put your Icon Here, use Image */}
              <IconBookmarks 
                size="1.5rem"
                stroke={1.5}
                color="var(--mantine-color-primary-7)"
              />
              <Text size="md" style={{ marginLeft: 10 }} fw={700} component='a' href='/'>
                RuangKita
              </Text>
            </Flex>
            
            <Group gap={5} visibleFrom="sm">
              {items}
            </Group>
            <Burger opened={opened} onClick={openNav} size="sm" hiddenFrom="sm" />
          </div>
        </Container>
      </header>

      <Drawer
        opened={opened}
        onClose={closeNav}
        padding="md"
        position="right"
        size="md"
        withCloseButton
      >
        <ScrollArea style={{ height: 'calc(100vh - 60px)' }}>
          <div className={classes.drawerContent}>
            {drawerItems}
          </div>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
