import { useEffect, useState } from "react";
import { BottomDock, DesktopNav, navItems } from "@/components/portfolio/LiquidNav";
import { ThemeToggle } from "@/components/portfolio/ThemeToggle";
import { Button } from "@/components/ui/button";

export function Nav() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 ease-out ${
          scrolled
            ? "border-b border-border bg-background/80 backdrop-blur-md shadow-xs"
            : "border-b border-transparent bg-background/40 md:bg-transparent backdrop-blur-xs md:backdrop-blur-none"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1100px] items-center justify-between px-4 sm:px-6">
          <a
            href="#home"
            className="shrink-0 text-[15px] font-semibold tracking-[-0.02em] text-foreground hover:text-primary transition-colors"
          >
            Abhishek Mewada
          </a>

          <div className="hidden md:block">
            <DesktopNav activeId={active} onSelect={handleSelectSection} />
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <Button
              type="button"
              className="h-9 px-4 sm:px-6 text-[13px] sm:text-[14px]"
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
