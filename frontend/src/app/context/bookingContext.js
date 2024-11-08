// BookingContext.js
import React, { createContext, useState, useEffect, useRef } from 'react';
import { fetchBookings, fetchRooms } from '../service/apiClient';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [checkedRooms, setCheckedRooms] = useState([]);
  const [userSelectedRooms, setUserSelectedRooms] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dates, setDates] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState({ roomId: null, hour: null, date: null });

  // Function to refresh rooms and bookings data
  const refreshData = async () => {
    const roomsData = await fetchRooms();
    setRooms(roomsData);

    const bookingsData = await fetchBookings();
    setBookings(bookingsData);
  };

  // Fetch data when the component mounts
  useEffect(() => {
    refreshData();
  }, []);

  // Handle room selection in the dropdown
  const handleRoomSelection = (roomName) => {
    setCheckedRooms((prevSelected) =>
      prevSelected.includes(roomName)
        ? prevSelected.filter((name) => name !== roomName)
        : [...prevSelected, roomName]
    );
  };

  // Toggle the dropdown open/close status
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  // Confirm the selection of rooms
  const handleConfirmSelection = () => {
    setIsDropdownOpen(false);
    setUserSelectedRooms(checkedRooms);
  };

  // Clear the selection of rooms
  const handleClearSelection = () => {
    setUserSelectedRooms([]);
    setCheckedRooms([]);
  };

  return (
    <BookingContext.Provider
      value={{
        rooms,
        bookings,
        checkedRooms,
        userSelectedRooms,
        isDropdownOpen,
        selectedRoom,
        dates,
        setDates,
        setSelectedRoom,
        handleRoomSelection,
        toggleDropdown,
        handleConfirmSelection,
        handleClearSelection,
        refreshData,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export default BookingContext;