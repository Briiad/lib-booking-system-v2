'use client'

import React, {useState} from 'react';
import { DatePicker } from '@mantine/dates';
import { Box, Group, Button, Center } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';

interface Step2Props {
  nextStep: () => void;
  prevStep: () => void;
  handleDateChange: (date: string) => void;
  formData: { date: string };
}

export const Step2: React.FC<Step2Props> = ({ nextStep, prevStep, handleDateChange, formData }) => {
  const form = useForm({
    initialValues: {
      date: formData.date,
    },
    validate: {
      // Check if the date is less than today, notify user if true
      date: (value) => {
        if (new Date(value) < new Date()) {
          notifications.show({
            title: 'Invalid Date',
            message: 'Please select a date that is not in the past',
            autoClose: 5000,
            color: 'red',
            withBorder: true,
          });
          return 'Invalid Date';
        }
      },
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    handleDateChange(values.date);
    nextStep();
  };

  return (
    <>
      <Box component='form' onSubmit={form.onSubmit(handleSubmit)}>
        <Box style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
          <Center maw={'100%'}>
            <DatePicker
              allowDeselect
              numberOfColumns={1}
              {...form.getInputProps('date')}
            />
          </Center>
        </Box>
        <Group mt="xl">
          <Button onClick={prevStep}>Back</Button>
          <Button type='submit'>Next</Button>
        </Group>
      </Box>
    </>
  );
};
