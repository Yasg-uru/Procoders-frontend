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
import { Calendar, Clock, Tag, Users } from "lucide-react";

const CourseCard: React.FC<{ data: FilteredCourse }> = ({ data }) => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { user_id } = useAppSelector((state) => state.auth);

  const CalculateDiscountedPrice = (price: number, discount: number) => {
    return Math.floor(price - price * (discount / 100));
  };

  const handleFreeEnrollment = (courseId: string) => {
    if (!isAuthenticated) {
      navigate("/Login");
      return;
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

  const isEnrolled = (enrolledUsers: EnrolledUser[]): boolean => {
    const Enrolled = enrolledUsers.findIndex(
      (enrollment) => enrollment.userId === user_id
    );
    return Enrolled !== -1;
  };

  return (
    <Card className="w-full max-w-sm border-[0.5px] border-gray-300 dark:border-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden">
      <div className="relative">
        <img
          src={
            data.thumbnailUrl ||
            "https://images.shiksha.com/mediadata/ugcDocuments/images/wordpressImages/2022_08_MicrosoftTeams-image-13-2-1.jpg"
          }
          alt="Course"
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-0 right-0 bg-black bg-opacity-50 text-white p-2 rounded-bl-lg">
          <Users className="inline-block mr-1" size={16} />
          <span className="text-sm">{data.enrolledUsers.length} enrolled</span>
        </div>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold dark:text-gray-100 line-clamp-2">
          {data.title}
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-300 line-clamp-2">
          {data.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <Tag className="mr-1 text-blue-500" size={16} />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
              {data.category}
            </span>
          </div>
          <div className="flex items-center">
            <Clock className="mr-1 text-green-500" size={16} />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
              {data.duration || "N/A"}
            </span>
          </div>
        </div>
        {!data.isPaid ? (
          <span className="font-bold text-2xl text-green-500">Free</span>
        ) : (
          <div className="flex items-center">
            <span className="font-bold text-2xl text-green-500">
              ₹{CalculateDiscountedPrice(data.price, data.discount)}
            </span>
            <span className="line-through ml-2 text-gray-500">
              ₹{data.price}
            </span>
            <span className="ml-2 bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
              {data.discount}% OFF
            </span>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col gap-2 pt-2 mt-auto">
        <div className="w-full flex items-center justify-between text-gray-600 dark:text-gray-300 text-sm">
          <div className="flex items-center">
            <Calendar className="mr-1" size={16} />
            <span>
              {data.published
                ? new Date() < new Date(data.startingDate)
                  ? "Starts " + new Date(data.startingDate).toLocaleDateString()
                  : "Started " +
                    new Date(data.startingDate).toLocaleDateString()
                : "Upcoming"}
            </span>
          </div>
          {data.published && (
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
              {new Date() < new Date(data.startingDate)
                ? "Registration Open"
                : "Ongoing"}
            </span>
          )}
        </div>
        <div className="w-full grid grid-cols-2 gap-2">
          <Button
            onClick={() => navigate(`/explore/${data._id}`)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
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
                className="bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              >
                Buy Now
              </Button>
            ) : new Date(data.startingDate) <= new Date() ? (
              <Button
                onClick={() =>
                  navigate(`/continue-course/${data._id}`, {
                    state: { price: data.price },
                  })
                }
                className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
              >
                Continue
              </Button>
            ) : (
              <Button
                disabled
                className="bg-gray-300 text-gray-600 font-semibold py-2 px-4 rounded-lg cursor-not-allowed"
              >
                Starting Soon
              </Button>
            )
          ) : !isEnrolled(data.enrolledUsers) ? (
            <Button
              onClick={() => handleFreeEnrollment(data._id)}
              className="bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Enroll Free
            </Button>
          ) : new Date(data.startingDate) <= new Date() ? (
            <Button
              onClick={() =>
                navigate(`/continue-course/${data._id}`, {
                  state: { price: data.price },
                })
              }
              className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
            >
              Continue
            </Button>
          ) : (
            <Button
              disabled
              className="bg-gray-300 text-gray-600 font-semibold py-2 px-4 rounded-lg cursor-not-allowed"
            >
              Starting Soon
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
