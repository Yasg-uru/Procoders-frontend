import axiosInstance from "@/helper/axiosInstance";
import {
  courseState,
  FilteredCourse,
  notes,
} from "@/types/CourseTypes/courseState";
import { Filter, Filtertype } from "@/types/CourseTypes/FilterTypes";
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
function saveallcourseData(data: FilteredCourse[]): void {
  sessionStorage.setItem("allcourse", JSON.stringify(data));
}
function LoadallcourseData(): FilteredCourse[] {
  const data = sessionStorage.getItem("allcourse");
  if (data) {
    const parsedData = JSON.parse(data);
    return parsedData;
  }
  return [];
}
const initialState: courseState = {
  searchResults: [],
  filteredResults: LoadFilteredData() || [],
  categoryWiseCourses: LoadallcourseData() || [],
  Notes: [],
  CourseQuizzes: [],
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
  "course/filtercourses",
  async (filters: Filtertype) => {
    try {
      const response = await axiosInstance.get("/course/filter", {
        params: filters,
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
export const FilterCourse = createAsyncThunk(
  "course/filtercourse",
  async (filters: Filter | undefined) => {
    try {
      const response = await axiosInstance.get("/course/filter", {
        params: filters,
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
export const Getallcourses = createAsyncThunk(
  "course/getallcourse",
  async () => {
    try {
      const response = await axiosInstance.get("/course/filter", {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
export const createNote = createAsyncThunk(
  "course/addNote",
  async (formdata: { courseId?: string; NoteData: notes }) => {
    try {
      console.log("this is a formdata:", formdata);
      const response = await axiosInstance.post(
        `/course/note/${formdata.courseId}`,
        formdata.NoteData,
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
export const deletenote = createAsyncThunk(
  "course/deletenote",
  async (formdata: { courseId?: string; noteId: string }) => {
    try {
      const response = await axiosInstance.delete(
        `/course/note/${formdata.noteId}/${formdata.courseId}`,
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
export const getNotes = createAsyncThunk(
  "course/getnotes",
  async (formdata: { courseId?: string; lessonName?: string }) => {
    try {
      const response = await axiosInstance.get(
        `/course/usernote/${formdata.courseId}?lessonName=${formdata.lessonName}`,
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

export const RateCourse = createAsyncThunk(
  "course/rating",
  async (formdata: { courseId: string; rating: number; comment: string }) => {
    try {
      const response = await axiosInstance.post(
        `/course/rate/${formdata.courseId}`,
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
export const getAllCourseQuizes = createAsyncThunk(
  "course/getallquiz",
  async (courseId?: string) => {
    try {
      const response = await axiosInstance.get(
        `/course/module/quiz/${courseId}`,
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
    builder.addCase(Getallcourses.fulfilled, (state, action) => {
      state.categoryWiseCourses = action.payload?.courses;
      saveallcourseData(state.categoryWiseCourses);
    });
    builder.addCase(FilterCourse.fulfilled, (state, action) => {
      state.filteredResults = action.payload?.courses;
      SaveFilteredData(state.filteredResults);
    });
    builder.addCase(getNotes.fulfilled, (state, action) => {
      state.Notes = action.payload?.lessonNotes;
    });
    builder.addCase(getAllCourseQuizes.fulfilled, (state, action) => {
      state.CourseQuizzes = action.payload?.Quizzes;
    });
  },
});
export const {} = courseSlice.actions;
export default courseSlice.reducer;
