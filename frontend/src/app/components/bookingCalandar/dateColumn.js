import { formatDate, generateHours } from "../../utils/helperMethods";
import FilteredRoomList from "./filteredRoomList";

const DateColumn = ({ date }) => {
  const hours = generateHours(8, 16);

  return (
    <div className="border-r border-gray-500">
      {/* Display a column header with the date in 'day month' format */}
      <h3 className="text-center font-semibold mb-2 border-b pt-2 pb-2 border-gray-500">
        {formatDate(date)}
      </h3>
      {hours.map((hour, hourIndex) => (
        <div key={hourIndex} className="mb-2">
          {/* Display the hour as a header to enhance readability in the calendar */}
          <h4 className="text-center font-semibold mb-1">{hour}</h4>
          <FilteredRoomList date={date} hour={hour} />
        </div>
      ))}
    </div>
  );
};

export default DateColumn;
