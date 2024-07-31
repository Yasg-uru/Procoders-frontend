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
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@uidotdev/usehooks";
// import Footer from "../mainpages/Footer";

const Homepage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { categoryWiseCourses } = useAppSelector((state) => state.course);
  const [groupedCourses, setGroupedCourses] = useState<CategoryTypes>({});
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const isMobile = useMediaQuery("(max-width: 600px)");
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
  }, []);
  useEffect(() => {
    if (categoryWiseCourses.length > 0) {
      console.log("this is a category wise course", categoryWiseCourses);
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

  return (
    <div>
      <div className="min-h-screen flex flex-col p-10 justify-center bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-10">
            <div className="flex flex-col gap-6">
              <h1 className="text-center font-bold text-4xl md:text-left">
                Stay Ahead Of The Curve With Our Courses
              </h1>
              <p className="text-center md:text-left">
                Unlock your career potential with{" "}
                <span className="text-green-500 font-semibold">Procoders</span>.
                Our job-ready courses provide cutting-edge skills at unbeatable
                prices. Invest in high-tech training and advance your expertise
                with our affordable, comprehensive programs.
              </p>
              <div className="text-center md:text-left">
                <Button className="mt-6 w-auto bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-purple-300">
                  Explore Courses
                </Button>
              </div>
            </div>
            <div className="flex flex-col items-center gap-6">
              <img
                className="w-full max-w-xs md:max-w-sm"
                src="https://www.pngarts.com/files/7/Training-PNG-Image-Transparent-Background.png"
                alt="Training"
              />
              <img
                className="w-full max-w-xs md:max-w-sm"
                src="https://cdni.iconscout.com/illustration/premium/thumb/student-graduated-from-online-courses-2769742-2302760.png"
                alt="Graduated Student"
              />
            </div>
          </div>
          <div className="mt-16">
            <h1 className="dark:text-white font-bold text-3xl text-center md:text-left">
              Explore Our Categories
            </h1>
            <p className="dark:text-white text-center md:text-left mb-6">
              Discover Your Passion
            </p>
            <div className="w-full flex flex-wrap justify-center gap-6">
              {CategoryData.length > 0 ? (
                CategoryData.map((category, index) => (
                  <div
                    onClick={() => handleClick(category.category)}
                    key={index}
                    className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md w-full max-w-xs"
                  >
                    <div className="flex items-center gap-4">
                      <div>
                        <img
                          className="h-12 w-12 rounded-full"
                          src={category.imageUrl}
                          alt={category.category}
                        />
                      </div>
                      <div>
                        <h2 className="font-bold text-xl dark:text-white">
                          {category.category}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                          {category.description.slice(0, 40)}...
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between">
                      <span>Know More</span>{" "}
                      <span>
                        <ArrowRight />
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <Loader2 className="animate-spin h-10 w-10" />
              )}
            </div>
          </div>
          <div className="mt-16">
            <h1 className="dark:text-white font-bold text-3xl text-center md:text-left">
              Our Courses
            </h1>
            {Object.keys(groupedCourses)?.map((category, index) => (
              <Fragment key={index}>
                <p className="dark:text-white text-center md:text-left mt-12 mb-4 font-bold text-2xl text-green-500">
                  {category}
                </p>

                <Carousel className="max-w-sm">
                  <CarouselContent>
                    {category.length > 0 &&
                      groupedCourses[category] &&
                      groupedCourses[category].map((course: any, index) => (
                        <div key={index} className="p-1">
                          <CarouselItem key={course._id}>
                            <CourseCard data={course} />
                          </CarouselItem>
                        </div>
                      ))}
                  </CarouselContent>

                  {category.length > 1 && !isMobile ? (
                    <>
                      <CarouselPrevious />
                      <CarouselNext />
                    </>
                  ) : (
                    ""
                  )}
                </Carousel>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
