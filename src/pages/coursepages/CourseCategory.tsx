import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
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
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-sm mx-auto mt-5 mb-8"
      >
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <Button variant="destructive">Query</Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
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
