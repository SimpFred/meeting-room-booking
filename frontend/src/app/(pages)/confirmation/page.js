"use client";
import { useContext, useEffect, useState } from "react";
import Button from "../../components/button";
import Title from "../../components/title";
import BookingContext from "../../context/bookingContext";
import { createBooking } from "../../service/apiClient";
import { useRouter } from "next/navigation";
import Popup from "../../components/popup";
import WarningMessage from "../../components/warningMessage";

export default function Confirmation() {
  const { selectedRoom, setSelectedRoom, refreshData } =
    useContext(BookingContext);
  const [showPopup, setShowPopup] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [name, setName] = useState("");
  const router = useRouter();

  // Redirect to booking page if selectedRoom is not properly set
  useEffect(() => {
    if (
      !selectedRoom.roomId ||
      !selectedRoom.startTime ||
      !selectedRoom.endTime ||
      !selectedRoom.date
    ) {
      router.push("/booking");
    }
  }, []);

  // Hide warning when name changes
  useEffect(() => {
    if (showWarning) {
      setShowWarning(false);
    }
  }, [name]);

  // Handle booking process
  const handleBooking = async () => {
    // Show warning if name is empty
    if (!name) {
      setShowWarning(true);
      return;
    }

    // Create start and end times for the booking
    const startTime = new Date(
      `${selectedRoom.date}T${selectedRoom.startTime}:00`
    );
    startTime.setHours(startTime.getHours() + 1);
    const endTime = new Date(`${selectedRoom.date}T${selectedRoom.endTime}:00`);
    endTime.setHours(endTime.getHours() + 1);

    // Create booking object
    try {
      const booking = {
        roomId: selectedRoom.roomId,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        bookedBy: name,
      };

      // Create booking via API
      await createBooking(booking);
      setShowPopup(true); // Show popup
      // Refresh data and redirect to booking page after 3 seconds
      setTimeout(() => {
        refreshData();
        setSelectedRoom({
          roomId: null,
          startTime: null,
          endTime: null,
          date: null,
        });
        setShowPopup(false);
        router.push("/booking");
      }, 3000);
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-6 pb-0">
      <Title text="Vem bokar?" />

      <div className="mt-[40px]">
        <p
          className="font-medium text-[20px]"
          style={{ color: "#212121", fontWeight: 500 }}
        >
          Förnamn och efternamn
        </p>
        <input
          className="w-full border border-[#BDBDBD]  rounded-md p-2 bg-transparent placeholder-[#868686] mt-2"
          type="text"
          value={name}
          placeholder="Skriv ditt fullständiga namn här"
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mt-auto">
        <div className="flex justify-center">
          <Button text="Boka" onClick={handleBooking} />
        </div>
      </div>
      <div className="h-1 mb-[53px]">
        {showWarning && (
          <WarningMessage text="Vänligen fyll i ditt namn för att gå vidare" />
        )}
      </div>
      {showPopup && <Popup message="Ditt rum är bokat!" />}
    </div>
  );
}
