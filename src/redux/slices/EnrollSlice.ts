import axiosInstance from "@/helper/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosError } from "./authSlice";

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
      const err: axiosError = error as axiosError;

      if (err.response && err.response.data && err.response.data.error) {
        return rejectWithValue(err.response.data.error);
      }
      return rejectWithValue("unknown error");
    }
  }
);

export const verifyPayment = createAsyncThunk(
  "enrollment/verify",
  async (formdata,{rejectWithValue}) => {
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
      const err: axiosError = error as axiosError;

      if (err.response && err.response.data && err.response.data.error) {
        return rejectWithValue(err.response.data.error);
      }
      return rejectWithValue("unknown error");
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
