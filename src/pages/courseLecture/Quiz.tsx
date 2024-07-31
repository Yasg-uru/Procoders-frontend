import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { Quiz } from "@/types/ModuleTypes/ModuleState";
import { FaCheck, FaTimes } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { getQuizResults } from "@/redux/slices/moduleSlice";
import { useToast } from "@/components/ui/use-toast";
// import { Progress } from "@radix-ui/react-progress";
export type userAnswer = {
  questionIndex: number;
  selectedAnswer: string;
};
const QuizTest: React.FC = () => {
  const { fullAccessModules } = useAppSelector((state) => state.module);
  const [userAnswers] = useState<userAnswer[]>([]);
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const {
    QuizRes: { ObtainedPoints, TotalPoints, scorePercentage },
  } = useAppSelector((state) => state.module);
  const { moduleId, courseId } = useParams();
  const [quiz, setQuiz] = useState<Quiz>({
    title: "",
    instructions: "",
    questions: [],
    createdAt: "",
    updatedAt: "",
  });
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: number]: number | null;
  }>({});

  useEffect(() => {
    if (moduleId && fullAccessModules.length > 0) {
      const module = fullAccessModules.find(
        (module) => module._id.toString() === moduleId.toString()
      );

      if (module) {
        setQuiz(module.quiz);
      }
    }
  }, [moduleId, fullAccessModules]);

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

  const isOptionSelected = (questionIndex: number, optionIndex: number) => {
    return selectedOptions[questionIndex] === optionIndex;
  };

  const isOptionCorrect = (questionIndex: number, optionIndex: number) => {
    return quiz.questions[questionIndex].options[optionIndex].isCorrect;
  };

  function handleCheckResults(): void {
    dispatch(getQuizResults({ courseId, moduleId, userAnswers }))
      .unwrap()
      .then(() => {
        toast({
          title: "successfully fetched your results",
        });
      })
      .catch((error) => {
        toast({
          title: error,
          variant:"destructive"
        });
      });
  }

  return (
    <div className="min-h-screen flex flex-col gap-2 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <h1 className="text-center mt-3 text-2xl font-bold">{quiz?.title}</h1>
      <div className="flex flex-col gap-5 relative mx-auto">
        {quiz?.questions.length > 0 &&
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
      <Button
        onClick={handleCheckResults}
        className="bg-gradient-to-r mx-auto from-pink-500 to-purple-500 text-white font-bold py-3 px-6 rounded-md shadow-md hover:scale-105 transition duration-300"
      >
        Check Results
      </Button>

      <div className="flex flex-col gap-2">
        <p className="font-bold text-xl ">ObtainedPoints : {ObtainedPoints}</p>
        <p className="font-bold text-xl ">TotalPoints : {TotalPoints}</p>
        <p className="font-bold text-xl ">
          scorePercentage : {Math.floor(scorePercentage)}%
        </p>
      </div>
    </div>
  );
};

export default QuizTest;
