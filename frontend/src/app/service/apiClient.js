export const fetchRooms = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/rooms`);
    const data = await res.json();
    return data;
};

export const fetchBookings = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/bookings`);
    const data = await res.json();
    return data;
};

export const createBooking = async (booking) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/bookings`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(booking),
    });

    if (!res.ok) {
        throw new Error("Failed to create booking");
    }

    return await res.json();
};