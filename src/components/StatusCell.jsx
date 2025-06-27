import React from "react";
import { statusBadge } from "../constants/statusBadge";

const StatusCell = ({ value }) => (
  <span className={`text-xs px-2 py-1 rounded-full font-semibold ${statusBadge[value] || "bg-gray-100 text-gray-700"}`}>{value}</span>
);

export default StatusCell;