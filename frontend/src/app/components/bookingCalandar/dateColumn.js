import { useContext } from "react";
import { generateHours, isRoomBooked } from "../../utils/helperMethods";
import RoomCard from "./roomCard";
import BookingContext from "../../context/bookingContext";

const DateColumn = ({ date }) => {
    const { rooms, userSelectedRooms, selectedRoom, setSelectedRoom } = useContext(BookingContext);
    const hours = generateHours();

    
    const handleRoomClick = (roomId, hour, date) => {
        if (selectedRoom.roomId === roomId && selectedRoom.hour === hour && selectedRoom.date === date) {
            setSelectedRoom({ roomId: null, hour: null, date: null });
        } else {
            setSelectedRoom({ roomId, hour, date });
        }
    };
    return (
        <div className="border-r border-gray-500">
            <h3 className="text-center font-semibold mb-2 border-b pt-2 pb-2 border-gray-500">
                {new Date(date).toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' })}
            </h3>
            {hours.map((hour, hourIndex) => (
                <div key={hourIndex} className="mb-2">
                    <h4 className="text-center font-semibold mb-1">{hour}</h4>
                    {rooms
                        .filter(room => {
                            const isSelectedRoom = !userSelectedRooms.length || userSelectedRooms.includes(room.id);
                            return isSelectedRoom && !isRoomBooked(rooms, room.id, date, hour);
                        }).map((room, roomIndex) => (
                            <RoomCard
                                key={roomIndex}
                                room={room}
                                hour={hour}
                                date={date}
                                isSelected={selectedRoom.roomId === room.id && selectedRoom.hour === hour && selectedRoom.date === date}
                                handleRoomClick={handleRoomClick}
                            />
                        ))}
                </div>
            ))}
        </div>
    );
};

export default DateColumn;