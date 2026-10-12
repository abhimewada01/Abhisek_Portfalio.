import { useEffect, useState } from "react";
import { BottomDock, DesktopNav, navItems } from "@/components/portfolio/LiquidNav";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

export function Nav() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("portfolio-theme");
      if (saved) return saved === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches || true;
    }
    return true;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("portfolio-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("portfolio-theme", "light");
    }
  }, [isDark]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const sectionIds = ["home", ...navItems.map((item) => item.id)];
    const uniqueIds = Array.from(new Set(sectionIds));

    const sections = uniqueIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          setActive(visible.target.id);
        }
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: [0.1, 0.3, 0.6] }
    );

    sections.forEach((s) => io.observe(s));

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  const handleSelectSection = (id: string) => {
    setActive(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 hidden md:block transition-[background-color,border-color] duration-300 ease-out ${
          scrolled ? "border-b border-border bg-background/80 backdrop-blur-md shadow-sm" : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1100px] items-center justify-between px-6">
          <a href="#home" className="shrink-0 text-[15px] font-semibold tracking-[-0.02em] text-foreground hover:text-primary transition-colors">
            Abhishek Mewada
          </a>

          <DesktopNav activeId={active} onSelect={handleSelectSection} />

          <div className="flex items-center gap-3">
            {/* Dark / Light Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Light and Dark mode"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              className="grid size-9 place-items-center rounded-xl border border-border bg-card text-foreground transition-all duration-200 hover:scale-105 active:scale-95 hover:border-primary"
            >
              {isDark ? <Sun className="size-4 text-amber-400 transition-transform hover:rotate-45" /> : <Moon className="size-4 text-indigo-500 transition-transform hover:-rotate-12" />}
            </button>

            <Button
              type="button"
              className="h-9 px-6 text-[14px]"
              onClick={() => handleSelectSection("contact")}
            >
              Hire Me
            </Button>
          </div>
        </div>
      </header>

      <BottomDock activeId={active} onSelect={handleSelectSection} />
    </>
  );
}
