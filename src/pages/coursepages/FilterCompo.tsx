
// import { useMediaQuery } from "@uidotdev/usehooks";
import React, { useState } from "react";
// import { Checkbox } from "@/components/ui/checkbox";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Instructor } from "@/types/CourseTypes/courseState";
import { Filter } from "@/types/CourseTypes/FilterTypes";

import { useAppDispatch } from "@/redux/hook";
import { FilterCourse } from "@/redux/slices/courseSlice";
import { useToast } from "@/components/ui/use-toast";

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

  // const isDesktop = useMediaQuery("(min-width: 768px)");
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
    console.log("this is a category and values :", category, value);
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
    console.log("Selected filter data:", selectedFilter);
    dispatch(FilterCourse(selectedFilter))
      .unwrap()
      .then(() => {
        toast({
          title: "successfully filtered",
        });
        setIsFilterApplied(true);
      })
      .catch(() => {
        toast({
          title: "Sorry, No course Found",
          variant: "default",
        });
      });
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Filter</DrawerTitle>
          <DrawerDescription>Check fields for filtering.</DrawerDescription>
        </DrawerHeader>
        <div className="px-4">
          <div className="mb-4">
            <h3 className="text-md font-semibold mb-2">Instructors</h3>
            <div className="flex flex-wrap gap-4">
              {filterData.Instructors.map((instructor, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    id={`instructor-${index}`}
                    className="mr-2"
                    type="checkbox"
                    onChange={() =>
                      handleCheckBoxChange("instructorId", instructor._id)
                    }
                  />
                  <label htmlFor={`instructor-${index}`}>
                    {instructor.username}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <hr />
          <div className="mb-4">
            <h3 className="text-md font-semibold mb-2">Languages</h3>
            <div className="flex flex-wrap gap-4">
              {languages.length > 0 &&
                languages.map((language, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      id={`language-${index}`}
                      className="mr-2"
                      type="checkbox"
                      onChange={() =>
                        handleCheckBoxChange("language", language)
                      }
                    />
                    <label htmlFor={`language-${index}`}>
                      {language} ({filterData.Languages.length})
                    </label>
                  </div>
                ))}
            </div>
          </div>
          <hr />
          <div className="mb-4">
            <h3 className="text-md font-semibold mb-2">Pricing</h3>
            <div className="flex flex-wrap gap-4">
              {isFree.length > 0 &&
                isFree.map((free, index) => (
                  <div className="flex items-center mb-2 gap-2">
                    <input
                      type="radio"
                      value={free ? "Paid" : "Free"}
                      id={`pricing-${index}`}
                      onChange={() => handleCheckBoxChange("isPaid", free)}
                    />
                    <label htmlFor={`pricing-${index}`}>
                      {free ? "Paid" : "Free"} ({filterData.isFree.length})
                    </label>
                  </div>
                ))}
            </div>
          </div>
          <hr />
          <div className="mb-4">
            <h3 className="text-md font-semibold mb-2">Tags</h3>
            <div className="flex flex-wrap gap-4">
              {tags.length > 0 &&
                tags.map((tag, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      id={`tag-${index}`}
                      type="checkbox"
                      className="mr-2"
                      onChange={() => handleCheckBoxChange("tags", tag)}
                    />
                    <label htmlFor={`tag-${index}`}>
                      {tag} ({filterData.tags.length})
                    </label>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <DrawerFooter className="pt-2">
          <Button variant="destructive" onClick={handleApplyFilter}>
            Submit
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default FilterCompo;
