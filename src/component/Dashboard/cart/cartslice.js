// cartslice.js
import { createSlice } from "@reduxjs/toolkit";
import foodItems from "../../foodimage"; // Import your food items

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    totalAmount: 0,
  },
  reducers: {
    addTocart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      // Log the action payload instead of item
      console.log("Adding to cart:", action.payload);

      // Find the food item details based on the food ID
      const foodDetail = foodItems.find(
        (item) => item.id === action.payload.id
      );

      if (foodDetail) {
        if (itemIndex >= 0) {
          // If the item exists, increase its quantity
          state.cartItems[itemIndex].cartQuantity += 1;
        } else {
          // If it doesn't exist, add it to the cart with food details
          const tempProduct = {
            ...action.payload,
            ...foodDetail,
            cartQuantity: 1,
          };
          state.cartItems.push(tempProduct);
        }
      } else {
        console.error("Food item not found for ID:", action.payload.id);
      }
    },
    removeCartItem(state, action) {
      const newCartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      state.cartItems = newCartItems;
    },
    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0 && state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
      } else {
        const newCartItems = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );
        state.cartItems = newCartItems;
      }
    },
    clearCartItem(state) {
      state.cartItems = [];
    },
    getTotals(state) {
      const { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;
          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;
          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      state.totalAmount = total;
    },
  },
});

export const {
  addTocart,
  removeCartItem,
  decreaseCart,
  clearCartItem,
  getTotals,
} = cartSlice.actions;

export default cartSlice.reducer;
