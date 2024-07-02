'use client'

import cx from 'clsx';
import React, {useState, useEffect} from 'react'
import { Table, ScrollArea, Button, Box, Text, Title, Pagination, Center, Badge, Drawer, Skeleton, Modal, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from '@/css/RequestTable.module.css';

export const dynamic = 'force-dynamic';

// Async Function to fetch data from API
const fetchData = async (url: string) => {
  const response = await fetch(url);
  return response.json();
};

const predefinedSessions = [
  '08:00 - 10:00',
  '10:00 - 12:00',
  '12:00 - 14:00',
  '14:00 - 16:00',
];

export default function Request() {
  const [scrolled, setScrolled] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);
  const [selectedPost, setSelectedPost] = useState<any | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [opened, { open, close }] = useDisclosure(false);
  const [modalOpened, { open: openModal, close: closeModal }] = useDisclosure(false);
  const [cancelReason, setCancelReason] = useState('');
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 15;

  useEffect(() => {
    setLoading(true);
    fetchData('/api/get-booked-room').then((data) => {
      setPosts(data.data);
      setLoading(false);
    });
  }, []);

  const handleRowClick = (post: any) => {
    setSelectedPost(post);
    open();
  };

  const handleUpdateStatus = async (
    id: string, status:string, user_name: string, user_nim: string, user_mail: string, room: string, session: string, date: string
  ) => {
    try {
      const response = await fetch('/api/update-status', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status }),
      }).finally(() => {
        // Send notification to user via email
        fetch('/api/get-send-update-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_name, user_nim, user_mail, room, session, date, status}),
        }).then((response) => {
          if (response.ok) {
            console.log('Successfully sent notification');
          } else {
            console.error('Failed to send notification');
          }
        });
      })
  
      if (response.ok) {
        const { updatedSession } = await response.json();
        setPosts((prevPosts) => 
          prevPosts.map(post => post.id === id ? { ...post, status } : post)
        );
        console.log('Successfully updated status:', updatedSession);
      } else {
        console.error('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleCancel = async (
    id: string, user_nim: string, user_name: string, user_mail: string, status: string, cancelReason: string, room: string, session: string, date: string
  ) => {
    try {
      const response = await fetch('/api/delete-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id, nim: user_nim, status}),
      }).finally(() => {
        // Send email to user
        fetch('/api/get-send-cancel-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_name, user_mail, status, cancelReason, room, session, date }),
        }).then((response) => {
          if (response.ok) {
            console.log('Successfully sent email');
          } else {
            console.error('Failed to send email');
          }
        });
      })

      if (response.ok) {
        const { data } = await response.json();
        setPosts((prevPosts) => 
          prevPosts.filter(post => post.id !== id)
        );
        console.log('Successfully cancelled booking:', data);
      } else {
        console.error('Failed to cancel booking');
      }
    } catch (error) {
      console.error('Error cancelling booking:', error);
    }
  }

  const paginatedPosts = posts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <ScrollArea h={'auto'} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
        <Table miw={500}>
          <Table.Thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>NIM</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Room</Table.Th>
              <Table.Th>Date</Table.Th>
              <Table.Th>Session</Table.Th>
              <Table.Th>Status</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {
              loading ? (
                // Skeleton for each row
                Array.from({ length: itemsPerPage }).map((_, index) => (
                  <Table.Tr key={index} className={classes.row}>
                    <Table.Td>
                      <Skeleton width={100} height={20} />
                    </Table.Td>
                    <Table.Td>
                      <Skeleton width={100} height={20} />
                    </Table.Td>
                    <Table.Td>
                      <Skeleton width={100} height={20} />
                    </Table.Td>
                    <Table.Td>
                      <Skeleton width={100} height={20} />
                    </Table.Td>
                    <Table.Td>
                      <Skeleton width={100} height={20} />
                    </Table.Td>
                    <Table.Td>
                      <Skeleton width={100} height={20} />
                    </Table.Td>
                    <Table.Td>
                      <Skeleton width={100} height={20} />
                    </Table.Td>
                  </Table.Tr>
                ))
              ) : (
                paginatedPosts?.map((post: any) => (
                  <Table.Tr key={post.id} onClick={() => handleRowClick(post)} className={classes.row}>
                    <Table.Td>{post.user_name}</Table.Td>
                    <Table.Td>
                      <Badge color="blue" size="md" variant='light'>
                        {post.user_nim}
                      </Badge>
                    </Table.Td>
                    <Table.Td>{post.user_mail}</Table.Td>
                    <Table.Td>
                      <Badge color="blue" size="md" variant='light'>
                        {post.room.room_name}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                        {
                          new Intl.DateTimeFormat('en-GB', {
                            year: 'numeric',
                            month: 'long',
                            day: '2-digit'
                          }).format(new Date(post.date))
                        }
                    </Table.Td>
                    <Table.Td>
                      <Badge color="blue" size="md" variant='light'>
                        {
                          predefinedSessions[post.session.session - 1]
                        }
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      {
                        post?.status === 'pending' ? (
                          <Badge color="orange" size="md" variant='light'>
                            {post.status}
                          </Badge>
                        ) : post?.status === 'accepted' ? (
                          <Badge color="green" size="md" variant='light'>
                            {post.status}
                          </Badge>
                        ) : (
                          <Badge color="red" size="md" variant='light'>
                            {post?.status}
                          </Badge>
                        )
                      }
                    </Table.Td>
                  </Table.Tr>
                ))
              )
            }
          </Table.Tbody>
        </Table>
      </ScrollArea>
      <Center maw={'100%'}>
        <Pagination
          value={currentPage}
          onChange={setCurrentPage}
          total={Math.ceil(posts.length / itemsPerPage)}
          className={classes.pagination}
          my={24}
        />
      </Center>
      

      {selectedPost ? (
        <Drawer opened={opened} onClose={close} position='right'>
          <Box p={16}>
            <Title order={3} style={{marginBottom: '16px'}}>Request Details</Title>
            <Text style={{marginBottom: '8px'}}><strong>Name:</strong> {selectedPost.user_name}</Text>
            <Text style={{marginBottom: '8px'}}><strong>NIM:</strong> {selectedPost.user_nim}</Text>
            <Text style={{marginBottom: '8px'}}><strong>Email:</strong> {selectedPost.user_mail}</Text>
            <Text style={{marginBottom: '8px'}}><strong>Room:</strong> {selectedPost.room.room_name}</Text>
            <Text style={{marginBottom: '8px'}}><strong>Session:</strong> {selectedPost.session.session}</Text>
            <Text style={{marginBottom: '8px'}}><strong>Status:</strong> {selectedPost?.status}</Text>

            {/* Button to Accept / Deny */}
            <Box mt={16}>
              {
                // If the status is 'pending', show the button
                selectedPost?.status === 'pending' ? (
                  <>
                    <Button
                      style={{marginRight: '8px'}}
                      onClick={() => {
                        handleUpdateStatus(
                          selectedPost.id,
                          'accepted',
                          selectedPost.user_name,
                          selectedPost.user_nim,
                          selectedPost.user_mail,
                          selectedPost.room.room_name,
                          predefinedSessions[selectedPost.session.session - 1],
                          new Intl.DateTimeFormat('en-GB', {
                            year: 'numeric',
                            month: 'long',
                            day: '2-digit'
                          }).format(new Date(selectedPost.date))
                        );
                        close();
                      }}
                    >
                      Accept
                    </Button>
                    <Button
                      variant='light'
                      onClick={() => {
                        handleUpdateStatus(
                          selectedPost.id,
                          'denied',
                          selectedPost.user_name,
                          selectedPost.user_nim,
                          selectedPost.user_mail,
                          selectedPost.room.room_name,
                          predefinedSessions[selectedPost.session.session - 1],
                          new Intl.DateTimeFormat('en-GB', {
                            year: 'numeric',
                            month: 'long',
                            day: '2-digit'
                          }).format(new Date(selectedPost.date))
                        );
                        close();
                      }}
                    >
                      Deny
                    </Button>
                  </>
                ) : (
                  selectedPost.status === 'accepted' ? (
                    <>
                      <Button
                        onClick={() => {
                          openModal();
                        }}
                      >
                        Cancel
                      </Button>

                      <Modal
                        opened={modalOpened}
                        onClose={closeModal}
                        title='Cancel Verification'
                        size='sm'
                        shadow='sm'
                        padding='md'
                        radius='md'
                        centered
                      >
                        <Text>
                          What is the reason for cancelling the booking?
                        </Text>

                        <TextInput
                          placeholder='Enter reason here...'
                          style={{marginTop: '16px'}}
                          value={cancelReason}
                          onChange={(event) => setCancelReason(event.currentTarget.value)}
                        />

                        <Button
                          style={{marginTop: '16px'}}
                          onClick={() => {
                            handleCancel(
                              selectedPost.id,
                              selectedPost.user_nim,
                              selectedPost.user_name,
                              selectedPost.user_mail,
                              'cancelled',
                              cancelReason,
                              selectedPost.room.room_name,
                              predefinedSessions[selectedPost.session.session - 1],
                              new Intl.DateTimeFormat('en-GB', {
                                year: 'numeric',
                                month: 'long',
                                day: '2-digit'
                              }).format(new Date(selectedPost.date))
                            );
                            closeModal();
                            close();
                          }}
                        >
                          Confirm
                        </Button>

                        <Button
                          style={{marginTop: '16px'}}
                          onClick={closeModal}
                          variant='light'
                        >
                          Cancel
                        </Button>
                        
                      </Modal>
                    </>
                  ) : (
                    null
                  )
                )
              }
            </Box>
          </Box>
        </Drawer>
      ) : (
        null
      )}
    </>
  );
}
