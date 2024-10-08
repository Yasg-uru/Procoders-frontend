

import { useState } from "react";
import { motion } from "framer-motion";
import { useAppDispatch } from "@/redux/hook";
import { FilterCourse } from "@/redux/slices/courseSlice";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Instructor } from "@/types/CourseTypes/courseState";
import { Filter } from "@/types/CourseTypes/FilterTypes";

type Props = {
  open: boolean;
  setOpen: (param: boolean) => void;
  filterData: {
    Instructors: Instructor[];
    Languages: string[];
    isFree: boolean[];
    tags: string[];
  };
  setIsFilterApplied: (param: boolean) => void;
};

const FilterCompo: React.FC<Props> = ({
  open,
  setOpen,
  filterData,
  setIsFilterApplied,
}) => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const languages = [...new Set(filterData.Languages)];
  const isFree = [...new Set(filterData.isFree)];
  const tags = [...new Set(filterData.tags)];
  const [selectedFilter, setSelectedFilter] = useState<Filter>({
    instructorId: [],
    isPaid: false,
    language: [],
    tags: [],
  });

  const handleCheckBoxChange = (
    category: keyof Filter,
    value: string | boolean
  ) => {
    setSelectedFilter((prevData) => {
      const newData: Filter = { ...prevData };

      if (category === "isPaid") {
        newData.isPaid = value as boolean;
      } else {
        if (newData[category]?.includes(value as string)) {
          newData[category] = newData[category].filter(
            (item: string) => item !== value
          );
        } else {
          newData[category]?.push(value as string);
        }
      }

      return newData;
    });
  };

  const handleApplyFilter = () => {
    dispatch(FilterCourse(selectedFilter))
      .unwrap()
      .then(() => {
        toast({ title: "Successfully filtered" });
        setIsFilterApplied(true);
        setOpen(false);
      })
      .catch(() => {
        toast({
          title: "Sorry, No course found",
          variant: "destructive",
        });
      });
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Filter Courses</DrawerTitle>
          <DrawerDescription>Customize your course search</DrawerDescription>
        </DrawerHeader>
        <div className="px-4 py-2 overflow-y-auto max-h-[60vh]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-2">Instructors</h3>
            <div className="space-y-2">
              {filterData.Instructors.map((instructor, index) => (
                <div key={index} className="flex items-center">
                  <Checkbox
                    id={`instructor-${index}`}
                    onCheckedChange={() =>
                      handleCheckBoxChange("instructorId", instructor._id)
                    }
                  />
                  <label
                    htmlFor={`instructor-${index}`}
                    className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {instructor.username}
                  </label>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="mt-6"
          >
            <h3 className="text-lg font-semibold mb-2">Languages</h3>
            <div className="space-y-2">
              {languages.map((language, index) => (
                <div key={index} className="flex items-center">
                  <Checkbox
                    id={`language-${index}`}
                    onCheckedChange={() =>
                      handleCheckBoxChange("language", language)
                    }
                  />
                  <label
                    htmlFor={`language-${index}`}
                    className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {language} (
                    {filterData.Languages.filter((l) => l === language).length})
                  </label>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="mt-6"
          >
            <h3 className="text-lg font-semibold mb-2">Pricing</h3>
            <RadioGroup
              onValueChange={(value) =>
                handleCheckBoxChange("isPaid", value === "true")
              }
            >
              {isFree.map((free, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={free.toString()}
                    id={`pricing-${index}`}
                  />
                  <label
                    htmlFor={`pricing-${index}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {free ? "Paid" : "Free"} (
                    {filterData.isFree.filter((f) => f === free).length})
                  </label>
                </div>
              ))}
            </RadioGroup>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="mt-6"
          >
            <h3 className="text-lg font-semibold mb-2">Tags</h3>
            <div className="space-y-2">
              {tags.map((tag, index) => (
                <div key={index} className="flex items-center">
                  <Checkbox
                    id={`tag-${index}`}
                    onCheckedChange={() =>
                      handleCheckBoxChange("tags", tag)
                    }
                  />
                  <label
                    htmlFor={`tag-${index}`}
                    className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {tag} ({filterData.tags.filter((t) => t === tag).length})
                  </label>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        <DrawerFooter className="pt-2">
          <Button onClick={handleApplyFilter}>Apply Filters</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default FilterCompo;
