import { Quiz } from "../ModuleTypes/ModuleState";
export interface courseState {
  searchResults: searchResult[];
  filteredResults: FilteredCourse[];
  categoryWiseCourses: FilteredCourse[];
  Notes: NoteData[];
  CourseQuizzes: Quiz[];
  courseDetails: FilteredCourse | undefined;
}
export interface searchResult {
  title: string;
  category: string;
  thumbnailUrl: string;
  _id: string;
}
export interface NoteData {
  userId: string;
  lessonName: string;
  note: string;
  NoteMakingTime: string;
  _id: string;
}
export interface CategoryTypes {
  [key: string]: FilteredCourse;
}
export interface FilteredCourse {
  map(
    arg0: (
      course: FilteredCourse,
      index: any
    ) => import("react/jsx-runtime").JSX.Element
  ): import("react").ReactNode;

  _id: string;
  title: string;
  description: string;
  category: string;
  thumbnailUrl: string;
  learningOutcomes: string[];
  level: string;
  language: string;
  prerequisites: string[];
  targetAudience: string[];
  learningOutComes: string[];
  syllabus: string;
  tags: string[];
  price: number;
  discount: number;
  duration: number;
  rating: number;
  isPaid: boolean;
  notes: notes[];
  quizzes: Quiz[];

  instructorId: Instructor[];
  published: boolean;
  reviews: Review[];
  enrolledUsers: EnrolledUser[];
  startingDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
  _id: string;
}
export interface notes {
  lessonName: string;
  note: string;
  NoteMakingTime: string;
}

export interface EnrolledUser {
  userId: string;
  paymentStatus: string;
  enrolledAt: string;
  _id: string;
}

export interface EnrolledCourse {
  courseId: string;
  modulesProgress: {
    moduleId: string;
    completedLessons: string[];
    progress: number;
    completionStatus: boolean;
  }[];
  overallProgress: number;
  CompletionStatus: boolean;
  _id: string;
}

export interface Instructor {
  _id: string;
  username: string;
  email: string;
  password: string;
  profileUrl: string;
  verifyCode: string;
  isVerified: boolean;
  verifyCodeExpiry: string; // This could also be Date, depending on how you handle dates
  Role: string;
  EnrolledCourses: EnrolledCourse[];
  createdAt: string; // This could also be Date
  updatedAt: string; // This could also be Date
  __v: number;
}
