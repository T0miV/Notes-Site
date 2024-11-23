import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";

// DateDisplay component to display the current date
const DateDisplay: React.FC = () => {
  // State to keep track of the current date and update it every second
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    // Set an interval to update the date every second
    const timer = setInterval(() => setDate(new Date()), 1000);

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(timer);
  }, []);

  return (
    <Typography variant="h6" className="header-date">
      {/* Display the current date */}
      Today is: {date.toLocaleDateString()}
    </Typography>
  );
};

export default DateDisplay;
