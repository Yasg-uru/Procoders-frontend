import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "@/components/mode-toggle";
import procoders from "../../../public/procoders.jpg";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

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
                <a
                  href="#"
                  className="text-gray-900 dark:text-white hover:bg-gray-700 dark:hover:bg-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </a>
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
                <Input type="email" placeholder="Email" />
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center gap-6 md:ml-6">
              <ModeToggle />

              <Button
                className="py-2 px-4 rounded-lg font-semibold text-white bg-gradient-to-r from-pink-500 via-pink-500 to-purple-800 hover:from-purple-800 hover:via-pink-600 hover:to-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-300"
                size="sm"
                onClick={() => navigate("/Login")}
              >
                Register
              </Button>
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
          <a
            href="#"
            className="text-gray-900 dark:text-white hover:bg-gray-700 dark:hover:bg-gray-900 block px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </a>
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
          <div className="flex justify-center mt-4">
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
