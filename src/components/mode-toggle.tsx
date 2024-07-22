
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
  
  const handleClick = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button variant="outline" size="icon" onClick={handleClick}>
      {theme === "system" ? (
        systemTheme === "dark" ? (
          <Sun className="h-[1.2rem] w-[1.2rem] transition-transform duration-300" />
        ) : (
          <Moon className="h-[1.2rem] w-[1.2rem] transition-transform duration-300" />
        )
      ) : theme === "dark" ? (
        <Sun className="h-[1.2rem] w-[1.2rem] transition-transform duration-300" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] transition-transform duration-300" />
      )}
    </Button>
  );
}
