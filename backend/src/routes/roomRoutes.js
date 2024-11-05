import express from 'express';
import { getAll, getById } from '../controllers/room.js';

const router = express.Router();

router.get('/', getAll);
router.get('/:id', getById);

export default router;