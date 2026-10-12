import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/portfolio/Nav";
import {
  About,
  BackToTop,
  Certifications,
  Contact,
  Experience,
  Footer,
  Hero,
  Projects,
  Skills,
} from "@/components/portfolio/Sections";
import { useReveal, usePageLoadAnimation } from "@/components/portfolio/useReveal";

const title = "Abhishek Mewada — Software Developer & Full-Stack Engineer";
const description =
  "Portfolio of Abhishek Mewada, B.Tech Computer Science student and software developer in Sehore, Madhya Pradesh. Building scalable web applications with React, Python, Django, and modern frontend technologies. Featuring production apps serving 5000+ users.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "keywords", content: "Abhishek Mewada, Software Developer, Full-Stack Developer, React, Python, Django, Web Development, Portfolio, B.Tech Computer Science, Sehore, Madhya Pradesh, India" },
      { name: "author", content: "Abhishek Mewada" },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://abhishekmewada.com" },
      { property: "og:site_name", content: "Abhishek Mewada Portfolio" },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:creator", content: "@abhimewada01" },
    ],
  }),
  component: Index,
});

function Index() {
  useReveal();
  usePageLoadAnimation();

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-muted-foreground pb-24 md:pb-0 transition-colors duration-300">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-[10px] focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to main content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Projects />
        <Skills />
        <About />
        <Experience />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
