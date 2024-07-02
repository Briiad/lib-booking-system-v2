import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  // Get all booked rooms
  const history = await prisma.riwayat.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return NextResponse.json({data: history});
}
