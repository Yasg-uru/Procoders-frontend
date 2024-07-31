import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useToast } from "@/components/ui/use-toast";
import { MdAssignment } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { GetfullAccessModule } from "@/redux/slices/moduleSlice";
import { lesson, module } from "@/types/ModuleTypes/ModuleState";
import { MdQuiz } from "react-icons/md";
import { MdArticle } from "react-icons/md";

import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

import { useNavigate, useParams } from "react-router-dom";

import { useMediaQuery } from "@uidotdev/usehooks";
import { FaPlay } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { NoteData, notes } from "@/types/CourseTypes/courseState";
import { createNote, deletenote, getNotes } from "@/redux/slices/courseSlice";
import { Card } from "@/components/ui/card";
import { completelesson, LoadCourseProgress } from "@/redux/slices/authSlice";
import { ArrowRight } from "lucide-react";

const options = ["Attachments", "Overview", "Rating", "Notes"];
export const ProgressBarclasss = (progress: number): string => {
  let progressClass: string = "";
  if (progress <= 25) {
    progressClass = "progress progress-error";
  } else if (progress <= 50) {
    progressClass = "progress progress-warning";
  } else if (progress <= 75) {
    progressClass = "progress progress-info";
  } else {
    progressClass = "progress progress-success";
  }
  return progressClass + " border-[0.1px] border-white";
};

