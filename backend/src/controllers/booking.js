import { PrismaClient } from '@prisma/client';

// Initialize Prisma Client to interact with the database.
const prisma = new PrismaClient();

// Create a new booking in the database
export const create = async (req, res) => {
    const { roomId, startTime, endTime, bookedBy } = req.body;
    try {
        const newBooking = await prisma.booking.create({
            data: {
                roomId,
                startTime: new Date(startTime),
                endTime: new Date(endTime),
                bookedBy,
            },
        });
        res.json(newBooking);
    } catch (error) {
        res.status(500).json({ error: "Error creating booking" });
    }
};