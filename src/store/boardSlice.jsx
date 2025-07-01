import { createSlice } from "@reduxjs/toolkit";

const generateId = () => `id-${Math.random().toString(36).slice(2, 8)}`;

const loadState = () => {
  try {
    const saved = localStorage.getItem("board-data");
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

const initialState = loadState() || {
  name: "Board",
  groups: [],
};

const persist = (state) => {
  localStorage.setItem("board-data", JSON.stringify(state));
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    addGroup: (state) => {
      const newGroup = {
        id: generateId(),
        title: "New Group",
        columns: [
          { id: "seller", name: "Seller", type: "text" },
          { id: "buyer", name: "Buyer", type: "text" },
        ],
        rows: [],
      };
      state.groups.push(newGroup);
      persist(state);
    },

    renameGroup: (state, action) => {
      const groupId = action.payload.id;
      const newTitle = action.payload.title;
      const existingGroup = state.groups.find((group) => group.id === groupId);
      if (existingGroup) {
        existingGroup.title = newTitle;
      } else {
        console.warn(`Group with ID ${groupId} not found. Rename failed.`);
      }
      persist(state);
    },

    removeGroup: (state, action) => {
      state.groups = state.groups.filter((g) => g.id !== action.payload);
      persist(state);
    },

    addRow: (state, action) => {
      const group = state.groups.find((g) => g.id === action.payload);
      if (group) {
        const newRow = {
          id: generateId(),
          title: "",
          status: "To Do",
        };

        group.rows.push(newRow);
        persist(state);
      }
    },

    removeRow: (state, action) => {
      const { groupId, index } = action.payload;
      const group = state.groups.find((g) => g.id === groupId);
      if (group && group.rows[index]) {
        group.rows.splice(index, 1);
        persist(state);
      }
    },

    updateRow: (state, action) => {
      const { groupId, rowIndex, key, value } = action.payload;
      const group = state.groups.find((g) => g.id === groupId);
      if (group && group.rows[rowIndex]) {
        group.rows[rowIndex][key] = value;
        persist(state);
      }
    },

    addColumn: (state, action) => {
      const { groupId, column } = action.payload;
      const group = state.groups.find((g) => g.id === groupId);
      if (group) {
        group.columns.push(column);
        persist(state);
      }
    },

    removeColumn: (state, action) => {
      const { groupId, columnId } = action.payload;
      const group = state.groups.find((g) => g.id === groupId);
      if (group) {
        group.columns = group.columns.filter((col) => col.id !== columnId);
        group.rows.forEach((row) => {
          delete row[columnId];
        });
        persist(state);
      }
    },

    renameColumn: (state, action) => {
      const { groupId, columnId, newName } = action.payload;
      const group = state.groups.find((g) => g.id === groupId);
      if (group) {
        const column = group.columns.find((col) => col.id === columnId);
        if (column) {
          column.name = newName;
          persist(state);
        }
      }
    },

    reorderGroups: (state, action) => {
      const { sourceIndex, destinationIndex } = action.payload;
      const groups = state.groups;
      const movedGroup = groups[sourceIndex];
      // Remove the item from the array
      const updated = groups.filter((_, index) => index !== sourceIndex);
      // Insert it at the new position
      updated.splice(destinationIndex, 0, movedGroup);
      state.groups = updated;
      persist(state);
    },
  },
});

export const {
  addGroup,
  renameGroup,
  removeGroup,
  addRow,
  removeRow,
  updateRow,
  reorderGroups,
  addColumn,
  removeColumn,
  renameColumn,
} = boardSlice.actions;

export default boardSlice.reducer;
