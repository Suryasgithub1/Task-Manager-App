import React from "react";
import { useDispatch } from "react-redux";
import Icon from "./Icon";
import icons from "../constants/icons";
import { addGroup } from "../store/boardSlice";

const BoardHeader = () => {
  const dispatch = useDispatch();

  const handleAddGroup = () => {
    dispatch(addGroup());
  };

  return (
    <div className="flex justify-between items-center mb-5">
      <div className="flex gap-5 text-sm text-gray-600 items-center flex-wrap">
        {icons.map((icon) => (
          <div key={icon.label} className="flex items-center gap-2">
            <Icon path={icon.path} />
            <span>{icon.label}</span>
          </div>
        ))}
      </div>
      <button
        onClick={handleAddGroup}
        className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
      >
        + Add Group
      </button>
    </div>
  );
};

export default BoardHeader;
