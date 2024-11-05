import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAll = async (req, res) => {
    try {
        const bookings = await prisma.booking.findMany();
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: "Error fetching rooms" });
    }
};

export const getById = async (req, res) => {
    const { id } = req.params;
    try {
        const booking = await prisma.booking.findUnique({
            where: {
                id: parseInt(id),
            },
        });
        res.json(booking);
    } catch (error) {
        res.status(500).json({ error: "Error fetching room" });
    }
};

// creating a new booking

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

// fetching all bookings