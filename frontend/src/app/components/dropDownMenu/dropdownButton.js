import React, { useContext } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';
import BookingContext from '../../context/bookingContext';

const DropdownButton = () => {
  const { isDropdownOpen, toggleDropdown, selectedRooms  } = useContext(BookingContext);

  return (
    <button
      onClick={toggleDropdown}
      className="min-w-[180px] rounded-[8px] border border-solid p-[16px] text-left bg-white flex justify-between items-center"
    >
      <span>
        {selectedRooms.length > 0
          ? `${selectedRooms.length} rum valda`
          : 'Välj mötesrum'}
      </span>
      {isDropdownOpen ? (
        <ChevronUpIcon className="ml-2 w-5 h-5 text-gray-500" />
      ) : (
        <ChevronDownIcon className="ml-2 w-5 h-5 text-gray-500" />
      )}
    </button>
  );
};

export default DropdownButton;