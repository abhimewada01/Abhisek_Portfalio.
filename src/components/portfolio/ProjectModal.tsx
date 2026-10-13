import { useEffect, type FC } from "react";
import { X, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

export type Project = {
  title: string;
  tag: string;
  url: string;
  problem: string;
  features: string[];
  tech: string[];
  link: string;
  liveUrl?: string;
  githubUrl?: string;
  badge?: string;
  image?: string;
  gradient: string;
  role?: string;
  metrics?: { label: string; value: string }[];
};

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalStyle;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const roleText =
    project.role ||
    "Lead Developer — End-to-end architecture, responsive UI design, frontend development, and production deployment.";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div
        className="fixed inset-0 bg-black/70"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-10 flex w-full max-w-3xl max-h-[90vh] flex-col overflow-hidden rounded-[14px] border border-border bg-card text-foreground shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <span className="truncate text-[13px] text-muted-foreground">{project.url}</span>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={onClose}
            aria-label="Close project view"
            className="size-10"
          >
            <X className="size-4" />
          </Button>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto p-6">
          {project.image ? (
            <div className="relative aspect-16/10 overflow-hidden rounded-[10px] bg-secondary">
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover object-top"
                loading="lazy"
                width="640"
                height="400"
              />
              {project.badge && (
                <span className="absolute right-3 bottom-3 rounded-[6px] border border-border bg-card/90 backdrop-blur-xs px-2 py-1 text-[12px] font-medium text-foreground shadow-sm">
                  {project.badge}
                </span>
              )}
            </div>
          ) : (
            <div className="grid aspect-16/10 place-items-center rounded-[10px] border border-border bg-secondary p-6 text-center">
              <span className="text-[15px] font-semibold text-foreground">{project.tag}</span>
            </div>
          )}

          <div className="space-y-2">
            <span className="text-[12px] font-medium text-muted-foreground">{project.tag}</span>
            <h2 id="modal-project-title" className="text-[18px] font-semibold tracking-[-0.02em] text-foreground">
              {project.title}
            </h2>
          </div>

          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {project.metrics.map((m) => (
                <div key={m.label} className="rounded-[10px] border border-border bg-secondary/60 p-3 text-center">
                  <div className="text-[16px] font-bold text-foreground">{m.value}</div>
                  <div className="mt-0.5 text-[11px] font-medium text-muted-foreground">{m.label}</div>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-2">
            <h3 className="text-[13px] font-medium text-foreground">Project Overview</h3>
            <p className="text-[15px] leading-[1.65] text-muted-foreground">{project.problem}</p>
          </div>

          <div className="space-y-3">
            <h3 className="text-[13px] font-medium text-foreground">Key Highlights &amp; Features</h3>
            <ul className="grid gap-3 sm:grid-cols-2">
              {project.features.map((feature, idx) => (
                <li
                  key={idx}
                  className="rounded-[14px] border border-border bg-secondary/50 p-4 text-[15px] leading-[1.65] text-muted-foreground"
                >
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="text-[13px] font-medium text-foreground">My Role &amp; Contribution</h3>
            <p className="text-[15px] leading-[1.65] text-muted-foreground">{roleText}</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-[13px] font-medium text-foreground">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span key={tech} className="tech-badge">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-6 py-4">
          <div className="flex flex-wrap items-center gap-3">
            {project.liveUrl && (
              <Button asChild variant="outline">
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  Live Demo
                  <span className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-[3px]" aria-hidden="true">↗</span>
                </a>
              </Button>
            )}
            {project.githubUrl && (
              <Button asChild variant="outline">
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github /> View Code
                  <span className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-[3px]" aria-hidden="true">↗</span>
                </a>
              </Button>
            )}
            {!project.githubUrl && project.link && project.link.includes("github") && (
              <Button asChild variant="outline">
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  <Github /> View Source
                  <span className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-[3px]" aria-hidden="true">↗</span>
                </a>
              </Button>
            )}
          </div>

          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};
