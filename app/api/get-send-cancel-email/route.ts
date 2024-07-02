import { NextResponse } from "next/server";
import { sendEmail } from "@/components/Email";
import prisma from "@/lib/prisma";

export async function POST(request: Request){
  const res = await request.json();
  const { user_name, user_mail, status, cancelReason, room, session, date } = res;

  const email = await sendEmail(
    'Room Booking Cancellation Information',
    user_mail,
    `
      <p>Dear ${user_name},</p>
      <p>
        We are sorry to inform you that your booking for <b<${room}</b> on <b>${date}</b> at <b>${session}</b> has been cancelled.
      </p>
      <p>
        <b>Reason for Cancellation:</b> ${cancelReason}
      </p>
      <p>
        <b>Status:</b> ${status}
      </p>
      
      <p> We greatly encourage you to book another room as long as it is available. </p>
      <p> Thank you for your understanding. </p>

      <p>Best Regards,</p>
      <p>RuangKita Team</p>
    `,
  )

  return NextResponse.json({ message: 'OK' });
}