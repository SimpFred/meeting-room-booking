// RoomCard component to display room information and handle selection
const RoomCard = ({ room, hour, date, isSelected, handleRoomClick }) => {
    return (
        <div
            className={`mr-2 ml-2 border cursor-pointer rounded-md p-1 mb-2 text-[14px] ${isSelected ? 'bg-customTeal text-white' : ''} border-customTeal`}
            onClick={() => handleRoomClick(room.id, hour, date)}
        >
            {/* Display room name and capacity */}
            <p className="font-semibold">{room.name} ({room.capacity})</p>
            {/* Display booking hour range */}
            <p className="text-sm">{hour} - {parseInt(hour) + 1}:00</p>
        </div>
    );
};

export default RoomCard;