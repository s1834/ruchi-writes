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
  const [followState, setFollowState] = useState<boolean>(false);
  const [showEmailModal, setShowEmailModal] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

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

  const handleFollowClick = () => {
    if (followState) {
      if (window.confirm("Are you sure you want to unfollow??")) {
        setFollowState(false);
        setEmail("");
      }
    } else {
      setShowEmailModal(true);
    }
  };

  const handleEmailSubmit = async () => {
    if (!email || !email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      const response = await fetch("/api/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.exists) {
          alert("You're already subscribed! Thank you for following.");
        } else {
          alert("Successfully subscribed! Thank you for following.");
        }
        setFollowState(true);
        setShowEmailModal(false);
        setEmail("");
      } else {
        alert("Failed to subscribe. Please try again.");
      }
    } catch (error) {
      console.error("Error subscribing:", error);
      alert("Failed to subscribe. Please try again.");
    }
  };

  const closeModal = () => {
    setShowEmailModal(false);
    setEmail("");
  };

  return (
    <div className="relative w-full">
      {/* Navbar wrapping */}
      <Navbar
        maxWidth="lg"
        className="fixed backdrop-blur-sm bg-white/30 dark:bg-black/60 py-4 px-6 z-[9999999]"
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
              href="/all"
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
              href="#contact"
              className="relative inline-block pb-1 px-2 rounded-lg hover:bg-gradient-to-r hover:from-purple-300 hover:to-indigo-300 dark:hover:from-purple-500 dark:hover:to-indigo-500 transition-opacity duration-300"
            >
              Contact
            </Link>
          </NavbarItem>

          {/* Follow Button */}
          <NavbarItem>
            <button
              className="px-8 py-2 rounded-full relative bg-slate-700 text-white text-sm hover:shadow-2xl hover:shadow-white/[0.1] transition duration-200 border border-slate-600"
              onClick={handleFollowClick}
            >
              <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl  bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
              <span className="relative z-20">
                {followState ? "Following" : "Follow"}
              </span>
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
        <div className="sm:hidden fixed top-16 left-0 w-full bg-white/80 dark:bg-black/80 backdrop-blur-lg border-b border-white/20 dark:border-white/10 text-center py-6 z-[9999998] shadow-lg">
          <div className="flex flex-col gap-6 px-4 md:px-8">
            {/* Link to Blogs */}
            <Link
              href="/all"
              className="relative inline-block pb-1 px-2 rounded-lg hover:bg-gradient-to-r hover:from-purple-300 hover:to-indigo-300 dark:hover:from-purple-500 dark:hover:to-indigo-500 transition-opacity duration-300 transform hover:scale-105"
            >
              Read
            </Link>

            {/* Link to Contact */}
            <Link
              href="#contact"
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
            <button
              className="px-8 py-2 rounded-full relative bg-slate-700 text-white text-sm hover:shadow-2xl hover:shadow-white/[0.1] transition duration-200 border border-slate-600 transform hover:scale-105"
              onClick={handleFollowClick}
            >
              <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
              <span className="relative z-20">
                {followState ? "Following" : "Follow"}
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[99999999] flex items-center justify-center p-4">
          <div className="bg-white dark:bg-neutral-900 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl border border-white/20 dark:border-white/10">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-neutral-800 dark:text-white mb-2">
                Join Our Newsletter
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Enter your email to follow and get updates on new posts
              </p>
            </div>

            <div className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300"
                onKeyPress={(e) => e.key === "Enter" && handleEmailSubmit()}
                autoFocus
              />

              <div className="flex gap-3">
                <button
                  onClick={closeModal}
                  className="flex-1 px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEmailSubmit}
                  className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Follow
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
