import axiosInstance from "@/helper/axiosInstance";
import { moduleState } from "@/types/ModuleTypes/ModuleState";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
function LoadData() {}
function saveData() {}
const initialState: moduleState = {
  modules: [],
  fullAccessModules: [],
};
export const GetModules = createAsyncThunk(
  "module/getmodules",
  async (courseId: string) => {
    try {
      const response = await axiosInstance.get(`/course/module/${courseId}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
export const GetfullAccessModule = createAsyncThunk(
  "module/getfullaccess",
  async (courseId: string | undefined) => {
    try {
      const response = await axiosInstance.get(
        `/course/module/fullaccess/${courseId}`,
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
const moduleSlice = createSlice({
  name: "module",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetModules.fulfilled, (state, action) => {
      state.modules = action.payload?.course;
    });
    builder.addCase(GetfullAccessModule.fulfilled, (state, action) => {
      state.fullAccessModules = action.payload?.course.modules;
    });
  },
});
export const {} = moduleSlice.actions;
export default moduleSlice.reducer;
