import React, { useContext } from 'react';
import DropdownButton from './dropdownButton';
import RoomList from './roomList';
import BookingContext from '../../context/bookingContext';

// DropdownContainer component to manage the dropdown state and display the button and room list
const DropdownContainer = () => {
    const { isDropdownOpen } = useContext(BookingContext);

    return (
        <div className="mt-[45px] relative">
            <DropdownButton />
            {/* Conditionally render the RoomList component if the dropdown is open */}
            {isDropdownOpen && (
                <div>
                    <RoomList />
                </div>
            )}
        </div>
    );
};

export default DropdownContainer;