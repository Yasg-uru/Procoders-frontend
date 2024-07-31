import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getAllCourseQuizes } from "@/redux/slices/courseSlice";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaCheck, FaTimes } from "react-icons/fa";
import { userAnswer } from "./Quiz";
import { Quiz } from "@/types/ModuleTypes/ModuleState";
import { getQuizResults } from "@/redux/slices/moduleSlice";
import { useToast } from "@/components/ui/use-toast";
const CourseQuiz: React.FC = () => {
  const location = useLocation();

  const dispatch = useAppDispatch();
  const { CourseQuizzes } = useAppSelector((state) => state.course);
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: number]: number | null;
  }>({});
  const [userAnswers, setuserAnswer] = useState<userAnswer[]>([]);
  useEffect(() => {
    if (location.state && location.state?.courseId) {
      const { courseId } = location.state;
      dispatch(getAllCourseQuizes({courseId})).unwrap().catch((error) => {
        toast({
          title: error,
          variant:"destructive"
        });
      });;
    }
  }, []);
  useEffect(() => {
    if (CourseQuizzes.length > 0) {
      setQuiz(CourseQuizzes[0]);
    }
  }, [CourseQuizzes]);
  const handleOptionClick = (
    questionIndex: number,
    optionIndex: number,
    selectedQuestionText: string
  ) => {
    if (selectedOptions[questionIndex] === undefined) {
      userAnswers.push({
        questionIndex: questionIndex,
        selectedAnswer: selectedQuestionText,
      });
      console.log("this is a user answer", userAnswers);
      setSelectedOptions((prevState) => ({
        ...prevState,
        [questionIndex]: optionIndex,
      }));
    }
  };
  const { toast } = useToast();

  const isOptionSelected = (questionIndex: number, optionIndex: number) => {
    return selectedOptions[questionIndex] === optionIndex;
  };
  const isOptionCorrect = (questionIndex: number, optionIndex: number) => {
    return quiz?.questions[questionIndex].options[optionIndex].isCorrect;
  };

  const [page, setPage] = useState<number>(0);
  const [quiz, setQuiz] = useState<Quiz | null>(CourseQuizzes[0]);
  const HandlePrevPage = () => {
    if (page >= 1) {
      setPage((page) => page - 1);
      setQuiz(CourseQuizzes[page]);
    }
  };
  const HandleNextPage = () => {
    if (page < CourseQuizzes.length - 1) {
      setPage((page) => page + 1);
      setQuiz(CourseQuizzes[page]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col gap-2 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <h1 className="text-center mt-3 text-2xl font-bold">{quiz?.title}</h1>
      <div className="flex flex-col gap-5 relative mx-auto">
        {quiz &&
          quiz?.questions.length > 0 &&
          quiz?.questions.map((question, qIndex) => (
            <Card key={qIndex} className=" relative">
              <CardHeader className="mx-auto">
                <CardTitle>{question.questionText}</CardTitle>
                <CardDescription>Type: {question.questionType}</CardDescription>
                <CardDescription>
                  Difficulty: {question.difficulty}
                </CardDescription>
                <CardDescription className="absolute top-12 right-4 font-semibold">
                  Points: {question.points}
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-8 mx-auto">
                {question.options.map((option, oIndex) => (
                  <Button
                    key={oIndex}
                    onClick={() =>
                      handleOptionClick(qIndex, oIndex, option.optionText)
                    }
                    className={`flex justify-between items-center p-4 border rounded-lg transition-colors ${
                      isOptionSelected(qIndex, oIndex)
                        ? isOptionCorrect(qIndex, oIndex)
                          ? "text-green-500 border-green-500"
                          : "text-red-500 border-red-500"
                        : ""
                    }`}
                    disabled={selectedOptions[qIndex] !== undefined}
                  >
                    {option.optionText}
                    {selectedOptions[qIndex] !== undefined &&
                      (isOptionCorrect(qIndex, oIndex) ? (
                        <FaCheck className="h-5 w-5 text-green-500" />
                      ) : (
                        isOptionSelected(qIndex, oIndex) && (
                          <FaTimes className="h-5 w-5 text-red-500" />
                        )
                      ))}
                  </Button>
                ))}
              </CardContent>
            </Card>
          ))}
      </div>
      <div className="join mx-auto">
        <Button
          type="button"
          onClick={HandlePrevPage}
          className="join-item btn"
        >
          «
        </Button>
        <Button type="button" className="join-item btn">
          Page {page + 1}
        </Button>
        <Button
          type="button"
          onClick={HandleNextPage}
          className="join-item btn"
        >
          »
        </Button>
      </div>
    </div>
  );
};
export default CourseQuiz;
