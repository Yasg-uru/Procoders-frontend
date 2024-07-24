import CourseCard from "@/helper/CourseCard";
import { useAppSelector } from "@/redux/hook";
import React from "react";

const CourseCategory: React.FC = () => {
  const { filteredResults } = useAppSelector((state) => state.course);
  return (
    <div className="min-h-screen flex flex-col p-10 justify-center bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="flex flex-col items-center mb-6">
        <h1 className="text-xl  text-gray-900 dark:text-gray-100 mb-2">
          Choose Your Program
        </h1>
        <hr className="w-full border-t-2 border-gray-300 dark:border-gray-700" />
      </div>
      <div className="flex md:flex-wrap md:flex-row  flex-col gap-10 mx-auto">
        {filteredResults.length > 0 &&
          filteredResults.map((data) => (
            <CourseCard key={data._id} data={data} />
          ))}
      </div>
    </div>
  );
};

export default CourseCategory;
