"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  GetAllEnrolledCourseProgress,
  Mycourse,
} from "@/redux/slices/authSlice";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Loader2, BookOpen, Clock, Award } from "lucide-react";

const ProgressBarClass = (progress: number): string => {
  const baseClass = "h-2 rounded-full bg-gradient-to-r";
  if (progress <= 25) return `${baseClass} from-red-500 to-red-300`;
  if (progress <= 50) return `${baseClass} from-yellow-500 to-yellow-300`;
  if (progress <= 75) return `${baseClass} from-blue-500 to-blue-300`;
  return `${baseClass} from-green-500 to-green-300`;
};

const MyCourse: React.FC = () => {
  const { Mycourses, AllEnrolledCourseProgress } = useAppSelector(
    (state) => state.auth
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    dispatch(Mycourse())
      .then(() => dispatch(GetAllEnrolledCourseProgress()))
      .then(() => {
        toast({ title: "Successfully fetched your progress" });
      })
      .catch((error) => {
        toast({ title: error, variant: "destructive" });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (Mycourses.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-10 bg-background text-foreground">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center bg-card border border-border rounded-lg shadow-lg w-96 h-auto p-8"
        >
          <img
            className="h-32 w-32 mb-4"
            src="https://www.ikbenik-kindercoaching.nl/wp-content/uploads/2019/07/sorry-3905517_1920.png"
            alt="No courses found"
          />
          <p className="text-center mb-4">
            Sorry, no courses found! Please enroll now.
          </p>
          <Button
            onClick={() => navigate(-1)}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Go Back
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col p-10 dark:bg-black bg-white text-foreground">
      <h1 className="font-bold text-3xl text-center mb-10">Your Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Mycourses.map((course, index) => (
          <motion.div
            key={course._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full flex flex-col overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="p-0">
                <div className="relative">
                  <img
                    src={
                      course?.courseId?.thumbnailUrl ||
                      "https://images.shiksha.com/mediadata/ugcDocuments/images/wordpressImages/2022_08_MicrosoftTeams-image-13-2-1.jpg"
                    }
                    alt={course.courseId.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-1">
                    <div
                      className={ProgressBarClass(
                        AllEnrolledCourseProgress[index]?.overallProgress
                      )}
                      style={{
                        width: `${AllEnrolledCourseProgress[index]?.overallProgress}%`,
                      }}
                    />
                  </div>
                </div>
                <CardTitle className="text-xl font-bold mt-4 px-6">
                  {course.courseId.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between p-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <BookOpen className="w-5 h-5 mr-2 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {course.courseId.modules.length} Lessons
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {course.courseId.duration}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-center mb-4">
                  <div className="w-24 h-24">
                    <CircularProgressbar
                      value={Math.floor(
                        AllEnrolledCourseProgress[index]?.overallProgress
                      )}
                      text={`${Math.floor(
                        AllEnrolledCourseProgress[index]?.overallProgress
                      )}%`}
                      styles={buildStyles({
                        textSize: "22px",
                        pathColor: `rgba(62, 152, 199, ${
                          AllEnrolledCourseProgress[index]?.overallProgress /
                          100
                        })`,
                        textColor: "#3e98c7",
                        trailColor: "#d6d6d6",
                        backgroundColor: "#3e98c7",
                      })}
                    />
                  </div>
                </div>
                {AllEnrolledCourseProgress[index]?.CompletionStatus && (
                  <div className="flex items-center justify-center text-green-500 font-semibold">
                    <Award className="w-5 h-5 mr-2" />
                    Completed
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() =>
                    navigate(`/continue-course/${course.courseId._id}`)
                  }
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Continue Learning
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MyCourse;
