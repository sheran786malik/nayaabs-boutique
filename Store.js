import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./features/cartSlice";
import fireReducer from "./features/fireSlice";

export const Store = configureStore({
  reducer: {
    cart: cartReducer,
    firestore: fireReducer,
  },
});