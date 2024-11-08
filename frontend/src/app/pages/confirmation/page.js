"use client";
import { useContext, useState } from "react";
import Button from "../../components/button";
import Title from "../../components/title";
import BookingContext from "../../context/bookingContext";
import { createBooking } from "../../service/apiClient";
import { useRouter } from 'next/navigation';

export default function Confirmation() {
    const { selectedRoom, refreshData } = useContext(BookingContext);
    const [name, setName] = useState("");
    const router = useRouter();

    const handleBooking = async () => {
        if (!name) {
            alert("Vänligen ange ditt namn.");
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
            alert("Bokningen har skickats!");
            refreshData();
            router.push('/pages/booking');
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
            </div>
        </div>
    );
}