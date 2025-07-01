import React, { useState } from "react";

const DropdownMenu = () => {
  const [selected, setSelected] = useState("");

  const handleChange = (e) => {
    setSelected(e.target.value);
    //console.log("Selected:", e.target.value);
  };

  return (
    <select
      value={selected}
      onChange={handleChange}
      className="text-sm text-indigo-700 border border-indigo-300 rounded px-3 py-1 shadow-sm hover:border-indigo-500"
    >
      <option value="">
        Task Board
      </option>
      <option value="Homepage"> Homepage</option>
      <option value="Services">Services</option>
      <option value="Contact Us">Contact Us</option>
    </select>
  );
};

export default DropdownMenu;
