import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Group from "./Group";
import {
  addGroup,
  addRow,
  removeRow,
  updateRow,
  renameGroup,
  removeGroup,
  reorderGroups,
  addColumn,
  removeColumn,
  renameColumn,
} from "../store/boardSlice";

const GroupsList = () => {
  const board = useSelector((state) => state.board); //Subscribing to the store

  const dispatch = useDispatch(); 

  const [dragIndex, setDragIndex] = useState(null);

  const handleDragStart = (index) => setDragIndex(index);

  const handleDrop = (index) => {
    if (dragIndex === null || dragIndex === index) return;
    dispatch(reorderGroups({ sourceIndex: dragIndex, destinationIndex: index }));
    setDragIndex(null);
  };

  const handleDragOver = (e) => e.preventDefault();

  const groupHandlers = {
    onRenameGroup: (id, title) => dispatch(renameGroup({ id, title })),

    onRemoveGroup: (id) => dispatch(removeGroup(id)),

    onAddRow: (id) => dispatch(addRow(id)),

    onRemoveRow: (id, index) => dispatch(removeRow({ groupId: id, index })),

    onUpdateRow: (id, rowIndex, key, value) =>
      dispatch(updateRow({ groupId: id, rowIndex, key, value })),

    onAddColumn: (groupId, column) =>
      dispatch(addColumn({ groupId, column })),

    onRemoveColumn: (id, colId) =>
      dispatch(removeColumn({ groupId: id, columnId: colId })),
    
    onRenameColumn: (id, colId, name) =>
      dispatch(renameColumn({ groupId: id, columnId: colId, newName: name })),
  };

  if (board.groups.length === 0) {
    return (
      <p className="text-center text-gray-500 italic mb-6">
        No groups yet. Click "+ Add Group" to create one.
      </p>
    );
  }

  return (
    <div>
      {board.groups.map((group, index) => (
        <div
          key={group.id}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={handleDragOver}
          onDrop={() => handleDrop(index)}
          className="mb-4 cursor-move"
        >
          <Group group={group} {...groupHandlers} />
        </div>
      ))}
    </div>
  );
};

export default GroupsList;
