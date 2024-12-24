"use client";

import { useState, useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Switch,
} from "@nextui-org/react";
import { MoonIcon } from "@/components/icons/MoonIcon";
import { SunIcon } from "@/components/icons/SunIcon";

// Main Navbar Component
export default function Nav() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [active, setActive] = useState<string | null>(null);
  const [followState, setFollowState] = useState<boolean>(false);


  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme === "light" || savedTheme === "dark") {
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
  const handleFollowClick = () => {
    if (followState) {
    
      if (window.confirm("Are you sure you want to unfollow?")) {
        setFollowState(false); // Change state back to Follow
      }
    } else {
      setFollowState(true); // Change state to Following
      alert("Ruchi Writes is a space where we share the stories that connect us across generations 💌– welcome to the Fam!😊");
    }
  };


  return (
    <div className="relative w-full">
      <Navbar
        position="static"
        maxWidth="lg"
        className="fixed backdrop-blur-sm bg-opacity-30 bg-white/0 dark:bg-black/0 py-4 px-6 z-50"
      >
        <NavbarBrand>
          <p className="font-bold text-inherit text-2xl">Ruchi Writes</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-8" justify="center">
          <NavbarItem>
            <Link color="foreground" href="/blogs">
              Read
            </Link>
          </NavbarItem>

          {/* Archive Dropdown Menu */}
          <NavbarItem className="relative group">
            <button className="flex items-center space-x-2 text-white focus:outline-none">
              <span>Archive</span>
              <svg
                className="w-4 h-4 transform group-hover:rotate-180 transition-transform duration-200"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div className="absolute hidden text-sm bg-white shadow-lg rounded-md right-0 mt-2 w-48 dark:bg-black group-hover:block transition-all duration-300 ease-out opacity-0 group-hover:opacity-100">
              <Link
                href="/archive-1"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-800"
              >
                Archive Item 1
              </Link>
              <Link
                href="/archive-2"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-800"
              >
                Archive Item 2
              </Link>
              <Link
                href="/archive-3"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-800"
              >
                Archive Item 3
              </Link>
            </div>
          </NavbarItem>

          {/* Labels Dropdown Menu */}
          <NavbarItem className="relative group">
            <button className="flex items-center space-x-2 text-white focus:outline-none">
              <span>Labels</span>
              <svg
                className="w-4 h-4 transform group-hover:rotate-180 transition-transform duration-200"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div className="absolute hidden text-sm bg-white shadow-lg rounded-md right-0 mt-2 w-48 dark:bg-black group-hover:block transition-all duration-300 ease-out opacity-0 group-hover:opacity-100">
              <Link
                href="/label-1"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-800"
              >
                Label Item 1
              </Link>
              <Link
                href="/label-2"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-800"
              >
                Label Item 2
              </Link>
              <Link
                href="/label-3"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-800"
              >
                Label Item 3
              </Link>
            </div>
          </NavbarItem>

          {/* Normal Links (no dropdown) */}
          <NavbarItem>
            <Link color="foreground" href="/contact">
              Contact
            </Link>
          </NavbarItem>

          {/* Follow */}
          <NavbarItem>
            <button
              className={`px-4 py-2 text-white ${followState ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300`}
              onClick={handleFollowClick}
            >
              {followState ? "Following" : "Follow"}
            </button>
          </NavbarItem>
        </NavbarContent>

        {/* Theme Switcher */}
        <NavbarContent justify="end">
          <NavbarItem>
            <Switch
              isSelected={theme === "dark"}
              size="lg"
              color="secondary"
              thumbIcon={({ isSelected, className }) =>
                isSelected ? (
                  <SunIcon className={className} />
                ) : (
                  <MoonIcon className={className} />
                )
              }
              onValueChange={toggleTheme}
            />
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </div>
  );
}
