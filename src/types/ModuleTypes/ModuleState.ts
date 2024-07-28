export interface moduleState {
  modules: module[];
  fullAccessModules: module[];
}
export interface module {
  title: string;
  description: string;
  lessons: lesson[];
  orderIndex: number;
  _id: string;
}
export interface lesson {
  title: string;
  description: string;
  contentUrl: string;
  contentType: string;
  duration: number;
  resources: resources[];
  _id: string;
}
export interface resources {
  resourceType: string;
  url: string;
  _id: string;
}
