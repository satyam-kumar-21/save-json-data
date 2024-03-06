import React, { useState, useEffect } from "react";
import { format, addWeeks, subWeeks, startOfWeek, isSameDay } from "date-fns";
import Timezone from "./Timezone";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import data from "../data";

function WeekDay() {
  

  const [currentDate, setCurrentDate] = useState(new Date());
  const currentDateFixed = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const [checkboxState, setCheckboxState] = useState({});
  const [selectedTimezone, setSelectedTimezone] = useState("5");

  //   console.log(selectedTimezone);

  useEffect(() => {
    const jsonDataString = localStorage.getItem("checkboxData");
    if (jsonDataString) {
      const jsonData = JSON.parse(jsonDataString);
      const initialState = {};
      jsonData.forEach((item) => {
        initialState[item.id] = item.checked;
      });
      setCheckboxState(initialState);
    }
  }, []);

  const goToNextWeek = () => {
    setCurrentDate(addWeeks(currentDate, 1));
  };

  const goToPreviousWeek = () => {
    setCurrentDate(subWeeks(currentDate, 1));
  };

  const handleCheckboxChange = (id) => {
    // Toggle the checkbox state
    setCheckboxState((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));

    // Check if the id matches any data.id and mark it as checked
    const foundData = data.find((item) => item.id === id);
    if (foundData) {
      setCheckboxState((prevState) => ({
        ...prevState,
        [id]: true,
      }));
    }
  };

  const handleTimezoneChange = (offset) => {
    setSelectedTimezone(offset);
  };

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

      const isPastDate = date < new Date() && !isSameDay(date, new Date());

      if (isPastDate) {
        days.push(
          <div key={i} className="flex justify-start">
            <div className="border p-2 flex-grow">
              {format(date, "eee, MMM dd")}
            </div>
            <div className="border p-2 flex-grow-0 pr-[67.3%]">
              <p className="">Past date</p>
            </div>
          </div>
        );
      } else {
        days.push(
          <div key={i} className="flex">
            <div className="border p-2 flex-grow">
              {format(date, "eee, MMM dd")}
            </div>
            <div className="border p-2 flex-grow-0">
              <div className="flex flex-wrap">
                {Array.from(
                  Array(((selectedTimezone === "5" ? 12 : 12) - 8) * 2),
                  (_, index) => {
                    const hour = Math.floor(index / 2) + 8;
                    const minute = index % 2 === 0 ? "00" : "30";
                    const amPm = hour < 12 ? "AM" : "PM";
                    const id = `${format(
                      date,
                      "yyyy-MM-dd"
                    )}-${hour}-${minute}`;
                    const timeWithOffset = format(
                      new Date(
                        date.setHours(
                          hour + (selectedTimezone === "2" ? 3 : 0),
                          minute
                        )
                      ),
                      "hh:mm"
                    );

                    const isChecked = data.some(
                      (item) => item.id === id && item.checked
                    );

                    return (
                      <div key={index} className="flex items-center">
                        <input
                          type="checkbox"
                          id={id}
                          checked={isChecked}
                          onChange={() => handleCheckboxChange(id)}
                        />
                        <label
                          htmlFor={id}
                          className="ml-2"
                        >{`${timeWithOffset} ${amPm}`}</label>
                      </div>
                    );
                  }
                )}
              </div>
              <div className="flex flex-wrap">
                {Array.from(
                  Array(((selectedTimezone === "2" ? 17.5 : 17.5) - 12) * 2),
                  (_, index) => {
                    const hour = Math.floor(index / 2) + 12;
                    const minute = index % 2 === 0 ? "00" : "30";
                    const amPm = hour < 12 ? "AM" : "PM";
                    const id = `${format(
                      date,
                      "yyyy-MM-dd"
                    )}-${hour}-${minute}`;
                    const timeWithOffset = format(
                      new Date(
                        date.setHours(
                          hour + (selectedTimezone === "5" ? 3 : 0),
                          minute
                        )
                      ),
                      "hh:mm"
                    );

                    const isChecked = data.some(
                      (item) => item.id === id && item.checked
                    );

                    return (
                      <div key={index} className="flex items-center">
                        <input
                          type="checkbox"
                          id={id}
                          checked={isChecked}
                          onChange={() => handleCheckboxChange(id)}
                        />
                        <label
                          htmlFor={id}
                          className="ml-2"
                        >{`${timeWithOffset} ${amPm}`}</label>
                      </div>
                    );
                  }
                )}
              </div>
              <div className="flex flex-wrap">
                {Array.from(
                  Array(((selectedTimezone === "2" ? 23 : 23) - 19) * 2 + 1),
                  (_, index) => {
                    const hour = Math.floor(index / 2) + 19;
                    const minute = index % 2 === 0 ? "00" : "30";
                    const amPm = hour < 12 ? "AM" : "PM";
                    const id = `${format(
                      date,
                      "yyyy-MM-dd"
                    )}-${hour}-${minute}`;
                    const timeWithOffset = format(
                      new Date(
                        date.setHours(
                          hour + (selectedTimezone === "5" ? 3 : 0),
                          minute
                        )
                      ),
                      "hh:mm"
                    );

                    const isChecked = data.some(
                      (item) => item.id === id && item.checked
                    );

                    return (
                      <div key={index} className="flex items-center">
                        <input
                          type="checkbox"
                          id={id}
                          checked={isChecked}
                          onChange={() => handleCheckboxChange(id)}
                        />
                        <label
                          htmlFor={id}
                          className="ml-2"
                        >{`${timeWithOffset} ${amPm}`}</label>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        );
      }
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
        <div className="text-gray-900">{currentDateFixed}</div>
        <button
          onClick={goToNextWeek}
          className="flex items-center text-gray-900"
        >
          Next Week <FaChevronRight className="ml-2" />
        </button>
      </div>
      <Timezone
        selectedTimezone={selectedTimezone}
        handleTimezoneChange={handleTimezoneChange}
      />

      <div className="grid grid-cols-1 gap-4">{renderCalendar()}</div>
    </div>
  );
}

export default WeekDay;

