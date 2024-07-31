import { Input } from "@/components/ui/input";
import React, { useEffect, useState, useRef } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { searchCourses } from "@/redux/slices/courseSlice";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const debouncedSearchTerm = useDebounce(query, 800);
  const { searchResults } = useAppSelector((state) => state.course);
  const [isNotResultFound, setIsNotResultFound] = useState<boolean>(false);
  const [isResulVisible, setIsResultVisible] = useState<boolean>(true);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setIsNotResultFound(false); // Reset the state on new input
  };
  const handleNavigate = (courseId: string) => {
    navigate("/detail", { state: { courseId } });
  };
  useEffect(() => {
    if (debouncedSearchTerm) {
      dispatch(searchCourses(debouncedSearchTerm))
        .unwrap()
        .then(() => {
          if (searchResults.length === 0) {
            setIsNotResultFound(true);
          } else {
            setIsNotResultFound(false);
          }
          toast({
            title: "Successfully",
            description: "Successfully fetched results",
          });
        })
        .catch(() => {
          setIsNotResultFound(true);
        });
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target as Node)
      ) {
        setIsResultVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      setIsResultVisible(true);
    };
  }, [debouncedSearchTerm]);

  return (
    <div ref={searchBarRef} className="relative w-64">
      <Input
        type="text"
        placeholder="Search Product by title"
        className="appearance-none bg-white border md:w-96 w-64 border-gray-300 rounded-md py-2 px-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-400 dark:focus:ring-blue-400"
        onChange={handleInputChange}
      />
      {searchResults.length > 0 && isResulVisible ? (
        <ul className="absolute mt-1 bg-white border border-gray-300 rounded shadow-lg w-96 dark:bg-gray-800 dark:border-gray-600 dark:shadow-gray-700 z-10">
          {searchResults.map((result) => (
            <li
              key={result._id}
              onClick={() => handleNavigate(result._id)}
              className="p-2 hover:bg-gray-200 cursor-pointer dark:hover:bg-gray-700"
            >
              <div className="flex items-center">
                <img
                  src={
                    result.thumbnailUrl
                      ? result.thumbnailUrl
                      : "https://getblogo.com/wp-content/uploads/2020/06/1-8.jpg"
                  }
                  alt={result.title}
                  className="w-12 h-12 mr-4 rounded"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {result.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {result.category}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        isNotResultFound &&
        isResulVisible && (
          <div className="flex flex-col items-center justify-center absolute mt-1 bg-white border border-gray-300 rounded shadow-lg w-96 h-auto p-4 dark:bg-gray-800 dark:border-gray-600 dark:shadow-gray-700 z-10">
            <img
              className="h-32 w-32"
              src="https://www.ikbenik-kindercoaching.nl/wp-content/uploads/2019/07/sorry-3905517_1920.png"
              alt=""
            />
            <p className="mx-auto">Sorry, No Course Found</p>
          </div>
        )
      )}
    </div>
  );
};

export default SearchBar;
