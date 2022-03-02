import { createSlice } from "@reduxjs/toolkit";
import UISlice from "./UISlice";

const { showNotification } = UISlice.actions;
const CartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    showCart: false,
  },
  reducers: {
    toggle: (state) => {
      state.showCart = !state.showCart;
    },
    replaceCart: (state, action) => {
      if (!state.items) {
        console.log("st1", state);
        state.items = [];
        console.log("st2", state);
      }
      state.items = action.payload.items;
    },

    addToCart: (state, action) => {
      let item = null;
      if (state.items) {
        item = state.items.find((item) => item.title === action.payload.title);
      }

      if (item) {
        item.quantity += 1;
      } else {
        if (!state.items) {
          state.items = [];
          state.items.push({
            title: action.payload.title,
            price: action.payload.price,
            quantity: 1,
          });
        } else {
          state.items.push({
            title: action.payload.title,
            price: action.payload.price,
            quantity: 1,
          });
        }
      }
    },
    increase: (state, action) => {
      let item = null;
      if (state.items) {
        item = state.items.find((item) => item.title === action.payload.title);
      }
      if (item) item.quantity++;
    },
    decrease: (state, action) => {
      let item = null;

      if (state.items) {
        item = state.items.find((item) => item.title === action.payload.title);
      }

      if (item) {
        if (item.quantity === 1) {
          state.items = state.items.filter((i) => i.title !== item.title);
        } else {
          item.quantity--;
        }
      }
    },
  },
});
export const SendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      showNotification({
        status: "pending",
        message: "Sending data...",
        title: "Sending",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://redux-advanced-b9660-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json",
        { method: "PUT", body: JSON.stringify(cart) }
      );
      if (!response.ok) {
        dispatch(
          showNotification({
            status: "error",
            message: "Data sending failed",
            title: "Failed",
          })
        );
      }
      if (response.ok) {
        dispatch(
          showNotification({
            status: "success",
            message: "Data sending Successful",
            title: "Data Sent",
          })
        );
      }
    };

    try {
      await sendRequest();
    } catch (error) {
      dispatch(
        showNotification({
          status: "error",
          title: "Failed",
          message: "Data sending failed",
        })
      );
    }
  };
};

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://redux-advanced-b9660-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json"
      );
      if (!response.ok) {
        throw new Error("Cart data could not fetched");
      }
      const data = await response.json();
      // if (!data.items) {
      //   data.items = [];
      // }

      return data;
    };
    try {
      const { replaceCart } = CartSlice.actions;
      const cartData = await fetchData();
      // if (!cartData.items) {
      //   cartData.items = [];
      // }

      dispatch(replaceCart(cartData));
    } catch (error) {
      dispatch(
        showNotification({
          status: "error",
          title: "Error",
          message: "Error occured",
        })
      );
    }
  };
};

export default CartSlice;
