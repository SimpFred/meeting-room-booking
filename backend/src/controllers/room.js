import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAll = async (req, res) => {
    try {
        const rooms = await prisma.room.findMany();
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ error: "Error fetching rooms" });
    }
};

export const getById = async (req, res) => {
    const { id } = req.params;
    try {
        const room = await prisma.room.findUnique({
            where: {
                id: parseInt(id),
            },
        });
        res.json(room);
    } catch (error) {
        res.status(500).json({ error: "Error fetching room" });
    }
};