import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import ExcelJS from 'exceljs';
export const dynamic = 'force-dynamic';
export async function GET(request: Request) {
  try {
    const data = await prisma.riwayat.findMany();
    console.log(data);

    // Create a new workbook and add a worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Data');

    // Define the columns
    worksheet.columns = [
      { header: 'ID', key: 'id', width: 30 },
      { header: 'User Name', key: 'user_name', width: 30 },
      { header: 'User NIM', key: 'user_nim', width: 20 },
      { header: 'User Mail', key: 'user_mail', width: 30 },
      { header: 'Date', key: 'date', width: 20 },
      { header: 'Status', key: 'status', width: 15 },
      { header: 'Room', key: 'room_name', width: 10 },
      { header: 'Session', key: 'session', width: 10 }
    ];

    // Add rows to the worksheet
    data.forEach((row: any) => {
      worksheet.addRow(row);
    });

    // Style the header row
    worksheet.getRow(1).font = { bold: true };

    // Prepare to send the Excel file as a response
    const buffer = await workbook.xlsx.writeBuffer();

    return new Response(buffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment; filename="data.xlsx"',
      },
    });

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
