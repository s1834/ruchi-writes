import Nav from "@/app/navbar/page";
import Read from "@/app/read/page";
import Contact from "@/app/contact/page";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-white dark:bg-neutral-950">
      <Nav />
      <Read />
      <Contact />
    </div>
  );
}