const CourseContinue = () => {
  const dispatch = useAppDispatch();

  const { courseId } = useParams();
  const { toast } = useToast();
  const { EnrolledCourseProgress } = useAppSelector((state) => state.auth);

  const { fullAccessModules } = useAppSelector((state) => state.module);
  const { Notes } = useAppSelector((state) => state.course);
  const isMobile = useMediaQuery("(max-width: 600px)");
  useEffect(() => {
    dispatch(GetfullAccessModule(courseId))
      .unwrap()
      .then(() => {
        toast({
          title: "Successfully Fetched modules",
        });
      })
      .catch((error) => {
        toast({
          title: error,
          variant: "destructive",
        });
      });
    dispatch(LoadCourseProgress({ courseId }))
      .then(() => {
        toast({
          title: "successfully fetched your progress",
        });
      })
      .catch((error) => {
        toast({
          title: error,
          variant: "destructive",
        });
      });
  }, []);
  const [url, setSelecturl] = useState<string>("");
  const [selectedLesson, setSelectedLesson] = useState<lesson | null>(null);
  const [selectedOption, setOption] = useState<string>("");
  const [contentType, setContentType] = useState<string>("");
  const [isMakingNote, setIsMakingNote] = useState<boolean>(false);
  const navigate = useNavigate();

  const [NoteData, setNoteData] = useState<notes>({
    NoteMakingTime: "",
    note: "",
    lessonName: "",
  });
  // useEffect(() => {
  //   if (selectedLesson !== null) {
  //     dispatch(getNotes({ courseId, lessonName: selectedLesson.title }))
  //       .unwrap()
  //       .then(() => {
  //         toast({
  //           title: "successfully fetched notes",
  //         });
  //       })
  //       .catch(() => {
  //         toast({
  //           title: "Failed to fetch notes",
  //         });
  //       });
  //   }
  // }, [createNote, deletenote]);
  function handleClick(
    contentUrl: string,
    contentType: string,
    lesson: lesson,
    moduleId: string
  ): void {
    setSelecturl(contentUrl);
    setSelectedLesson({ ...lesson, moduleId });
    setContentType(contentType);
    setNoteData({ ...NoteData, lessonName: lesson.title });
  }
  function HandleOptionChoose(option: string) {
    if (option === "Notes" && selectedLesson !== null) {
      const { title } = selectedLesson;
      dispatch(getNotes({ courseId, lessonName: title }))
        .unwrap()
        .then(() => {
          toast({
            title: "successfully fetched your notes",
          });
        })
        .catch((error) => {
          toast({
            title: error,
            variant: "destructive",
          });
        });
    }
    setOption(option);
  }
  const handleProgress = (state: any) => {
    const seconds = state.playedSeconds;
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    const formattedHrs = hrs > 0 ? String(hrs).padStart(2, "0") + ":" : "";
    const formattedMins = String(mins).padStart(2, "0");
    const formattedSecs = String(secs).padStart(2, "0");

    setNoteData({
      ...NoteData,
      NoteMakingTime: `${formattedHrs}${formattedMins}:${formattedSecs}`,
    });
  };
  const CreateNote = () => {
    setIsMakingNote(false);
    const formdata = { courseId: courseId, NoteData: NoteData };

    dispatch(createNote(formdata))
      .unwrap()
      .then(() => {
        toast({
          title: "Successfully created your note ",
        });
        if (selectedLesson !== null) {
          dispatch(getNotes({ courseId, lessonName: selectedLesson.title }))
            .unwrap()
            .then(() => {
              toast({
                title: "successfully fetched notes",
              });
            })
            .catch((error) => {
              toast({
                title: error,
                variant: "destructive",
              });
            });
        }
      })
      .catch((error) => {
        toast({
          title: error,
          variant: "destructive",
        });
      });
  };

  function handleDelete(noteId: string): void {
    dispatch(deletenote({ courseId, noteId }))
      .unwrap()
      .then(() => {
        toast({
          title: "Deleted successfully",
        });
        if (selectedLesson !== null) {
          dispatch(getNotes({ courseId, lessonName: selectedLesson.title }))
            .unwrap()
            .then(() => {
              toast({
                title: "successfully fetched notes",
              });
            })
            .catch((error) => {
              toast({
                title: error,
                variant: "destructive",
              });
            });
        }
      })
      .catch((error) => {
        toast({
          title: error,
          variant: "destructive",
        });
      });
  }

  function MarkedAsCompleted(): void {
    if (selectedLesson) {
      dispatch(
        completelesson({
          courseId,
          moduleId: selectedLesson.moduleId,
          lessonId: selectedLesson._id,
        })
      )
        .unwrap()
        .then(() => {
          toast({
            title: "marked as completed",
          });
          dispatch(LoadCourseProgress({ courseId }))
            .then(() => {
              // toast({
              //   title: "successfully fetched your progress",
              // });
            })
            .catch((error) => {
              toast({
                title: error,
                variant: "destructive",
              });
            });
        })
        .catch((error) => {
          toast({
            title: error,
            variant: "destructive",
          });
        });
    } else {
      toast({
        title: "please select lesson first by clicking on the lesson",
        variant: "destructive",
      });
    }
  }
  if (isMobile) {
    return <div className=" relative min-h-screen  p-2 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold dark:text-white ">
        This Page is not available for mobile site
      </h1>
      <p className="dark:text-white">Open in Desktop site</p>
    </div>;
  }
  return (
    <div className=" relative min-h-screen  p-2 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={20} minSize={20} maxSize={35}>
          <ScrollArea className="h-[100vh] rounded-md border">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h4 className="mb-4 text-sm font-medium leading-none">
                  Modules
                </h4>
                {EnrolledCourseProgress.CompletionStatus && (
                  <>
                    <p className="font-semibold text-md text-green-500 italic">
                      Completed
                    </p>
                    <Button
                      onClick={() =>
                        navigate(`/course/quiz`, { state: { courseId } })
                      }
                      className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold h-auto rounded-md shadow-md hover:scale-105 transition duration-300"
                    >
                      Quiz
                    </Button>
                  </>
                )}
              </div>
              <progress
                className={ProgressBarclasss(
                  EnrolledCourseProgress.overallProgress
                )}
                value={EnrolledCourseProgress?.overallProgress}
                max="100"
              ></progress>

              <Accordion type="single" collapsible className="w-full">
                {fullAccessModules.length > 0 &&
                  fullAccessModules.map((module: module, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index + 1}`}
                      className="cursor-pointer"
                    >
                      <AccordionTrigger>{`${index + 1} ${
                        module.title
                      }`}</AccordionTrigger>
                      <AccordionContent>
                        <progress
                          className={ProgressBarclasss(
                            EnrolledCourseProgress.modulesProgress[index]
                              ?.progress
                          )}
                          value={
                            EnrolledCourseProgress.modulesProgress[index]
                              ?.progress
                          }
                          max="100"
                        ></progress>
                        {module.lessons.map((lesson, index) => (
                          <div key={index} className="mb-4 relative">
                            <div
                              onClick={() =>
                                handleClick(
                                  lesson.contentUrl,
                                  lesson.contentType,
                                  lesson,
                                  module._id
                                )
                              }
                              className="font-medium text-md mb-24"
                            >
                              {lesson.contentType === "Video" && (
                                <span className=" flex gap-3 items-center">
                                  <FaPlay /> {lesson.title}
                                </span>
                              )}
                              {lesson.contentType === "Article" && (
                                <div className="flex items-center gap-3">
                                  <span className="flex gap-3 items-center">
                                    <MdArticle />
                                    {lesson.title}{" "}
                                  </span>
                                  {selectedLesson?.title === lesson.title && (
                                    <div className="form-control">
                                      <label className="label cursor-pointer">
                                        <span className="label-text dark:text-white ">
                                          Mark as completed
                                        </span>
                                        <input
                                          type="checkbox"
                                          className="checkbox border-[0.5px] ml-1 checkbox-accent dark:border-white"
                                          checked={
                                            EnrolledCourseProgress.modulesProgress[
                                              index
                                            ]?.completedLessons.includes(
                                              lesson._id
                                            )
                                              ? true
                                              : false
                                          }
                                          onChange={MarkedAsCompleted}
                                        />
                                      </label>
                                    </div>
                                  )}
                                </div>
                              )}
                              {lesson.contentType === "Quiz" && (
                                <div className="flex items-center gap-3">
                                  <span className="flex gap-3 items-center">
                                    <MdQuiz />

                                    {lesson.title}
                                  </span>
                                  {selectedLesson?.title === lesson.title && (
                                    <div className="form-control">
                                      <label className="label cursor-pointer">
                                        <span className="label-text dark:text-white ">
                                          Mark as completed
                                        </span>
                                        <input
                                          type="checkbox"
                                          className="checkbox border-[0.5px] ml-1 checkbox-accent dark:border-white"
                                          checked={
                                            EnrolledCourseProgress.modulesProgress[
                                              index
                                            ]?.completedLessons.includes(
                                              lesson._id
                                            )
                                              ? true
                                              : false
                                          }
                                          onChange={MarkedAsCompleted}
                                        />
                                      </label>
                                    </div>
                                  )}
                                </div>
                              )}
                              {lesson.contentType === "Assignment" && (
                                <div className="flex items-center gap-3">
                                  <span className="flex gap-3 items-center">
                                    <MdAssignment />
                                    {lesson.title}
                                  </span>
                                  {selectedLesson?.title === lesson.title && (
                                    <div className="form-control">
                                      <label className="label cursor-pointer">
                                        <span className="label-text dark:text-white ">
                                          Mark as completed
                                        </span>
                                        <input
                                          type="checkbox"
                                          className="checkbox border-[0.5px] ml-1 checkbox-accent dark:border-white"
                                          checked={
                                            EnrolledCourseProgress.modulesProgress[
                                              index
                                            ]?.completedLessons.includes(
                                              lesson._id
                                            )
                                              ? true
                                              : false
                                          }
                                          onChange={MarkedAsCompleted}
                                        />
                                      </label>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}

                        <Button
                          onClick={() =>
                            navigate(`/quiz/${module._id}/${courseId}`)
                          }
                          className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 px-6 rounded-md shadow-md hover:scale-105 transition duration-300"
                        >
                          Quiz
                        </Button>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
              </Accordion>
            </div>
          </ScrollArea>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={40}>
          <ScrollArea className="h-[100vh] overflow-auto">
            {url && contentType === "Video" && (
              <div className="flex flex-col items-center  justify-center ">
                <h1 className="text-2xl dark:text-white font-bold mt-3">
                  {selectedLesson?.title}
                </h1>
                <p className="mb-2">{selectedLesson?.description}</p>
                <ReactPlayer
                  url={url}
                  controls={true}
                  width={"80%"}
                  height={"40%"}
                  onProgress={handleProgress}
                  onEnded={MarkedAsCompleted}
                />
                <hr className="border border-white w-full" />
                <div className="flex gap-7 h-32 p-4 w-full items-center justify-center">
                  {options.map((option, index) => (
                    <Button
                      key={index}
                      onClick={() => HandleOptionChoose(option)}
                      className={`${
                        selectedOption !== option
                          ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 px-6 rounded-md shadow-md hover:scale-105 transition duration-300"
                          : "bg-gradient-to-r from-red-500 to-green-500 text-white font-bold py-3 px-6 rounded-md shadow-md hover:scale-105 transition duration-300"
                      }`}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
                <div className="mt-4 w-full ">
                  {options.map((option, index) => (
                    <div key={index}>
                      {selectedOption === option && (
                        <div className="mt-4">
                          {/* Render specific content for the selected option */}
                          {option === "Attachments" &&
                            selectedLesson?.resources && (
                              <div className="flex flex-col">
                                {selectedLesson?.resources.map(
                                  (resource, idx) => (
                                    <a
                                      key={idx}
                                      href={resource.url}
                                      target="_blank"
                                    >
                                      <div className="p-2 m-2 font-semibold hover:text-green-500 h-[50px] w-[200px] items-center gap-4 flex justify-center shadow-2xl dark:shadow-slate-700 shadow-white">
                                        <span>Resource {index + 1}</span>{" "}
                                        <ArrowRight />
                                      </div>
                                    </a>
                                  )
                                )}
                              </div>
                            )}
                          {option === "Overview" && <p>No Overview </p>}
                          {option === "Rating" && <p></p>}
                          {option === "Notes" && (
                            <div className="flex flex-col gap-2 items-center relative ">
                              {!isMakingNote ? (
                                <Button
                                  onClick={() => setIsMakingNote(true)}
                                  className="dark:bg-gray-600 shadow-2xl dark:shadow-slate-700 bg-white font-semibold shadow-white"
                                  variant="secondary"
                                >
                                  + Make a note
                                </Button>
                              ) : (
                                <>
                                  <div className="flex gap-2">
                                    <Button
                                      className="dark:bg-gray-600 shadow-2xl dark:shadow-slate-700 bg-white font-semibold shadow-white"
                                      variant="secondary"
                                    >
                                      {NoteData.NoteMakingTime}
                                    </Button>
                                    <Input
                                      type="text"
                                      placeholder="Add note"
                                      className="appearance-none bg-white border w-96 border-gray-300 rounded-md py-2 px-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                                      onChange={(e) =>
                                        setNoteData({
                                          ...NoteData,
                                          note: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="absolute right-1 flex gap-3">
                                    <Button
                                      onClick={() => setIsMakingNote(false)}
                                      className="dark:bg-gray-600 shadow-2xl dark:shadow-slate-700 bg-white font-semibold shadow-white"
                                      variant="secondary"
                                    >
                                      cancel
                                    </Button>
                                    <Button
                                      onClick={() => CreateNote()}
                                      className="dark:bg-gray-600 shadow-2xl dark:shadow-slate-700 bg-white font-semibold shadow-white"
                                      variant="secondary"
                                    >
                                      Add Note
                                    </Button>
                                  </div>
                                </>
                              )}
                              <div className="flex flex-col mx-auto  w-full">
                                {Notes.map((note: NoteData) => (
                                  <Card className="w-full h-52 p-3 flex flex-col gap-10 border-[0.5px] dark:border-slate-700 border-white shadow-2xl dark:shadow-slate-700 shadow-slate-400 ">
                                    <div className="flex  justify-between">
                                      <h1 className="font-bold text-2xl ">
                                        {note.lessonName}
                                      </h1>
                                      <p
                                        onClick={() => handleDelete(note._id)}
                                        className="text-red-500 font-bold cursor-pointer"
                                      >
                                        Delete
                                      </p>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                      <Button
                                        className="dark:bg-gray-600 shadow-2xl dark:shadow-slate-700 bg-white font-semibold shadow-white"
                                        variant="secondary"
                                      >
                                        {note.NoteMakingTime}
                                      </Button>{" "}
                                      <p>{note.note}</p>
                                    </div>
                                  </Card>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {contentType === "Article" && (
              <div className=" flex items-center justify-center flex-col gap-7 ">
                <h1 className="font-bold text-xl">
                  Article : {selectedLesson?.title}
                </h1>
                <img
                  src="https://www.pngarts.com/files/7/Education-Course-Transparent.png"
                  className="h-52"
                  alt=""
                />
                <a href={selectedLesson?.contentUrl} target="_blank">
                  <Button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 px-6 rounded-md shadow-md hover:scale-105 transition duration-300">
                    Learn Article
                  </Button>
                </a>
              </div>
            )}
            {contentType === "Assignment" && (
              <div className="flex items-center  flex-col justify-center gap-7">
                <h1 className="font-bold text-xl">
                  Assignment : {selectedLesson?.title}
                </h1>
                <img
                  src="https://www.pinclipart.com/picdir/big/108-1089838_edcite-interactive-assignments-customize-for-your-class-interactive.png"
                  className="h-52"
                  alt=""
                />
                <a href={selectedLesson?.contentUrl} target="_blank">
                  <Button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 px-6 rounded-md shadow-md hover:scale-105 transition duration-300">
                    View And Solve
                  </Button>
                </a>
              </div>
            )}
            {contentType === "Quiz" && (
              <div className="flex items-center justify-center">Quiz</div>
            )}
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default CourseContinue;
