'use client'

import cx from 'clsx';
import React, {useState, useEffect} from 'react'
import { Table, ScrollArea, Button, Box, Text, Title, Pagination, Center, Badge, Drawer, Skeleton, Modal, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from '@/css/HistoryTable.module.css';

export const dynamic = 'force-dynamic';

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

const History = () => {
  const [scrolled, setScrolled] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  useEffect(() => {
    setLoading(true);
    fetchData('/api/get-history').then((data) => {
      setPosts(data.data);
      setLoading(false);
    });
  }, []);

  const paginatedPosts = posts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const downloadFile = async () => {
    // Get the file from the server
    const response = await fetch('/api/get-csv', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // Get the file data
    const fileData = await response.blob()
    
    // Create a URL for the file
    const fileURL = URL.createObjectURL(fileData)
    
    // Create an anchor element
    const downloadLink = document.createElement('a')
    downloadLink.href = fileURL
    downloadLink.download = 'data.xlsx'

    // Append the anchor element to the body
    document.body.appendChild(downloadLink)

    // Click the anchor element
    downloadLink.click()

    // Remove the anchor element
    document.body.removeChild(downloadLink)

    // Revoke the object URL
    URL.revokeObjectURL(fileURL)

    // Log the response
    console.log(response)
  }

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
                  <Table.Tr key={post.id} className={classes.row}>
                    <Table.Td>{post.user_name}</Table.Td>
                    <Table.Td>
                      <Badge color="blue" size="md" variant='light'>
                        {post.user_nim}
                      </Badge>
                    </Table.Td>
                    <Table.Td>{post.user_mail}</Table.Td>
                    <Table.Td>
                      <Badge color="blue" size="md" variant='light'>
                        {post.room_name}
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
                          predefinedSessions[post.session - 1]
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

      {/* Button to download */}
      <Button
        onClick={() => {
          // Download the file
          downloadFile()
        }}
        style={{ margin: '20px 0' }}
      >
        Download
      </Button>
    </>
  )
}

export default History