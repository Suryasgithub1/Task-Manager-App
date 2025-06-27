import React from "react";
import EditableCell from "./EditableCell";

const GroupTable = ({
  columns,
  rows,
  onAddRow,
  onRemoveRow,
  onUpdateRow,
  onRemoveColumn,
  onRenameColumn
}) => {
  return (
    <div>
      <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-indigo-50 text-indigo-900">
          <tr>
            <th className="p-2 text-left">Title</th>
            {columns.map((col) => (
              <th key={col.id} className="p-2 text-left">
                <div className="flex justify-between items-center gap-1">
                  <input
                    value={col.name}
                    onChange={(e) => onRenameColumn(col.id, e.target.value)}
                    className="bg-transparent border-b border-indigo-200 focus:outline-none w-full text-sm"
                  />
                  <button
                    onClick={() => onRemoveColumn(col.id)}
                    className="text-xs text-red-500"
                  >
                    ✖
                  </button>
                </div>
              </th>
            ))}
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={row.id} className="border-t hover:bg-indigo-50">
              <td className="p-2">
                <EditableCell
                  value={row.title || ""}
                  placeholder="Title"
                  columnKey="title" // ✅ Pass this prop
                  onChange={(val) => onUpdateRow(idx, "title", val)}
                />
              </td>
              {columns.map((col) => (
                <td key={col.id} className="p-2">
                  <EditableCell
                    value={row[col.id] || ""}
                    columnKey={col.id}
                    type={col.type}
                    onChange={(val) => onUpdateRow(idx, col.id, val)}
                  />
                </td>
              ))}
              <td className="p-2">
                <EditableCell
                  value={row.status || "To Do"}
                  type="status"
                  onChange={(val) => onUpdateRow(idx, "status", val)}
                />
              </td>
              <td className="p-2">
                <button
                  onClick={() => onRemoveRow(idx)}
                  className="text-xs text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={onAddRow}
        className="mt-4 text-sm bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow"
      >
        + Add Row
      </button>
    </div>
  );
};

export default GroupTable;
