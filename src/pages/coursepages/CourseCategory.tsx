
import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { useMediaQuery } from "@uidotdev/usehooks"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { FilterCourses } from "@/redux/slices/courseSlice"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { useToast } from "@/components/ui/use-toast"
import CourseCard from "@/helper/CourseCard"
import FilterCompo from "./FilterCompo"
import { Instructor } from "@/types/CourseTypes/courseState"
import { FaFilter } from "react-icons/fa"
import { FcClearFilters } from "react-icons/fc"
import { Users, Briefcase, Award } from "lucide-react"

const FilterQuery = [
  { level: "Intermediate" },
  { level: "Beginner" },
  { level: "Advanced" },
  { isPaid: true },
  { isPaid: false },
]

const CourseCategory: React.FC = () => {
  const { filteredResults } = useAppSelector((state) => state.course)
  const dispatch = useAppDispatch()
  const location = useLocation()
  const { filterData } = location?.state || {}
  const { toast } = useToast()
  const [open, setOpen] = useState<boolean>(false)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [instructors, setInstructors] = useState<Instructor[]>([])
  const [languages, setLanguages] = useState<string[]>([])
  const [isFree, setIsFree] = useState<boolean[]>([])
  const [tags, setTags] = useState<string[]>([])
  const [isFilterApplied, setIsFilterApplied] = useState<boolean>(false)

  const uniqueById = (array: Instructor[]) => {
    const seen = new Set()
    return array.filter((item) => {
      if (seen.has(item._id)) {
        return false
      }
      seen.add(item._id)
      return true
    })
  }

  useEffect(() => {
    if (filteredResults.length > 0) {
      const instructorIds = filteredResults.flatMap((course) => course.instructorId)
      const uniqueInstructors = uniqueById(instructorIds)
      const courseLangs = filteredResults.map((course) => course.language)
      const courseIsFree = filteredResults.map((course) => course.isPaid)
      const courseTags = filteredResults.flatMap((course) => course.tags)

      setInstructors(uniqueInstructors)
      setLanguages(courseLangs)
      setIsFree(courseIsFree)
      setTags(courseTags)
    }
  }, [filteredResults])

  const handleFilter = (filter: { [key: string]: any }) => {
    dispatch(FilterCourses(filter))
      .unwrap()
      .then(() => {
        setIsFilterApplied(true)
        toast({ title: "Successfully filtered" })
      })
      .catch((error) => {
        const errorMessage = typeof error === "object" && error.message ? error.message : "An error occurred"
        toast({ title: errorMessage, variant: "destructive" })
      })
  }

  const resetFilter = () => {
    dispatch(FilterCourses(filterData))
      .unwrap()
      .then(() => {
        toast({ title: "Reset filter successfully" })
        setIsFilterApplied(false)
      })
      .catch((error) => {
        toast({ title: error, variant: "destructive" })
      })
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-8"
        >
          <h1 className="text-3xl font-bold mb-4">Choose Your Program</h1>
          <div className="w-24 h-1 bg-primary rounded"></div>
        </motion.div>

        <Carousel
          opts={{ align: "start" }}
          className="w-full max-w-4xl mx-auto mb-12"
        >
          <CarouselContent>
            {FilterQuery.map((filter, index) => (
              <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/5">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={() => handleFilter(filter)}
                    variant="outline"
                    className="w-full"
                  >
                    {typeof filter?.level === "string" ? filter.level : (filter.isPaid ? "Paid Courses" : "Free Courses")}
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
          className="fixed top-4 right-4 z-10"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {!isFilterApplied ? (
            <Button variant="outline" size="icon" onClick={() => setOpen(true)}>
              <FaFilter className="h-4 w-4" />
            </Button>
          ) : (
            <Button variant="outline" size="icon" onClick={resetFilter}>
              <FcClearFilters className="h-4 w-4" />
            </Button>
          )}
        </motion.div>

        <FilterCompo
          open={open}
          setOpen={setOpen}
          filterData={{ Instructors: instructors, Languages: languages, isFree, tags }}
          setIsFilterApplied={setIsFilterApplied}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredResults.map((data) => (
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
            <h2 className="text-2xl font-bold mb-8 text-center">Our Instructors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {instructors.map((instructor) => (
                <Card key={instructor._id} className="overflow-hidden">
                  <CardHeader className="p-0">
                    <img
                      src={instructor.profileUrl}
                      alt={instructor.username}
                      className="w-full h-48 object-cover"
                    />
                  </CardHeader>
                  <CardContent className="p-6">
                    <CardTitle className="text-xl mb-2">{instructor.username}</CardTitle>
                    <CardDescription className="mb-4">LinkedIn | Walmart | Amazon Oracle</CardDescription>
                    <div className="flex items-center mb-2">
                      <Users className="mr-2 h-4 w-4" />
                      <span>10+ Years Teaching Experience</span>
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="mr-2 h-4 w-4" />
                      <span>FAANG Placements</span>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-muted p-4 text-sm">
                    <Award className="mr-2 h-4 w-4" />
                    <span>Top Educator | Ex-LinkedIn Eng | GSoc Harvard</span>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default CourseCategory