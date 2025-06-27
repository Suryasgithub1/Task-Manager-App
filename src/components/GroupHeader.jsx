import React, { useState, useEffect } from "react";

const GroupHeader = ({ title, rowCount, onRename, onRemove, onAddColumn }) => {
  const [input, setInput] = useState(title || "");
  const [error, setError] = useState("");

  useEffect(() => {
    setInput(title || "");
  }, [title]);

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
    if (value.trim() === "") {
      setError("Group title cannot be empty");
    } else {
      setError("");
      onRename(value);
    }
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center">
        <input
          className={`text-xl font-semibold text-indigo-800 bg-transparent border-b w-full ${
            error ? "border-red-500" : "border-indigo-200"
          } focus:outline-none`}
          value={input}
          onChange={handleChange}
          placeholder="New Group"
        />
        <div className="flex gap-2 ml-4">
          <button
            onClick={onAddColumn}
            className="text-sm text-indigo-600 hover:text-indigo-800"
          >
            ➕ Column
          </button>
          <button
            onClick={onRemove}
            className="text-sm text-red-500 hover:text-red-700"
          >
            🗑
          </button>
        </div>
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default GroupHeader;
