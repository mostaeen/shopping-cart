import { createSlice } from "@reduxjs/toolkit";

const UISlice = createSlice({
  name: "ui",
  initialState: { notification: null },
  reducers: {
    showNotification: (state, action) => {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});
export default UISlice;
