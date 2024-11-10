// Generates an array of date strings for a given number of days starting 
// from a specified date. Default start date is today.
export const generateDates = (numDays, startDate = new Date()) => {
    const dates = [];
    const start = new Date(startDate);
    for (let i = 0; i < numDays; i++) {
        const date = new Date(start);
        date.setDate(start.getDate() + i);
        dates.push(date.toISOString().split('T')[0]); // Format date as 'YYYY-MM-DD'
    }
    return dates;
}

// Generates an array of hour strings between a specified start and end hour
export const generateHours = (startHour, endHour) => {
    const hours = [];
    for (let i = startHour; i <= endHour; i++) {
        // Add leading zero to single digit hours
        hours.push(`${i < 10 ? '0' : ''}${i}:00`); // Format hour as 'HH:00'
    }
    return hours;
}

// Checks if a room is booked at a specific date and hour
export const isRoomBooked = (room, date, hour) => {
    const startTime = new Date(`${date}T${hour}:00.000Z`); // Create start time from date and hour
    const endTime = new Date(startTime);
    endTime.setHours(endTime.getHours() + 1); // Set end time to one hour after start time

    // Check if any booking in the room matches the start time
    return room.bookings.some(booking => {
        const bookingStart = new Date(booking.startTime);
        const bookingEnd = new Date(booking.endTime);
        return (
            // Check if booking start and end times match.
            bookingStart.getTime() === startTime.getTime() &&
            bookingEnd.getTime() === endTime.getTime()
        );
    });
};

// Format date to 'day month' format in Swedish without trailing period
export const formatDate = (date) => {
    return new Date(date).toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' }).replace('.', '');
};