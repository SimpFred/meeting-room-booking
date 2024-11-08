import Navigation from "./navigation";
import DateColumn from "./dateColumn";
import { useContext } from "react";
import BookingContext from "../../context/bookingContext";

const BookingCalendar = () => {
    const {dates} = useContext(BookingContext);

    return (
        <div className="mb-[27px]">
            <Navigation />
            <div className="border rounded-lg mt-[24px] border border-gray-500">
                <div className="grid grid-cols-3">
                    {dates.map((date) => (
                        <DateColumn
                            key={date}
                            date={date}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BookingCalendar;
