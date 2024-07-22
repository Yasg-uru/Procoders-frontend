import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "@/helper/axiosInstance";
import { useToast } from "@/components/ui/use-toast";
import { authState } from "@/types/AuthTypes/authState";
import { LoginFormSchema } from "@/schema/authschema/LoginFormSchema";
import { z } from "zod";
import { AxiosError } from "axios";
import { SignUpSchema } from "@/schema/authschema/signUpFormSchema";

const initialState: authState = {
  isAuthenticated: false,
  name: "",
  email: "",
  isLoading: false,
};
export const registerUser: AsyncThunk<any, any, {}> = createAsyncThunk(
  "SIGN-UP",
  async (formData: z.infer<typeof SignUpSchema>) => {
    try {
      const response = await axiosInstance.post("/user/sign-up", formData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.log("Error Registering user");
      throw error;
    }
  }
);
export const loginUser: AsyncThunk<any, any, {}> = createAsyncThunk(
  "SIGN-IN",
  async (formData: z.infer<typeof LoginFormSchema>) => {
    const { toast } = useToast();
    try {
      console.log("this is formdata", formData.email);
      const response = await axiosInstance.post(
        "/user/sign-in",

        formData,

        {
          withCredentials: true,
        }
      );
      toast({
        title: "Login successfull",
        description: "You have Logged in.",
        variant: "default",
      });
      return response.data;
    } catch (error) {
      const AxiosError: AxiosError = error as AxiosError;
      toast({
        title: "Login successfull",
        description: "You have Logged in.",
      });
      console.log("Error in registering user ", AxiosError);
      throw error;
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
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
      state.isAuthenticated = true;
      state.isLoading = false;
      state.name = action.payload?.user.username;
      state.email = action.payload?.user.email;
    });
  },
});
export const {} = authSlice.actions;
export default authSlice.reducer;
