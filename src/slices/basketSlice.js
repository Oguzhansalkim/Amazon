import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action) => {
      const newbasket = [...state.items];
      const index = newbasket.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index >= 0) {
        newbasket.splice(index, 1);
      } else {
        console.warn(`cant remove product id:${action.payload.id}`);
      }
      state.items = newbasket;
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;

export const priceTotal = (state) =>
  state.basket.items.reduce((total, item) => total + item.price, 0);

export default basketSlice.reducer;
