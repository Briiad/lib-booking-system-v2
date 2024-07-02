import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
export const dynamic = 'force-dynamic';
export async function GET(request: Request) {
  // Get all booked rooms
  const bookedRooms = await prisma.pinjam_Ruang.findMany({
    include: {
      room: {
        select: {
          room_name: true,
        },
      },
      session: {
        select: {
          session: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return NextResponse.json({data: bookedRooms});
}
