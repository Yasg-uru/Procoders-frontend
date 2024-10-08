import  { useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { Logout } from "@/redux/slices/authSlice";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SearchBar from "../coursepages/SearchBar";

export function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const { isAuthenticated, profileUrl, isLoading, name } = useAppSelector(
    (state) => state.auth
  );

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-background shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img className="h-8 w-8" src="/procoders.jpg" alt="Logo" />
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                <NavLink to="/" mobile={false}>
                  Home
                </NavLink>
                <NavLink to="/about" mobile={false}>
                  About
                </NavLink>
                <NavLink to="/services" mobile={false}>
                  Services
                </NavLink>
                <NavLink to="/contact" mobile={false}>
                  Contact
                </NavLink>
                <SearchBar />
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center gap-6 md:ml-6">
              <ModeToggle />
              {!isAuthenticated ? (
                <Button
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  size="sm"
                  onClick={() => navigate("/Login")}
                >
                  Sign in
                </Button>
              ) : (
                <UserDropdown
                  profileUrl={profileUrl}
                  name={name}
                  isLoading={isLoading}
                  navigate={navigate}
                  onLogout={() => {
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
                          title: "Failed to Logout",
                          description: "Error, Please Try again later",
                          variant: "destructive",
                        });
                      });
                  }}
                />
              )}
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
        className={`${isOpen ? "block" : "hidden"} md:hidden`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <NavLink to="/" mobile>
            Home
          </NavLink>
          <NavLink to="/about" mobile>
            About
          </NavLink>
          <NavLink to="/services" mobile>
            Services
          </NavLink>
          <NavLink to="/contact" mobile>
            Contact
          </NavLink>
          <div className="flex flex-col items-center gap-2 mt-4">
            <ModeToggle />
            {!isAuthenticated ? (
              <Button
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                size="sm"
                onClick={() => navigate("/Login")}
              >
                Sign in
              </Button>
            ) : (
              <UserDropdown
                  profileUrl={profileUrl}
                  name={name}
                  isLoading={isLoading}
                  onLogout={() => {
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
                          title: "Failed to Logout",
                          description: "Error, Please Try again later",
                          variant: "destructive",
                        });
                      });
                  } } navigate={navigate}              />
            )}
          </div>
          <SearchBar />
        </div>
      </div>
    </nav>
  );
}

function NavLink({
  to,
  children,
  mobile = false,
}: {
  to: string;
  children: string;
  mobile: boolean;
}) {
  const baseClasses =
    "text-foreground hover:bg-accent hover:text-accent-foreground rounded-md font-medium transition-colors";
  const desktopClasses = "px-3 py-2 text-sm";
  const mobileClasses = "block px-3 py-2 text-base";

  return (
    <Link
      to={to}
      className={`${baseClasses} ${mobile ? mobileClasses : desktopClasses}`}
    >
      {children}
    </Link>
  );
}
function UserDropdown({
  profileUrl,
  name,
  isLoading,
  onLogout,
  navigate
}: {
  profileUrl: string;
  name: string;
  isLoading: boolean;
  onLogout: any;
  navigate:any;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={profileUrl} alt="@shadcn" />
          <AvatarFallback className="font-bold text-xl bg-primary text-primary-foreground cursor-pointer">
            {name.split(" ")[0][0].toUpperCase()}
            {name.split(" ").length >= 2
              ? name.split(" ")[1][0].toUpperCase()
              : ""}
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
            <span onClick={() => navigate("/mycourse")}>My Courses</span>
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LifeBuoy className="mr-2 h-4 w-4" />
          <span>Support</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Log out"
            )}
          </span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
