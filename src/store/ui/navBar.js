import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "navbar",
  initialState: {
    selection: "",
  },
  reducers: {
    navbarSelectionChanged: (navbar, action) => {
      navbar.selection = action.payload;
    },
  },
});

export const { navbarSelectionChanged } = slice.actions;

export default slice.reducer;
