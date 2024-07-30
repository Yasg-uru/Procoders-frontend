import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "@/helper/axiosInstance";
import { authState } from "@/types/AuthTypes/authState";
import { LoginFormSchema } from "@/schema/authschema/LoginFormSchema";
import { z } from "zod";
import { SignUpSchema } from "@/schema/authschema/signUpFormSchema";
import { VerifyFormSchema } from "@/pages/authpages/OtpVerify";
import { ForgotPasswordSchema } from "@/schema/authschema/ForgotPasswordFormSchema";
import { ResetPasswordSchema } from "@/schema/authschema/ResetpasswordFormSchema";
const saveData = (
  token: string,
  username: string,
  email: string,
  role: string,
  profileUrl: string,
  user_id: string
) => {
  const expiryDate = new Date(Date.now() + 864000000);
  localStorage.setItem("authToken", token);
  localStorage.setItem("tokenExpiry", expiryDate.toString());
  localStorage.setItem("username", username);
  localStorage.setItem("email", email);
  localStorage.setItem("role", role);
  localStorage.setItem("user_id", user_id);
  localStorage.setItem("profileurl", profileUrl);
};
const ClearState = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("tokenExpiry");
  localStorage.removeItem("username");
  localStorage.removeItem("email");
  localStorage.removeItem("role");
  localStorage.removeItem("user_id");
  localStorage.removeItem("profileurl");
};
const isAuthenticated = (): boolean => {
  const tokenExpiry = localStorage.getItem("tokenExpiry");
  const token = localStorage.getItem("authToken");
  if (!token || !tokenExpiry) {
    return false;
  }
  const currentDate = new Date();
  const expiryDate = new Date(tokenExpiry);
  if (currentDate > expiryDate) {
    ClearState();
    return false;
  }

  return true;
};
const initialState: authState = {
  isAuthenticated: false || isAuthenticated(),
  name: localStorage.getItem("username") || "",
  email: localStorage.getItem("email") || "",
  role: localStorage.getItem("role") || "",
  user_id: localStorage.getItem("user_id") || "",
  isLoading: false,
  profileUrl: localStorage.getItem("profileurl") || "",
  Mycourses: [],
  EnrolledCourseProgress: {
    courseId: "",
    modulesProgress: [],
    overallProgress: 0,
    CompletionStatus: false,
    _id: "",
  },
  AllEnrolledCourseProgress: [],
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
  async (formdata: z.infer<typeof ForgotPasswordSchema>) => {
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
export const Logout = createAsyncThunk("auth/Logout", async () => {
  try {
    const response = await axiosInstance.post(
      "/user/logout",
      {},
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
});
export const resetPassword = createAsyncThunk(
  "auth/reset-password",
  async (formdata: z.infer<typeof ResetPasswordSchema>) => {
    try {
      const { token, password } = formdata;

      const response = await axiosInstance.put(
        `/user/reset-password/${token}`,
        {
          password,
        },
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
export const Mycourse = createAsyncThunk("auth/mycourses", async () => {
  try {
    const response = await axiosInstance.get("/course/enrolled", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
});
export const completelesson = createAsyncThunk(
  "auth/completlesson",
  async (formdata: {
    courseId?: string;
    moduleId?: string;
    lessonId: string;
  }) => {
    try {
      const { courseId, moduleId, lessonId } = formdata;
      const response = await axiosInstance.post(
        `/user/lesson/complete/${courseId}/${moduleId}/${lessonId}`,
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
export const LoadCourseProgress = createAsyncThunk(
  "auth/loadprogress",
  async (courseId?: string) => {
    try {
      const response = await axiosInstance.get(
        `user/enrolledcourse/progress/${courseId}`,
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
export const GetAllEnrolledCourseProgress = createAsyncThunk(
  "auth/allcourseprogress",
  async () => {
    try {
      const response = await axiosInstance.get("/user/enrolled/progress", {
        withCredentials: true,
      });
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
      state.role = action.payload?.user.Role;
      state.profileUrl = action.payload?.user.profileUrl;
      state.user_id = action.payload?.user._id;
      const token = action.payload?.token;
      saveData(
        token,
        state.name,
        state.email,
        state.role,
        state.profileUrl,
        state.user_id
      );
    });
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(registerUser.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(registerUser.fulfilled, (state) => {
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
    builder.addCase(resetPassword.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(resetPassword.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(resetPassword.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(Logout.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.name = "";
      state.email = "";
      state.role = "";
      state.profileUrl = "";
      ClearState();
    });
    builder.addCase(Logout.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(Logout.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(Mycourse.fulfilled, (state, action) => {
      state.Mycourses = action.payload?.courses;
      state.isLoading = false;
    });
    builder.addCase(Mycourse.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(Mycourse.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(LoadCourseProgress.fulfilled, (state, action) => {
      state.EnrolledCourseProgress = action.payload?.EnrolledCourse;
    });
    builder.addCase(GetAllEnrolledCourseProgress.fulfilled, (state, action) => {
      state.AllEnrolledCourseProgress = action.payload?.EnrolledCourses;
    });
  },
});
export const {} = authSlice.actions;
export default authSlice.reducer;
