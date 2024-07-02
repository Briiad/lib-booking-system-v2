'use client'

import React, { useState } from 'react';
import { Step1 } from '@/components/MultiStepForm/Step1';
import { Step2 } from '@/components/MultiStepForm/Step2';
import { Step3 } from '@/components/MultiStepForm/Step3';
import { Step4 } from '@/components/MultiStepForm/Step4';
import { Container, Grid, Stepper } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconX, IconCheck } from '@tabler/icons-react';

const MultiStepForm = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    nim: '',
    mail: '',
    date: '',
    room: '',
    session: { session_id: '', session_time: '' }
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleChange = (input: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(input, e.target.value);
    setFormData((prevFormData) => ({ ...prevFormData, [input]: e.target.value }));
  };

  const handleDateChange = (date: string) => {
    console.log(date);
    setFormData({ ...formData, date });
  };

  const handleRoomChange = (room: string) => {
    console.log(room);
    setFormData({ ...formData, room });
  };

  const handleSessionChange = (session: { session_id: string; session_time: string }) => {
    console.log(session.session_id);
    setFormData({ ...formData, session });
  };

  const submitForm = async () => {
    // console.log(formData);
    // console.log(new Date(formData.date).toISOString())
    try {
      const response = await fetch('/api/post-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_name: formData.name,
          user_nim: formData.nim,
          user_mail: formData.mail,
          room_id: formData.room,
          session_id: formData.session.session_id,
          date: formData.date,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Form submitted successfully:', result);
        // Handle successful submission (e.g., show a success message, redirect, etc.)
        notifications.show({
          title: 'Request Submitted',
          message: 'Your room booking request will be processed soon. Please check your email for further information.',
          color: 'green',
          icon: <IconCheck />,
          autoClose: 7000,
          withCloseButton: true,
        })

        // Move to home page after form submission
        // setTimeout(() => {
        //   window.location.href = '/';
        // }, 2000);
        
      } else {
        const error = await response.json();
        console.error('Error submitting form:', error);
        // Handle submission error (e.g., show an error message)
        notifications.show({
          title: 'Request Failed',
          message: 'An error occurred while submitting your request. Please try again later.',
          color: 'red',
          icon: <IconX />,
          autoClose: 7000,
          withCloseButton: true,
        })
        // Move to home page after form submission
        // setTimeout(() => {
        //   window.location.href = '/form';
        // }, 2000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle submission error (e.g., show an error message)
      notifications.show({
        title: 'Server Error',
        message: 'The server encountered an error while processing your request. Please try again later.',
        color: 'red',
        icon: <IconX />,
        autoClose: 7000,
        withCloseButton: true,
      })
    }
  };

  return(
    <Container>
      <Grid gutter={{ base: 5, xs: 'md', md: 'xl', xl: 50 }} mt={{base: 12, md: 0}} >
        <Grid.Col span={{base: 12, md: 4}}>
          <Stepper active={step} onStepClick={setStep} orientation='vertical' allowNextStepsSelect={false}>
            <Stepper.Step label="User Info" description="Enter your name and NIM">
            </Stepper.Step>
            <Stepper.Step label="Pick Date" description="Select a date">
            </Stepper.Step>
            <Stepper.Step label="Pick Room" description="Select a room">
            </Stepper.Step>
            <Stepper.Step label="Pick Session" description="Select a session">
            </Stepper.Step>
          </Stepper>
        </Grid.Col>
        <Grid.Col span={{base: 12, md: 8}}>
          {step === 0 && <Step1 nextStep={nextStep} handleChange={handleChange} formData={formData} />}
          {step === 1 && <Step2 nextStep={nextStep} prevStep={prevStep} handleDateChange={handleDateChange} formData={formData} />}
          {step === 2 && <Step3 nextStep={nextStep} prevStep={prevStep} handleRoomChange={handleRoomChange} formData={formData} />}
          {step === 3 && <Step4 prevStep={prevStep} submitForm={submitForm} handleSessionChange={handleSessionChange} formData={formData} />}
        </Grid.Col>
      </Grid>
    </Container>
  )
};

export default MultiStepForm;
