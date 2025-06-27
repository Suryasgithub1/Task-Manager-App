import React from "react";
import { useDispatch } from "react-redux";
import GroupHeader from "./GroupHeader";
import GroupTable from "./GroupTable";
import {
  renameGroup,
  removeGroup,
  addRow,
  removeRow,
  updateRow,
  addColumn,
  removeColumn,
  renameColumn,
} from "../store/boardSlice";

const Group = ({ group }) => {
  const dispatch = useDispatch();

  const handleRename = (title) => {
    dispatch(renameGroup({ id: group.id, title }));
  };

  const handleRemove = () => {
    dispatch(removeGroup(group.id));
  };

  const handleAddRow = () => {
    dispatch(addRow(group.id));
  };

  const handleRemoveRow = (index) => {
    dispatch(removeRow({ groupId: group.id, index }));
  };

  const handleUpdateRow = (rowIndex, key, value) => {
    dispatch(updateRow({ groupId: group.id, rowIndex, key, value }));
  };

  const handleAddColumn = () => {
    const newCol = {
      id: `col-${Date.now()}`,
      name: "New Column",
      type: "text",
    };
    dispatch(addColumn({ groupId: group.id, column: newCol }));
  };

  const handleRemoveColumn = (columnId) => {
    dispatch(removeColumn({ groupId: group.id, columnId }));
  };

  const handleRenameColumn = (columnId, newName) => {
    dispatch(renameColumn({ groupId: group.id, columnId, newName }));
  };

  return (
    <div className="border border-indigo-200 rounded-xl p-5 mb-6 bg-white shadow-lg hover:shadow-indigo-300 transition-shadow">
      <GroupHeader
        title={group.title}
        onRename={handleRename}
        onRemove={handleRemove}
        onAddColumn={handleAddColumn}
      />
      <GroupTable
        columns={group.columns}
        rows={group.rows}
        onAddRow={handleAddRow}
        onRemoveRow={handleRemoveRow}
        onUpdateRow={handleUpdateRow}
        onRemoveColumn={handleRemoveColumn}
        onRenameColumn={handleRenameColumn}
      />
    </div>
  );
};

export default Group;
