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

      <div className="mt-8">
        <label className="block text-sm font-medium text-gray-700">
          Välj bokningslängd (i minuter)
        </label>
        <input
          type="range"
          min="5"
          max="120"
          step="5"
          value={selectedTime}
          onChange={(e) => setSelectedTime(Number(e.target.value))}
          className="w-full sm:w-[20%] mt-2"
        />
        <div className="mt-2 sm:w-[20%] text-center">
          {selectedTime} minuter
        </div>
      </div>

      <div
        // Initially hide the scrollbar to prevent it from obstructing the right pagination icon in the calendar
        className={`mt-8 max-h-[41vh]  overflow-y-scroll ${
          isScrolled ? "scrollbar-visible" : "scrollbar-hidden"
        }`}
        onScroll={handleScroll}
      >
        <BookingCalendar />
      </div>
      <div className="mt-[27px] ">
        <div className="flex flex-col items-center justify-center mb-[53px]">
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
