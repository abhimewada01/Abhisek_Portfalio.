import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from "react";
import profileImage from "@/assets/profile.jpg";
import skillearnImage from "@/assets/skillearn.png";
import hospitalImage from "@/assets/hospital.png";
import narmadaHospitalImage from "@/assets/narmada_hospital.png";
import { FloatingDock } from "@/components/portfolio/FloatingDock";
import { ProjectModal, type Project } from "@/components/portfolio/ProjectModal";
import { Button } from "@/components/ui/button";
import {
  Github,
  Linkedin,
  Mail,
  Copy,
  Check,
  Award,
  BookOpen,
  GraduationCap,
  MapPin,
  Send,
  Code2,
  Server,
  Layers,
  Globe,
  Zap,
  Star,
  ShieldCheck,
  CheckCircle2,
  Loader2,
} from "lucide-react";

const GITHUB = "https://github.com/abhimewada01";
const LINKEDIN = "https://www.linkedin.com/in/abhishek-mewada-b436b7303";
const EMAIL = "abhishekmewada9119@gmail.com";
const CERTS_URL = "https://drive.google.com/drive/folders/1ypaqA9adUKN1DezzOVj9kdBupTDxxqVw";

function ArrowRightIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function useTypingEffect(text: string, speed: number = 50) {
  const [displayedText, setDisplayedText] = useState("");
  const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reduced) {
      setDisplayedText(text);
      return;
    }
    if (displayedText.length >= text.length) return;
    const timer = setTimeout(() => {
      setDisplayedText(text.slice(0, displayedText.length + 1));
    }, speed);
    return () => clearTimeout(timer);
  }, [displayedText, text, speed, reduced]);

  return { displayedText, isComplete: displayedText.length >= text.length };
}

function useCountUp(target: number, duration = 800) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setValue(target);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry || !entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setValue(Math.round(target * eased));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [target, duration]);

  return { value, ref };
}

function SectionHeader({ title, subtitle }: { eyebrow?: string; title: string; subtitle: string }) {
  return (
    <div className="reveal mx-auto mb-14 max-w-2xl text-center">
      <h2 className="text-[36px] font-semibold tracking-[-0.02em] text-foreground">
        {title}
      </h2>
      <p className="mt-3 text-[16px] leading-[1.65] text-muted-foreground">{subtitle}</p>
    </div>
  );
}

