import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { Mycourse } from "@/redux/slices/authSlice";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MyCourse: React.FC = () => {
  const { Mycourses } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(Mycourse());
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col p-10 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <h1 className="font-bold text-2xl dark:text-white text-center">
        Your Courses
      </h1>
      <div className="flex flex-wrap gap-3 items-center justify-center mt-5">
        {Mycourses.length > 0 &&
          Mycourses.map((course) => (
            <Card
              key={course._id}
              className="w-[350px] h-[500px] flex flex-col border-[0.5px] dark:border-white shadow-lg rounded-md p-5"
            >
              <CardHeader>
                <img
                  src="https://images.shiksha.com/mediadata/ugcDocuments/images/wordpressImages/2022_08_MicrosoftTeams-image-13-2-1.jpg"
                  alt="Course"
                  className="w-full h-[200px] object-cover rounded-t-md"
                />
                <Progress value={20} color="red" className="w-full" />
                <CardTitle className="text-2xl font-bold mt-3">
                  {course.courseId.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                {/* Content here, if needed */}
              </CardContent>
              <CardFooter className="mt-auto">
                <Button
                  onClick={() => navigate(`/continue-course/${course._id}`)}
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
