import { createSlice } from "@reduxjs/toolkit";

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: [],
  reducers: {
    add: (state, action) => {
      state = state.push({
        id: action.payload.id,
        title: action.payload.title,
        price: action.payload.price,
        image: action.payload.images[0].src,
        description: action.payload.description,
      });
    },
    deleteWish: (state, action) => {
      state = state.filter((wish) => wish.id != action.payload.id);
      return state;
    },
  },
});

export const { add, deleteWish } = wishlistSlice.actions;

export const selectAll = (state) => state.wishlist;

export const selectItem = (state, payload) =>
  state.findIndex((data) => data.id === payload.id);

export default wishlistSlice.reducer;
