export interface moduleState {
  modules: module[];
  fullAccessModules: module[];
  QuizRes:quizResults;
}
export interface quizResults {
  ObtainedPoints: number;
  TotalPoints: number;
  scorePercentage: number;
}
export interface module {
  title: string;
  description: string;
  lessons: lesson[];
  quiz: Quiz;
  orderIndex: number;
  _id: string;
}
export interface Quiz {
  title: string;
  instructions: string;
  questions: QuizQuestions[];
  createdAt: string;
  updatedAt: string;
}
export interface QuizQuestions {
  questionText: string;
  questionType: "Multiple Choice" | "True/False" | "Short Answer";
  difficulty: "Easy" | "Medium" | "Hard";
  points: number;

  options: {
    optionText: string;
    isCorrect: boolean;
  }[];
  createdAt: string;
  updatedAT: string;
}
export interface lesson {
  title: string;
  description: string;
  contentUrl: string;
  contentType: string;
  duration: number;
  resources: resources[];
  moduleId?:string;
  _id: string;
}
export interface resources {
  resourceType: string;
  url: string;
  _id: string;
}
