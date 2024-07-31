import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  GetAllEnrolledCourseProgress,
  // LoadCourseProgress,
  Mycourse,
} from "@/redux/slices/authSlice";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProgressBarclasss } from "../courseLecture/CourseContinue";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
const MyCourse: React.FC = () => {
  const { Mycourses } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { AllEnrolledCourseProgress } = useAppSelector((state) => state.auth);
  console.log("this is a my courses and all enrolled progress",Mycourses)
  useEffect(() => {
    dispatch(Mycourse()).then(() => {
      dispatch(GetAllEnrolledCourseProgress())
        .then(() => {
          toast({
            title: "successfully fetched your progress",
          });
        })
        .catch((error) => {
          toast({
            title: error,
            variant: "destructive",
          });
        });
    }).catch((error)=>{
      toast({
        title: error,
        variant: "destructive",
      });
    });
  }, [dispatch]);
  if (AllEnrolledCourseProgress.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-10 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        <div className="flex flex-col items-center justify-center absolute mt-1 bg-white border border-gray-300 rounded shadow-lg w-96 h-auto p-4 dark:bg-gray-800 dark:border-gray-600 dark:shadow-gray-700 z-10">
          <img
            className="h-32 w-32"
            src="https://www.ikbenik-kindercoaching.nl/wp-content/uploads/2019/07/sorry-3905517_1920.png"
            alt=""
          />
          <p className="mx-auto">Sorry, No Course Found!,Please Enroll Now </p>
          <Button
            onClick={() => navigate(-1)}
            className="bg-gradient-to-r m-2 from-purple-600 to-pink-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl focus:outline-none  focus:ring-purple-500 dark:focus:ring-purple-300"
          >
            Go Back
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex flex-col p-10 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <h1 className="font-bold text-2xl dark:text-white text-center">
        Your Courses
      </h1>
      <div className="flex flex-wrap gap-3 items-center justify-center mt-5">
        {Mycourses.length > 0 &&
          Mycourses.map((course, index) => (
            <Card
              key={course._id}
              className="w-[350px] flex flex-col border-[0.5px] dark:border-white shadow-lg rounded-md "
            >
              <CardHeader>
                <img
                  src="https://images.shiksha.com/mediadata/ugcDocuments/images/wordpressImages/2022_08_MicrosoftTeams-image-13-2-1.jpg"
                  alt="Course"
                  className="w-full h-[200px] object-cover rounded-t-md"
                />
                <progress
                  className={ProgressBarclasss(
                    AllEnrolledCourseProgress[index]?.overallProgress
                  )}
                  value={AllEnrolledCourseProgress[index]?.overallProgress}
                  max="100"
                ></progress>
                <CardTitle className="text-2xl font-bold mt-3">
                  {course.courseId.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                {/* Content here, if needed */}
                <CircularProgressbar
                  className="w-16 mx-auto"
                  value={Math.floor(
                    AllEnrolledCourseProgress[index]?.overallProgress
                  )}
                  text={`${Math.floor(
                    AllEnrolledCourseProgress[index]?.overallProgress
                  )}%`}
                />
                {AllEnrolledCourseProgress[index]?.CompletionStatus && (
                  <p className="font-semibold text-md text-green-500 italic">
                    Completed
                  </p>
                )}
              </CardContent>
              <CardFooter className="mt-auto">
                <Button
                  onClick={() =>
                    navigate(`/continue-course/${course.courseId._id}`)
                  }
                  className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 px-6 rounded-md shadow-md hover:scale-105 transition duration-300 w-full m-2"
                >
                  Continue
                </Button>
              </CardFooter>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default MyCourse;
