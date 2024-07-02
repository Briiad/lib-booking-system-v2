'use client';

import React, { useEffect, useState } from 'react';
import { Button, Box, Group, UnstyledButton, Radio, Text, SimpleGrid, Loader, Center } from '@mantine/core';
import classes from '@/css/SessionPicker.module.css';

interface Step4Props {
  prevStep: () => void;
  submitForm: () => void;
  handleSessionChange: (session: { session_id: string; session_time: string }) => void;
  formData: { date: string; room: string; session: { session_id: string; session_time: string } };
}

const predefinedSessions = [
  "08.00 - 10.00",
  "10.00 - 12.00",
  "12.00 - 14.00",
  "14.00 - 16.00"
];

interface SessionRadioProps {
  checked: boolean;
  onChange: () => void;
  title: string;
  disabled: boolean;
}

const SessionRadio: React.FC<SessionRadioProps> = ({ checked, onChange, title, disabled }) => {
  return (
    <UnstyledButton
      onClick={onChange}
      data-checked={checked || undefined}
      className={classes.button}
      disabled={disabled}
    >
      <div className={classes.body}>
        <Text fw={500} size="sm" lh={1} color={disabled ? 'gray' : 'black'}>
          {title}
        </Text>
      </div>

      <Radio
        checked={checked}
        onChange={() => {}}
        tabIndex={-1}
        style={{ input: { cursor: 'pointer' } }}
        disabled={disabled}
      />
    </UnstyledButton>
  );
};

export const Step4: React.FC<Step4Props> = ({ prevStep, submitForm, handleSessionChange, formData }) => {
  const { date, room, session } = formData;
  const [availableSessions, setAvailableSessions] = useState<{ session_id: string; session_time: string }[]>([]);
  const [bookedSessions, setBookedSessions] = useState<string[]>([]);
  const [selectedSession, setSelectedSession] = useState<string>(session.session_time);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    if (date && room) {
      fetch(`/api/get-session?date=${date}&room=${room}`)
        .then(response => response.json())
        .then(data => {
          const fetchedSessions = data.sessions.map((s: { session_id: string, session: number }) => ({
            session_id: s.session_id,
            session_time: predefinedSessions[s.session - 1],
          }));
          const booked = data.bookedSessions.map((s: { session_id: string }) => s.session_id);
          setAvailableSessions(fetchedSessions);
          setBookedSessions(booked);
          console.log('Fetched sessions:', fetchedSessions);
          console.log('Booked sessions:', booked);
          setLoading(false);
        })
        .catch(error => console.error('Error fetching sessions:', error));
    }
  }, [date, room]);

  const handleSessionSelect = (session: { session_id: string; session_time: string }) => {
    setSelectedSession(session.session_time);
    handleSessionChange(session);
  };

  const items = availableSessions.map((session) => (
    <SessionRadio 
      key={session.session_id} 
      title={session.session_time} 
      checked={selectedSession === session.session_time} 
      onChange={() => handleSessionSelect(session)} 
      disabled={bookedSessions.includes(session.session_id)}
    />
  ));

  return (
    <>
      <Box style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
        <SimpleGrid cols={{base: 2, md: 3}} spacing={{base: 'sm', md:'lg'}}>
          {
            loading ?
              <Center maw={'100%'}>
                <Loader color='blue' size={32} />
              </Center>
              :
              items
          }
        </SimpleGrid>

        <Group mt="xl">
          <Button onClick={prevStep}>Back</Button>
          <Button onClick={submitForm}>Submit</Button>
        </Group>
      </Box>
    </>
  );
};
