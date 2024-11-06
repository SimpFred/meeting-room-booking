// DropdownContainer.js
import React, { useContext } from 'react';
import DropdownButton from './dropdownButton';
import RoomList from './roomList';
import BookingContext from '../../context/bookingContext';

const DropdownContainer = () => {
    const { isDropdownOpen, dropdownRef } = useContext(BookingContext);

    return (
        <div className="mt-[45px] relative">
            <DropdownButton />
            {isDropdownOpen && (
                <div ref={dropdownRef}>
                    <RoomList />
                </div>
            )}
        </div>
    );
};

export default DropdownContainer;