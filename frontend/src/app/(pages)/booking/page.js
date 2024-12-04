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
          Välj bokningslängd
        </label>
        <div className="mt-2 flex flex-col">
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio"
              name="bookingTime"
              value="60"
              checked={selectedTime === 60}
              onChange={(e) => setSelectedTime(Number(e.target.value))}
            />
            <span className="ml-2">60 minuter</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio"
              name="bookingTime"
              value="45"
              checked={selectedTime === 45}
              onChange={(e) => setSelectedTime(Number(e.target.value))}
            />
            <span className="ml-2">45 minuter</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio"
              name="bookingTime"
              value="30"
              checked={selectedTime === 30}
              onChange={(e) => setSelectedTime(Number(e.target.value))}
            />
            <span className="ml-2">30 minuter</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio"
              name="bookingTime"
              value="15"
              checked={selectedTime === 15}
              onChange={(e) => setSelectedTime(Number(e.target.value))}
            />
            <span className="ml-2">15 minuter</span>
          </label>
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
