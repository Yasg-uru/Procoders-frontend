import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMediaQuery } from '@uidotdev/usehooks';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useToast } from '@/components/ui/use-toast';
import CourseCard from '@/helper/CourseCard';
import FilterCompo from './FilterCompo';
import { FilteredCourse } from '@/types/CourseTypes/courseState';
import { FaFilter } from 'react-icons/fa';
import { FcClearFilters } from 'react-icons/fc';
import { Users, Briefcase, Award } from 'lucide-react';
import { useAppSelector } from '@/redux/hook';

const FilterQuery = [
  { level: "Intermediate" },
  { level: "Beginner" },
  { level: "Advanced" },
  { isPaid: true },
  { isPaid: false },
];

const CourseCategory: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const { filteredResults } = useAppSelector((state) => state.course);
  const { toast } = useToast();
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  const [courses, setCourses] = useState<FilteredCourse[]>(filteredResults);
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<{
    level: string | null;
    isPaid: boolean | null;
    instructorId: string[];
    language: string[];
    tags: string[];
  }>({
    level: null,
    isPaid: null,
    instructorId: [],
    language: [],
    tags: [],
  });

  const instructors = useMemo(() => {
    const allInstructors = courses.flatMap(course => course.instructorId);
    return allInstructors.filter((instructor, index, self) =>
      index === self.findIndex((t) => t._id === instructor._id)
    );
  }, [courses]);

  const languages = useMemo(() => [...new Set(courses.map(course => course.language))], [courses]);
  const tags = useMemo(() => [...new Set(courses.flatMap(course => course.tags))], [courses]);

  const applyFilters = () => {
    let filteredCourses = filteredResults;

    if (activeFilters.level) {
      filteredCourses = filteredCourses.filter(course => course.level === activeFilters.level);
    }

    if (activeFilters.isPaid !== null) {
      filteredCourses = filteredCourses.filter(course => course.isPaid === activeFilters.isPaid);
    }

    if (activeFilters.instructorId.length > 0) {
      filteredCourses = filteredCourses.filter(course => 
        course.instructorId.some(instructor => activeFilters.instructorId.includes(instructor._id))
      );
    }

    if (activeFilters.language.length > 0) {
      filteredCourses = filteredCourses.filter(course => activeFilters.language.includes(course.language));
    }

    if (activeFilters.tags.length > 0) {
      filteredCourses = filteredCourses.filter(course => 
        course.tags.some(tag => activeFilters.tags.includes(tag))
      );
    }

    setCourses(filteredCourses);
  };

  useEffect(() => {
    applyFilters();
  }, [activeFilters, filteredResults]);

  const handleQuickFilter = (filter: { level?: string; isPaid?: boolean }) => {
    setActiveFilters(prev => ({
      ...prev,
      level: filter.level || null,
      isPaid: filter.isPaid !== undefined ? filter.isPaid : null,
    }));
    toast({ title: "Filter applied" });
  };

  // const resetFilters = () => {
  //   setActiveFilters({
  //     level: null,
  //     isPaid: null,
  //     instructorId: [],
  //     language: [],
  //     tags: [],
  //   });
  //   toast({ title: "Filters reset" });
  // };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-4">Explore {category} Courses</h1>
          <div className="w-24 h-1 bg-primary rounded"></div>
        </motion.div>

        <div className="flex justify-between items-center mb-8">
          <Carousel
            opts={{ align: "start" }}
            className="w-full max-w-4xl"
          >
            <CarouselContent>
              {FilterQuery.map((filter, index) => (
                <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/5">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={() => handleQuickFilter(filter)}
                      variant={activeFilters.level === filter.level || activeFilters.isPaid === filter.isPaid ? "default" : "outline"}
                      className="w-full"
                    >
                      {filter.level || (filter.isPaid ? "Paid" : "Free")}
                    </Button>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {!isMobile && (
              <>
                <CarouselPrevious />
                <CarouselNext />
              </>
            )}
          </Carousel>

          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowFilters(!showFilters)}
              className="ml-4"
            >
              {showFilters ? <FcClearFilters className="h-4 w-4" /> : <FaFilter className="h-4 w-4" />}
            </Button>
          </motion.div>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <FilterCompo
                filterData={{
                  Instructors: instructors,
                  Languages: languages,
                  tags: tags,
                }}
                activeFilters={activeFilters}
                setActiveFilters={setActiveFilters}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {courses.map((data) => (
            <CourseCard key={data._id} data={data} />
          ))}
        </motion.div>

        {instructors.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">Meet Our Instructors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {instructors.map((instructor) => (
                <Card key={instructor._id} className="overflow-hidden">
                  <CardHeader className="p-0">
                    <img
                      src={instructor.profileUrl || "/placeholder.svg"}
                      alt={instructor.username}
                      className="w-full h-48 object-cover"
                    />
                  </CardHeader>
                  <CardContent className="p-6">
                    <CardTitle className="text-xl mb-2">
                      {instructor.username}
                    </CardTitle>
                    <CardDescription className="mb-4">
                      Expert in {category}
                    </CardDescription>
                    <div className="flex items-center mb-2">
                      <Users className="mr-2 h-4 w-4" />
                      <span>10+ Years Teaching Experience</span>
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="mr-2 h-4 w-4" />
                      <span>Industry Professional</span>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-muted p-4 text-sm">
                    <Award className="mr-2 h-4 w-4" />
                    <span>Top Educator | Ex-FAANG | Industry Leader</span>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CourseCategory;

