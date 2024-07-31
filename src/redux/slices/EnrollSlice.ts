import axiosInstance from "@/helper/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {};
export const EnrollFree = createAsyncThunk(
  "enrollment/free",
  async (courseId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/payment/enroll-free/${courseId}`,
        {},
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error: any) {
      console.log("this is a free enroll error :", error.response.data.error);
      return rejectWithValue(error.response.data.error || "Unknown error");
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
 
});

export const {} = EnrollmmentSlice.actions;
export default EnrollmmentSlice.reducer;
