import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const { user_name, user_nim, user_mail, room_id, session_id, date } = data;

    // Validate the input data
    if (!user_name || !user_nim || !user_mail || !room_id || !session_id || !date) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Format date without time
    const formattedDate = new Date(date);
    formattedDate.setUTCHours(0, 0, 0, 0);
    // The date formated is 2024-07-04T00:00:00.000Z but the date is 2024-07-05
    // This is because the date is in UTC timezone, so we need to add 1 day to the date
    formattedDate.setDate(formattedDate.getDate() + 1);
    console.log('Formatted date:', formattedDate);

    // Create the new Pinjam_Ruang entry
    const newEntry = await prisma.pinjam_Ruang.create({
      data: {
        user_name,
        user_nim,
        user_mail,
        room_id,
        session_id,
        date: formattedDate,
      },
    });

    return NextResponse.json(newEntry, { status: 201 });
  } catch (error) {
    console.error('Error creating new Pinjam_Ruang entry:', error);
    return NextResponse.json({ error: 'Error creating new Pinjam_Ruang entry' }, { status: 500 });
  }
}
