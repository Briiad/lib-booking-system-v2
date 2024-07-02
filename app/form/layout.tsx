import { Box, Paper, Title, Container, Center } from '@mantine/core';
import Navbar from "@/components/Navbar"
import { Footer } from '@/components/Footer';
import classes from '@/css/FormLayout.module.css'

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <>
      <Navbar />
      <Paper
        className={classes.wrapper}
      >
        <Box
          className={classes.form}
          p={{base: 16, md: 64}}
        >
          <Container>
            <Center
              maw={'100%'} h={100}
            >
              <Title order={1} pb={{base:16, md: 32}}>
                Form Peminjaman Ruangan
              </Title>
            </Center>
            {children}
          </Container>
        </Box>
      </Paper>
      <Footer />
    </>
  )
}