import { createSlice } from "@reduxjs/toolkit";

const generateId = () =>
  `id-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;

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
      const { id, title } = action.payload;
      const group = state.groups.find((g) => g.id === id);
      if (group) {
        group.title = title;
        persist(state);
      }
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

        group.columns.forEach((col) => {
          newRow[col.id] = "";
        });

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

    reorderGroups: (state, action) => {
      const { sourceIndex, destinationIndex } = action.payload;
      const [moved] = state.groups.splice(sourceIndex, 1);
      state.groups.splice(destinationIndex, 0, moved);
      persist(state);
    },

    addColumn: (state, action) => {
      const { groupId, column } = action.payload;
      const group = state.groups.find((g) => g.id === groupId);
      if (group) {
        group.columns.push(column);
        group.rows.forEach((row) => {
          row[column.id] = "";
        });
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
