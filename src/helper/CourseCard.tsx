import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { Getallcourses } from "@/redux/slices/courseSlice";
import { EnrollFree } from "@/redux/slices/EnrollSlice";
import { EnrolledUser, FilteredCourse } from "@/types/CourseTypes/courseState";
import React from "react";
import { useNavigate } from "react-router-dom";

const CourseCard: React.FC<{ data: FilteredCourse }> = ({ data }) => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const handleFreeEnrollment = (courseId: string) => {
    if (!isAuthenticated) {
      navigate("/Login");
    }
    dispatch(EnrollFree(courseId))
      .unwrap()
      .then(() => {
        toast({
          title: "Successfully enrolled to the course",
        });
        dispatch(Getallcourses()).catch((error) => {
          toast({
            title: error,
          });
        });
      })
      .catch((error) => {
        console.log(
          "this is a dispatch error____________________________ ",
          error
        );
        toast({
          title: error,

          variant: "destructive",
        });
      });
  };
  const { user_id } = useAppSelector((state) => state.auth);

  const isEnrolled = (enrolledUsers: EnrolledUser[]): boolean => {
    console.log("this is a user is :", user_id);
    console.log("this is a enrolled course user id :", enrolledUsers);
    const Enrolled = enrolledUsers.findIndex(
      (enrollment) => enrollment.userId === user_id
    );
    if (Enrolled === -1) {
      console.log("this is not enrolled for id :", Enrolled);
      return false;
    }
    return true;
  };
  console.log("this is data starting:", data.startingDate);
  return (
    <Card className="w-[400px] border-[0.5px] border-gray-300 dark:border-gray-700 rounded-md shadow-md hover:shadow-xl flex flex-col">
      <CardHeader className="flex-grow-0">
        <img
          src="https://images.shiksha.com/mediadata/ugcDocuments/images/wordpressImages/2022_08_MicrosoftTeams-image-13-2-1.jpg"
          alt="Course"
          className="w-full h-[200px] object-cover rounded-t-md"
        />
        <CardTitle className="text-2xl font-bold dark:text-gray-100 p-2">
          {data.title}
        </CardTitle>
        <CardDescription className="text-gray-700 dark:text-gray-300 p-2 overflow-hidden text-ellipsis">
          {data.description.substring(0, 70)}...
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow"></CardContent>
      <CardFooter className="flex flex-col gap-2 p-2 flex-grow-0">
        <div className="w-full flex justify-between text-gray-800 dark:text-gray-200">
          {data.published ? (
            <>
              <span className="text-sm font-bold">Registration Started</span>
              <span className="text-blue-500 text-sm">
                {data.startingDate
                  ? "Starts on " + new Date(data.startingDate).toDateString()
                  : ""}
              </span>
            </>
          ) : (
            <span className="text-sm font-bold">Upcoming...</span>
          )}
        </div>
        <div className="w-full grid grid-cols-2 gap-2">
          <Button
            onClick={() =>
              navigate("/explore", { state: { courseId: data._id } })
            }
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:focus:ring-purple-300"
          >
            Explore
          </Button>
          {data.isPaid ? (
            !isEnrolled(data.enrolledUsers) ? (
              <Button
                onClick={() =>
                  navigate(`/checkout/${data._id}`, {
                    state: { data: data.price },
                  })
                }
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:focus:ring-purple-300"
              >
                Buy Now
              </Button>
            ) : (
              <Button
                onClick={() =>
                  navigate(`/continue-course/${data._id}`, {
                    state: { price: data.price },
                  })
                }
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:focus:ring-purple-300"
              >
                Continue
              </Button>
            )
          ) : !isEnrolled(data.enrolledUsers) ? (
            <Button
              onClick={() => handleFreeEnrollment(data._id)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:focus:ring-purple-300"
            >
              Enroll Free
            </Button>
          ) : (
            <Button
              onClick={() => navigate(`/continue-course/${data._id}`)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:focus:ring-purple-300"
            >
              Continue
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
