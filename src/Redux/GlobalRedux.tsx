/* eslint-disable @typescript-eslint/no-unused-vars */
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const GlobalRedux = createSlice({
  name: 'GlobalRedux',
  initialState,
  reducers: {
    addToCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        item => item.id === action.payload.id,
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
      } else {
        const tempProduct = {
          ...action.payload,
          cartQuantity: 1,
        };
        state.cartItems.push(tempProduct);
      }
      console.log(state.cartItems);
      let {total, quantity} = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const {price, cartQuantity} = cartItem;
          const itemTotal = price * cartQuantity;
          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        },
      );
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
    removeFromCart(state, action) {
      const nextCartItems = state.cartItems.filter(
        cartItem => cartItem.id !== action.payload.id,
      );
      state.cartItems = nextCartItems;
      console.log(state.cartItems);
      let {total, quantity} = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const {price, cartQuantity} = cartItem;
          const itemTotal = price * cartQuantity;
          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        },
      );
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        item => item.id === action.payload.id,
      );
      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
      } else {
        const nextCartItems = state.cartItems.filter(
          cartItem => cartItem.id !== action.payload.id,
        );
        state.cartItems = nextCartItems;
      }
      let {total, quantity} = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const {price, cartQuantity} = cartItem;
          const itemTotal = price * cartQuantity;
          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        },
      );
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
    clearCart(state, action) {
      state.cartItems = [];
      state.cartTotalAmount = 0;
      state.cartTotalQuantity = 0;
    },
  },
});

export const {addToCart, removeFromCart, decreaseCart, clearCart} =
  GlobalRedux.actions;

export default GlobalRedux.reducer;
