import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { EnrollFree } from "@/redux/slices/EnrollSlice";
import { getCourseDetail } from "@/redux/slices/courseSlice";
import { EnrolledUser } from "@/types/CourseTypes/courseState";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Home, Share2, ArrowRight, Calendar, Users, Tag } from "lucide-react";
import ModuleComponent from "./ModuleComponent";
import Loader from "@/helper/Loader";

const DetailPage: React.FC = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const courseData = useAppSelector((state) => state.course.courseDetails);
  const { user_id } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (courseId) {
      dispatch(getCourseDetail({ courseId }));
    }
  }, [courseId, dispatch]);

  const CalculateDiscountedPrice = (price: number, discount: number) => {
    return Math.floor(price - price * (discount / 100));
  };

  const handleShare = () => {
    if (courseData) {
      const shareData = {
        title: courseData.title,
        text: `Check out this course: ${courseData.title}`,
        url: window.location.href,
      };

      if (navigator.share) {
        navigator
          .share(shareData)
          .then(() => console.log("Share successful"))
          .catch((error) => console.error("Error sharing:", error));
      } else {
        console.error("Web Share API is not supported in your browser.");
      }
    }
  };

  const isStarted = (): boolean => {
    const date = courseData?.startingDate;
    return new Date() > new Date(date ?? Date.now());
  };

  const isEnrolled = (enrolledUsers?: EnrolledUser[]): boolean => {
    if (enrolledUsers) {
      return enrolledUsers.some((enrollment) => enrollment.userId === user_id);
    }
    return false;
  };

  const handleFreeEnrollment = (courseId: string) => {
    dispatch(EnrollFree(courseId))
      .unwrap()
      .then(() => {
        toast({
          title: "Successfully enrolled to the course",
        });
      })
      .catch((error) => {
        toast({
          title: error,
          variant: "destructive",
        });
      });
  };

  if (!courseData) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen p-6 bg-white dark:bg-black text-gray-900 dark:text-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-6 text-sm text-gray-600 dark:text-gray-400">
          <Home className="w-4 h-4 mr-2" />
          <span>Home</span>
          <ArrowRight className="w-4 h-4 mx-2" />
          <span className="font-semibold text-gray-900 dark:text-gray-100">
            {courseData?.title}
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card className="mb-8 bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">
                  {courseData?.title}
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  {courseData?.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <img
                  src={courseData?.thumbnailUrl}
                  alt="Course Thumbnail"
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
                <div className="flex items-center justify-between mb-6">
                  <div>
                    {!courseData?.isPaid ? (
                      <span className="text-3xl font-bold text-green-600 dark:text-green-400">
                        Free
                      </span>
                    ) : (
                      <div>
                        <span className="text-3xl font-bold text-green-600 dark:text-green-400">
                          ₹
                          {CalculateDiscountedPrice(
                            courseData.price,
                            courseData.discount
                          )}
                        </span>
                        <span className="text-lg text-gray-500 dark:text-gray-400 line-through ml-2">
                          ₹{courseData?.price}
                        </span>
                        <Badge className="ml-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                          {courseData?.discount}% OFF
                        </Badge>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {isStarted()
                        ? "Classes started! Enroll Now!"
                        : "Classes Starting Soon! Enroll Now!"}
                    </span>
                  </div>
                </div>
                <div className="flex gap-4">
                  {courseData?.isPaid ? (
                    !isEnrolled(courseData?.enrolledUsers) ? (
                      <Button
                        onClick={() => navigate(`/checkout/${courseData?._id}`)}
                        className="flex-1"
                      >
                        Buy Now
                      </Button>
                    ) : new Date(courseData?.startingDate) <= new Date() ? (
                      <Button
                        onClick={() =>
                          navigate(`/continue-course/${courseData?._id}`, {
                            state: { price: courseData?.price },
                          })
                        }
                        className="flex-1"
                      >
                        Continue
                      </Button>
                    ) : (
                      <Button className="flex-1" disabled>
                        Starting Soon
                      </Button>
                    )
                  ) : !isEnrolled(courseData?.enrolledUsers) ? (
                    <Button
                      onClick={() =>
                        courseData?._id
                          ? handleFreeEnrollment(courseData?._id)
                          : null
                      }
                      className="flex-1"
                    >
                      Enroll Free
                    </Button>
                  ) : new Date(
                      courseData?.startingDate ? courseData?.startingDate : 0
                    ) <= new Date() ? (
                    <Button
                      onClick={() =>
                        navigate(`/continue-course/${courseData?._id}`, {
                          state: { price: courseData?.price },
                        })
                      }
                      className="flex-1"
                    >
                      Continue
                    </Button>
                  ) : (
                    <Button className="flex-1" disabled>
                      Starting Soon
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    onClick={handleShare}
                    className="flex items-center"
                  >
                    <Share2 className="w-5 h-5 mr-2" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="details" className="mb-8">
              <TabsList className="grid w-full grid-cols-4 bg-gray-100 dark:bg-gray-800">
                <TabsTrigger value="details" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">Course Details</TabsTrigger>
                <TabsTrigger value="syllabus" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">Syllabus</TabsTrigger>
                <TabsTrigger value="instructor" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">Instructor</TabsTrigger>
                <TabsTrigger value="reviews" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="details">
                <Card className="bg-white dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-white">Course Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible>
                      <AccordionItem value="prerequisites">
                        <AccordionTrigger className="text-gray-900 dark:text-white">Prerequisites</AccordionTrigger>
                        <AccordionContent className="text-gray-600 dark:text-gray-300">
                          <ul className="list-disc pl-5">
                            {courseData?.prerequisites?.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="target-audience">
                        <AccordionTrigger className="text-gray-900 dark:text-white">Target Audience</AccordionTrigger>
                        <AccordionContent className="text-gray-600 dark:text-gray-300">
                          <ul className="list-disc pl-5">
                            {courseData?.targetAudience?.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="learning-outcomes">
                        <AccordionTrigger className="text-gray-900 dark:text-white">Learning Outcomes</AccordionTrigger>
                        <AccordionContent className="text-gray-600 dark:text-gray-300">
                          <ul className="list-disc pl-5">
                            {courseData?.learningOutcomes?.map(
                              (item, index) => (
                                <li key={index}>{item}</li>
                              )
                            )}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="syllabus">
                <Card className="bg-white dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-white">Syllabus</CardTitle>
                  </CardHeader>
                  <CardContent className="text-gray-600 dark:text-gray-300">
                    <p>{courseData?.syllabus}</p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="instructor">
                <Card className="bg-white dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-white">Instructor</CardTitle>
                  </CardHeader>
                  <CardContent className="text-gray-600 dark:text-gray-300">
                    <p>Instructor details to be added</p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="reviews">
                <Card className="bg-white dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-white">Reviews</CardTitle>
                  </CardHeader>
                  <CardContent className="text-gray-600 dark:text-gray-300">
                    <p>Course reviews to be added</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {courseData?._id && <ModuleComponent courseId={courseData?._id}  />}
          </div>

          <div>
            <Card className="sticky top-6 bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Course Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Users className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" />
                    <span>
                      {courseData?.enrolledUsers?.length || 0} students enrolled
                    </span>
                  </div>
                  <Separator className="bg-gray-200 dark:bg-gray-700" />
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Calendar className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" />
                    <span>
                      Starts on:{" "}
                      {new Date(courseData?.startingDate).toLocaleDateString()}
                    </span>
                  </div>
                  <Separator className="bg-gray-200 dark:bg-gray-700" />
                  <div>
                    <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {courseData?.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleShare}>
                  
                  <Share2 className="w-4 h-4 mr-2" />
                  Share this course
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;