import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useToast } from "@/components/ui/use-toast";
import { CategoryData } from "@/helper/categoryData";
import CourseCard from "@/helper/CourseCard";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { FilterCourses, Getallcourses } from "@/redux/slices/courseSlice";
import { CategoryTypes } from "@/types/CourseTypes/courseState";
import { Filtertype } from "@/types/CourseTypes/FilterTypes";
import { ArrowRight, Loader2 } from "lucide-react";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@uidotdev/usehooks";

const Homepage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { categoryWiseCourses } = useAppSelector((state) => state.course);
  const [groupedCourses, setGroupedCourses] = useState<CategoryTypes>({});
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const coursesRef = useRef<HTMLDivElement>(null);
  const isTablet = useMediaQuery("(max-width: 1024px)");
  const isMobile = useMediaQuery("(max-width: 640px)");
  const handleClick = (category: string) => {
    const filterData: Filtertype = { category };
    if (!isAuthenticated) {
      navigate("/Login");
    }
    dispatch(FilterCourses(filterData))
      .unwrap()
      .then(() => {
        toast({
          title: "Successfully filtered course by category",
        });
        navigate("/course-category", { state: filterData });
      })
      .catch((error) => {
        toast({
          title: error,
          variant: "destructive",
        });
      });
  };

  useEffect(() => {
    dispatch(Getallcourses()).catch((error) => {
      toast({
        title: error,
        variant: "destructive",
      });
    });
  }, [dispatch, toast]);

  useEffect(() => {
    if (categoryWiseCourses.length > 0) {
      const groupedRes = categoryWiseCourses.reduce((acc: any, course) => {
        const category = course.category;
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(course);
        return acc;
      }, {});
      setGroupedCourses(groupedRes);
    }
  }, [categoryWiseCourses]);

  const scrollToCourses = () => {
    if (coursesRef.current) {
      coursesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-800 dark:text-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-8">
            <h1 className="text-4xl md:text-5xl font-bold text-center md:text-left bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
              Stay Ahead Of The Curve With Our Courses
            </h1>
            <p className="text-lg text-center md:text-left">
              Unlock your career potential with{" "}
              <span className="text-green-500 font-semibold">Procoders</span>.
              Our job-ready courses provide cutting-edge skills at unbeatable
              prices. Invest in high-tech training and advance your expertise
              with our affordable, comprehensive programs.
            </p>
            <div className="text-center md:text-left">
              <Button
                onClick={scrollToCourses}
                className="mt-6 w-auto bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-purple-300"
              >
                Explore Courses
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center gap-8">
            <img
              className="w-full max-w-md rounded-lg shadow-2xl"
              src="https://www.pngarts.com/files/7/Training-PNG-Image-Transparent-Background.png"
              alt="Training"
            />
            <img
              className="w-full max-w-md rounded-lg shadow-2xl"
              src="https://cdni.iconscout.com/illustration/premium/thumb/student-graduated-from-online-courses-2769742-2302760.png"
              alt="Graduated Student"
            />
          </div>
        </div>

        <div className="mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
            Explore Our Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CategoryData.length > 0 ? (
              CategoryData.map((category, index) => (
                <div
                  onClick={() => handleClick(category.category)}
                  key={index}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl cursor-pointer"
                >
                  <div className="flex items-center gap-6">
                    <img
                      className="h-16 w-16 rounded-full object-cover"
                      src={category.imageUrl}
                      alt={category.category}
                    />
                    <div>
                      <h3 className="font-bold text-xl dark:text-white mb-2">
                        {category.category}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {category.description.slice(0, 60)}...
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-between items-center text-purple-600 dark:text-purple-400">
                    <span className="font-semibold">Know More</span>
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full flex justify-center">
                <Loader2 className="animate-spin h-12 w-12 text-purple-600" />
              </div>
            )}
          </div>
        </div>

        <div className="mt-24 px-4 md:px-8 lg:px-16" ref={coursesRef}>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
            Our Courses
          </h2>
          {Object.keys(groupedCourses)?.map((category, index) => (
            <Fragment key={index}>
              <h3 className="text-2xl font-bold text-center md:text-left mt-16 mb-8 text-green-500">
                {category}
              </h3>
              <div className="relative">
                <Carousel
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                  className="w-full"
                >
                  <CarouselContent className="-ml-2 md:-ml-4">
                    {groupedCourses[category].map((course: any) => (
                      <CarouselItem
                        key={course._id}
                        className={`pl-2 md:pl-4 ${
                          isMobile
                            ? "basis-full"
                            : isTablet
                            ? "basis-1/2"
                            : "basis-1/3"
                        }`}
                      >
                        <div className="p-1">
                          <CourseCard data={course} />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="absolute -bottom-12 left-0 right-0 flex justify-center gap-4">
                    <CarouselPrevious />
                    <CarouselNext />
                  </div>
                </Carousel>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
