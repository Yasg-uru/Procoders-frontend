import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { EnrolledUser } from "@/types/CourseTypes/courseState";
import { Home } from "lucide-react";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CiShare2 } from "react-icons/ci";
import ModuleComponent from "./ModuleComponent";
import { useToast } from "@/components/ui/use-toast";
import { EnrollFree } from "@/redux/slices/EnrollSlice";
import Loader from "@/helper/Loader";
import { getCourseDetail } from "@/redux/slices/courseSlice";

const DetailPage: React.FC = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const  courseData  = useAppSelector((state) => state.course.courseDetails);
  // const [courseData, setCourseData] = useState<FilteredCourse>();
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  // useEffect(() => {
  //   if (categoryWiseCourses.length > 0 && courseId) {
  //     const filteredCourse = categoryWiseCourses.find(
  //       (course) => course._id.toString() === courseId.toString()
  //     );
  //     if (filteredCourse) {
  //       setCourseData(filteredCourse);
  //     }
  //   }
  // }, [categoryWiseCourses, courseId]);
  useEffect(() => {
    if (courseId) {
      dispatch(getCourseDetail({ courseId }));
    }
  }, [courseId]);
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
  const { user_id } = useAppSelector((state) => state.auth);
  const isEnrolled = (enrolledUsers?: EnrolledUser[]): boolean => {
    console.log("this is a user is :", user_id);
    console.log("this is a enrolled course user id :", enrolledUsers);
    if (enrolledUsers) {
      const Enrolled = enrolledUsers.findIndex(
        (enrollment) => enrollment.userId === user_id
      );
      if (Enrolled === -1) {
        console.log("this is not enrolled for id :", Enrolled);
        return false;
      }
      return true;
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
    <div className="min-h-screen flex flex-col p-10 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="w-full bg-gray-100 dark:bg-gray-900 grid md:grid-cols-2 gap-10 grid-flow-row">
        {/* Course Details Section */}
        <div className="flex flex-col gap-3 p-3">
          <p className="flex">
            <Home /> Home {"  "} &gt; {"  "}
            <span className="font-bold dark:text-white">
              {courseData?.title}
            </span>
          </p>
          <h1 className="font-bold text-3xl">{courseData?.title}</h1>
          <img
            src={courseData?.thumbnailUrl}
            alt="Course Thumbnail"
            className="h-[200px] object-cover rounded-md mb-4"
          />
          <p className="mb-4">{courseData?.description}</p>
          <p className="mb-4">
            {!courseData?.isPaid ? (
              <span className="font-bold text-2xl ">Free</span>
            ) : (
              <span>
                <span className="font-bold text-xl">
                  ₹
                  {CalculateDiscountedPrice(
                    courseData.price,
                    courseData.discount
                  )}
                </span>
                <span className="line-through ml-2">{courseData?.price}</span>{" "}
                <span className="font-bold text-green-500 text-xl ml-2">
                  {courseData?.discount}% Discount
                </span>
              </span>
            )}
          </p>
          <p className="font-bold text-green-500 mb-4">
            {isStarted()
              ? "Classes started! Enroll Now!"
              : "Classes Starting Soon! Enroll Now!"}
          </p>
          <div className="flex gap-3 mb-6">
            {/* <Button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 px-12 rounded-md shadow-md hover:scale-105 transition duration-300">
              Buy Now
            </Button> */}
            {courseData?.isPaid ? (
              !isEnrolled(courseData?.enrolledUsers) ? (
                <Button
                  onClick={() => navigate(`/checkout/${courseData?._id}`)}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 px-12 rounded-md shadow-md hover:scale-105 transition duration-300"
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
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:focus:ring-purple-300"
                >
                  Continue
                </Button>
              ) : (
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:focus:ring-purple-300">
                  Starting Soon
                </Button>
              )
            ) : !isEnrolled(courseData?.enrolledUsers) ? (
              <Button
                onClick={() =>
                  courseData?._id ? handleFreeEnrollment(courseData?._id) : null
                }
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 px-12 rounded-md shadow-md hover:scale-105 transition duration-300"
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
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:focus:ring-purple-300"
              >
                Continue
              </Button>
            ) : (
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:focus:ring-purple-300">
                Starting Soon
              </Button>
            )}
            <Button
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 px-12 rounded-md shadow-md hover:scale-105 transition duration-300"
              onClick={handleShare}
            >
              Share <CiShare2 size={26} />
            </Button>
          </div>

          {/* Additional Course Details */}
          <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded-md mb-4">
            <h2 className="font-bold text-xl mb-2">Prerequisites</h2>
            <ul className="list-disc pl-5">
              {courseData?.prerequisites?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded-md mb-4">
            <h2 className="font-bold text-xl mb-2">Target Audience</h2>
            <ul className="list-disc pl-5">
              {courseData?.targetAudience?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded-md mb-4">
            <h2 className="font-bold text-xl mb-2">Learning Outcomes</h2>
            <ul className="list-disc pl-5">
              {courseData?.learningOutcomes?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded-md mb-4">
            <h2 className="font-bold text-xl mb-2">Syllabus</h2>
            <p>{courseData?.syllabus}</p>
          </div>
          <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded-md mb-4">
            <h2 className="font-bold text-xl mb-2">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {courseData?.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-1 px-3 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        {/* Course Image Section */}
        <div className="flex justify-end items-end">
          <img
            src={courseData?.thumbnailUrl}
            alt="Course"
            className="h-[200px] object-cover rounded-md"
          />
        </div>
      </div>
      {courseData?._id && <ModuleComponent courseId={courseData?._id} />}
    </div>
  );
};

export default DetailPage;
