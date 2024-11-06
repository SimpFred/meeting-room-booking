const BookingCalendar = ({ bookings }) => {
    const dates = Object.keys(bookings);

    return (
        <div className="mb-[27px]">
            {/* Navigation */}
            <div className="flex items-center justify-between mb-4 px-4">
                <button>←</button>
                <h2 className="text-lg font-bold">18 okt - 20 okt</h2>
                <button>→</button>
            </div>
            <div className="border rounded-lg mt-[24px] border border-gray-500">

                {/* Calendar Grid */}
                <div className="grid grid-cols-3">
                    {dates.map((date, index) => (
                        <div
                            key={date}
                            className={`${index < dates.length - 1 ? 'border-r border-gray-500' : ''
                                }`}
                        >
                            {/* Date Header */}
                            <h3 className="text-center font-semibold mb-2 border-b pt-2 pb-2 border-gray-500">
                                {new Date(date).toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' })}
                            </h3>

                            {/* Room Cards */}
                            {bookings[date].map((room, roomIndex) => (
                                <div
                                    key={roomIndex}
                                    className="mr-2 ml-2 border border-customTeal rounded-md p-1 mb-2 text-[14px]"
                                >
                                    <p className="font-semibold">{room.name} ({room.capacity})</p>
                                    <p className="text-sm">{room.start} - {room.end}</p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BookingCalendar;
