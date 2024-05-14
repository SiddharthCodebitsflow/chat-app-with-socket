import { configureStore } from "@reduxjs/toolkit";
import adminSlice from "../features/admin/adminSlice";

export default configureStore({
  reducer: {
    userStore: adminSlice
  }
})