"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";

export default function AboutPage() {
  const form = useRef<HTMLFormElement | null>(null);
  const [sending, setSending] = useState(false);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const serviceId = process.env.NEXT_PUBLIC_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_TEMPLATE_ID;
    const key = process.env.NEXT_PUBLIC_PUBLIC_KEY;
    if (!serviceId || !templateId || !key) {
      toast.error("Unable to send. Please try again later.");
      return;
    }
    setSending(true);
    emailjs.sendForm(serviceId, templateId, e.target as HTMLFormElement, key)
      .then(() => { toast.success("Message sent. Thank you!"); (e.target as HTMLFormElement).reset(); },
            () => { toast.error("Failed to send. Please try again."); })
      .finally(() => setSending(false));
  };

  return (
    <div className="min-h-screen grain">
      <Toaster
        position="bottom-center"
        toastOptions={{ style: { background: "hsl(var(--card))", color: "hsl(var(--foreground))", fontSize: "0.85rem", border: "1px solid hsl(var(--border))" } }}
      />
      <Navigation />

      {/* Header */}
      <section className="pt-28 pb-12 md:pt-36 md:pb-16 px-5 md:px-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">About</h1>
            <p className="font-hindi text-lg md:text-xl text-muted-foreground leading-relaxed">
              कवयित्री · लेखिका · विचारक
            </p>
          </motion.div>
        </div>
      </section>

      {/* Bio */}
      <section className="px-5 md:px-10 pb-16 md:pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-[1.3fr,1fr] gap-12 md:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <p className="font-hindi text-lg leading-[2.2] text-foreground/90 mb-6">
                मैं रुचि शाह हूँ — एक कवयित्री, लेखिका, और सामाजिक विषयों पर विचार करने वाली।
              </p>
              <p className="text-muted-foreground text-[15px] leading-[1.8] mb-5">
                Some incidents which I see in daily life provoke my heart, mind and thoughtfulness to indulge in writing on these issues with a hopefulness of bringing some change in society as people read my writings.
              </p>
              <p className="text-muted-foreground text-[15px] leading-[1.8]">
                My poetry explores the spaces between silence and speech, between what is seen and what is felt. Through Hindi verse and social commentary, I attempt to hold a mirror to our shared human experience — the quiet moments, the unspoken truths, the everyday poetry of existence.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Quote */}
              <blockquote className="border-l-2 border-primary/30 pl-5 mb-10">
                <p className="font-hindi text-foreground/80 text-base leading-[2.2] italic">
                  हर पंक्ति में एक दुनिया छिपी है — बस देखने वाली नज़र चाहिए।
                </p>
              </blockquote>

              {/* Book CTA */}
              <div className="rounded-xl bg-card border border-border p-6">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Published</p>
                <p className="font-hindi text-foreground font-medium mb-3">रुचि की रचनाएँ</p>
                <a
                  href="https://humroohpublicationhouse.com/shop/en/home/893--.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
                >
                  Purchase Book
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="px-5 md:px-10 pb-20 md:pb-28" id="contact">
        <div className="max-w-4xl mx-auto">
          <div className="border-t border-border pt-12 md:pt-16">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="max-w-lg"
            >
              <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-2">Get in Touch</h2>
              <p className="text-muted-foreground text-sm mb-8">
                Whether about a poem that moved you, a thought to share, or just hello.
              </p>

              <form ref={form} onSubmit={sendEmail} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm text-foreground mb-1.5">Name</label>
                    <input
                      id="name"
                      type="text"
                      name="user_name"
                      required
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm text-foreground mb-1.5">Email</label>
                    <input
                      id="email"
                      type="email"
                      name="user_email"
                      required
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm text-foreground mb-1.5">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                    placeholder="What's on your mind..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {sending ? "Sending..." : "Send Message"}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
