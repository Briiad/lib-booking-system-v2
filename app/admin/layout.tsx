'use client'

import { useState } from 'react';
import { useSession, getSession } from "next-auth/react"
import Link from 'next/link'
import { redirect } from 'next/navigation';
import { signOut } from "next-auth/react"
import { Center, Tooltip, UnstyledButton, Stack, rem } from '@mantine/core';
import {
  IconHome2,
  IconGauge,
  IconCalendarStats,
  IconLogout,
  IconHistory,
} from '@tabler/icons-react';
import { IconBookmarksFilled } from '@tabler/icons-react';
import classes from '@/css/SideNav.module.css';

export const dynamic = 'force-dynamic';

interface NavbarLinkProps {
  icon: typeof IconHome2;
  label: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton onClick={onClick} className={classes.link} data-active={active || undefined}>
        <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const mockdata = [
  { icon: IconHome2, label: 'Home', href: '/admin/', id: 1101},
  { icon: IconGauge, label: 'Dashboard', href: '/admin/dashboard', id: 1102},
  { icon: IconCalendarStats, label: 'Requests', href: '/admin/request', id: 1103},
  { icon: IconHistory, label: 'History', href: '/admin/history', id: 1104},
];

export default function Layout({children}: {children: React.ReactNode}) {
  const [active, setActive] = useState(0);
  const { data: session, status } = useSession();

  if (status === 'loading') return null;
  if (!session) {
    redirect('/unauthorized');
  }

  return (
    <>
      <nav className={classes.navbar}>
        <Center>
          <Link href="/admin/">
              <IconBookmarksFilled style={{ width: rem(30), height: rem(30), color:'white' }} stroke={1.5} />
          </Link>
        </Center>

        <div className={classes.navbarMain}>
          <Stack justify="center" gap={0}>
            {
              mockdata.map((link, index) => (
                <Link href={link.href} 
                key={link.id}>
                  <NavbarLink
                    {...link}
                    active={active === index}
                    onClick={() => setActive(index)}
                  />
                </Link>
              ))
            }
          </Stack>
        </div>

        <Stack justify="center" gap={0}>
          <NavbarLink icon={IconLogout} label="Logout" onClick={() => signOut({redirect: true, callbackUrl: `${window.location.origin}`})} />
        </Stack>
      </nav>

      <div className={classes.content}>
        {children}
      </div>
    </>
  )
}