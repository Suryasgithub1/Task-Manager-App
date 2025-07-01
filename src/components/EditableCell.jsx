import React, { useState, useEffect } from "react";

const EditableCell = ({ value = "", onChange, type = "text", columnKey }) => {
  const [input, setInput] = useState(value);
  const [error, setError] = useState("");

  useEffect(() => {
    setInput(value);
  }, [value]);

  const handleChange = (e) => {
    const val = e.target.value;
    setInput(val);

    const isEmptyTitle = type === "text" && columnKey === "title" && val.trim() === "";

    if (isEmptyTitle) {
      setError("Row title cannot be empty.");
    } else {
      setError("");
      onChange(val);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "To Do":
        return "bg-yellow-100 text-yellow-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Done":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (type === "status") {
    return (
      <select
        className={`w-full border rounded px-2 py-1 text-sm ${getStatusColor(value)}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
    );
  }

  return (
    <div>
      <input
        type="text"
        className={`w-full border rounded px-2 py-1 text-sm ${
          error ? "border-red-500" : ""
        }`}
        value={input}
        onChange={handleChange}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default EditableCell;
