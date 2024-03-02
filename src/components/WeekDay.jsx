import React, { useEffect, useState } from "react";
import { format, addWeeks, subWeeks, startOfWeek } from "date-fns";
import Timezone from "./Timezone";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { saveAs } from 'file-saver';

function WeekDay() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const currentDatefixed = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    const [checkboxState, setCheckboxState] = useState({});
    const [showSaveButton, setShowSaveButton] = useState(false);

    const goToNextWeek = () => {
        setCurrentDate(addWeeks(currentDate, 1));
    };

    const goToPreviousWeek = () => {
        setCurrentDate(subWeeks(currentDate, 1));
    };

    const handleCheckboxChange = (id) => {
        setCheckboxState(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
        setShowSaveButton(true);
    };

    const handleSave = () => {
        const jsonData = Object.entries(checkboxState).map(([key, value]) => ({
            id: key,
            checked: value,
        }));
    
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];
        const formattedTime = `${currentDate.getHours()}:${currentDate.getMinutes()}`;
    
        const updatedJsonData = jsonData.map(item => ({
            ...item,
            Name: `test ${item.id}`,
            Date: formattedDate,
            Time: formattedTime,
        }));
    
        const jsonDataString = JSON.stringify(updatedJsonData, null, 2);
    
        // Save data to local storage
        localStorage.setItem('checkboxData', jsonDataString);
    
        // Save the data to a file
        const blob = new Blob([jsonDataString], { type: 'application/json' });
        saveAs(blob, 'checkboxData.json');
    
        setShowSaveButton(false);
    };
    


    useEffect(() => {
        const jsonDataString = localStorage.getItem('checkboxData');
        if (jsonDataString) {
            const jsonData = JSON.parse(jsonDataString);
            const initialState = {};
            jsonData.forEach(item => {
                initialState[item.id] = item.checked;
            });
            setCheckboxState(initialState);
        }
    }, []);

    const renderCalendar = () => {
        const startOfCurrentWeek = startOfWeek(currentDate);

        const days = [];

        for (let i = 0; i < 7; i++) {
            const date = new Date(startOfCurrentWeek);
            date.setDate(date.getDate() + i);

            // Skip Saturday (6) and Sunday (0)
            if (date.getDay() === 6 || date.getDay() === 0) {
                continue;
            }

            days.push(
                <div key={i} className="flex">
                    <div className="border p-2 flex-grow">
                        {format(date, "eee, MMM dd")}
                    </div>
                    <div className="border p-2 flex-grow-0">
                        <div className="flex flex-wrap">
                            {Array.from(Array((12 - 8) * 2), (_, index) => {
                                const hour = Math.floor(index / 2) + 8; // Calculate the hour (8 to 11)
                                const minute = index % 2 === 0 ? "00" : "30"; // Set the minute part to 00 or 30
                                const amPm = hour < 12 ? "AM" : "PM"; // Determine if it's AM or PM
                                return (
                                    <div key={index} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id={`time-${format(date, "yyyy-MM-dd")}-${hour}-${minute}`}
                                            checked={checkboxState[`${format(date, "yyyy-MM-dd")}-${hour}-${minute}`] || false}
                                            onChange={() => handleCheckboxChange(`${format(date, "yyyy-MM-dd")}-${hour}-${minute}`)}
                                        />
                                        <label htmlFor={`time-${format(date, "yyyy-MM-dd")}-${hour}-${minute}`} className="ml-2">
                                            {`${format(date.setHours(hour, minute), "hh:mm")} ${amPm}`}
                                        </label>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="flex flex-wrap">
                            {Array.from(Array((17.5 - 12) * 2), (_, index) => {
                                const hour = Math.floor(index / 2) + 12; // Calculate the hour (12 to 17)
                                const minute = index % 2 === 0 ? "00" : "30"; // Set the minute part to 00 or 30
                                const amPm = hour < 12 ? "AM" : "PM"; // Determine if it's AM or PM
                                return (
                                    <div key={index} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id={`time-${format(date, "yyyy-MM-dd")}-${hour}-${minute}`}
                                            checked={checkboxState[`${format(date, "yyyy-MM-dd")}-${hour}-${minute}`] || false}
                                            onChange={() => handleCheckboxChange(`${format(date, "yyyy-MM-dd")}-${hour}-${minute}`)}
                                        />
                                        <label htmlFor={`time-${format(date, "yyyy-MM-dd")}-${hour}-${minute}`} className="ml-2">
                                            {`${format(date.setHours(hour, minute), "hh:mm")} ${amPm}`}
                                        </label>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="flex flex-wrap">
                            {Array.from(Array((23 - 19) * 2 + 1), (_, index) => {
                                const hour = Math.floor(index / 2) + 19; // Calculate the hour (19 to 23)
                                const minute = index % 2 === 0 ? "00" : "30"; // Set the minute part to 00 or 30
                                const amPm = hour < 12 ? "AM" : "PM"; // Determine if it's AM or PM
                                return (
                                    <div key={index} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id={`time-${format(date, "yyyy-MM-dd")}-${hour}-${minute}`}
                                            checked={checkboxState[`${format(date, "yyyy-MM-dd")}-${hour}-${minute}`] || false}
                                            onChange={() => handleCheckboxChange(`${format(date, "yyyy-MM-dd")}-${hour}-${minute}`)}
                                        />
                                        <label htmlFor={`time-${format(date, "yyyy-MM-dd")}-${hour}-${minute}`} className="ml-2">
                                            {`${format(date.setHours(hour, minute), "hh:mm")} ${amPm}`}
                                        </label>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            );
        }

        return <div className="flex flex-col h-full">{days}</div>;
    };

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={goToPreviousWeek}
                    className="flex items-center text-gray-900"
                >
                    <FaChevronLeft className="mr-2" /> Previous Week
                </button>
                <div className="text-gray-900">{currentDatefixed}</div>
                <button
                    onClick={goToNextWeek}
                    className="flex items-center text-gray-900"
                >
                    Next Week <FaChevronRight className="ml-2" />
                </button>
            </div>
            <Timezone />

            {showSaveButton && (
                <button className="bg-blue-500 mb-3 text-white font-bold py-2 px-4 rounded" onClick={handleSave}>Save Data</button>
            )}

            <div className="grid grid-cols-1 gap-4">{renderCalendar()}</div>
        </div>
    );
}

export default WeekDay;
