export interface Filtertype {
  keyword?: string;
  category?: string;
  level?: string | string[];
  language?: string | string[];
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  maxRating?: number;
  tags?: string[];
  instructorId?: string[];
  isPaid?: boolean;
}
export interface Filter {
  isPaid?: boolean | undefined;
  instructorId?: string[] | undefined;
  tags?: string[] | undefined;
  language: string[] | undefined;
}
