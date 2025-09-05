import { useState, useEffect } from "react";
import { IconMoon, IconSun } from "@tabler/icons-react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    if (typeof window !== "undefined") {
      // const savedTheme = localStorage.getItem("theme") as "light" | "dark";
      const savedTheme = "dark";
      if (savedTheme) {
        setTheme(savedTheme);
        document.documentElement.classList.toggle(
          "dark",
          savedTheme === "dark"
        );
      }
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div
      onClick={toggleTheme}
      className="relative w-14 h-7 bg-neutral-200 dark:bg-neutral-700 rounded-full cursor-pointer transition-all duration-300 ease-in-out shadow-inner hover:shadow-lg"
    >
      {/* Toggle Switch */}
      <div
        className={`absolute top-0.5 w-6 h-6 bg-white dark:bg-neutral-900 rounded-full shadow-md transition-all duration-300 ease-in-out transform ${
          theme === "dark" ? "translate-x-7" : "translate-x-0.5"
        }`}
      >
        {/* Icons inside the toggle */}
        <div className="w-full h-full flex items-center justify-center">
          {theme === "light" ? (
            <IconSun className="w-4 h-4 text-orange-500" />
          ) : (
            <IconMoon className="w-4 h-4 text-blue-400" />
          )}
        </div>
      </div>

      {/* Background gradient effect */}
      <div
        className={`absolute inset-0 rounded-full transition-all duration-300 ${
          theme === "dark"
            ? "bg-gradient-to-r from-blue-500 to-purple-600 opacity-80"
            : "bg-gradient-to-r from-yellow-400 to-orange-500 opacity-80"
        }`}
      ></div>

      {/* Fixed icons on the track */}
      <div className="absolute inset-0 flex items-center justify-between px-1">
        <IconSun
          className={`w-4 h-4 transition-opacity duration-300 ${
            theme === "light"
              ? "opacity-100 text-white"
              : "opacity-30 text-neutral-400"
          }`}
        />
        <IconMoon
          className={`w-4 h-4 transition-opacity duration-300 ${
            theme === "dark"
              ? "opacity-100 text-white"
              : "opacity-30 text-neutral-400"
          }`}
        />
      </div>
    </div>
  );
}
