import axiosInstance from "@/helper/axiosInstance";
import { courseState, FilteredCourse } from "@/types/CourseTypes/courseState";
import { Filtertype } from "@/types/CourseTypes/FilterTypes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
function SaveFilteredData(data: FilteredCourse[]): void {
  sessionStorage.setItem("Filtered", JSON.stringify(data));
}
function LoadFilteredData(): FilteredCourse[] {
  const data = sessionStorage.getItem("Filtered");
  if (data) {
    const parsedData = JSON.parse(data);
    return parsedData as FilteredCourse[];
  }
  return [];
}
const initialState: courseState = {
  searchResults: [],
  filteredResults: LoadFilteredData() || [],
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
export const FilterCourses = createAsyncThunk(
  "course/filtercourse",
  async (filters: Filtertype) => {
    try {
      const response = await axiosInstance.get("/course/filter", {
        params: filters,
      });
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
    builder.addCase(FilterCourses.fulfilled, (state, action) => {
      state.filteredResults = action.payload?.courses;
      SaveFilteredData(state.filteredResults);
    });
  },
});
export const {} = courseSlice.actions;
export default courseSlice.reducer;
