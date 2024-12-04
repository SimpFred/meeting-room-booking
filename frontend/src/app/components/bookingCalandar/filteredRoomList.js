import React, { useContext } from "react";
import { isRoomBooked } from "../../utils/helperMethods";
import RoomCard from "./roomCard";
import BookingContext from "../../context/bookingContext";

const FilteredRoomList = ({ date, hour }) => {
  const { rooms, userSelectedRooms, selectedRoom, setSelectedRoom } =
    useContext(BookingContext);

  const handleRoomClick = (roomId, hour, date) => {
    // If the clicked room is already selected, deselect it
    if (
      selectedRoom.roomId === roomId &&
      selectedRoom.hour === hour &&
      selectedRoom.date === date
    ) {
      setSelectedRoom({ roomId: null, hour: null, date: null });
    } else {
      // Otherwise, select the clicked room
      setSelectedRoom({ roomId, hour, date });
    }
  };
  return (
    <>
      {rooms
        .filter((room) => {
          // Filter which rooms to display based on user selection and booking status
          const isSelectedRoom =
            !userSelectedRooms.length || userSelectedRooms.includes(room.id);
          return isSelectedRoom && !isRoomBooked(room, date, hour);
        })
        .map((room, roomIndex) => (
          <RoomCard
            key={roomIndex}
            room={room}
            hour={hour}
            date={date}
            isSelected={
              selectedRoom.roomId === room.id &&
              selectedRoom.hour === hour &&
              selectedRoom.date === date
            }
            handleRoomClick={handleRoomClick}
          />
        ))}
    </>
  );
};

export default FilteredRoomList;
