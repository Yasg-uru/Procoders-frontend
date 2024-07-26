import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import courseSlice, { FilterCourses } from "@/redux/slices/courseSlice";
import React, { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { FcClearFilters } from "react-icons/fc";
import { Instructor } from "@/types/CourseTypes/courseState";
import FilterCompo from "./FilterCompo";
import { useLocation } from "react-router-dom";

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
  const { filterData } = location?.state;
  const { toast } = useToast();
  const [open, setOpen] = useState<boolean>(false);

  const [Instructors, setInstructors] = useState<Instructor[]>([]);
  const [Languages, setLanguages] = useState<string[]>([]);
  const [isFree, setIsFree] = useState<boolean[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [isFilterApplied, setIsFilterApplied] = useState<boolean>(false);

  useEffect(() => {
    if (filteredResults.length > 0) {
      const Instructors = filteredResults.flatMap(
        (course) => course.instructorId
      );
      const languages = filteredResults.map((course) => course.language);
      const IsFree = filteredResults.map((course) => course.isPaid);
      const tags = filteredResults.flatMap((course) => course.tags);

      setInstructors(Instructors);
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
      .catch(() => {
        toast({
          title: "Error in Reseting filter",
        });
      });
  }

  return (
    <div className="relative min-h-screen flex flex-col p-10 justify-center bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="flex flex-col items-center mb-6">
        <h1 className="text-xl text-gray-900 dark:text-gray-100 mb-2">
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
    </div>
  );
};

export default CourseCategory;
