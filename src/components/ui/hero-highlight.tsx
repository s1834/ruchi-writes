"use client";
import { cn } from "@/lib/utils";
import { useMotionValue, motion, useMotionTemplate } from "framer-motion";
import React, { useState, useEffect } from "react";

interface HomeContent {
  visitors: number;
}

export const HeroHighlight = ({
  children,
  className,
  containerClassName,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    if (!currentTarget) return;
    let { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const [visitorCount, setVisitorCount] = useState<number>(0);

  useEffect(() => {
    async function fetchAndUpdateVisitorCount() {
      try {
        const response = await fetch("/api/home", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const homeContent = await response.json();

        const newVisitorCount = homeContent.visitors + 1;

        const postResponse = await fetch("/api/home", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ visitors: newVisitorCount }),
        });

        const updatedHomeContent = await postResponse.json();

        if (updatedHomeContent.visitors !== undefined) {
          let count = 0;
          const target = updatedHomeContent.visitors;

          const increment = () => {
            count += Math.ceil(target / 75); // increase divisor to decrease speed
            if (count >= target) {
              setVisitorCount(target);
            } else {
              setVisitorCount(count);
              requestAnimationFrame(increment);
            }
          };

          increment();
        }
      } catch (error) {
        console.error("Error updating visitor count", error);
      }
    }

    fetchAndUpdateVisitorCount();
  }, []);

  return (
    <div
      className={cn(
        "relative h-[56rem] flex items-center bg-white dark:bg-black justify-center w-full group",
        containerClassName
      )}
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 bg-dot-thick-neutral-300 dark:bg-dot-thick-neutral-800 pointer-events-none" />
      <motion.div
        className="pointer-events-none bg-dot-thick-indigo-500 dark:bg-dot-thick-indigo-500 absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          WebkitMaskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
          maskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
        }}
      />

      <div className={cn("relative z-20", className)}>{children}</div>

      <div className="absolute right-0 top-3/4 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 via-purple-600 to-white dark:to-black text-white text-center rounded-l-full px-6 py-4 shadow-xl opacity-90 w-52">
        <div className="flex justify-between items-center text-black dark:text-white">
          <div className="text-lg font-semibold">
            <span className="block">You are</span>
            <span className="block">visitor</span>
          </div>
          <motion.div
            className="text-3xl font-semibold"
            animate={{ opacity: [0, 1], x: [100, 0] }}
          >
            {visitorCount}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.span
      initial={{
        backgroundSize: "0% 100%",
      }}
      animate={{
        backgroundSize: "100% 100%",
      }}
      transition={{
        duration: 2,
        ease: "linear",
        delay: 0.5,
      }}
      style={{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left center",
        display: "inline",
      }}
      className={cn(
        `relative inline-block pb-1 px-1 rounded-lg bg-gradient-to-r from-indigo-300 to-purple-300 dark:from-indigo-500 dark:to-purple-500`,
        className
      )}
    >
      {children}
    </motion.span>
  );
};
