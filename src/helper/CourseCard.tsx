import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { FilteredCourse } from "@/types/CourseTypes/courseState";
import React from "react";

const CourseCard: React.FC<{ data: FilteredCourse }> = ({ data }) => {
  console.log("this is data starting:", data.startingDate);
  return (
    <Card className="w-[400px] h-[500px] border-[0.5px] border-gray-300 dark:border-gray-700 rounded-md shadow-md hover:shadow-xl flex flex-col">
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
          {/* <span className="text-blue-500 text-sm">Starts on 27 Jul 2024</span> */}
        </div>
        <div className="w-full grid grid-cols-2 gap-2">
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:focus:ring-purple-300">
            Explore
          </Button>
          {data.isPaid ? (
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:focus:ring-purple-300">
              Buy Now
            </Button>
          ) : (
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:focus:ring-purple-300">
              Enroll Free
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
