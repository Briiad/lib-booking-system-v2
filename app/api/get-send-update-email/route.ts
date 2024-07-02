import { NextResponse } from "next/server";
import { sendEmail } from "@/components/Email";
import prisma from "@/lib/prisma";

export async function POST(request: Request){
  const res = await request.json();
  const { user_name, user_nim, user_mail, room, session, date, status } = res;

  const email = await sendEmail(
    'Status Regarding Your Library Room Booking Request',
    user_mail,
    `
      <p>Dear ${user_name},</p>
      <p>Thank you for booking a room at the library. Here is the status of your booking request:</p>
      <br>
      <p>Room: <b>${room}</b></p>
      <p>Session: <b>${session}</b></p>
      <p>Date: <b>${date}</b></p>
      <p>Status:<b>${status}</b></p>
      <br>
      <p>Thank you for using our service.</p>

      <p>Regards,</p>
      <p>RuangKita Team</p>
    `,
  )

  return NextResponse.json({ message: 'OK' });
}