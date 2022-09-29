import { createSlice } from "@reduxjs/toolkit";
import { db } from "../external/Firebase";

const initialState = {
  stockItems: {},
};

export const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    addToStock: (state, { payload }) => {
      if (state.stockItems) {
        state.stockItems.push(payload);
      }
    },
  },
});

export const { addToStock } = stockSlice.actions;

export const showStock = (state) => state.stock.stockItems;

export default stockSlice.reducer;
