import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToBasket: (state, { payload }) => {
      // state.cartItems = [...state.cartItems, action.payload]
      const item = state.cartItems.find((data) => data.name === payload.name);
      if (item) {
        for (let index = 0; index < state.cartItems.length; index++) {
          if (state.cartItems[index].size === payload.size) {
            console.log("match and quantity increased");
            state.cartItems.map((data) => {
              data
                ? {
                    ...data,
                    quantity: data.quantity++,
                  }
                : data;
            });
          } else {
            state.cartItems.push(payload);
          }
        }
      } else {
        state.cartItems.push(payload);
      }
    },
    removeFromBasket: (state, action) => {
      const item = state.cartItems.findIndex(
        (data) =>
          data.id === action.payload.id && data.size === action.payload.size
      );
      state.cartItems.pop(item);
    },
    increaseQuantityOfItem: (state, { payload }) => {
      const item = state.cartItems.find(
        (data) => data.name === payload.name && data.size === payload.size
      );
      console.log("found item", item);
      if (item) {
        item.quantity++;
      }
    },
    decreaseQuantityOfItem: (state, { payload }) => {
      const item = state.cartItems.find(
        (data) => data.id === payload.id && data.size === payload.size
      );
      console.log("found item", item);

      if (item.quantity > 1) {
        item.quantity--;
      }
    },
  },
});

export const {
  addToBasket,
  removeFromBasket,
  increaseQuantityOfItem,
  decreaseQuantityOfItem,
} = cartSlice.actions;

export const selectCartItemsItemsWithID = (state, id) => {
  state.cart.cartItems.filter((item) => item.id === id);
};

export const selectCartItems = (state) => state.cart.cartItems;

export const selectCartTotal = (state) =>
  state.cart.cartItems.reduce(
    (accumulator, current) => (accumulator += current.price * current.quantity),
    0
  );
export default cartSlice.reducer;
