import { createSlice } from "@reduxjs/toolkit";
import { db } from "../database/Firebase";

export const fireSlice = createSlice({
  name: "fireSlice",
  initialState: {},
  reducers: {},
});

export const {} = fireSlice.actions;

export default fireSlice.reducer;