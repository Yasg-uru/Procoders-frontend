export interface courseState {
  searchResults: searchResult[];
  filteredResults: FilteredCourse[];
  categoryWiseCourses: FilteredCourse[];
}
export interface searchResult {
  title: string;
  category: string;
  thumbnailUrl: string;
  _id: string;
}
export interface CategoryTypes {
  [key: string]: FilteredCourse;
}
export interface FilteredCourse {
  // map(arg0: (course: FilteredCourse) => import("react/jsx-runtime").JSX.Element): import("react").ReactNode;
  _id: string;
  title: string;
  description: string;
  category: string;
  thumbnailUrl:string;
  learningOutcomes:string[];
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
  instructorId: string[];
  published: boolean;
  reviews: Review[];
  enrolledUsers: EnrolledUser[];
  startingDate: string;
  createdAt: string;
  updatedAt: string;
}

interface Review {
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
  _id: string;
}

interface EnrolledUser {
  userId: string;
  paymentStatus: string;
  enrolledAt: string;
  _id: string;
}
