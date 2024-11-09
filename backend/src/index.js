import express from 'express';
import cors from 'cors';
import roomRoutes from './routes/roomRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';

const app = express();

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000'
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/rooms', roomRoutes);
app.use('/bookings', bookingRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});