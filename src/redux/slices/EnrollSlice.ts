import axiosInstance from "@/helper/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState = {};
export const EnrollFree = createAsyncThunk(
  "enrollment/free",
  async (courseId: string) => {
    try {
      const response = await axiosInstance.post(
        `/payment/enroll-free/${courseId}`,
        {},
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const verifyPayment = createAsyncThunk(
  "enrollment/verify",
  async (formdata) => {
    try {
      const response = await axiosInstance.post(
        "/payment/verify-payment",
        formdata,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
const EnrollmmentSlice = createSlice({
  name: "enrollment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const {} = EnrollmmentSlice.actions;
export default EnrollmmentSlice.reducer;
