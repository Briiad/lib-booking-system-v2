import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');
  const room = searchParams.get('room');

  if (!date || !room) {
    return NextResponse.json({ error: 'Date and room are required' }, { status: 400 });
  }

  const formattedDate = new Date(date);
  formattedDate.setUTCHours(0, 0, 0, 0);
  console.log('Formatted date:', formattedDate);

  try {
    const sessions = await prisma.sesi.findMany({
      where: {
        room_id: room,
      },
    });

    const bookedSessions = await prisma.pinjam_Ruang.findMany({
      where: {
        room_id: room,
        date: new Date(date),
      },
      select: {
        session_id: true,
      },
    });

    return NextResponse.json({ sessions, bookedSessions });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error fetching sessions' }, { status: 500 });
  }
}
