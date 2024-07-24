export interface courseState {
  searchResults: searchResult[];
  filteredResults: FilteredCourse[];
}
export interface searchResult {
  title: string;
  category: string;
  thumbnailUrl: string;
  _id: string;
}
export interface FilteredCourse {
  _id: string;
  title: string;
  description: string;
  category: string;
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
