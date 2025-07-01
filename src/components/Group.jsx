import React from "react";
import GroupHeader from "./GroupHeader";
import GroupTable from "./GroupTable";

const Group = ({
  group,
  onRenameGroup,
  onRemoveGroup,
  onAddRow,
  onRemoveRow,
  onUpdateRow,
  onAddColumn,
  onRemoveColumn,
  onRenameColumn,
}) => {
  const handleAddColumn = () => {
    const newCol = {
      id: `col-${Date.now()}`,
      name: "New Column",
      type: "text",
    };
    onAddColumn(group.id, newCol);
  };

  return (
    <div className="border border-indigo-200 rounded-xl p-5 mb-6 bg-white shadow-lg hover:shadow-indigo-300 transition-shadow">
      <GroupHeader
        title={group.title}
        onRename={(title) => onRenameGroup(group.id, title)}
        onRemove={() => onRemoveGroup(group.id)}
        onAddColumn={handleAddColumn}
      />

      <GroupTable
        columns={group.columns}
        rows={group.rows}
        onAddRow={() => onAddRow(group.id)}
        onRemoveRow={(index) => onRemoveRow(group.id, index)}
        onUpdateRow={(rowIndex, key, value) =>
          onUpdateRow(group.id, rowIndex, key, value)
        }
        onRemoveColumn={(colId) => onRemoveColumn(group.id, colId)}
        onRenameColumn={(colId, name) => onRenameColumn(group.id, colId, name)}
      />
    </div>
  );
};

export default Group;
