import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient();

async function main() {
  // Hash the password from the .env file or use a default
  const plainPassword = process.env.NEXT_ADMIN_PASSWORD || 'admin';
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  // Upsert admin user
  const admin = await prisma.admin.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      // Credentials taken from the .env file
      username: process.env.NEXT_ADMIN_USERNAME || 'admin',
      // The password will be hashed using bcrypt
      password: hashedPassword,
      name: process.env.NEXT_ADMIN_NAME || 'Admin',
    },
  });

  const roomNames = ['Colab 1', 'Colab 2', 'Colab 3', 'Colab 4', 'Colab 5', 'Colab 6', 'Podcast Room'];

  // Create Rooms
  for (const roomName of roomNames) {
    const room = await prisma.ruangan.create({
      data: {
        room_name: roomName,
      },
    });

    // Create 6 Sessions for each Room
    for (let i = 1; i <= 4; i++) {
      await prisma.sesi.create({
        data: {
          session: i,
          room_id: room.room_id,
        },
      });
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
