import { useState } from "react";
import {
  Menu,
  X,
  CreditCard,
  LifeBuoy,
  LogOut,
  Settings,
  User,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "@/components/mode-toggle";
import procoders from "../../../public/procoders.jpg";
// import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { Logout } from "@/redux/slices/authSlice";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SearchBar from "../coursepages/SearchBar";
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const { isAuthenticated, profileUrl, isLoading, name } = useAppSelector(
    (state) => state.auth
  );
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img className="h-8 w-8" src={procoders} alt="Logo" />
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to="/">Home</Link>

                <a
                  href="#"
                  className="text-gray-900 dark:text-white hover:bg-gray-700 dark:hover:bg-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  About
                </a>
                <a
                  href="#"
                  className="text-gray-900 dark:text-white hover:bg-gray-700 dark:hover:bg-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Services
                </a>
                <a
                  href="#"
                  className="text-gray-900 dark:text-white hover:bg-gray-700 dark:hover:bg-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Contact
                </a>
                <SearchBar />
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center gap-6 md:ml-6">
              <>
                <ModeToggle />

                {!isAuthenticated ? (
                  <Button
                    className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 px-6 rounded-md shadow-md hover:scale-105 transition duration-300"
                    size="sm"
                    onClick={() => navigate("/Login")}
                  >
                    Register
                  </Button>
                ) : (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      {/* <div className="avatar">
                        <div className="ring-primary ring-offset-base-100 w-12 rounded-full ring-0 ring-offset-[0.2px]">
                          <img src={profileUrl} />
                        </div>
                      </div> */}
                      <Avatar>
                        <AvatarImage src={profileUrl} alt="@shadcn" />
                        <AvatarFallback className="font-bold text-xl dark:bg-black bg-red-400 cursor-pointer">
                          {name.split(" ")[0][0].toUpperCase()}
                          {name.split(" ").length>=2?name.split(" ")[1][0].toUpperCase():""}
                        </AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem>
                          <User className="mr-2 h-4 w-4" />
                          <span>Profile</span>
                          <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <CreditCard className="mr-2 h-4 w-4" />
                          <span onClick={() => navigate("/mycourse")}>
                            My Courses
                          </span>
                          <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Settings className="mr-2 h-4 w-4" />
                          <span>Settings</span>
                          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />

                      <DropdownMenuSeparator />

                      <DropdownMenuItem>
                        <LifeBuoy className="mr-2 h-4 w-4" />
                        <span>Support</span>
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span
                          onClick={() => {
                            dispatch(Logout())
                              .unwrap()
                              .then(() => {
                                toast({
                                  title: "Logged out successfully",
                                  variant: "default",
                                });
                                navigate("/Login");
                              })
                              .catch(() => {
                                toast({
                                  title: "Failed to Logout ",
                                  description:
                                    "Error , Please Try again latter",
                                });
                              });
                          }}
                        >
                          {isLoading ? (
                            <Loader2 className="h-6 w-6 animate-spin" />
                          ) : (
                            "Log out"
                          )}
                        </span>
                        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleMenu}
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
              <span className="sr-only">Open main menu</span>
            </Button>
          </div>
        </div>
      </div>

      <div
        className={`${isOpen ? "block" : "hidden"} md:hidden `}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className="text-gray-900 dark:text-white hover:bg-gray-700 dark:hover:bg-gray-900 block px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </Link>
          <a
            href="#"
            className="text-gray-900 dark:text-white hover:bg-gray-700 dark:hover:bg-gray-900 block px-3 py-2 rounded-md text-base font-medium"
          >
            About
          </a>
          <a
            href="#"
            className="text-gray-900 dark:text-white hover:bg-gray-700 dark:hover:bg-gray-900 block px-3 py-2 rounded-md text-base font-medium"
          >
            Services
          </a>
          <a
            href="#"
            className="text-gray-900 dark:text-white hover:bg-gray-700 dark:hover:bg-gray-900 block px-3 py-2 rounded-md text-base font-medium"
          >
            Contact
          </a>
          {/* <div className="flex justify-center mt-4">
            <ModeToggle />
          </div> */}
          <div className="mx-auto flex flex-col justify-center gap-2">
              <>
                <ModeToggle />

                {!isAuthenticated ? (
                  <Button
                    className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 px-6 rounded-md shadow-md hover:scale-105 transition duration-300"
                    size="sm"
                    onClick={() => navigate("/Login")}
                  >
                    Register
                  </Button>
                ) : (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      {/* <div className="avatar">
                        <div className="ring-primary ring-offset-base-100 w-12 rounded-full ring-0 ring-offset-[0.2px]">
                          <img src={profileUrl} />
                        </div>
                      </div> */}
                      <Avatar>
                        <AvatarImage src={profileUrl} alt="@shadcn" />
                        <AvatarFallback className="font-bold text-xl dark:bg-black bg-red-400 cursor-pointer">
                          {name.split(" ")[0][0].toUpperCase()}
                          {name.split(" ").length>=2?name.split(" ")[1][0].toUpperCase():""}
                        </AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem>
                          <User className="mr-2 h-4 w-4" />
                          <span>Profile</span>
                          <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <CreditCard className="mr-2 h-4 w-4" />
                          <span onClick={() => navigate("/mycourse")}>
                            My Courses
                          </span>
                          <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Settings className="mr-2 h-4 w-4" />
                          <span>Settings</span>
                          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />

                      <DropdownMenuSeparator />

                      <DropdownMenuItem>
                        <LifeBuoy className="mr-2 h-4 w-4" />
                        <span>Support</span>
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span
                          onClick={() => {
                            dispatch(Logout())
                              .unwrap()
                              .then(() => {
                                toast({
                                  title: "Logged out successfully",
                                  variant: "default",
                                });
                                navigate("/Login");
                              })
                              .catch(() => {
                                toast({
                                  title: "Failed to Logout ",
                                  description:
                                    "Error , Please Try again latter",
                                });
                              });
                          }}
                        >
                          {isLoading ? (
                            <Loader2 className="h-6 w-6 animate-spin" />
                          ) : (
                            "Log out"
                          )}
                        </span>
                        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </>
            </div>
          <SearchBar />
        </div>
      </div>
    </nav>
  );
}
