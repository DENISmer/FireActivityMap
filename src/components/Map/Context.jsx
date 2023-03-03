import React from "react";

export const Context = React.createContext({
    singleDay: false,
    week: false,
    today: true,
    last_24_hours: false,
    daysInRange: false,
    currentDate:'',
    min_date:'',
    max_date:'',
});