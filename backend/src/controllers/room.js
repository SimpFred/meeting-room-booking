import { PrismaClient } from '@prisma/client';

// Initialize Prisma Client to interact with the database.
const prisma = new PrismaClient();

// Fetch all rooms and include their bookings
export const getAll = async (req, res) => {
    try {
        const rooms = await prisma.room.findMany({
            include: {
                bookings: true,
            },
        });
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ error: "Error fetching rooms" });
    }
};
