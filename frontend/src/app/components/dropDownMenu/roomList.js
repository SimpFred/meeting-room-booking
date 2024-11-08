import React, { useContext } from 'react';
import Button from '../button';
import BookingContext from '../../context/bookingContext';

// RoomList component to display a list of rooms with selection options
const RoomList = () => {
    const { rooms, checkedRooms, handleRoomSelection, handleConfirmSelection, handleClearSelection } = useContext(BookingContext);

    return (
        <div className="absolute w-full rounded-lg bg-white z-10 shadow-md p-[24px]">
            {/* Map through rooms and display each room with a checkbox */}
            {rooms.map((room) => (
                <div key={room.id} className="flex items-center justify-between p-2 hover:bg-gray-100">
                    <label className="flex items-center w-full cursor-pointer">
                        <span className="flex-grow text-sm">{room.name} ({room.capacity} personer)</span>
                        <input
                            type="checkbox"
                            checked={checkedRooms.includes(room.id)}
                            onChange={() => handleRoomSelection(room.id)}
                            className="ml-2 bg-transparent checked:text-[#004D40] transform scale-150"
                        />
                    </label>
                </div>
            ))}
            {/* Buttons to confirm or clear selection */}
            <div className="flex mt-[41px] justify-between gap-4">
                <Button
                    onClick={handleConfirmSelection}
                    text="Välj"
                />
                <Button
                    onClick={handleClearSelection}
                    text="Avmarkera"
                    bgColor='var(--ligthDark)'
                />
            </div>
        </div>
    );
};

export default RoomList;