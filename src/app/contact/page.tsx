"use client";
import React, { useEffect, useState, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
} from "@tabler/icons-react";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";

export default function Contact() {
  const form = useRef<HTMLFormElement | null>(null);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    const serviceId = process.env.NEXT_PUBLIC_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_TEMPLATE_ID;
    const key = process.env.NEXT_PUBLIC_PUBLIC_KEY;

    if (!serviceId || !templateId || !key) {
      console.error(
        "Missing environment variables. Please ensure Service ID, Template ID, and Public Key are properly set."
      );
      toast.error("Failed to send message. Please try again later.");
      return;
    }

    emailjs
      .sendForm(serviceId, templateId, e.target as HTMLFormElement, key)
      .then(
        () => {
          console.log("Email successfully sent!");
          toast.success("Message Sent!");
          (e.target as HTMLFormElement).reset();
        },
        (error) => {
          console.error("Email sending failed. Error details:", error);
          toast.error("Failed to send message. Please try again later.");
        }
      );
  };

  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubscribe = async () => {
    if (!email) {
      toast.error("Please enter a valid email address.");
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
          toast.error("Email already exists.");
        } else {
          setIsSubscribed(true);
          toast.success("Successfully subscribed!");
          setEmail("");
        }
      } else {
        toast.error("Failed to subscribe. Please try again.");
      }
    } catch (error) {
      console.error("Error subscribing:", error);
      toast.error("Failed to subscribe. Please try again.");
    }
  };

  return (
    <div
      className="flex flex-col md:flex-row items-center justify-center py-20 sm:mt-32 md:mt-16 h-auto md:h-auto dark:bg-neutral-950 bg-white relative w-full space-y-8 md:space-y-0 md:space-x-8 gap-28"
      id="contact"
    >
      <div className="flex-1 flex flex-col items-start justify-center space-y-8 w-full max-w-lg">
        <p className="dark:text-white text-black text-[3.5rem] font-semibold">
          Get in Touch<span className="text-[#5046e6]">.</span>
        </p>
        <form
          className="flex flex-col space-y-4 w-full"
          ref={form}
          onSubmit={sendEmail}
        >
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-24 mb-4">
            <LabelInputContainer>
              <Label htmlFor="fullname">Full Name</Label>
              <Input
                id="fullname"
                placeholder="John Doe"
                type="text"
                name="user_name"
                className="w-full"
              />
            </LabelInputContainer>
          </div>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              placeholder="johndoe@protonmail.com"
              type="email"
              name="user_email"
              className="w-full"
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-4 flex-grow">
            <Label htmlFor="message">Message</Label>
            <textarea
              id="message"
              placeholder="Type your message here...."
              name="message"
              required
              className="flex h-10 w-full border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm placeholder:text-neutral-400 dark:placeholder-text-neutral-600 focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600 disabled:cursor-not-allowed disabled:opacity-50 dark:shadow-[0px_0px_1px_1px_var(--neutral-700)] transition duration-400"
            />
          </LabelInputContainer>

          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Send Message &rarr;
            <BottomGradient />
          </button>

          <Toaster />

          {/* <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

          <div className="flex flex-row space-x-4">
            <SocialButton
              href="https://github.com/s1834"
              icon={<IconBrandGithub className="h-4 w-4" />}
              label="GitHub"
            />
            <SocialButton
              href="https://linkedin.com/in/s1834"
              icon={<IconBrandLinkedin className="h-4 w-4" />}
              label="LinkedIn"
            />
            <SocialButton
              href="https://twitter.com/s1834_"
              icon={<IconBrandX className="h-4 w-4" />}
              label="X (Twitter)"
            />
          </div> */}
        </form>
      </div>

      <div className="flex-1 flex justify-center items-center relative h-[40rem] w-full max-w-xl">
        <div className="flex-1 flex flex-col items-center justify-center h-[40rem] w-full max-w-xl bg-white dark:bg-neutral-950 rounded-md p-4">
          <h1 className="text-7xl font-bold text-black dark:text-transparent dark:bg-clip-text bg-gradient-to-b dark:from-neutral-200 dark:to-neutral-600 text-center">
            Join Newsletter
          </h1>
          <p className="text-neutral-500 text-center mt-4">
            Stay updated with the latest posts from my blog, upcoming books, and
            much more. By subscribing, you’ll be the first to receive exclusive
            content, updates, and insights directly in your inbox. Don't miss
            out on any exciting news – subscribe now and stay in the loop!
          </p>

          {/* Subscribe to Newsletter */}
          <div className="mt-4 flex w-full space-x-2">
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="ruchiwrites@gmail.com"
              className="flex-1 rounded-lg bg-white placeholder:text-neutral-400  dark:bg-neutral-950 border border-neutral-800 dark:placeholder:text-neutral-700 px-4 py-2 text-white"
            />
            <button
              className="rounded-lg bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 font-medium"
              onClick={handleSubscribe}
            >
              Subscribe
            </button>
          </div>

          <div className="mt-8 text-center text-neutral-500 text-lg">
            <p>© {new Date().getFullYear()} Ruchi Shah. All rights reserved.</p>{" "}
            <br />
            <p className="-mt-6">
              Developed by{" "}
              <a
                href="https://shubhshah.xyz"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline"
              >
                s1834{" "}
              </a>
              and{" "}
              <a
                href="https://khushiupadhyay.xyz"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline"
              >
                Khushi
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const BottomGradient = () => (
  <>
    <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
    <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
  </>
);

interface LabelInputContainerProps {
  children: React.ReactNode;
  className?: string;
}

const LabelInputContainer = ({
  children,
  className = "",
}: LabelInputContainerProps) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

interface SocialButtonProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const SocialButton = ({ href, icon, label }: SocialButtonProps) => {
  return (
    <button
      className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
      onClick={() => window.open(href, "_blank")}
      type="button"
    >
      {icon}
      <span className="text-neutral-700 dark:text-neutral-300 text-sm">
        {label}
      </span>
      <BottomGradient />
    </button>
  );
};
