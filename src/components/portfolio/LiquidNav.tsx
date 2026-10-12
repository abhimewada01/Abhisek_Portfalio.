import { useEffect, useRef, useState } from "react";
import {
  Home,
  FolderGit2,
  Cpu,
  User,
  Award,
  Briefcase,
  Mail,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

export const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "skills", label: "Skills", icon: Cpu },
  { id: "about", label: "About", icon: User },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "certifications", label: "Certifications", icon: Award },
  { id: "contact", label: "Contact", icon: Mail },
];

interface NavProps {
  activeId: string;
  onSelect: (id: string) => void;
}

export function DesktopNav({ activeId, onSelect }: NavProps) {
  return (
    <nav aria-label="Main Navigation" className="flex items-center gap-1">
      {navItems.map((item) => {
        const isActive = activeId === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(item.id)}
            aria-current={isActive ? "page" : undefined}
            className={`rounded-[10px] px-3 py-1.5 text-[14px] font-medium transition-colors duration-200 ease-out ${
              isActive ? "text-[#FAFAFA]" : "text-[#9CA3AF] hover:text-[#FAFAFA]"
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </nav>
  );
}

export function BottomDock({ activeId, onSelect }: NavProps) {
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [pill, setPill] = useState({ x: 0, ready: false });

  useEffect(() => {
    const index = navItems.findIndex((item) => item.id === activeId);
    const el = itemRefs.current[index];
    if (!el) return;
    const parent = el.parentElement;
    if (!parent) return;
    const parentBox = parent.getBoundingClientRect();
    const box = el.getBoundingClientRect();
    const x = box.left - parentBox.left + box.width / 2 - 14;
    setPill({ x, ready: true });
  }, [activeId]);

  return (
    <nav
      aria-label="Section navigation"
      className="fixed inset-x-0 bottom-4 z-50 mx-auto flex w-[calc(100%-32px)] max-w-[1100px] justify-center md:hidden"
    >
      <div className="relative flex w-full items-center justify-between rounded-2xl border border-[#232329] bg-[#101014] px-2 py-2">
        <span
          className="nav-pill pointer-events-none absolute top-1/2 h-7 w-7 -translate-y-1/2 rounded-full bg-[#18181B] transition-transform duration-200 ease-out"
          style={{
            transform: `translate(${pill.x}px, -50%)`,
            opacity: pill.ready ? 1 : 0,
          }}
          aria-hidden="true"
        />
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              type="button"
              ref={(node) => {
                itemRefs.current[index] = node;
              }}
              onClick={() => onSelect(item.id)}
              aria-current={isActive ? "page" : undefined}
              aria-label={item.label}
              className="relative z-10 grid size-10 place-items-center"
            >
              <Icon
                className={`size-5 transition-[color,transform] duration-200 ease-out ${
                  isActive ? "scale-110 text-[#8B5CF6]" : "text-[#52525B]"
                }`}
              />
              <span
                className={`absolute bottom-1 size-1 rounded-full bg-[#8B5CF6] transition-opacity duration-200 ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
}

/** @deprecated Use DesktopNav / BottomDock. Kept so existing imports do not break. */
export function LiquidNav(props: NavProps) {
  return <DesktopNav {...props} />;
}
