import { useContext } from "react";
import { generateHours, isRoomBooked } from "../../utils/helperMethods";
import RoomCard from "./roomCard";
import BookingContext from "../../context/bookingContext";

const DateColumn = ({ date }) => {
    const { rooms, userSelectedRooms, selectedRoom, setSelectedRoom } = useContext(BookingContext);
    const hours = generateHours(8, 16); // Generate an array of hours beetwen 08:00-16:00 to display each room's availability

    // Handle click on a room card
    const handleRoomClick = (roomId, hour, date) => {
        // If the clicked room is already selected, deselect it
        if (selectedRoom.roomId === roomId && selectedRoom.hour === hour && selectedRoom.date === date) {
            setSelectedRoom({ roomId: null, hour: null, date: null });
        } else {
            // Otherwise, select the clicked room
            setSelectedRoom({ roomId, hour, date });
        }
    };

    return (
        <div className="border-r border-gray-500">
            {/* Display a column header with the date in 'day month' format */}
            <h3 className="text-center font-semibold mb-2 border-b pt-2 pb-2 border-gray-500">
                {new Date(date).toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' })}
            </h3>
            {hours.map((hour, hourIndex) => (
                <div key={hourIndex} className="mb-2">
                    {/* Display the hour as a header to enhance readability in the calendar */}                    <h4 className="text-center font-semibold mb-1">{hour}</h4>
                    {rooms
                        .filter(room => {
                            // Filter witch rooms to display based on user selection and booking status
                            const isSelectedRoom = !userSelectedRooms.length || userSelectedRooms.includes(room.id);
                            return isSelectedRoom && !isRoomBooked(room, date, hour);
                        }).map((room, roomIndex) => (
                            <RoomCard
                                key={roomIndex}
                                room={room}
                                hour={hour}
                                date={date}
                                isSelected={selectedRoom.roomId === room.id && selectedRoom.hour === hour && selectedRoom.date === date}
                                handleRoomClick={handleRoomClick} // Pass the click handler to RoomCard
                            />
                        ))}
                </div>
            ))}
        </div>
    );
};

export default DateColumn;