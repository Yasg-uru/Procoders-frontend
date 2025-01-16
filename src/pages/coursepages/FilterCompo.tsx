import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Instructor } from "@/types/CourseTypes/courseState";

type Props = {
  filterData: {
    Instructors: Instructor[];
    Languages: string[];
    tags: string[];
  };
  activeFilters: {
    instructorId: string[];
    language: string[];
    tags: string[];
  };
  setActiveFilters: React.Dispatch<
    React.SetStateAction<{
      level: string | null;
      isPaid: boolean | null;
      instructorId: string[];
      language: string[];
      tags: string[];
    }>
  >;
};

const FilterCompo: React.FC<Props> = ({
  filterData,
  activeFilters,
  setActiveFilters,
}) => {
  const handleCheckBoxChange = (
    category: "instructorId" | "language" | "tags",
    value: string
  ) => {
    setActiveFilters((prev) => {
      const newFilters = { ...prev };
      if (newFilters[category].includes(value)) {
        newFilters[category] = newFilters[category].filter(
          (item) => item !== value
        );
      } else {
        newFilters[category] = [...newFilters[category], value];
      }
      return newFilters;
    });
  };

  return (
    <div className="bg-background border rounded-lg p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-lg font-semibold mb-4">Instructors</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {filterData.Instructors.map((instructor, index) => (
              <div key={index} className="flex items-center">
                <Checkbox
                  id={`instructor-${index}`}
                  checked={activeFilters.instructorId.includes(instructor._id)}
                  onCheckedChange={() =>
                    handleCheckBoxChange("instructorId", instructor._id)
                  }
                />
                <Label
                  htmlFor={`instructor-${index}`}
                  className="ml-2 text-sm cursor-pointer"
                >
                  {instructor.username}
                </Label>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <h3 className="text-lg font-semibold mb-4">Languages</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {filterData.Languages.map((language, index) => (
              <div key={index} className="flex items-center">
                <Checkbox
                  id={`language-${index}`}
                  checked={activeFilters.language.includes(language)}
                  onCheckedChange={() =>
                    handleCheckBoxChange("language", language)
                  }
                />
                <Label
                  htmlFor={`language-${index}`}
                  className="ml-2 text-sm cursor-pointer"
                >
                  {language}
                </Label>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold mb-4">Tags</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {filterData.tags.map((tag, index) => (
              <div key={index} className="flex items-center">
                <Checkbox
                  id={`tag-${index}`}
                  checked={activeFilters.tags.includes(tag)}
                  onCheckedChange={() => handleCheckBoxChange("tags", tag)}
                />
                <Label
                  htmlFor={`tag-${index}`}
                  className="ml-2 text-sm cursor-pointer"
                >
                  {tag}
                </Label>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FilterCompo;
