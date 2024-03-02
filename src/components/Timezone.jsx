import React, { useState } from "react";

function Timezone() {
  const { selectedTimezone, handleTimezoneChange } = useState("UTC");

  const handleSelectChange = (e) => {
    handleTimezoneChange(e.target.value);
  };
  const timezones = [
    { name: "[UTC -5] Eastern Standard Time", offset: 0 },
    { name: "CET", offset: 1 },
];

  return (
    <div className="mt-4 p-2">
      <label className="block text-gray-700">Timezone:</label>
      <select
        value={selectedTimezone}
        onChange={handleSelectChange}
        className="hover:cursor-pointer mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        {timezones.map((tz) => (
          <option key={tz.offset} value={tz.offset}>
            {tz.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Timezone;
