import { useContext } from "react";
import { formatDate, isRoomBooked } from "../../utils/helperMethods";
import RoomCard from "./roomCard";
import BookingContext from "../../context/bookingContext";

const DateColumn = ({ date }) => {
  const { rooms, userSelectedRooms, selectedRoom, setSelectedRoom, timeSlots } =
    useContext(BookingContext);

  const isRoomSelected = (roomId, startTime, endTime, date) => {
    return (
      selectedRoom.roomId === roomId &&
      selectedRoom.startTime === startTime &&
      selectedRoom.endTime === endTime &&
      selectedRoom.date === date
    );
  };

  const handleRoomClick = (roomId, startTime, endTime, date) => {
    // If the clicked room is already selected, deselect it
    if (isRoomSelected(roomId, startTime, endTime, date)) {
      setSelectedRoom({
        roomId: null,
        startTime: null,
        endTime: null,
        date: null,
      });
    } else {
      // Otherwise, select the clicked room
      setSelectedRoom({ roomId, startTime, endTime, date });
    }
  };

  return (
    <div className="border-r border-gray-500">
      {/* Display a column header with the date in 'day month' format */}
      <h3 className="text-center font-semibold mb-2 border-b pt-2 pb-2 border-gray-500">
        {formatDate(date)}
      </h3>
      {timeSlots.map((timeSlot, timeSlotIndex) => {
        const isLastSlot = timeSlotIndex === timeSlots.length - 1;

        if (isLastSlot) {
          return null;
        }

        return (
          <div key={timeSlotIndex} className="mb-2">
            {/* Display the hour as a header to enhance readability in the calendar */}{" "}
            <h4 className="text-center font-semibold mb-1">{timeSlot}</h4>
            {rooms
              .filter((room) => {
                // Filter witch rooms to display based on user selection and booking status
                const isSelectedRoom =
                  !userSelectedRooms.length ||
                  userSelectedRooms.includes(room.id);
                return (
                  isSelectedRoom &&
                  !isRoomBooked(
                    room,
                    date,
                    timeSlot,
                    timeSlots[timeSlotIndex + 1]
                  )
                );
              })
              .map((room, roomIndex) => (
                <RoomCard
                  key={roomIndex}
                  room={room}
                  timeSlot={timeSlot}
                  date={date}
                  nextTimeSlot={timeSlots[timeSlotIndex + 1]}
                  isSelected={isRoomSelected(
                    room.id,
                    timeSlot,
                    timeSlots[timeSlotIndex + 1],
                    date
                  )}
                  handleRoomClick={handleRoomClick} // Pass the click handler to RoomCard
                />
              ))}
          </div>
        );
      })}
    </div>
  );
};

export default DateColumn;