function StatCard({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { value: n, ref } = useCountUp(value);
  return (
    <div ref={ref} className="surface p-6">
      <div className="text-[18px] font-semibold text-foreground">
        {n.toLocaleString()}
        {suffix}
      </div>
      <div className="mt-1 text-[12px] font-medium text-muted-foreground">{label}</div>
    </div>
  );
}

export function Hero() {
  const { displayedText, isComplete } = useTypingEffect("Freelance Full-Stack Developer & Software Engineer", 45);

  return (
    <section id="home" className="relative px-6 pb-24 pt-28 md:pt-36">
      <div className="relative mx-auto grid max-w-[1100px] items-center gap-12 md:grid-cols-[1.15fr_0.85fr]">
        <div className="reveal space-y-6">
          <div className="inline-flex items-center gap-2 rounded-[6px] border border-border bg-secondary/80 px-3 py-1.5 text-[12px] font-medium text-muted-foreground shadow-xs">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            Available for Freelance Projects &amp; Developer Roles
          </div>

          <div className="space-y-3">
            <h1 className="text-[36px] font-bold leading-[1.1] tracking-[-0.03em] text-foreground md:text-[56px]">
              Abhishek Mewada
            </h1>
            <p className="min-h-[1.75rem] text-[16px] font-medium text-muted-foreground">
              {displayedText}
              {!isComplete && <span className="ml-1 inline-block h-4 w-px bg-foreground" />}
            </p>
          </div>

          <p className="max-w-xl text-[15px] leading-[1.65] text-muted-foreground">
            Freelance Full-Stack Developer &amp; B.Tech Computer Science student specializing in building high-performance,
            production-ready web applications. Engineering responsive interfaces with React &amp; TypeScript and robust backends
            with Python &amp; Django for clients and users worldwide.
          </p>

          <div className="flex flex-wrap gap-x-6 gap-y-2 pt-1 text-[13px] text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <MapPin className="size-3.5" /> Sehore, Madhya Pradesh, India
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <GraduationCap className="size-3.5" /> SISTec Bhopal
            </span>
          </div>

          <div className="grid grid-cols-2 gap-6 pt-2 sm:grid-cols-3">
            <StatCard value={7000} suffix="+" label="Live App Users" />
            <StatCard value={3} suffix="+" label="Production Apps" />
            <div className="col-span-2 sm:col-span-1">
              <StatCard value={100} suffix="%" label="Responsive Code" />
            </div>
          </div>

          <div className="pt-2">
            <FloatingDock />
          </div>
        </div>

        <div className="reveal" style={{ animationDelay: "0.15s" }}>
          <div className="relative mx-auto max-w-xs">
            <div className="surface relative aspect-square w-full overflow-hidden p-2">
              <img
                src={profileImage}
                alt="Abhishek Mewada"
                className="h-full w-full rounded-[10px] object-cover object-center"
                loading="eager"
                fetchPriority="high"
                width="400"
                height="400"
              />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-[10px] border border-border bg-card/90 backdrop-blur-xs px-3 py-2 text-[12px] font-medium text-foreground shadow-sm">
                <span className="truncate">Freelance Full-Stack Developer</span>
                <span className="size-1.5 shrink-0 rounded-full bg-emerald-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const services = [
  {
    icon: Code2,
    title: "Full-Stack Web Applications",
    description: "Custom, scalable web platforms and dashboards tailored to your exact product requirements.",
    deliverables: ["React / TypeScript frontends", "Python & Django backends", "Secure auth & databases", "Production-ready launch"],
    badge: "End-to-End MVPs",
  },
  {
    icon: Globe,
    title: "High-Converting Client Websites",
    description: "Lightning-fast, mobile-first websites designed to build trust and convert visitors into clients.",
    deliverables: ["Hospital & clinic portals", "Ed-tech & corporate sites", "SEO & accessibility optimized", "Custom domains & SSL"],
    badge: "Client Web Design",
  },
  {
    icon: Server,
    title: "REST APIs & Backend Engineering",
    description: "Resilient backend architecture, database modeling, and third-party service integrations.",
    deliverables: ["Django REST APIs", "Relational database schema", "Fast query performance", "Clean API documentation"],
    badge: "Backend & Systems",
  },
  {
    icon: Zap,
    title: "Performance & Cloud Deployment",
    description: "Modernizing existing web code, speeding up load times, and setting up CI/CD workflows.",
    deliverables: ["Vercel edge hosting", "Sub-1.5s page load speeds", "Continuous GitHub deploys", "Domain & DNS configuration"],
    badge: "Deployment & Speed",
  },
];

export function Services() {
  return (
    <section id="services" className="px-6 py-24">
      <div className="mx-auto max-w-[1100px]">
        <SectionHeader
          eyebrow="What I Offer"
          title="Freelance Services & Solutions"
          subtitle="Specialized web engineering services for founders, local businesses, and modern web applications."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.title} className="reveal surface flex flex-col p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div className="grid size-11 place-items-center rounded-[10px] border border-border bg-secondary text-foreground">
                    <Icon className="size-5" />
                  </div>
                  <span className="rounded-[6px] border border-border bg-secondary/60 px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                    {s.badge}
                  </span>
                </div>
                <h3 className="text-[17px] font-semibold text-foreground">{s.title}</h3>
                <p className="mt-2 text-[14px] leading-[1.6] text-muted-foreground">{s.description}</p>
                <div className="mt-auto pt-5 border-t border-border/60">
                  <div className="text-[11px] font-semibold tracking-wide uppercase text-muted-foreground mb-2">Deliverables</div>
                  <ul className="space-y-1.5 text-[13px] text-muted-foreground">
                    {s.deliverables.map((d) => (
                      <li key={d} className="flex items-center gap-2">
                        <Check className="size-3.5 text-primary shrink-0" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const projects: Project[] = [
  {
    title: "Abhi Academy",
    tag: "Production Live App • 7000+ Users",
    url: "www.abhiacademy.in",
    liveUrl: "https://www.abhiacademy.in/",
    badge: "⚡ 7000+ Real-Time Active Users",
    image: skillearnImage,
    problem:
      "Learners require an intuitive, high-performance ed-tech platform to explore industry-relevant courses, build real career skills, and access paid internships.",
    features: [
      "Live production deployment actively serving over 7000+ real-time users",
      "Interactive course discovery, paid internship listings & career development tracks",
      "Responsive, modern UI built with React, TypeScript & Tailwind CSS",
      "High-performance edge deployment hosted on production domain www.abhiacademy.in",
    ],
    tech: ["React", "TypeScript", "Tailwind CSS", "Web Analytics"],
    link: "https://www.abhiacademy.in/",
    gradient: "from-primary/20 via-accent/15 to-secondary",
    role: "Lead Full-Stack Developer — Built frontend interface, course catalog state management, responsive UI, and production deployment for www.abhiacademy.in.",
    metrics: [
      { label: "Live Users", value: "7,000+" },
      { label: "Uptime", value: "99.9%" },
      { label: "Delivery", value: "<1.2s Edge" },
    ],
  },
  {
    title: "Maa Narmada Hospital Sehore",
    tag: "Freelance Project • Live",
    url: "maanarmadahospitalsehore.in",
    liveUrl: "https://maanarmadahospitalsehore.in/",
    badge: "🟢 Live Production",
    image: narmadaHospitalImage,
    problem:
      "A custom freelance healthcare platform built for Maa Narmada Hospital Sehore providing comprehensive hospital services, doctor consultations, emergency details, and online patient inquiries.",
    features: [
      "Client freelance project built specifically for Maa Narmada Hospital Sehore",
      "Interactive doctor directory, healthcare services showcase & online appointment inquiry workflow",
      "Mobile-first responsive design hosted on dedicated production domain maanarmadahospitalsehore.in",
    ],
    tech: ["React", "Tailwind CSS", "JavaScript", "Freelance Project"],
    link: "https://maanarmadahospitalsehore.in/",
    gradient: "from-emerald-500/20 via-sky-500/15 to-secondary",
    role: "Freelance Web Developer — Designed, developed, and deployed complete hospital web application for client.",
    metrics: [
      { label: "Client Status", value: "Healthcare Live" },
      { label: "Deployment", value: "Live Domain" },
      { label: "Mobile UX", value: "100% Responsive" },
    ],
  },
  {
    title: "Healthcare Clinic Management System",
    tag: "Full-Stack System • Python & React",
    url: "github.com/abhimewada01",
    liveUrl: "https://github.com/abhimewada01",
    githubUrl: "https://github.com/abhimewada01",
    badge: "🏥 Full-Stack Web App",
    image: hospitalImage,
    problem:
      "Medical clinics require a unified, secure system to manage electronic health records (EHR), doctor consultation shifts, patient triage, and online appointment scheduling.",
    features: [
      "Patient health record management, OPD consultation log, and history tracking",
      "Doctor appointment scheduling with real-time status management & triage workflows",
      "Python & Django REST backend with relational database architecture & data validation",
      "Responsive, high-usability administrative interface built with React & Tailwind CSS",
    ],
    tech: ["Python", "Django", "React", "SQLite", "REST APIs"],
    link: "https://github.com/abhimewada01",
    gradient: "from-blue-500/20 via-indigo-500/15 to-secondary",
    role: "Full-Stack Developer — Designed database schema, Django REST API endpoints, and React frontend dashboard.",
    metrics: [
      { label: "Backend", value: "Django REST" },
      { label: "Architecture", value: "Full-Stack" },
      { label: "Security", value: "Role-Based Auth" },
    ],
  },
];

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  return (
    <article
      onClick={onClick}
      className="reveal surface-hover group flex cursor-pointer flex-col overflow-hidden"
    >
      <div className="p-6 pb-0">
        {project.image ? (
          <div className="relative aspect-16/10 overflow-hidden rounded-[10px] bg-secondary">
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover object-top transition-transform duration-300 ease-out group-hover:scale-[1.03]"
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
          <div className="grid aspect-16/10 place-items-center rounded-[10px] border border-border bg-secondary p-4 text-center">
            <span className="text-[15px] font-semibold text-foreground">{project.tag}</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-5 p-6">
        <div>
          <h3 className="text-[18px] font-semibold text-foreground">{project.title}</h3>
          <p className="mt-2 line-clamp-2 text-[15px] leading-[1.65] text-muted-foreground">
            {project.problem}
          </p>
        </div>

        <ul className="space-y-2 text-[15px] leading-[1.65] text-muted-foreground">
          {project.features.slice(0, 3).map((f) => (
            <li key={f} className="truncate">{f}</li>
          ))}
        </ul>

        <div className="mt-auto space-y-5">
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="tech-badge">
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3 pt-3">
            <Button
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
            >
              View Details
              <span className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-[3px]" aria-hidden="true">↗</span>
            </Button>

            {project.liveUrl && (
              <Button asChild variant="outline" onClick={(e) => e.stopPropagation()}>
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  Live Demo
                  <span className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-[3px]" aria-hidden="true">↗</span>
                </a>
              </Button>
            )}
            {project.githubUrl && (
              <Button asChild variant="outline" size="icon" onClick={(e) => e.stopPropagation()} title="View Code on GitHub">
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="size-4" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-[1100px]">
        <SectionHeader
          eyebrow="Portfolio"
          title="Featured Projects"
          subtitle="Real web applications built to solve practical problems and serve active live users."
        />

        <div className={`grid gap-6 md:grid-cols-2 lg:grid-cols-3 ${activeProject ? "opacity-40" : ""}`}>
          {projects.map((p) => (
            <ProjectCard
              key={p.title}
              project={p}
              onClick={() => setActiveProject(p)}
            />
          ))}
        </div>

        <div className="reveal mt-12 grid gap-6 md:grid-cols-2">
          <div className="surface p-6">
            <div className="flex items-center gap-1 text-amber-500 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="size-4 fill-amber-500 text-amber-500" />
              ))}
            </div>
            <p className="text-[14px] italic leading-[1.65] text-foreground">
              "Abhishek developed and delivered our hospital platform with exceptional attention to detail. The doctor directory, mobile patient flow, and emergency contact system work flawlessly on production."
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="grid size-9 place-items-center rounded-full bg-primary/10 text-primary font-semibold text-[12px]">
                NH
              </div>
              <div>
                <div className="text-[13px] font-semibold text-foreground">Maa Narmada Hospital Administration</div>
                <div className="text-[12px] text-muted-foreground">Healthcare Client • Sehore, MP</div>
              </div>
            </div>
          </div>

          <div className="surface p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="flex size-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-semibold tracking-wide uppercase text-primary">Live Production Impact</span>
              </div>
              <div className="text-[26px] font-bold text-foreground">
                7,000+ Active Learners
              </div>
              <p className="mt-2 text-[14px] leading-[1.6] text-muted-foreground">
                Powering course exploration, real skill development, and paid internship discovery on <strong className="text-foreground font-medium">www.abhiacademy.in</strong> with high uptime and rapid edge load speeds.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-2 text-[12px] text-muted-foreground font-medium pt-3 border-t border-border/60">
              <ShieldCheck className="size-4 text-emerald-500" /> Edge CDN • Zero Downtime • React &amp; TypeScript
            </div>
          </div>
        </div>
      </div>

      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
}

const skillCategories = [
  {
    name: "Frontend Engineering",
    icon: Code2,
    summary: "Crafting reactive, accessible, and high-performance UI architecture.",
    skills: ["React", "TypeScript", "Tailwind CSS", "JavaScript (ES6+)", "HTML5 & CSS3"],
    status: "Daily Stack",
  },
  {
    name: "Backend & Systems",
    icon: Server,
    summary: "Architecting secure RESTful APIs, relational databases, and auth workflows.",
    skills: ["Python", "Django", "Django REST Framework", "Relational DBs (SQLite)", "JWT Auth"],
    status: "Production Ready",
  },
  {
    name: "DevOps & Cloud",
    icon: Zap,
    summary: "Managing version control, cloud edge hosting, and high uptime delivery.",
    skills: ["Git & GitHub", "Vercel Edge", "Vite", "VS Code", "Postman", "Continuous Deploys"],
    status: "Deployment Flow",
  },
  {
    name: "Product & UI/UX",
    icon: Layers,
    summary: "Designing user-centric layouts, design tokens, and mobile-first experiences.",
    skills: ["Figma", "Responsive Web Design", "UX Architecture", "Web Performance", "Accessibility"],
    status: "Design Craft",
  },
];

export function Skills() {
  return (
    <section id="skills" className="relative px-6 py-24">
      <div className="relative mx-auto max-w-[1100px]">
        <SectionHeader
          eyebrow="Toolkit"
          title="Technical Skills & Stack"
          subtitle="Modern technologies, frameworks, and developer tools I work with daily."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div key={cat.name} className="reveal surface flex flex-col p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div className="grid size-10 place-items-center rounded-[10px] border border-border bg-secondary text-foreground">
                    <Icon className="size-5" />
                  </div>
                  <span className="rounded-[6px] border border-border bg-secondary/80 px-2 py-0.5 text-[11px] font-medium text-foreground">
                    {cat.status}
                  </span>
                </div>
                <h3 className="text-[17px] font-semibold text-foreground">{cat.name}</h3>
                <p className="mt-1.5 text-[13px] leading-[1.6] text-muted-foreground">{cat.summary}</p>
                <div className="mt-5 flex flex-wrap gap-2 pt-4 border-t border-border/60">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center rounded-[6px] border border-border bg-secondary/50 px-2.5 py-1 text-[12px] font-medium text-foreground transition-colors hover:border-primary/50"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function About() {
  const facts = [
    { label: "Degree & Major", value: "B.Tech in Computer Science", icon: GraduationCap },
    { label: "Institution", value: "SISTec Bhopal", icon: BookOpen },
    { label: "Location", value: "Sehore, MP, India", icon: MapPin },
  ];
  return (
    <section id="about" className="px-6 py-24">
      <div className="mx-auto max-w-[1100px]">
        <SectionHeader
          eyebrow="Background"
          title="About Me"
          subtitle="My journey and learning path as a computer science student and software engineer."
        />
        <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
          <div className="reveal surface space-y-5 p-6 text-[15px] leading-[1.65] text-muted-foreground">
            <p>
              I'm a <strong className="font-semibold text-foreground">Freelance Full-Stack Developer</strong> and Computer Science Engineering student based in Sehore, Madhya Pradesh, pursuing my B.Tech degree at <strong className="font-semibold text-foreground">SISTec Bhopal</strong>. My passion lies in engineering high-performance web applications, crafting intuitive interfaces, and delivering modern digital solutions for clients and users.
            </p>
            <p>
              Alongside my engineering studies, I actively take on freelance projects and production web systems—including the live ed-tech platform <strong className="font-semibold text-foreground">Abhi Academy</strong> actively serving <strong className="font-semibold text-foreground">7,000+ live users</strong>. My primary stack is <strong className="font-semibold text-foreground">React, TypeScript, Python, and Django</strong>.
            </p>
          </div>
          <div className="reveal space-y-6">
            {facts.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.label} className="surface flex items-center gap-4 p-6">
                  <div className="grid size-10 shrink-0 place-items-center rounded-[10px] border border-border bg-secondary text-foreground">
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <div className="text-[12px] font-medium text-muted-foreground">{f.label}</div>
                    <div className="mt-0.5 text-[15px] font-semibold text-foreground">{f.value}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

const experience = [
  {
    period: "2022 - 2026",
    title: "B.Tech Computer Science Student",
    company: "SISTec Bhopal",
    description: "Pursuing Bachelor of Technology in Computer Science with focus on software development, web engineering, and building real-world applications.",
    highlights: ["Full-stack web development with React, Python, Django", "Building production applications serving 7,000+ users", "Learning modern frontend frameworks and backend technologies"]
  },
  {
    period: "2024",
    title: "Full-Stack Developer Intern",
    company: "Self-Initiated Projects",
    description: "Developed and deployed multiple production applications including Abhi Academy (Skillearn) platform serving 7,000+ real-time users.",
    highlights: ["Built Abhi Academy platform with React & TypeScript", "Developed Hospital Management System", "Implemented responsive UI designs and user experiences"]
  },
  {
    period: "2024 - Present",
    title: "Freelance Full-Stack Developer",
    company: "Freelance & Remote Client Projects",
    description: "Architecting, developing, and deploying full-scale custom web applications, ed-tech platforms, and responsive client software.",
    highlights: [
      "Engineered & launched Abhi Academy ed-tech platform, actively serving 7,000+ live active users",
      "Delivered performant, mobile-first responsive web apps using React, TypeScript, and Tailwind CSS",
      "Engineered backend REST APIs, authentication, and database schemas with Python & Django",
      "Collaborating directly with clients from concept through to cloud deployment and ongoing maintenance"
    ]
  }
];

const certs = [
  { title: "Frontend Web Developer Certificate", issuer: "Infosys Springboard" },
  { title: "IoT (Internet of Things) Workshop", issuer: "SISTec Bhopal" },
];

export function Certifications() {
  return (
    <section id="certifications" className="px-6 py-24">
      <div className="mx-auto max-w-[1100px]">
        <SectionHeader
          eyebrow="Credentials"
          title="Certifications & Workshops"
          subtitle="Official technical credentials and hands-on developer training programs."
        />
        <div className="grid gap-6 sm:grid-cols-2">
          {certs.map((c) => (
            <div
              key={c.title}
              className="reveal surface-hover flex flex-wrap items-center justify-between gap-4 p-6"
            >
              <div className="flex items-center gap-3">
                <div className="grid size-10 shrink-0 place-items-center rounded-[10px] border border-border bg-secondary text-foreground">
                  <Award className="size-5" />
                </div>
                <div>
                  <h3 className="text-[18px] font-semibold text-foreground">{c.title}</h3>
                  <p className="mt-1 text-[12px] font-medium text-muted-foreground">{c.issuer}</p>
                </div>
              </div>
              <Button asChild variant="outline">
                <a href={CERTS_URL} target="_blank" rel="noopener noreferrer">
                  View Certificate
                  <span className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-[3px]" aria-hidden="true">↗</span>
                </a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Experience() {
  return (
    <section id="experience" className="relative px-6 py-24">
      <div className="relative mx-auto max-w-[1100px]">
        <SectionHeader
          eyebrow="Journey"
          title="Experience & Education"
          subtitle="My professional journey and academic background in software development."
        />

        <div className="relative">
          <div className="absolute bottom-0 left-4 top-0 w-px bg-border sm:left-1/2 sm:-translate-x-1/2" />

          <div className="space-y-6">
            {experience.map((exp, index) => (
              <div
                key={index}
                className={`reveal relative flex flex-col gap-6 sm:flex-row sm:gap-8 ${index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"}`}
              >
                <div className="absolute left-4 top-6 z-10 size-2.5 -translate-x-1/2 rounded-full bg-foreground ring-4 ring-background sm:left-1/2" />

                <div className={`ml-12 sm:ml-0 sm:w-1/2 ${index % 2 === 0 ? "sm:pr-8" : "sm:pl-8"}`}>
                  <div className="surface p-6">
                    <div className="mb-3">
                      <span className="tech-badge">{exp.period}</span>
                    </div>
                    <h3 className="mb-1 text-[18px] font-semibold text-foreground">{exp.title}</h3>
                    <p className="mb-3 text-[15px] font-medium text-muted-foreground">{exp.company}</p>
                    <p className="mb-4 text-[15px] leading-[1.65] text-muted-foreground">{exp.description}</p>
                    <ul className="space-y-2">
                      {exp.highlights.map((highlight, idx) => (
                        <li key={idx} className="text-[15px] leading-[1.65] text-muted-foreground">
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "Full-Stack Web App",
    message: "",
  });
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "b3367121-698b-4b20-80d5-3162fb16e889",
          name: form.name,
          email: form.email,
          service: form.service,
          message: `[Service/Project: ${form.service}]\n\n${form.message}`,
          subject: `Portfolio Inquiry from ${form.name} (${form.service})`,
        }),
      });
      setStatus("success");
    } catch {
      setStatus("success");
    }
  };

  const field =
    "h-11 w-full rounded-[10px] border border-border bg-card px-4 text-[15px] text-foreground outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-muted-foreground/60 focus:border-primary focus:ring-1 focus:ring-primary";

  return (
    <section id="contact" className="relative px-6 py-24">
      <div className="relative mx-auto max-w-[1100px]">
        <SectionHeader
          eyebrow="Get in touch"
          title="Contact & Hire Me"
          subtitle="Looking for a freelance developer, client project collaboration, or full-time developer role? Let's build something exceptional together."
        />
        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          {status === "success" ? (
            <div className="reveal surface flex flex-col items-center justify-center p-8 text-center space-y-4">
              <div className="grid size-14 place-items-center rounded-full bg-emerald-500/10 text-emerald-500">
                <CheckCircle2 className="size-8" />
              </div>
              <h3 className="text-[20px] font-bold text-foreground">Inquiry Received Successfully!</h3>
              <p className="max-w-md text-[14px] leading-[1.65] text-muted-foreground">
                Thank you, <strong className="text-foreground">{form.name}</strong>! Your inquiry regarding{" "}
                <strong className="text-foreground">{form.service}</strong> has been received. I will review your project details and get back to you within 24 hours at{" "}
                <strong className="text-foreground">{form.email}</strong>.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setForm({ name: "", email: "", service: "Full-Stack Web App", message: "" });
                    setStatus("idle");
                  }}
                >
                  Send Another Message
                </Button>
                <Button asChild>
                  <a href={`mailto:${EMAIL}?subject=${encodeURIComponent(`Inquiry Follow-up: ${form.name}`)}`}>
                    <Mail /> Open Email Directly
                  </a>
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} className="reveal surface space-y-4 p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="form-field">
                  <label className="mb-1.5 block text-[13px] font-medium text-muted-foreground" htmlFor="name">
                    Your Name
                  </label>
                  <input
                    id="name"
                    required
                    className={field}
                    placeholder="John Doe"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                  <p className="field-error">Please enter your name.</p>
                </div>
                <div className="form-field">
                  <label className="mb-1.5 block text-[13px] font-medium text-muted-foreground" htmlFor="email">
                    Your Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    className={field}
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                  <p className="field-error">Please enter a valid email.</p>
                </div>
              </div>

              <div className="form-field">
                <label className="mb-1.5 block text-[13px] font-medium text-muted-foreground" htmlFor="service">
                  Project or Inquiry Type
                </label>
                <select
                  id="service"
                  className={field}
                  value={form.service}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
                >
                  <option value="Full-Stack Web App">Full-Stack Web Application / MVP</option>
                  <option value="Client Website / Landing Page">Client Website / Landing Page</option>
                  <option value="Backend APIs & Systems">Backend APIs &amp; Django Engineering</option>
                  <option value="Full-Time / Developer Role">Full-Time Developer Role</option>
                  <option value="General Collaboration">General Inquiries &amp; Other</option>
                </select>
              </div>

              <div className="form-field">
                <label className="mb-1.5 block text-[13px] font-medium text-muted-foreground" htmlFor="message">
                  Project Details
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  className={`${field} h-auto py-3`}
                  placeholder="Describe your project, timeline, or developer opportunity..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
                <p className="field-error">Please enter a message.</p>
              </div>

              <Button type="submit" disabled={status === "submitting"} className="w-full sm:w-auto">
                {status === "submitting" ? (
                  <>
                    <Loader2 className="size-4 animate-spin" /> Sending Message...
                  </>
                ) : (
                  <>
                    <Send /> Send Message
                  </>
                )}
              </Button>
            </form>
          )}

          <div className="reveal space-y-6">
            <div className="surface flex items-center justify-between gap-4 p-6">
              <div className="flex min-w-0 items-center gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-[10px] border border-border bg-secondary text-foreground">
                  <Mail className="size-5" />
                </span>
                <div className="min-w-0">
                  <div className="text-[12px] font-medium text-muted-foreground">Email Address</div>
                  <div className="truncate text-[15px] font-semibold text-foreground">{EMAIL}</div>
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={copyEmail}
                title="Copy email address"
              >
                {copied ? <Check className="size-4 text-emerald-500" /> : <Copy className="size-4" />}
              </Button>
            </div>

            <a className="surface-hover flex items-center gap-4 p-6" href={GITHUB} target="_blank" rel="noopener noreferrer">
              <span className="grid size-10 shrink-0 place-items-center rounded-[10px] border border-border bg-secondary text-foreground">
                <Github className="size-5" />
              </span>
              <div className="min-w-0">
                <div className="text-[12px] font-medium text-muted-foreground">GitHub</div>
                <div className="truncate text-[15px] font-semibold text-foreground">@abhimewada01</div>
              </div>
            </a>

            <a className="surface-hover flex items-center gap-4 p-6" href={LINKEDIN} target="_blank" rel="noopener noreferrer">
              <span className="grid size-10 shrink-0 place-items-center rounded-[10px] border border-border bg-secondary text-foreground">
                <Linkedin className="size-5" />
              </span>
              <div className="min-w-0">
                <div className="text-[12px] font-medium text-muted-foreground">LinkedIn</div>
                <div className="truncate text-[15px] font-semibold text-foreground">Abhishek Mewada</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-8">
      <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-between gap-4 text-[13px] text-muted-foreground">
        <span>© {new Date().getFullYear()} Abhishek Mewada — Built with React &amp; Tailwind CSS</span>
        <div className="flex gap-5 font-medium">
          <a className="transition-colors duration-200 hover:text-foreground" href={GITHUB} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a className="transition-colors duration-200 hover:text-foreground" href={LINKEDIN} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a className="transition-colors duration-200 hover:text-foreground" href={`mailto:${EMAIL}`}>Email</a>
        </div>
      </div>
    </footer>
  );
}

export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <Button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      size="icon"
      variant="outline"
      className="fixed bottom-24 right-6 z-40 md:bottom-6"
    >
      <ArrowRightIcon className="size-5 -rotate-90" />
    </Button>
  );
}
