// RoomCard component to display room information and handle selection
const RoomCard = ({
  room,
  timeSlot,
  date,
  isSelected,
  handleRoomClick,
  nextTimeSlot,
}) => {
  return (
    <div
      className={`mr-2 ml-2 border cursor-pointer rounded-md p-1 mb-2 text-[14px] ${
        isSelected ? "bg-customTeal text-white" : ""
      } border-customTeal`}
      onClick={() => handleRoomClick(room.id, timeSlot, nextTimeSlot, date)}
    >
      {/* Display room name and capacity */}
      <p className="font-semibold">
        {room.name} ({room.capacity})
      </p>
      {/* Display booking hour range */}
      <p className="text-sm">
        {timeSlot} - {nextTimeSlot}
      </p>
    </div>
  );
};

export default RoomCard;
