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
  const { selectedRoom } = useContext(BookingContext);
  const router = useRouter();
  const [showWarning, setShowWarning] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false); // State to track if the user has scrolled down
  const isNextButtonDisabled =
    !selectedRoom.roomId || !selectedRoom.hour || !selectedRoom.date;

  // Reset warning when selectedRoom changes
  useEffect(() => {
    if (showWarning) {
      setShowWarning(false);
    }
  }, [selectedRoom]);

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
      <div
        // Initially hide the scrollbar to prevent it from obstructing the right pagination icon in the calendar
        className={`mt-[40px] max-h-[54vh] overflow-y-scroll ${
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
