export const generateDates = (numDays, startDate = new Date()) => {
    const dates = [];
    const start = new Date(startDate);
    for (let i = 0; i < numDays; i++) {
        const date = new Date(start);
        date.setDate(start.getDate() + i);
        dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
}

export const generateHours = () => {
    const hours = [];
    for (let i = 8; i <= 16; i++) {
        hours.push(`${i < 10 ? '0' : ''}${i}:00`);
    }
    return hours;
}

export const isRoomBooked = (room, date, hour) => {
    const startTime = new Date(`${date}T${hour}:00.000Z`);
    const endTime = new Date(startTime);
    endTime.setHours(endTime.getHours() + 1);

    return room.bookings.some(booking => {
        const bookingStart = new Date(booking.startTime);
        return (
            bookingStart.getTime() === startTime.getTime() &&
            bookingStart.getDate() === startTime.getDate()
        );
    });
};