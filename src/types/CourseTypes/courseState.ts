export interface courseState {
  searchResults: searchResult[];
}
export interface searchResult {
  title: string;
  category: string;
  thumbnailUrl: string;
  _id:string;
}
