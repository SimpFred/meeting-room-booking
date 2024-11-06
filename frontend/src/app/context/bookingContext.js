// BookingContext.js
import React, { createContext, useState, useEffect, useRef } from 'react';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);
  const [checkedRooms, setCheckedRooms] = useState([]);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    async function fetchRooms() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/rooms`);
      const data = await res.json();
      setRooms(data);
    }
    fetchRooms();
  }, []);

  const handleRoomSelection = (roomName) => {
    setCheckedRooms((prevSelected) =>
      prevSelected.includes(roomName)
        ? prevSelected.filter((name) => name !== roomName)
        : [...prevSelected, roomName]
    );
  };

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const handleConfirmSelection = () => {
    setIsDropdownOpen(false);
    setSelectedRooms(checkedRooms);
  };

  const handleClearSelection = () => {
    setSelectedRooms([]);
    setCheckedRooms([]);
  };

  return (
    <BookingContext.Provider
      value={{
        rooms,
        checkedRooms,
        selectedRooms,
        isDropdownOpen,
        dropdownRef,
        handleRoomSelection,
        toggleDropdown,
        handleConfirmSelection,
        handleClearSelection,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export default BookingContext;