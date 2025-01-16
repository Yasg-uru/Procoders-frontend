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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Toggle } from '@/components/ui/toggle';
import { useToast } from '@/components/ui/use-toast';
import { FilteredCourse, Instructor } from '@/types/CourseTypes/courseState';
import { Users, Briefcase, Award, Search, SlidersHorizontal } from 'lucide-react';

const CourseCategory: React.FC<{ courses: FilteredCourse[] }> = ({ courses }) => {
  const { category } = useParams<{ category: string }>();
  const { toast } = useToast();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [filteredCourses, setFilteredCourses] = useState<FilteredCourse[]>(courses);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [showFreeOnly, setShowFreeOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const levels = ['Beginner', 'Intermediate', 'Advanced'];
  const languages = useMemo(() => [...new Set(courses.map(course => course.language))], [courses]);

  const instructors = useMemo(() => {
    const allInstructors = courses.flatMap(course => course.instructorId);
    return allInstructors.filter((instructor, index, self) =>
      index === self.findIndex((t) => t._id === instructor._id)
    );
  }, [courses]);

  useEffect(() => {
    let result = courses;

    if (searchTerm) {
      result = result.filter(course => 
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedLevel) {
      result = result.filter(course => course.level === selectedLevel);
    }

    if (selectedLanguage) {
      result = result.filter(course => course.language === selectedLanguage);
    }

    result = result.filter(course => course.price >= priceRange[0] && course.price <= priceRange[1]);

    if (showFreeOnly) {
      result = result.filter(course => course.price === 0);
    }

    setFilteredCourses(result);
  }, [courses, searchTerm, selectedLevel, selectedLanguage, priceRange, showFreeOnly]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedLevel('');
    setSelectedLanguage('');
    setPriceRange([0, 1000]);
    setShowFreeOnly(false);
    toast({ title: 'Filters reset successfully' });
  };

  return (
    <div className="tailwind.config.jsmin-h-screen tailwind.config.jsbg-background tailwind.config.jstext-foreground">
      <div className="tailwind.config.jscontainer tailwind.config.jsmx-auto tailwind.config.jspx-4 tailwind.config.jspy-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="tailwind.config.jsflex tailwind.config.jsflex-col tailwind.config.jsitems-center tailwind.config.jsmb-8"
        >
          <h1 className="tailwind.config.jstext-4xl tailwind.config.jsfont-bold tailwind.config.jsmb-4">Explore {category} Courses</h1>
          <div className="tailwind.config.jsw-24 tailwind.config.jsh-1 tailwind.config.jsbg-primary tailwind.config.jsrounded"></div>
        </motion.div>

        <div className="tailwind.config.jsflex tailwind.config.jsflex-col md:tailwind.config.jsflex-row tailwind.config.jsjustify-between tailwind.config.jsitems-center tailwind.config.jsmb-8">
          <div className="tailwind.config.jsrelative tailwind.config.jsw-full md:tailwind.config.jsw-1/2 tailwind.config.jsmb-4 md:tailwind.config.jsmb-0">
            <Input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="tailwind.config.jspl-10 tailwind.config.jspr-4 tailwind.config.jspy-2 tailwind.config.jsw-full"
            />
            <Search className="tailwind.config.jsabsolute tailwind.config.jsleft-3 tailwind.config.jstop-1/2 tailwind.config.jstransform tailwind.config.js-translate-y-1/2 tailwind.config.jstext-gray-400" />
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="tailwind.config.jsflex tailwind.config.jsitems-center"
          >
            <SlidersHorizontal className="tailwind.config.jsmr-2 tailwind.config.jsh-4 tailwind.config.jsw-4" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="tailwind.config.jsgrid tailwind.config.jsgrid-cols-1 md:tailwind.config.jsgrid-cols-2 lg:tailwind.config.jsgrid-cols-4 tailwind.config.jsgap-4 tailwind.config.jsmb-8"
            >
              <Select onValueChange={(value) => setSelectedLevel(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Level" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map((level) => (
                    <SelectItem key={level} value={level}>{level}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select onValueChange={(value) => setSelectedLanguage(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((language) => (
                    <SelectItem key={language} value={language}>{language}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="tailwind.config.jsflex tailwind.config.jsflex-col">
                <span className="tailwind.config.jstext-sm tailwind.config.jsfont-medium tailwind.config.jsmb-2">Price Range</span>
                <Slider
                  min={0}
                  max={1000}
                  step={10}
                  value={priceRange}
                  onValueChange={setPriceRange}
                />
                <span className="tailwind.config.jstext-sm tailwind.config.jsmt-2">
                  ${priceRange[0]} - ${priceRange[1]}
                </span>
              </div>

              <div className="tailwind.config.jsflex tailwind.config.jsitems-center tailwind.config.jsjustify-between">
                <Toggle pressed={showFreeOnly} onPressedChange={setShowFreeOnly}>
                  Free Courses Only
                </Toggle>
                <Button variant="ghost" onClick={resetFilters}>Reset Filters</Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="tailwind.config.jsgrid tailwind.config.jsgrid-cols-1 md:tailwind.config.jsgrid-cols-2 lg:tailwind.config.jsgrid-cols-3 tailwind.config.jsgap-8"
        >
          {filteredCourses.map((course) => (
            <Card key={course._id} className="tailwind.config.jsoverflow-hidden tailwind.config.jstransition-shadow hover:tailwind.config.jsshadow-lg">
              <CardHeader className="tailwind.config.jsp-0">
                <img src={course.thumbnailUrl || "/placeholder.svg"} alt={course.title} className="tailwind.config.jsw-full tailwind.config.jsh-48 tailwind.config.jsobject-cover" />
              </CardHeader>
              <CardContent className="tailwind.config.jsp-6">
                <CardTitle className="tailwind.config.jstext-xl tailwind.config.jsmb-2">{course.title}</CardTitle>
                <CardDescription className="tailwind.config.jsmb-4 tailwind.config.jsline-clamp-2">{course.description}</CardDescription>
                <div className="tailwind.config.jsflex tailwind.config.jsjustify-between tailwind.config.jsitems-center">
                  <span className="tailwind.config.jstext-sm tailwind.config.jsfont-medium">{course.level}</span>
                  <span className="tailwind.config.jstext-sm tailwind.config.jsfont-medium">{course.language}</span>
                </div>
              </CardContent>
              <CardFooter className="tailwind.config.jsbg-muted tailwind.config.jsp-4 tailwind.config.jsflex tailwind.config.jsjustify-between tailwind.config.jsitems-center">
                <span className="tailwind.config.jsfont-bold">
                  {course.price === 0 ? 'Free' : `$${course.price.toFixed(2)}`}
                </span>
                <Button variant="default" size="sm">Enroll Now</Button>
              </CardFooter>
            </Card>
          ))}
        </motion.div>

        {instructors.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="tailwind.config.jsmt-16"
          >
            <h2 className="tailwind.config.jstext-3xl tailwind.config.jsfont-bold tailwind.config.jsmb-8 tailwind.config.jstext-center">Meet Our Instructors</h2>
            <div className="tailwind.config.jsgrid tailwind.config.jsgrid-cols-1 md:tailwind.config.jsgrid-cols-2 lg:tailwind.config.jsgrid-cols-3 tailwind.config.jsgap-8">
              {instructors.map((instructor) => (
                <Card key={instructor._id} className="tailwind.config.jsoverflow-hidden tailwind.config.jstransition-transform hover:tailwind.config.jsscale-105">
                  <CardHeader className="tailwind.config.jsp-0">
                    <img
                      src={instructor.profileUrl || "/placeholder.svg"}
                      alt={instructor.username}
                      className="tailwind.config.jsw-full tailwind.config.jsh-48 tailwind.config.jsobject-cover"
                    />
                  </CardHeader>
                  <CardContent className="tailwind.config.jsp-6">
                    <CardTitle className="tailwind.config.jstext-xl tailwind.config.jsmb-2">{instructor.username}</CardTitle>
                    <CardDescription className="tailwind.config.jsmb-4">
                      Expert in {category}
                    </CardDescription>
                    <div className="tailwind.config.jsflex tailwind.config.jsitems-center tailwind.config.jsmb-2">
                      <Users className="tailwind.config.jsmr-2 tailwind.config.jsh-4 tailwind.config.jsw-4" />
                      <span className="tailwind.config.jstext-sm">10+ Years Teaching Experience</span>
                    </div>
                    <div className="tailwind.config.jsflex tailwind.config.jsitems-center">
                      <Briefcase className="tailwind.config.jsmr-2 tailwind.config.jsh-4 tailwind.config.jsw-4" />
                      <span className="tailwind.config.jstext-sm">Industry Professional</span>
                    </div>
                  </CardContent>
                  <CardFooter className="tailwind.config.jsbg-muted tailwind.config.jsp-4 tailwind.config.jstext-sm tailwind.config.jsflex tailwind.config.jsitems-center">
                    <Award className="tailwind.config.jsmr-2 tailwind.config.jsh-4 tailwind.config.jsw-4" />
                    <span>Top-Rated Educator</span>
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

