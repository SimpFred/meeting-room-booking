"use client";
import { useContext, useEffect, useState } from "react";
import Button from "../../components/button";
import Title from "../../components/title";
import BookingContext from "../../context/bookingContext";
import { createBooking } from "../../service/apiClient";
import { useRouter } from 'next/navigation';
import Popup from "../../components/popup";

export default function Confirmation() {
    const { selectedRoom, setSelectedRoom, refreshData } = useContext(BookingContext);
    const [showPopup, setShowPopup] = useState(false);
    const [showWarning, setShowWarning] = useState(false);
    const [name, setName] = useState("");
    const router = useRouter();

    useEffect(() => {
        if (!selectedRoom.roomId || !selectedRoom.hour || !selectedRoom.date) {
            router.push('/pages/booking');
        }
    }, []);

    useEffect(() => {
        if (showWarning) {
            setShowWarning(false);
        }
    }, [name]);


    const handleBooking = async () => {
        if (!name) {
            setShowWarning(true);
            return;
        }

        const startTime = new Date(`${selectedRoom.date}T${selectedRoom.hour}:00`);
        startTime.setHours(startTime.getHours() + 1);
        const endTime = new Date(startTime);
        endTime.setHours(startTime.getHours() + 1);

        try {
            const booking = {
                roomId: selectedRoom.roomId,
                startTime: startTime.toISOString(),
                endTime: endTime.toISOString(),
                bookedBy: name,
            };

            await createBooking(booking);
            setShowPopup(true); // Visa popupen
            setTimeout(() => {
                refreshData();
                setSelectedRoom({ roomId: null, hour: null, date: null });
                setShowPopup(false)
                router.push('/pages/booking');
            }, 3000);
        } catch (error) {
            console.error("Error:", error);
            alert("Något gick fel. Försök igen.");
        }
    };


    return (
        <div className="min-h-screen flex flex-col p-6 pb-[53px]">
            <Title text="Vem bokar?" />

            <div className="mt-[40px]">
                <p className="font-medium text-[20px]" style={{ color: '#212121', fontWeight: 500 }}>
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
                <Button text="Boka" onClick={handleBooking} />
                <div className="h-6">
                        {showWarning && (
                            <p className="text-red-500 text-center">Vänligen fyll i ditt namn för att gå vidare</p>
                        )}
                    </div>
            </div>
            {showPopup && <Popup message="Ditt rum är bokat!" />}

        </div>
    );
}