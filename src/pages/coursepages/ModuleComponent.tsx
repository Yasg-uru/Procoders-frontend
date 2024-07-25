import React, { useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { GetModules } from "@/redux/slices/moduleSlice";
import { useToast } from "@/components/ui/use-toast";

type Props = {
  courseId: string;
};

const ModuleComponent: React.FC<Props> = ({ courseId }) => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { modules } = useAppSelector((state) => state.module);

  useEffect(() => {
    dispatch(GetModules(courseId))
      .unwrap()
      .then(() => {
        toast({
          title: "Successfully fetched modules",
        });
      })
      .catch(() => {
        toast({
          title: "Failed to load modules",
          variant: "destructive",
        });
      });
  }, []);
  return (
    <div className="min-h-screen flex flex-col p-10 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <h1 className="text-center font-bold text-2xl mb-6">Course Curriculum</h1>
      <Accordion type="single" collapsible className="w-full">
        {modules.map((module, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="bg-gray-500 dark:bg-black text-white dark:text-gray-100 font-semibold rounded-md p-3">
              <p className="text-sm">Module {module.orderIndex}</p>
              {module.title}
            </AccordionTrigger>
            <AccordionContent className="p-4  dark:bg-black rounded-md">
              {module.lessons.map((lesson, idx) => (
                <div key={idx} className="mb-2">
                  <p className="">{lesson.title}</p>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default ModuleComponent;
