import {
  EnrolledCourse,
  EnrolledUser,
  FilteredCourse,
  Instructor,
  Review,
} from "../CourseTypes/courseState";
import { module } from "../ModuleTypes/ModuleState";

export interface authState {
  isAuthenticated: boolean;
  name: string;
  email: string;
  isLoading: boolean;
  role: string;
  profileUrl: string;
  Mycourses: mycourse[];
  user_id: string;
  EnrolledCourseProgress: EnrolledCourse;
  AllEnrolledCourseProgress:EnrolledCourse[];
  
}

export interface mycourse {
  courseId: course;
  Progress: number;
  CompletionStatus: boolean;
  _id: string;
}
export interface course {
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
  modules: module[];
  rating: number;
  isPaid: boolean;
  instructorId: Instructor[];
  published: boolean;
  reviews: Review[];
  enrolledUsers: EnrolledUser[];
  startingDate: string;
  createdAt: string;
  updatedAt: string;
}
