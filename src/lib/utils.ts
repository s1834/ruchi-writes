import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Convert Google Drive sharing URL to direct image URL
export function convertGoogleDriveUrl(url: string): string {
  if (!url.includes("drive.google.com")) {
    return url;
  }

  // Extract file ID from sharing URL
  const fileIdMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileIdMatch) {
    return `https://drive.google.com/uc?id=${fileIdMatch[1]}`;
  }

  return url;
}
