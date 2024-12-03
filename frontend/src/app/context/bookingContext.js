// BookingContext.js
import React, { createContext, useState, useEffect, useRef } from "react";
import { fetchRooms } from "../service/apiClient";
import { generateDates, generateTimeSlots } from "../utils/helperMethods";

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);
  const [checkedRooms, setCheckedRooms] = useState([]);
  const [userSelectedRooms, setUserSelectedRooms] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dates, setDates] = useState(generateDates(3));
  const [selectedTime, setSelectedTime] = useState(60);
  const [timeSlots, setTimeSlots] = useState(
    generateTimeSlots(8, 17, selectedTime)
  ); // Generate an array of time slots between 08:00-17:00 to display each room's availability
  const [selectedRoom, setSelectedRoom] = useState({
    roomId: null,
    startTime: null,
    endTime: null,
    date: null,
  });

  // Function to refresh rooms data
  const getRooms = async () => {
    const roomsData = await fetchRooms();
    setRooms(roomsData);
  };

  // Fetch data when the component mounts
  useEffect(() => {
    getRooms();
  }, []);

  // Generate time slots when the selected time changes
  useEffect(() => {
    setTimeSlots(generateTimeSlots(8, 17, selectedTime));
  }, [selectedTime]);

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
        refreshData: getRooms,
        selectedTime,
        setSelectedTime,
        timeSlots,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export default BookingContext;
