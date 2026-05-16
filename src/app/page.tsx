"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { convertGoogleDriveUrl } from "@/lib/utils";

interface Blog {
  _id: string;
  title: string;
  date: string;
  content: string;
  slug: string;
  tags?: string[];
  readingTime?: number;
  isFeatured?: boolean;
  image?: string;
}

export default function Home() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await fetch("/api/blogs");
        const data = await response.json();
        if (Array.isArray(data)) {
          const sorted = data.sort(
            (a: Blog, b: Blog) => new Date(b.date).getTime() - new Date(a.date).getTime()
          );
          setBlogs(sorted);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    }
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen grain">
      <Navigation />

      {/* Hero — with interactive floating varnmala */}
      <HeroSection />

      {/* Poems Grid */}
      <section id="poems" className="px-5 md:px-10 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Poems</h2>
            <Link href="/writings" className="text-sm text-primary hover:underline font-medium">
              Read More →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {blogs.slice(0, 9).map((blog, i) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                viewport={{ once: true }}
              >
                <BlogCard blog={blog} />
              </motion.div>
            ))}
          </div>

          {blogs.length > 9 && (
            <div className="text-center mt-10">
              <Link
                href="/writings"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                Read More
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

function BlogCard({ blog }: { blog: Blog }) {
  return (
    <Link href={`/writings/${blog._id}`} className="group block">
      <article className="rounded-xl overflow-hidden bg-card border border-border/50 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
        {blog.image && (
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={convertGoogleDriveUrl(blog.image)}
              alt={blog.title}
              fill
              className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        )}
        <div className="p-5">
          <h3 className="font-hindi text-base md:text-lg font-medium text-card-foreground group-hover:text-primary transition-colors duration-300 leading-snug mb-2">
            {blog.title}
          </h3>
          <div className="flex items-center justify-between text-xs text-muted-foreground mt-3">
            <time>{new Date(blog.date).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}</time>
            {blog.readingTime && <span>{blog.readingTime} min read</span>}
          </div>
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3 max-h-[3.2rem] overflow-hidden">
              {blog.tags.map((tag) => (
                <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}

const varnmala = [
  { char: "क", top: 8, left: 5, size: 48 },
  { char: "ख", top: 14, left: 78, size: 36 },
  { char: "ग", top: 62, left: 3, size: 40 },
  { char: "घ", top: 72, left: 88, size: 32 },
  { char: "च", top: 5, left: 32, size: 28 },
  { char: "छ", top: 85, left: 15, size: 34 },
  { char: "ज", top: 18, left: 92, size: 30 },
  { char: "झ", top: 50, left: 94, size: 26 },
  { char: "ट", top: 90, left: 55, size: 32 },
  { char: "ठ", top: 30, left: 6, size: 38 },
  { char: "ड", top: 78, left: 42, size: 28 },
  { char: "त", top: 6, left: 55, size: 34 },
  { char: "थ", top: 42, left: 2, size: 44 },
  { char: "द", top: 88, left: 72, size: 30 },
  { char: "न", top: 25, left: 18, size: 36 },
  { char: "प", top: 55, left: 88, size: 42 },
  { char: "फ", top: 35, left: 85, size: 28 },
  { char: "ब", top: 68, left: 22, size: 34 },
  { char: "म", top: 82, left: 92, size: 26 },
  { char: "य", top: 12, left: 45, size: 30 },
  { char: "र", top: 48, left: 8, size: 38 },
  { char: "ल", top: 20, left: 68, size: 32 },
  { char: "व", top: 75, left: 58, size: 36 },
  { char: "श", top: 60, left: 35, size: 28 },
  { char: "स", top: 38, left: 72, size: 40 },
  { char: "ह", top: 92, left: 32, size: 30 },
  { char: "अ", top: 45, left: 15, size: 50 },
  { char: "आ", top: 15, left: 58, size: 26 },
  { char: "इ", top: 65, left: 68, size: 32 },
  { char: "ई", top: 33, left: 42, size: 24 },
];

function FloatingLetter({ char, top, left, size, index }: { char: string; top: number; left: number; size: number; index: number }) {
  const pushX = useMotionValue(0);
  const pushY = useMotionValue(0);
  const springX = useSpring(pushX, { stiffness: 20, damping: 8 });
  const springY = useSpring(pushY, { stiffness: 20, damping: 8 });
  const ref = useRef<HTMLSpanElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = cx - e.clientX;
    const dy = cy - e.clientY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const threshold = 200;
    if (dist < threshold) {
      const force = ((threshold - dist) / threshold) ** 2;
      pushX.set(dx * force * 3);
      pushY.set(dy * force * 3);
    } else {
      pushX.set(0);
      pushY.set(0);
    }
  }, [pushX, pushY]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  // Big flowing paths — letters travel across the screen
  const seed = index * 137.508;
  const rangeX = 150 + (index % 5) * 40;
  const rangeY = 120 + (index % 4) * 35;
  const xDrift = [0, rangeX * Math.sin(seed), -rangeX * Math.cos(seed * 0.6), rangeX * 0.7 * Math.sin(seed * 1.4), 0];
  const yDrift = [0, -rangeY * Math.cos(seed * 0.4), rangeY * Math.sin(seed * 0.8), -rangeY * 0.6 * Math.cos(seed), 0];
  const rotateDrift = [0, 12 * Math.sin(seed), -8, 10 * Math.cos(seed), 0];
  const duration = 18 + (index % 6) * 4;

  return (
    <motion.span
      ref={ref}
      style={{ top: `${top}%`, left: `${left}%`, fontSize: `${size}px`, x: springX, y: springY }}
      animate={{
        translateX: xDrift,
        translateY: yDrift,
        rotate: rotateDrift,
      }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut", delay: index * 0.6 }}
      className="absolute font-hindi text-primary/[0.12] dark:text-primary/[0.08] hover:text-primary/30 dark:hover:text-primary/25 cursor-default select-none transition-colors duration-500"
    >
      {char}
    </motion.span>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-5 md:px-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,_hsl(270_25%_20%/0.3),_transparent)] dark:bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,_hsl(270_30%_15%/0.4),_transparent)] pointer-events-none" />

      {varnmala.map((l, i) => (
        <FloatingLetter key={i} index={i} {...l} />
      ))}

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground leading-[0.9] tracking-tight mb-5">
            Ruchi Writes
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-lg mx-auto leading-relaxed mb-10">
            Poetry and Social Issues
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="#poems"
              className="px-7 py-3 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Read
            </Link>
            <a
              href="https://humroohpublicationhouse.com/shop/en/home/893--.html"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3 rounded-full border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors"
            >
              Buy Book
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
