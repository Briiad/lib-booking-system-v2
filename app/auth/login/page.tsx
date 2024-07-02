'use client'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'

import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useForm } from '@mantine/form';
import classes from '@/css/Authentication.module.css';

export default function LoginPage(){
  const router = useRouter()
  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
    validate: {
      // Username must be at least 3 characters long
      username: (value) => value.length < 3 ? 'Username must be at least 3 characters long' : null
    }
  });

  const handleSignIn = async (values: { username: string, password: string }) => {

    console.log(values);

    const result = await signIn('credentials', {
      redirect: false,
      username: values.username,
      password: values.password,
    });

    if(result?.ok){
      router.push('/admin');
      // console.log('Success');
    } else {
      notifications.show({
        title: 'Failed to sign in',
        message: 'Check your username and password',
        color: 'red',
      });
    }
  }

  return(
    <Container size={420} my={40} className={classes.container}>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md" className={classes.paper}>
        <form onSubmit={form.onSubmit(handleSignIn)}>
          <TextInput label="Username" placeholder="Username" {...form.getInputProps('username')} />
          <PasswordInput label="Password" placeholder="Password" mt="md" {...form.getInputProps('password')} />
          <Group mt="lg">
            <Button type="submit" fullWidth className={classes.button}>Login</Button>
          </Group>
        </form>
      </Paper>
    </Container>
  )
}