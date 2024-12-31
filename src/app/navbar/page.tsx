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
          <button
            onClick={handleMobileMenuToggle}
            className="flex items-center"
          >
            {/* Theme Toggle on the Left */}
            <div className="mr-2">
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

            {isMobileMenuOpen ? (
              // Cross Icon when menu is open
              <div className="w-6 h-6 text-gray-700 dark:text-white">X</div>
            ) : (
              // Hamburger Icon when menu is closed
              <div className="w-6 h-6 text-gray-700 dark:text-white">☰</div>
            )}
          </button>
        </div>

        {/* Navbar Menu for Large Screens */}
        <NavbarContent className="hidden sm:flex gap-8 justify-center">
          <NavbarItem>
            <Link
              href="/blogs"
              className="relative inline-block pb-1 px-2 rounded-lg hover:bg-gradient-to-r hover:from-purple-300 hover:to-indigo-300 dark:hover:from-purple-500 dark:hover:to-indigo-500 transition-opacity duration-300"
            >
              Read
            </Link>
          </NavbarItem>

          {/* Archive Dropdown Menu */}
          {/* <NavbarItem className="relative group">
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
          </NavbarItem> */}

          {/* Labels Dropdown Menu */}
          {/* <NavbarItem className="relative group">
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
          </NavbarItem> */}

          {/* Other Navbar Items */}
          <NavbarItem>
            <Link
              href="/contact"
              className="relative inline-block pb-1 px-2 rounded-lg hover:bg-gradient-to-r hover:from-purple-300 hover:to-indigo-300 dark:hover:from-purple-500 dark:hover:to-indigo-500 transition-opacity duration-300"
            >
              Contact
            </Link>
          </NavbarItem>

          {/* Follow Button */}
          <NavbarItem>
            <button className="px-8 py-2 rounded-full relative bg-slate-700 text-white text-sm hover:shadow-2xl hover:shadow-white/[0.1] transition duration-200 border border-slate-600">
              <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl  bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
              <span className="relative z-20">Follow</span>
            </button>
          </NavbarItem>

          {/* Buy Book Button */}
          <NavbarItem>
            <Link href="https://humroohpublicationhouse.com/shop/en/home/893--.html">
              <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                  Buy My Book
                </span>
              </button>
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
        <div className="sm:hidden absolute top-16 left-0 w-full bg-white dark:bg-black text-center py-6 z-40">
          <div className="flex flex-col gap-6 px-4 md:px-8">
            {/* Link to Blogs */}
            <Link
              href="/blogs"
              className="relative inline-block pb-1 px-2 rounded-lg hover:bg-gradient-to-r hover:from-purple-300 hover:to-indigo-300 dark:hover:from-purple-500 dark:hover:to-indigo-500 transition-opacity duration-300 transform hover:scale-105"
            >
              Read
            </Link>

            {/* Link to Contact */}
            <Link
              href="/contact"
              className="relative inline-block pb-1 px-2 rounded-lg hover:bg-gradient-to-r hover:from-purple-300 hover:to-indigo-300 dark:hover:from-purple-500 dark:hover:to-indigo-500 transition-opacity duration-300 transform hover:scale-105"
            >
              Contact
            </Link>

            {/* Buy Book Button */}
            <div className="flex items-center justify-center">
              <Link href="https://humroohpublicationhouse.com/shop/en/home/893--.html">
                <button className="relative inline-flex h-12 w-96 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 hover:scale-105 transition-all">
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                    Buy My Book
                  </span>
                </button>
              </Link>
            </div>

            {/* Follow Button */}
            <button className="px-8 py-2 rounded-full relative bg-slate-700 text-white text-sm hover:shadow-2xl hover:shadow-white/[0.1] transition duration-200 border border-slate-600 transform hover:scale-105">
              <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
              <span className="relative z-20">Follow</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
