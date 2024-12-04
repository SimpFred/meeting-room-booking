"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DropdownContainer from "../../components/dropDownMenu/dropDownContainer";
import BookingCalendar from "../../components/bookingCalandar/bookingCalandar";
import Button from "../../components/button";
import BookingContext from "../../context/bookingContext";
import Title from "../../components/title";
import WarningMessage from "../../components/warningMessage";

export default function Booking() {
  const { selectedRoom, setSelectedRoom, selectedTime, setSelectedTime } =
    useContext(BookingContext);
  const router = useRouter();
  const [showWarning, setShowWarning] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false); // State to track if the user has scrolled down
  const isNextButtonDisabled =
    !selectedRoom.roomId ||
    !selectedRoom.startTime ||
    !selectedRoom.endTime ||
    !selectedRoom.date;

  // Reset warning when selectedRoom changes
  useEffect(() => {
    if (showWarning) {
      setShowWarning(false);
    }
  }, [selectedRoom]);

  // Reset selectedRoom when selectedTime changes
  useEffect(() => {
    setSelectedRoom({
      roomId: null,
      startTime: null,
      endTime: null,
      date: null,
    });
  }, [selectedTime]);

  const handleNextClick = () => {
    if (!isNextButtonDisabled) {
      router.push("/confirmation");
    } else {
      setShowWarning(true);
    }
  };

  // Handle scroll event to update isScrolled state
  const handleScroll = (event) => {
    const scrollTop = event.target.scrollTop;
    setIsScrolled(scrollTop > 0); // Update based on whether the user has scrolled down
  };

  return (
    <div className="min-h-screen sm:max-h-[180vh] p-6 flex flex-col">
      <Title text="Välj en tid" />
      <DropdownContainer />
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">
          Välj bokningslängd (i minuter)
        </label>
        <div className="mt-2 flex items-center space-x-2">
          {/* Minus-knapp */}
          <button
            type="button"
            className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-300"
            onClick={() => setSelectedTime((prev) => Math.max(10, prev - 5))} // Minskar med 15, men inte lägre än 15
          >
            –
          </button>
          {/* Visar valt värde */}
          <input
            type="number"
            readOnly
            className="form-input text-center w-20 border rounded-md p-2"
            value={selectedTime}
          />
          {/* Plus-knapp */}
          <button
            type="button"
            className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-300"
            onClick={() => setSelectedTime((prev) => Math.min(120, prev + 5))} // Ökar med 15, men inte högre än 120
          >
            +
          </button>
        </div>
      </div>

      <div
        // Initially hide the scrollbar to prevent it from obstructing the right pagination icon in the calendar
        className={`mt-[40px] max-h-[40vh]  overflow-y-scroll ${
          isScrolled ? "scrollbar-visible" : "scrollbar-hidden"
        }`}
        onScroll={handleScroll}
      >
        <BookingCalendar />
      </div>
      <div className="mt-[27px] ">
        <div className="flex flex-col items-center justify-center mb-[56px]">
          <Button
            text="Nästa"
            onClick={handleNextClick}
            disabled={isNextButtonDisabled}
          />
          {showWarning && (
            <WarningMessage
              text={"Ett rum måste vara markerat för att gå vidare"}
            />
          )}
        </div>
      </div>
    </div>
  );
}
