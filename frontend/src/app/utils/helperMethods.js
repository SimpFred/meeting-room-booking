// Generates an array of date strings for a given number of days starting
// from a specified date. Default start date is today.
export const generateDates = (numDays, startDate = new Date()) => {
  const dates = [];
  const start = new Date(startDate);
  for (let i = 0; i < numDays; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    dates.push(date.toISOString().split("T")[0]); // Format date as 'YYYY-MM-DD'
  }
  return dates;
};

export const generateTimeSlots = (startHour, endHour, intervalMinutes) => {
  const timeSlots = [];
  let currentHour = startHour;
  let currentMinute = 0;

  while (
    currentHour < endHour ||
    (currentHour === endHour && currentMinute === 0)
  ) {
    const hour = currentHour.toString().padStart(2, "0");
    const minute = currentMinute.toString().padStart(2, "0");
    timeSlots.push(`${hour}:${minute}`);

    // Öka tiden med intervalMinutes
    currentMinute += intervalMinutes;
    while (currentMinute >= 60) {
      currentMinute -= 60; // Wrapar runt till nästa timme
      currentHour++;
    }
  }
  console.log(timeSlots);

  return timeSlots;
};

// Checks if a room is booked at a specific date and time slot
export const isRoomBooked = (room, date, timeSlot, nextTimeSlot) => {
  const startTime = new Date(`${date}T${timeSlot}:00.000Z`); // Create start time from date and time slot
  const endTime = new Date(`${date}T${nextTimeSlot}:00.000Z`); // Create end time from date and next time slot

  // Check if any booking in the room overlaps with the given time interval
  return room.bookings.some((booking) => {
    const bookingStart = new Date(booking.startTime);
    const bookingEnd = new Date(booking.endTime);

    const isOverlapping = startTime < bookingEnd && endTime > bookingStart;

    return isOverlapping;
  });
};

// Format date to 'day month' format in Swedish without trailing period
export const formatDate = (date) => {
  return new Date(date)
    .toLocaleDateString("sv-SE", { day: "numeric", month: "short" })
    .replace(".", "");
};
