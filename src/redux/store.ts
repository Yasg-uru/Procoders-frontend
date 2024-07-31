import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import courseSlice from "./slices/courseSlice";
import EnrollSlice from "./slices/EnrollSlice";
import moduleSlice from "./slices/moduleSlice";
// import thunk from "redux-thunk";
const store = configureStore({
  reducer: {
    auth: authSlice,
    course: courseSlice,
    enrollment: EnrollSlice,
    module: moduleSlice,
  },
});
// Get the type of our store variable
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];
export default store;
