import React from "react";

const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

let currentDate = `${day}-${month}-${year}`;

export const Context = React.createContext({min_date:'2022-5-11',max_date:' ',id: 1});