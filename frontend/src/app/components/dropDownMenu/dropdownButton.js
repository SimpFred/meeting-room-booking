import React, { useContext } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';
import BookingContext from '../../context/bookingContext';

// DropdownButton component to toggle dropdown and display selected rooms
const DropdownButton = () => {
  const { isDropdownOpen, toggleDropdown, userSelectedRooms } = useContext(BookingContext);

  return (
    // Button element with onClick handler to toggle dropdown
    <button
      onClick={toggleDropdown}
      className="min-w-[180px] rounded-[8px] border border-solid p-[16px] text-left bg-white flex justify-between items-center"
    >
      <span>
        {/* Display the number of selected rooms or a default message */}
        {userSelectedRooms.length > 0
          ? `${userSelectedRooms.length} rum valda`
          : 'Välj mötesrum'}
      </span>
      {/* Display the appropriate icon based on dropdown state */}
      {isDropdownOpen ? (
        <ChevronUpIcon className="ml-2 w-5 h-5 text-gray-500" />
      ) : (
        <ChevronDownIcon className="ml-2 w-5 h-5 text-gray-500" />
      )}
    </button>
  );
};

export default DropdownButton;