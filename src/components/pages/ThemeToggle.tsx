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
    <>
      {theme === "light" ? (
        <IconMoon
          onClick={toggleTheme}
          className="h-full w-full text-neutral-500 dark:text-neutral-300 cursor-pointer"
        />
      ) : (
        <IconSun
          onClick={toggleTheme}
          className="h-full w-full text-neutral-500 dark:text-neutral-300 cursor-pointer"
        />
      )}
    </>
  );
}
