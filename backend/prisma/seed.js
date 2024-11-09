import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedDatabase() {
    // Initialize the database with the rooms data if it's empty
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
}

seedDatabase().catch((e) => {
    console.error(e);
    prisma.$disconnect();
});