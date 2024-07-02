import React from 'react';
import { useForm } from '@mantine/form';
import { Button, TextInput, Box } from '@mantine/core';

interface Step1Props {
  nextStep: () => void;
  handleChange: (input: string) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  formData: { name: string; nim: string, mail: string};
}

export const Step1: React.FC<Step1Props> = ({ nextStep, handleChange, formData }) => {
  const { name, nim, mail } = formData;

  const form = useForm({
    mode: 'uncontrolled',
    validateInputOnChange: true,
    initialValues: {
      name: formData.name,
      nim: formData.nim,
      mail: formData.mail,
    },

    validate: {
      name: (value) => (value.length < 3 ? 'Name must be at least 3 characters long' : null),
      nim: (value) => (isNaN(Number(value)) ? 'NIM must be numeric' : null),
      mail: (value) => (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) ? 'Invalid email' : null),
    }
  })

  const handleSubmit = async (values: typeof form.values) => {
    await new Promise<void>((resolve) => {
      handleChange('name')({ target: { value: values.name }, persist: () => {} } as React.ChangeEvent<HTMLInputElement>);
      resolve();
    });
    await new Promise<void>((resolve) => {
      handleChange('nim')({ target: { value: values.nim }, persist: () => {} } as React.ChangeEvent<HTMLInputElement>);
      resolve();
    });
    await new Promise<void>((resolve) => {
      handleChange('mail')({ target: { value: values.mail }, persist: () => {} } as React.ChangeEvent<HTMLInputElement>);
      resolve();
    });
    nextStep();
  };

  return (
    <>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Box style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
          <TextInput
            label="Name"
            placeholder="Enter your name"
            {...form.getInputProps('name')}
          />
          <TextInput
            label="NIM"
            placeholder="Enter your NIM number"
            {...form.getInputProps('nim')}
          />
          <TextInput
            label="Email"
            placeholder="Enter your email"
            {...form.getInputProps('mail')}
          />
        </Box>
        <Button type='submit' mt='xl'>Next</Button>
      </form>
    </>
  );
};
