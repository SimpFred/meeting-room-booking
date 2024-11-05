import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedDatabase() {
    // Create rooms
    const rooms = [
        { name: 'Margret', capacity: 4 },
        { name: 'Steve', capacity: 6 },
        { name: 'Ada', capacity: 10 },
        { name: 'Edmund', capacity: 10 },
        { name: 'Grace', capacity: 20 },
    ];

    for (const room of rooms) {
        await prisma.room.create({
            data: room,
        });
    }

    console.log('Rooms have been created');

    // Fetch the first room to use for the booking
    const firstRoom = await prisma.room.findFirst();

    // Create a booking
    const newBooking = await prisma.booking.create({
        data: {
            roomId: firstRoom.id,
            startTime: new Date('2024-11-05T09:00:00Z'),
            endTime: new Date('2024-11-05T10:00:00Z'),
            bookedBy: 'Simon Fred',
        },
    });

    console.log(newBooking);
}

seedDatabase().catch((e) => {
    console.error(e);
    prisma.$disconnect();
});