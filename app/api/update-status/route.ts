import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(request: Request) {
  try {
    // Parse request body
    const { id, status } = await request.json();

    // Update the status of the session in Pinjam_Ruang table
    const updatedSession = await prisma.pinjam_Ruang.update({
      where: { id },
      data: { status },
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
    });

    // Insert the updated session into Riwayat table
    const newHistory = await prisma.riwayat.create({
      data: {
        user_name: updatedSession.user_name,
        user_nim: updatedSession.user_nim,
        user_mail: updatedSession.user_mail,
        room_id: updatedSession.room_id,
        room_name: updatedSession.room.room_name,
        date: updatedSession.date,
        startDate: new Date(),
        session_id: updatedSession.session_id,
        session: updatedSession.session.session,
        status: updatedSession.status,
      },
    });

    // Return the updated session
    return NextResponse.json({ updatedSession });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update the session' }, { status: 500 });
  }
}
