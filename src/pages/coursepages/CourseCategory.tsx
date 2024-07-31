import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useToast } from "@/components/ui/use-toast";
import CourseCard from "@/helper/CourseCard";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { FilterCourses } from "@/redux/slices/courseSlice";
import React, { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { FcClearFilters } from "react-icons/fc";
import { Instructor } from "@/types/CourseTypes/courseState";
import FilterCompo from "./FilterCompo";
import { useLocation } from "react-router-dom";
import { Users } from "lucide-react";

const FilterQuery = [
  { level: "Intermediate" },
  { level: "Beginner" },
  { level: "Advance" },
  { isPaid: true },
  { isPaid: false },
];
const CourseCategory: React.FC = () => {
  const { filteredResults } = useAppSelector((state) => state.course);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { filterData } = location?.state || {};
  const { toast } = useToast();
  const [open, setOpen] = useState<boolean>(false);

  const [Instructors, setInstructors] = useState<Instructor[]>([]);
  const [Languages, setLanguages] = useState<string[]>([]);
  const [isFree, setIsFree] = useState<boolean[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [isFilterApplied, setIsFilterApplied] = useState<boolean>(false);
  const uniqueById = (array: Instructor[]) => {
    const seen = new Set();
    return array.filter((item) => {
      if (seen.has(item._id)) {
        return false;
      }
      seen.add(item._id);
      return true;
    });
  };
  useEffect(() => {
    if (filteredResults.length > 0) {
      const instructorIds = filteredResults.flatMap(
        (course) => course.instructorId
      );
      const uniqueInstructors = uniqueById(instructorIds);
      const languages = filteredResults.map((course) => course.language);
      const IsFree = filteredResults.map((course) => course.isPaid);
      const tags = filteredResults.flatMap((course) => course.tags);

      setInstructors(uniqueInstructors);
      setLanguages(languages);
      setIsFree(IsFree);
      setTags(tags);
    }
  }, [filteredResults]);
  const handleFilter = (filter: { [key: string]: any }) => {
    dispatch(FilterCourses(filter))
      .unwrap()
      .then(() => {
        setIsFilterApplied(true);

        toast({
          title: "successfully filtered",
        });
      })
      .catch((error) => {
        const errorMessage =
          typeof error === "object" && error.message
            ? error.message
            : "An error occurred";
        toast({
          title: errorMessage,
          variant: "destructive",
        });
      });
  };

  function ResetFilter(): void {
    dispatch(FilterCourses(filterData))
      .unwrap()
      .then(() => {
        toast({
          title: "Reset filter successfully",
        });
        setIsFilterApplied(false);
      })
      .catch((error) => {
        toast({
          title: error,
          variant: "destructive",
        });
      });
  }

  return (
    <div className="relative min-h-screen  justify-center bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="flex flex-col items-center mb-6">
        <h1 className="text-xl text-gray-900 dark:text-gray-100 mb-2 my-3">
          Choose Your Program
        </h1>
        <hr className="w-full border-t-2 border-gray-300 dark:border-gray-700" />
      </div>

      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-sm mx-auto mt-5 mb-8"
      >
        <CarouselContent>
          {FilterQuery.map((filter, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              {typeof filter?.level === "string" ? (
                <Button
                  onClick={() => handleFilter(filter)}
                  variant="destructive"
                >
                  {filter.level}
                </Button>
              ) : (
                <Button
                  onClick={() => handleFilter(filter)}
                  variant="destructive"
                >
                  {filter.isPaid ? "Paid Courses" : "Free Courses"}
                </Button>
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {!isFilterApplied ? (
        <FaFilter
          size={30}
          onClick={() => setOpen(true)}
          className="absolute top-4 right-4 text-green-500 cursor-pointer hover:text-green-700"
        />
      ) : (
        <FcClearFilters
          size={40}
          onClick={ResetFilter}
          className="absolute top-4 right-4 text-green-500 cursor-pointer hover:text-green-700"
        />
      )}
      <FilterCompo
        open={open}
        setOpen={setOpen}
        filterData={{ Instructors, Languages, isFree, tags }}
        setIsFilterApplied={setIsFilterApplied}
      />

      <div className="flex md:flex-wrap md:flex-row items-center justify-center flex-col gap-10 mx-auto">
        {filteredResults.length > 0 &&
          filteredResults.map((data) => (
            <CourseCard key={data._id} data={data} />
          ))}
      </div>
      <div className="flex flex-col items-center mb-6 mt-9">
        <h1 className="text-xl text-gray-900 dark:text-gray-100 mb-2">
          Instructors
        </h1>
        <hr className="w-full border-t-2 border-gray-300 dark:border-gray-700" />
      </div>
      <div className="mx-auto">
        {Instructors.length > 0 &&
          Instructors.map((instructor) => (
            <Card
              key={instructor._id}
              className="max-w-sm flex flex-col border-[0.5px] dark:border-white shadow-lg rounded-md "
            >
              <CardHeader>
                <img
                  src={instructor.profileUrl}
                  alt="Course"
                  className="w-full h-[200px] object-cover rounded-t-md"
                />

                <CardTitle className="text-2xl font-bold mt-3 p-4">
                  {instructor.username}
                </CardTitle>
                <CardDescription className="p-4">
                  LinkedIn | Walmart | Amazon Oracle
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow p-4">
                <Users />
                <p className="flex flex-col">
                  <span>10+ Years</span>
                  <span>Teaching Experience</span>
                </p>
              </CardContent>
              <CardFooter className=" p-4">
                Google Pay | Ex-LinkedIn Eng | GSoc Harward | 7 yrs teching |
                Top Educator, FAANG Placements
              </CardFooter>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default CourseCategory;
