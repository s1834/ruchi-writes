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

export default function Nav() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

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

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="relative w-full">
      {/* Navbar wrapping */}
      <Navbar
        maxWidth="lg"
        className="fixed backdrop-blur-sm bg-white/30 dark:bg-black/60 py-4 px-6 z-50"
      >
        <NavbarBrand>
          <Link
            href="/"
            className="font-bold text-2xl hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-indigo-300 hover:to-purple-300 hover:dark:from-indigo-500 hover:dark:to-purple-500"
          >
            Ruchi Writes
          </Link>
        </NavbarBrand>

        {/* Mobile Menu Icon */}
        <div className="sm:hidden flex items-center">
          <button onClick={handleMobileMenuToggle}>
            {isMobileMenuOpen ? (
              <div className="w-6 h-6 text-gray-700 dark:text-white">X</div>
            ) : (
              <div className="w-6 h-6 text-gray-700 dark:text-white">☰</div>
            )}
          </button>
        </div>

        {/* Navbar Menu for Large Screens */}
        <NavbarContent className="hidden sm:flex gap-8 justify-center">
          <NavbarItem>
            <Link
              href="/blogs"
              className="relative inline-block pb-1 px-1 rounded-lg hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-indigo-300 hover:to-purple-300 dark:hover:from-indigo-500 dark:hover:to-purple-500 transition-all duration-300"
            >
              Read
            </Link>
          </NavbarItem>

          {/* Archive Dropdown Menu */}
          <NavbarItem className="relative group">
            <button className="flex items-center space-x-2 color:foreground focus:outline-none">
              <span className="group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-300 group-hover:to-purple-300 group-hover:dark:from-indigo-500 group-hover:dark:to-purple-500">
                Archive
              </span>
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
            <div className="absolute hidden text-sm bg-white shadow-lg rounded-md right-0 mt-0 w-48 dark:bg-black group-hover:block transition-all duration-300 ease-out opacity-0 group-hover:opacity-100">
              <Link
                href="/archive-1"
                className="block px-4 py-2 text-gray-700 hover:bg-gradient-to-r hover:rounded-md  hover:from-indigo-300 hover:to-purple-300 dark:hover:from-indigo-500 dark:hover:to-purple-500 dark:text-white"
              >
                Archive Item 1
              </Link>
              <Link
                href="/archive-2"
                className="block px-4 py-2 text-gray-700 hover:bg-gradient-to-r hover:rounded-md hover:from-indigo-300 hover:to-purple-300 dark:hover:from-indigo-500 dark:hover:to-purple-500 dark:text-white"
              >
                Archive Item 2
              </Link>
              <Link
                href="/archive-3"
                className="block px-4 py-2 text-gray-700 hover:bg-gradient-to-r hover:rounded-md hover:from-indigo-300 hover:to-purple-300 dark:hover:from-indigo-500 dark:hover:to-purple-500 dark:text-white"
              >
                Archive Item 3
              </Link>
            </div>
          </NavbarItem>

          {/* Labels Dropdown Menu */}
          <NavbarItem className="relative group">
            <button className="flex items-center space-x-2 color:foreground focus:outline-none">
              <span className="group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-300 group-hover:to-purple-300 group-hover:dark:from-indigo-500 group-hover:dark:to-purple-500">
                Labels
              </span>
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
            <div className="absolute hidden text-sm bg-white shadow-lg rounded-md right-0 mt-0 w-48 dark:bg-black group-hover:block transition-all duration-300 ease-out opacity-0 group-hover:opacity-100">
              <Link
                href="/label-1"
                className="block px-4 py-2 text-gray-700 hover:bg-gradient-to-r hover:rounded-md hover:from-indigo-300 hover:to-purple-300 dark:hover:from-indigo-500 dark:hover:to-purple-500 dark:text-white"
              >
                Label Item 1
              </Link>
              <Link
                href="/label-2"
                className="block px-4 py-2 text-gray-700 hover:bg-gradient-to-r hover:rounded-md hover:from-indigo-300 hover:to-purple-300 dark:hover:from-indigo-500 dark:hover:to-purple-500 dark:text-white"
              >
                Label Item 2
              </Link>
              <Link
                href="/label-3"
                className="block px-4 py-2 text-gray-700 hover:bg-gradient-to-r hover:rounded-md hover:from-indigo-300 hover:to-purple-300 dark:hover:from-indigo-500 dark:hover:to-purple-500 dark:text-white"
              >
                Label Item 3
              </Link>
            </div>
          </NavbarItem>

          {/* Other Navbar Items */}
          <NavbarItem>
            <Link
              href="/contact"
              className="relative inline-block pb-1 px-1 rounded-lg hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-indigo-300 hover:to-purple-300 dark:hover:from-indigo-500 dark:hover:to-purple-500 transition-all duration-300"
            >
              Contact
            </Link>
          </NavbarItem>

          {/* Follow Button */}
          <NavbarItem>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Follow
            </button>
          </NavbarItem>

          {/* Buy Book Button */}
          <NavbarItem>
            <Link
              href="/buy-book"
              className="px-4 py-3 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 h-14"
            >
              Buy My New Book
            </Link>
          </NavbarItem>

          {/* Theme Switcher */}
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

      {/* Mobile View Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden absolute top-0 left-0 w-full bg-white dark:bg-black text-center py-6 z-40">
          <div className="flex flex-col gap-6">
            <Link
              href="/blogs"
              className="text-gray-700 dark:text-white hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors duration-300 ease-in-out"
              aria-label="Read Blogs"
            >
              Read
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 dark:text-white hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors duration-300 ease-in-out"
              aria-label="Contact Us"
            >
              Contact
            </Link>
            <div className="relative group">
              <button
                className="flex items-center space-x-2 text-gray-700 dark:text-white hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors duration-300 ease-in-out"
                aria-label="Toggle Archive Menu"
              >
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
              <div className="absolute hidden text-sm bg-white shadow-lg rounded-md right-0 mt-0 w-48 dark:bg-black group-hover:block transition-all duration-300 ease-out opacity-0 group-hover:opacity-100">
                <Link
                  href="/archive-1"
                  className="block px-4 py-2 text-gray-700 hover:bg-indigo-200 dark:text-white dark:hover:bg-gray-800 transition-colors duration-300 ease-in-out"
                  aria-label="Archive Item 1"
                >
                  Archive Item 1
                </Link>
                <Link
                  href="/archive-2"
                  className="block px-4 py-2 text-gray-700 hover:bg-indigo-200 dark:text-white dark:hover:bg-gray-800 transition-colors duration-300 ease-in-out"
                  aria-label="Archive Item 2"
                >
                  Archive Item 2
                </Link>
                <Link
                  href="/archive-3"
                  className="block px-4 py-2 text-gray-700 hover:bg-indigo-200 dark:text-white dark:hover:bg-gray-800 transition-colors duration-300 ease-in-out"
                  aria-label="Archive Item 3"
                >
                  Archive Item 3
                </Link>
              </div>
            </div>
            <div className="relative group">
              <button
                className="flex items-center space-x-2 text-gray-700 dark:text-white hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors duration-300 ease-in-out"
                aria-label="Toggle Labels Menu"
              >
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
              <div className="absolute hidden text-sm bg-white shadow-lg rounded-md right-0 mt-0 w-48 dark:bg-black group-hover:block transition-all duration-300 ease-out opacity-0 group-hover:opacity-100">
                <Link
                  href="/label-1"
                  className="block px-4 py-2 text-gray-700 hover:bg-indigo-200 dark:text-white dark:hover:bg-gray-800 transition-colors duration-300 ease-in-out"
                  aria-label="Label Item 1"
                >
                  Label Item 1
                </Link>
                <Link
                  href="/label-2"
                  className="block px-4 py-2 text-gray-700 hover:bg-indigo-200 dark:text-white dark:hover:bg-gray-800 transition-colors duration-300 ease-in-out"
                  aria-label="Label Item 2"
                >
                  Label Item 2
                </Link>
                <Link
                  href="/label-3"
                  className="block px-4 py-2 text-gray-700 hover:bg-indigo-200 dark:text-white dark:hover:bg-gray-800 transition-colors duration-300 ease-in-out"
                  aria-label="Label Item 3"
                >
                  Label Item 3
                </Link>
              </div>
            </div>
            <div className="flex justify-center mt-4">
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
                aria-label="Toggle Dark/Light Theme"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
