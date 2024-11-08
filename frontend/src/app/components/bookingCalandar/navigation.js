import { useContext, useEffect, useState } from "react";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "@heroicons/react/24/outline";
import BookingContext from "../../context/bookingContext";
import { generateDates } from "../../utils/helperMethods";

const Navigation = () => {
    const { dates, setDates } = useContext(BookingContext);
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        setDates(generateDates(3));
    }, []);

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' });
    };

    const handleNext = () => {
        const newStartDate = new Date(dates[dates.length - 1]);
        newStartDate.setDate(newStartDate.getDate() + 1);
        setDates(generateDates(3, newStartDate));
    };

    const handlePrev = () => {
        const newStartDate = new Date(dates[0]);
        newStartDate.setDate(newStartDate.getDate() - 3);
        setDates(generateDates(3, newStartDate));
    };

    const isPrevDisabled = () => {
        const firstDate = new Date(dates[0]);
        return firstDate <= currentDate;
    };

    return (
        <div className="flex items-center justify-between mb-4">
            <ArrowLeftCircleIcon
                className={`h-8 w-8 text-black-500 cursor-pointer ${isPrevDisabled() ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={!isPrevDisabled() ? handlePrev : null}
            />
            <h2 className="text-lg font-[400] tracking-tighter">
                {formatDate(dates[0])} - {formatDate(dates[dates.length - 1])}
            </h2>
            <ArrowRightCircleIcon
                className="h-8 w-8 text-black-500 cursor-pointer"
                onClick={handleNext}
            />
        </div>
    );
};

export default Navigation;