"use client";
import React, { useState, useEffect, useRef } from 'react';
import { DropdownButton, RoomList } from '../components';

async function fetchRooms() {
  const res = await fetch('http://localhost:5000/rooms');
  const data = await res.json();
  return data;
}

export default function Booking() {
  const [rooms, setRooms] = useState([]);
  const [checkedRooms, setCheckedRooms] = useState([]);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    async function getRooms() {
      const roomsData = await fetchRooms();
      setRooms(roomsData);
    }
    getRooms();
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
    <div className="min-h-screen p-6 mb-[53px]">
      <h1 className="font-normal mt-[80px] text-[40px] leading-[100%] text-black">Välj en tid</h1>
      <div className="mt-[45px] relative">
        <DropdownButton
          isDropdownOpen={isDropdownOpen}
          toggleDropdown={toggleDropdown}
          selectedRooms={selectedRooms}
        />

        {isDropdownOpen && (
          <div ref={dropdownRef}>
            <RoomList
              rooms={rooms}
              checkedRooms={checkedRooms}
              handleRoomSelection={handleRoomSelection}
              handleConfirmSelection={handleConfirmSelection}
              handleClearSelection={handleClearSelection}
            />
          </div>
        )}
      </div>
    </div>
  );
}