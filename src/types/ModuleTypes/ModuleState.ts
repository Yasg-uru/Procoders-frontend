export interface moduleState {
  modules: module[];
}
export interface module {
  title: string;
  description: string;
  lessons: lesson[];
  orderIndex:number;
}
export interface lesson {
  title: string;
  description: string;
  contentUrl: string;
  contentType: string;
  duration: number;
  resources: resources[];
}
export interface resources {
  resourceType: string;
  url: string;
}
