"use client";
import { BookingProvider } from '../context/bookingContext';
import DropdownContainer from '../components/dropDownMenu/dropDownContainer';
import BookingCalendar from '../components/bookingCalandar/bookingCalandar';

export default function Booking() {
  const bookings = {
    '2023-10-18': [
      { name: 'Steve', capacity: 6, start: '08:00', end: '09:00' },
      { name: 'Ada', capacity: 10, start: '08:00', end: '09:00' },
      { name: 'Margret', capacity: 4, start: '08:00', end: '09:00' },
      { name: 'Steve', capacity: 6, start: '09:00', end: '10:00' },
      // Lägg till fler tidsslotter här
    ],
    '2023-10-19': [
      { name: 'Margret', capacity: 4, start: '08:00', end: '09:00' },
      // Lägg till fler tidsslotter här
    ],
    '2023-10-20': [
      { name: 'Ada', capacity: 10, start: '08:00', end: '09:00' },
      // Lägg till fler tidsslotter här
    ]
  };
  return (
    <BookingProvider>
      <div className="min-h-screen p-6 mb-[53px]">
        <h1 className="font-normal mt-[80px] text-[40px] leading-[100%] text-black">Välj en tid</h1>

        <DropdownContainer />
        <div className="mt-[40px]">
          <BookingCalendar bookings={bookings} />
        </div>
      </div>
    </BookingProvider>
  );
}