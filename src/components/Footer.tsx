"use client";

import { useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setStatus("loading");
    try {
      const response = await fetch("/api/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("idle");
      }
    } catch {
      setStatus("idle");
    }
  };

  return (
    <footer className="border-t border-border px-5 md:px-10">
      <div className="max-w-6xl mx-auto py-10 md:py-14">
        <div className="grid md:grid-cols-[1.2fr,1fr] gap-10 md:gap-12 items-start">
          {/* Left — branding + links */}
          <div>
            <Link href="/" className="font-semibold text-foreground text-lg">
              Ruchi Writes
            </Link>
            <p className="text-sm text-muted-foreground mt-1 mb-5">Poetry & Social Commentary</p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-5">
              <Link href="/writings" className="hover:text-foreground transition-colors">Writings</Link>
              <span className="text-border">·</span>
              <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
              <span className="text-border">·</span>
              <Link href="/about#contact" className="hover:text-foreground transition-colors">Contact</Link>
              <span className="text-border">·</span>
              <a
                href="https://humroohpublicationhouse.com/shop/en/home/893--.html"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                Books
              </a>
            </div>

            <p className="text-xs text-muted-foreground/70">
              © {new Date().getFullYear()} Ruchi Shah · Built by{" "}
              <a href="https://shubhshah.xyz" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                s1834
              </a>
              {" & "}
              <a href="https://khushiupadhyay.xyz" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                Khushi
              </a>
            </p>
          </div>

          {/* Right — newsletter */}
          <div className="rounded-xl bg-muted/30 border border-border/50 p-6">
            <h3 className="text-sm font-semibold text-foreground mb-1">Stay Updated</h3>
            <p className="text-muted-foreground text-xs mb-4">New poems and writings, straight to your inbox.</p>
            {status === "success" ? (
              <p className="text-primary text-sm font-medium">Thank you for subscribing!</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 shrink-0"
                >
                  {status === "loading" ? "..." : "Subscribe"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
