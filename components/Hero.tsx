import { Container, Text, Button, Group } from '@mantine/core';
import {IconLibrary} from '@tabler/icons-react';
import classes from '../css/Hero.module.css';

export default function Hero() {
  return (
    <div className={classes.wrapper}>
      <Container className={classes.inner}>
        <h1 className={classes.title}>
          Aplikasi{' '}
          <Text component="span" variant="gradient"  inherit>
            RuangKita
          </Text>{' '}
          untuk perpustakaan.
        </h1>
  
        <Text className={classes.description} color="dimmed">
          Aplikasi ini adalah sebuah solusi untuk memecahkan masalah peminjaman ruangan di perpustakaan secara online dan terintegrasi.
        </Text>
  
        <Group className={classes.controls}>
          <Button
            size="xl"
            className={classes.control}
            variant="filled"
            component='a'
            href="/form"
          >
            Pinjam Ruangan
          </Button>
  
          <Button
            component="a"
            href="/content/rooms"
            size="xl"
            color="tertiary"
            className={classes.control}
            leftSection={<IconLibrary size={20} />}
          >
            List Ruangan
          </Button>
        </Group>
      </Container>
    </div>
  );
}