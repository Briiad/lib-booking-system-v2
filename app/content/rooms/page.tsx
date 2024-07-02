'use client'

import React from 'react'
import RoomList from '@/components/RoomsList';

const rooms = [
  {
    title: 'Conference Room A',
    description: 'A spacious conference room with seating for 20 people and modern AV equipment.',
    image: 'https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
  },
  {
    title: 'Meeting Room B',
    description: 'A small meeting room perfect for team discussions and brainstorming sessions.',
    image: 'https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
  },
  {
    title: 'Boardroom',
    description: 'An executive boardroom equipped with the latest technology for seamless meetings.',
    image: 'https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
  }
];

const page = () => {
  return (
    <>
      <RoomList rooms={rooms} />
    </>
  )
}

export default page