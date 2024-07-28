import axiosInstance from "@/helper/axiosInstance";
import { userAnswer } from "@/pages/courseLecture/Quiz";
import { module, moduleState } from "@/types/ModuleTypes/ModuleState";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
function LoadData(): module[] {
  const data = sessionStorage.getItem("module");
  if (data) {
    const parsedData = JSON.parse(data);
    return parsedData as module[];
  }
  return [];
}
function saveData(data: module[]) {
  sessionStorage.setItem("module", JSON.stringify(data));
}
const initialState: moduleState = {
  modules: [],
  fullAccessModules: LoadData() || [],
  QuizRes: {
    ObtainedPoints: 0,
    TotalPoints: 0,
    scorePercentage: 0,
  },
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
export const getQuizResults = createAsyncThunk(
  "module/checkanswer",
  async (formdata: {
    courseId?: string;
    moduleId?: string;
    userAnswers: userAnswer[];
  }) => {
    try {
      const response = await axiosInstance.post(
        `/course/module/quiz/check/${formdata.courseId}/${formdata.moduleId}`,
        {
          userAnswers: formdata.userAnswers,
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
      saveData(state.fullAccessModules);
    });
    builder.addCase(getQuizResults.fulfilled, (state, action) => {
      state.QuizRes.ObtainedPoints = action.payload?.ObtainedPoints;
      state.QuizRes.TotalPoints = action.payload?.TotalPoints;
      state.QuizRes.scorePercentage = action.payload?.scorePercentage;
    });
  },
});
export const {} = moduleSlice.actions;
export default moduleSlice.reducer;
