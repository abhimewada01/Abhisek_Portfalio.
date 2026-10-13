import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.contains("dark");
    const nextTheme = isDark ? "light" : "dark";
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    try {
      localStorage.setItem("theme", nextTheme);
    } catch {
      // localStorage may fail in restricted iframe environments
    }
    setTheme(nextTheme);
  };

  return { theme, toggleTheme };
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className={`group relative flex size-9 sm:size-10 items-center justify-center rounded-[10px] border border-border bg-card/80 backdrop-blur-xs text-foreground transition-all duration-200 hover:border-primary hover:text-primary hover:bg-primary/10 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer ${className}`}
    >
      {/* Sun icon for dark mode */}
      <Sun className="size-4.5 sm:size-5 hidden dark:block text-primary transition-transform duration-300 group-hover:rotate-45" />
      {/* Moon icon for light mode (crescent moon outline from user reference) */}
      <Moon className="size-4.5 sm:size-5 block dark:hidden text-primary transition-transform duration-300 group-hover:-rotate-12" />
    </button>
  );
}
