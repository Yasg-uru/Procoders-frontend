import axiosInstance from "@/helper/axiosInstance";
import { moduleState } from "@/types/ModuleTypes/ModuleState";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
function LoadData() {}
function saveData() {}
const initialState: moduleState = {
  modules: [],
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
const moduleSlice = createSlice({
  name: "module",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetModules.fulfilled, (state, action) => {
      state.modules = action.payload?.course;
    });
  },
});
export const {} = moduleSlice.actions;
export default moduleSlice.reducer;
