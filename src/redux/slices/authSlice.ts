import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "@/helper/axiosInstance";

import { authState } from "@/types/AuthTypes/authState";
import { LoginFormSchema } from "@/schema/authschema/LoginFormSchema";
import { z } from "zod";

import { SignUpSchema } from "@/schema/authschema/signUpFormSchema";
import { VerifyFormSchema } from "@/pages/authpages/OtpVerify";
import { ForgotPasswordSchema } from "@/schema/authschema/ForgotPasswordFormSchema";

const initialState: authState = {
  isAuthenticated: false,
  name: "",
  email: "",
  isLoading: false,
};
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData: z.infer<typeof SignUpSchema>) => {
    try {
      const response = await axiosInstance.post("/user/register", formData, {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      console.log("Error Registering user");
      throw error;
    }
  }
);
export const userLogin = createAsyncThunk(
  "auth/Login",
  async (formData: z.infer<typeof LoginFormSchema>) => {
    try {
      console.log("this is a formdata :", formData);
      const response = await axiosInstance.post("/user/sign-in", formData, {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      console.log("error in user login", error);
      throw error;
    }
  }
);
export const verifyUser = createAsyncThunk(
  "auth/verifyUser",
  async (formData: z.infer<typeof VerifyFormSchema>) => {
    try {
      const response = await axiosInstance.post("/user/verify-code", formData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.log("Error Verifying user", error);
      throw error;
    }
  }
);
export const forgotpassword = createAsyncThunk(
  "auth/forgot-password",
  async (formdata:z.infer<typeof ForgotPasswordSchema>) => {
    try {
      const response = await axiosInstance.post(
        "/user/forgot-password",
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
export const ResetPassword = createAsyncThunk(
  "auth/reset-password",
  async (formdata) => {
    try {
      const response = await axiosInstance.put(
        `/user/reset-password/${4}`,
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
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(userLogin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(userLogin.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.name = action.payload?.user.username;
      state.email = action.payload?.user.email;
    });
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(registerUser.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(verifyUser.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(verifyUser.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(verifyUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(forgotpassword.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(forgotpassword.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(forgotpassword.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(ResetPassword.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(ResetPassword.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(ResetPassword.rejected, (state) => {
      state.isLoading = false;
    });
  },
});
export const {} = authSlice.actions;
export default authSlice.reducer;
