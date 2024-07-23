import axiosInstance from "@/helper/axiosInstance";
import { courseState } from "@/types/CourseTypes/courseState";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState: courseState = {
  searchResults: [],
};
export const searchCourses = createAsyncThunk(
  "course/searchCourses",
  async (searchQuery: string) => {
    try {
      const response = await axiosInstance.get(
        `/course?searchQuery=${searchQuery}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(searchCourses.fulfilled, (state, action) => {
      state.searchResults = action.payload?.filteredInfo;
    });
  },
});
export const {} = courseSlice.actions;
export default courseSlice.reducer;
