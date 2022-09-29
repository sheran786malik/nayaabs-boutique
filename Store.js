import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./features/cartSlice";
import stockReducer from "./features/stockSlice";
import wishlistReducer from "./features/wishlistSlice";

export const Store = configureStore({
  reducer: {
    cart: cartReducer,
    stock: stockReducer,
    wishlist: wishlistReducer,
  },
});
