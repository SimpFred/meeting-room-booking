import { useContext } from "react";
import { formatDate, isRoomBooked } from "../../utils/helperMethods";
import RoomCard from "./roomCard";
import BookingContext from "../../context/bookingContext";

const DateColumn = ({ date }) => {
  const { rooms, userSelectedRooms, selectedRoom, setSelectedRoom, timeSlots } =
    useContext(BookingContext);

  // Handle click on a room card
  const handleRoomClick = (roomId, startTime, endTime, date) => {
    // If the clicked room is already selected, deselect it
    if (
      selectedRoom.roomId === roomId &&
      selectedRoom.startTime === startTime &&
      selectedRoom.endTime === endTime &&
      selectedRoom.date === date
    ) {
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
      {timeSlots.map((timeSlot, hourIndex) => (
        <div key={hourIndex} className="mb-2">
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
                !isRoomBooked(room, date, timeSlot, timeSlots[hourIndex + 1])
              );
            })
            .map((room, roomIndex) => (
              <RoomCard
                key={roomIndex}
                room={room}
                timeSlot={timeSlot}
                date={date}
                nextTimeSlot={timeSlots[hourIndex + 1] || timeSlots[hourIndex]}
                isSelected={
                  selectedRoom.roomId === room.id &&
                  selectedRoom.startTime === timeSlot &&
                  selectedRoom.endTime === timeSlots[hourIndex + 1] &&
                  selectedRoom.date === date
                }
                handleRoomClick={handleRoomClick} // Pass the click handler to RoomCard
              />
            ))}
        </div>
      ))}
    </div>
  );
};

export default DateColumn;
