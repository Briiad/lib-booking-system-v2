'use client'

import React from 'react'
import { Container, Title, Text, SimpleGrid, Card, Image } from '@mantine/core';
import { UserAbout } from '@/components/UserAbout';
import classes from '@/css/About.module.css';

const About = () => {
  return (
    <Container className={classes.container}>
      <Title className={classes.title}>About Us</Title>
      <Text className={classes.text}>
        Our room booking application helps you easily book rooms for meetings, conferences, and events. Developed by a dedicated team of two, we strive to provide the best user experience.
      </Text>
      <SimpleGrid cols={2} spacing="lg" className={classes.grid}>
        <UserAbout
          title="John Doe"
          email="john.doe@gmail.com"
          role="CEO"
          avatar="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
        />

        <UserAbout
          title="Jane Doe"
          email="jane.doe@gmail.com"
          role="CTO"
          avatar="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png"
        />
      </SimpleGrid>
    </Container>
  );
};

export default About;