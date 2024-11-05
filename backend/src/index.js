import express from 'express';
import roomRoutes from './routes/roomRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';

const app = express();
app.use(express.json());

app.use('/rooms', roomRoutes);
app.use('/bookings', bookingRoutes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});