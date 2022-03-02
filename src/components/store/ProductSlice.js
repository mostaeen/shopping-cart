import { createSlice } from "@reduxjs/toolkit";

const ProductSlice = createSlice({
  name: "product",
  initialState: [
    { title: "Test 1", description: "this is first product 1", price: 6 },
    { title: "Test 2", description: "this is first product 2", price: 7 },
    { title: "Test 3", description: "this is first product 3", price: 8 },
  ],
  reducers: {
    addProduct: (state, action) => {
      state.push({
        title: action.payload.title,
        description: action.payload.description,
        price: action.payload.price,
      });
    },
  },
});
export default ProductSlice;
