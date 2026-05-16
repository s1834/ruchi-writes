import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://ruchiwrites.com"),
  title: {
    default: "Ruchi Writes — Poetry & Social Commentary",
    template: "%s | Ruchi Writes",
  },
  description:
    "Hindi poetry, social commentary, and reflections by Ruchi Shah. Between silence and speech.",
  keywords: [
    "Hindi poetry", "कविता", "Ruchi Shah", "Ruchi Writes",
    "social commentary", "Indian poetry", "Hindi literature",
    "poetry collection", "creative writing",
  ],
  authors: [{ name: "Ruchi Shah", url: "https://ruchiwrites.com/about" }],
  creator: "Ruchi Shah",
  openGraph: {
    type: "website",
    locale: "en_IN",
    alternateLocale: "hi_IN",
    siteName: "Ruchi Writes",
    title: "Ruchi Writes — Poetry & Social Commentary",
    description: "Hindi poetry and social commentary by Ruchi Shah.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Ruchi Writes" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ruchi Writes — Poetry & Social Commentary",
    description: "Hindi poetry and social commentary by Ruchi Shah.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Ruchi Writes",
    url: "https://ruchiwrites.com",
    description: "Hindi poetry and social commentary by Ruchi Shah.",
    author: { "@type": "Person", name: "Ruchi Shah" },
    inLanguage: ["en", "hi"],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+Devanagari:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#1c1726" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#f8f5f0" media="(prefers-color-scheme: light)" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
