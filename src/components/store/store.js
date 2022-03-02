import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./CartSlice";
import ProductSlice from "./ProductSlice";
import UISlice from "./UISlice";

const store = configureStore({
  reducer: {
    products: ProductSlice.reducer,
    cart: CartSlice.reducer,
    ui: UISlice.reducer,
  },
});

export default store;
