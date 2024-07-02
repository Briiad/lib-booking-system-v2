'use client'

import React, { useEffect, useState } from 'react';
import { Box, Group, Button, UnstyledButton, Radio, Text,  SimpleGrid, Loader, Center } from '@mantine/core';
import classes from '@/css/RoomPicker.module.css';

interface Step3Props {
  nextStep: () => void;
  prevStep: () => void;
  handleRoomChange: (room: string) => void;
  formData: { date: string; room: string };
}

interface ImageRadioProps {
  checked: boolean;
  onChange: () => void;
  value: string;
  label: string;
}

// Async Function to fetch data from API
const fetchData = async (url: string) => {
  const response = await fetch(url);
  // console.log(response);
  return response.json();
};

export function ImageRadio({
  checked,
  onChange,
  value,
  label,
  className,
  ...others
}: ImageRadioProps & Omit<React.ComponentPropsWithoutRef<'button'>, keyof ImageRadioProps>) {
  return (
    <UnstyledButton
      {...others}
      onClick={onChange}
      data-checked={checked || undefined}
      className={classes.button}
    >

      <div className={classes.body}>
        <Text fw={500} size="sm" lh={1}>
          {label}
        </Text>
      </div>

      <Radio
        checked={checked}
        onChange={() => {}}
        tabIndex={-1}
        style={{ input: { cursor: 'pointer' } }}
      />
    </UnstyledButton>
  );
}

export const Step3: React.FC<Step3Props> = ({ nextStep, prevStep, handleRoomChange, formData }) => {
  const { date, room } = formData;
  const [selectedRoom, setSelectedRoom] = useState<string>(room);
  const [loading, setLoading] = useState<boolean>(true);

  const [rooms, setRooms] = useState<{ 
    value: string;
    label: string;
  }[]>([]);

  // Get Rooms from API
  useEffect(() => {
    setLoading(true);
    fetchData(`/api/get-room?date=${date}`).then((data) => {
      // console.log(data);
      setRooms(data?.rooms?.map((room: { room_id: string; room_name: string }) => ({ value: room.room_id, label: room.room_name })));
      setLoading(false);
    });
  }, [date]);

  const handleRoomSelect = (roomTitle: string, roomId: string) => {
    setSelectedRoom(roomId);
    handleRoomChange(roomId);
  };

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
              rooms?.map((room) => (
                <ImageRadio 
                  {...room} 
                  key={room.value} 
                  checked={selectedRoom === room.value} 
                  onChange={() => handleRoomSelect(room.label, room.value)} 
                />
              ))
          }
        </SimpleGrid>

        <Group mt="xl">
          <Button onClick={prevStep}>Back</Button>
          <Button onClick={nextStep}>Next</Button>
        </Group>
      </Box>
    </>
  );
};