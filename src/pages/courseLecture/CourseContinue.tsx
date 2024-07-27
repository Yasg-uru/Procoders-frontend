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
import { Separator } from "@/components/ui/separator";
import { ImAttachment } from "react-icons/im";
import { useToast } from "@/components/ui/use-toast";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { GetfullAccessModule } from "@/redux/slices/moduleSlice";
import { lesson } from "@/types/ModuleTypes/ModuleState";
import { VideoIcon } from "lucide-react";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

import { Link, useParams } from "react-router-dom";
import { FcLightAtTheEndOfTunnel } from "react-icons/fc";
import { useMediaQuery } from "@uidotdev/usehooks";
const options = ["Attachments", "Overview", "Rating", "Notes"];
const CourseContinue = () => {
  const dispatch = useAppDispatch();
  const { courseId } = useParams();
  const { toast } = useToast();
  const { fullAccessModules } = useAppSelector((state) => state.module);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  useEffect(() => {
    dispatch(GetfullAccessModule(courseId))
      .unwrap()
      .then(() => {
        toast({
          title: "Successfully Fetched modules",
        });
      })
      .catch(() => {
        toast({
          title: "Error in fecthing course modules",
        });
      });
  }, []);
  const [vedioUrl, setSelectVedioUrl] = useState<string>("");
  const [selectedLesson, setSelectedLesson] = useState<lesson | null>(null);
  const [selectedOption, setOption] = useState<string>("");

  function handlevedioClick(
    contentUrl: string,
    contentType: string,
    lesson: lesson
  ): void {
    console.log("this is a content type:", contentType);
    setSelectVedioUrl(contentUrl);
    setSelectedLesson(lesson);
  }
  function HandleOptionChoose(option: string) {
    setOption(option);
  }
  return (
    <div className=" relative min-h-screen  p-2 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={20} minSize={20} maxSize={35}>
          <ScrollArea className="h-[100vh] rounded-md border">
            <div className="p-4">
              <h4 className="mb-4 text-sm font-medium leading-none">Modules</h4>
              <Accordion type="single" collapsible className="w-full">
                {fullAccessModules.length > 0 &&
                  fullAccessModules.map((module, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index + 1}`}
                      className="cursor-pointer"
                    >
                      <AccordionTrigger>{`${index + 1} ${
                        module.title
                      }`}</AccordionTrigger>
                      <AccordionContent>
                        {module.lessons.map((lesson) => (
                          <div className="mb-4">
                            <li className="font-medium text-md ">
                              {" "}
                              {lesson.title}
                            </li>
                            <p className="ml-4 text-[11px]">
                              {lesson.description}
                            </p>
                            <p
                              className="flex gap-2"
                              onClick={() =>
                                handlevedioClick(
                                  lesson.contentUrl,
                                  lesson.contentType,
                                  lesson
                                )
                              }
                            >
                              <VideoIcon /> <span>Watch Lecture</span>
                            </p>
                          </div>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
              </Accordion>
            </div>
          </ScrollArea>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={40}>
          {vedioUrl && (
            <div className="flex flex-col items-center  justify-center ">
              <h1 className="text-2xl dark:text-white font-bold mt-3">
                {selectedLesson?.title}
              </h1>
              <p className="mb-2">{selectedLesson?.description}</p>
              <ReactPlayer
                url={vedioUrl}
                controls={true}
                width={"80%"}
                height={"40%"}
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
              <div className="mt-4 w-full text-center">
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
                                    <span className="flex gap-2 items-center justify-center font-bold text-sm">
                                      <ImAttachment />
                                      Resource {idx + 1}
                                    </span>
                                  </a>
                                )
                              )}
                            </div>
                          )}
                        {option === "Overview" && <p>overflow</p>}
                        {option === "Rating" && <p>rating</p>}
                        {option === "Notes" && <p>note</p>}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default CourseContinue;
