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
      <h2 className="text-[36px] font-semibold tracking-[-0.02em] text-[#FAFAFA]">
        {title}
      </h2>
      <p className="mt-3 text-[16px] leading-[1.65] text-[#9CA3AF]">{subtitle}</p>
    </div>
  );
}

function StatCard({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { value: n, ref } = useCountUp(value);
  return (
    <div ref={ref} className="surface p-6">
      <div className="text-[18px] font-semibold text-[#FAFAFA]">
        {n}
        {suffix}
      </div>
      <div className="mt-1 text-[12px] font-medium text-[#9CA3AF]">{label}</div>
    </div>
  );
}

export function Hero() {
  const { displayedText, isComplete } = useTypingEffect("Software Developer & B.Tech CS Student", 50);

  return (
    <section id="home" className="relative px-6 pb-24 pt-28 md:pt-36">
      <div className="relative mx-auto grid max-w-[1100px] items-center gap-12 md:grid-cols-[1.15fr_0.85fr]">
        <div className="reveal space-y-6">
          <div className="inline-flex items-center gap-2 rounded-[6px] border border-[#232329] bg-[#101014] px-3 py-1.5 text-[12px] font-medium text-[#9CA3AF]">
            <span className="size-1.5 rounded-full bg-[#8B5CF6]" />
            Open to internships &amp; developer roles
          </div>

          <div className="space-y-3">
            <h1 className="text-[36px] font-bold leading-[1.1] tracking-[-0.03em] text-[#FAFAFA] md:text-[56px]">
              Abhishek Mewada
            </h1>
            <p className="min-h-[1.75rem] text-[16px] font-medium text-[#9CA3AF]">
              {displayedText}
              {!isComplete && <span className="ml-1 inline-block h-4 w-px bg-[#FAFAFA]" />}
            </p>
          </div>

          <p className="max-w-xl text-[15px] leading-[1.65] text-[#9CA3AF]">
            B.Tech Computer Science student building scalable web applications. Currently focusing on frontend
            web engineering with HTML, CSS, JavaScript, React, and backend application development using Python &amp; Django.
          </p>

          <div className="flex flex-wrap gap-x-6 gap-y-2 pt-1 text-[13px] text-[#9CA3AF]">
            <span className="flex items-center gap-1.5">
              <MapPin className="size-3.5" /> Sehore, Madhya Pradesh, India
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <GraduationCap className="size-3.5" /> SISTec Bhopal
            </span>
          </div>

          <div className="grid grid-cols-2 gap-6 pt-2 sm:grid-cols-3">
            <StatCard value={5000} suffix="+" label="Live App Users" />
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
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-[10px] border border-[#232329] bg-[#101014] px-3 py-2 text-[12px] font-medium text-[#FAFAFA]">
                <span className="truncate">Software Developer</span>
                <span className="size-1.5 shrink-0 rounded-full bg-[#8B5CF6]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const projects: Project[] = [
  {
    title: "Abhi Academy",
    tag: "Production Live App • 5000+ Users",
    url: "www.abhiacademy.in",
    liveUrl: "https://www.abhiacademy.in/",
    badge: "⚡ 5000+ Real-Time Active Users",
    image: skillearnImage,
    problem:
      "Learners require an intuitive, high-performance ed-tech platform to explore industry-relevant courses, build real career skills, and access paid internships.",
    features: [
      "Live production deployment actively serving over 5000+ real-time users",
      "Interactive course discovery, paid internship listings & career development tracks",
      "Responsive, modern UI built with React, TypeScript & Tailwind CSS",
      "High-performance edge deployment hosted on production domain www.abhiacademy.in",
    ],
    tech: ["React", "TypeScript", "Tailwind CSS", "Web Analytics"],
    link: "https://www.abhiacademy.in/",
    gradient: "from-primary/20 via-accent/15 to-secondary",
    role: "Lead Full-Stack Developer — Built frontend interface, course catalog state management, responsive UI, and production deployment for www.abhiacademy.in.",
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
          <div className="relative aspect-16/10 overflow-hidden rounded-[10px] bg-[#09090B]">
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover object-top transition-transform duration-300 ease-out group-hover:scale-[1.03]"
              loading="lazy"
              width="640"
              height="400"
            />
            {project.badge && (
              <span className="absolute right-3 bottom-3 rounded-[6px] border border-[#2E2E35] bg-[#18181B] px-2 py-1 text-[12px] font-medium text-[#9CA3AF]">
                {project.badge}
              </span>
            )}
          </div>
        ) : (
          <div className="grid aspect-16/10 place-items-center rounded-[10px] border border-[#232329] bg-[#18181B] p-4 text-center">
            <span className="text-[15px] font-semibold text-[#FAFAFA]">{project.tag}</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-5 p-6">
        <div>
          <h3 className="text-[18px] font-semibold text-[#FAFAFA]">{project.title}</h3>
          <p className="mt-2 line-clamp-2 text-[15px] leading-[1.65] text-[#9CA3AF]">
            {project.problem}
          </p>
        </div>

        <ul className="space-y-2 text-[15px] leading-[1.65] text-[#9CA3AF]">
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

        <div className={`grid gap-6 md:grid-cols-2 ${activeProject ? "opacity-40" : ""}`}>
          {projects.map((p) => (
            <ProjectCard
              key={p.title}
              project={p}
              onClick={() => setActiveProject(p)}
            />
          ))}
        </div>
      </div>

      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
}

const skills = [
  { name: "Programming", items: ["Python", "JavaScript", "SQL"], levels: [90, 85, 75] },
  { name: "Web Development", items: ["HTML5", "CSS3", "JavaScript (DOM)", "React"], levels: [95, 90, 85, 80] },
  { name: "Backend", items: ["Django", "Python Web Services", "SQLite"], levels: [85, 80, 75] },
  { name: "Tools & Workflow", items: ["Git", "GitHub", "VS Code", "Figma", "Vercel"], levels: [90, 90, 95, 70, 85] },
];

export function Skills() {
  return (
    <section id="skills" className="relative px-6 py-24">
      <div className="relative mx-auto max-w-[1100px]">
        <SectionHeader
          eyebrow="Toolkit"
          title="Technical Skills"
          subtitle="Technologies, languages and developer tools I work with daily."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((c) => (
            <div key={c.name} className="reveal surface p-6">
              <h3 className="mb-4 text-[18px] font-semibold text-[#FAFAFA]">{c.name}</h3>
              <div className="space-y-3">
                {c.items.map((item, index) => (
                  <div key={item} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[12px] font-medium text-[#FAFAFA]">{item}</span>
                      <span className="text-[12px] font-medium text-[#9CA3AF]">{c.levels[index]}%</span>
                    </div>
                    <div className="progress-bar">
                      <div
                        className="progress-bar-fill"
                        style={{
                          "--target-width": `${c.levels[index]}%`,
                        } as CSSProperties}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
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
          <div className="reveal surface space-y-5 p-6 text-[15px] leading-[1.65] text-[#9CA3AF]">
            <p>
              I'm a Computer Science Engineering student based in Sehore, Madhya Pradesh, pursuing my B.Tech degree at <strong className="font-semibold text-[#FAFAFA]">SISTec Bhopal</strong>. My passion lies in software development, web engineering, and building intuitive user experiences.
            </p>
            <p>
              I focus on mastering core computer science principles while building real-world applications serving real users. Currently, I am expanding my full-stack knowledge using <strong className="font-semibold text-[#FAFAFA]">Python, Django, React, and TypeScript</strong> to craft scalable web systems.
            </p>
          </div>
          <div className="reveal space-y-6">
            {facts.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.label} className="surface flex items-center gap-4 p-6">
                  <div className="grid size-10 shrink-0 place-items-center rounded-[10px] border border-[#232329] bg-[#18181B] text-[#FAFAFA]">
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <div className="text-[12px] font-medium text-[#9CA3AF]">{f.label}</div>
                    <div className="mt-0.5 text-[15px] font-semibold text-[#FAFAFA]">{f.value}</div>
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
    period: "2022 - Present",
    title: "B.Tech Computer Science Student",
    company: "SISTec Bhopal",
    description: "Pursuing Bachelor of Technology in Computer Science with focus on software development, web engineering, and building real-world applications.",
    highlights: ["Full-stack web development with React, Python, Django", "Building production applications serving 500+ users", "Learning modern frontend frameworks and backend technologies"]
  },
  {
    period: "2024",
    title: "Full-Stack Developer Intern",
    company: "Self-Initiated Projects",
    description: "Developed and deployed multiple production applications including Skillearn platform serving 500+ real-time users.",
    highlights: ["Built Skillearn platform with React & TypeScript", "Developed Hospital Management System", "Implemented responsive UI designs and user experiences"]
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
                <div className="grid size-10 shrink-0 place-items-center rounded-[10px] border border-[#232329] bg-[#18181B] text-[#FAFAFA]">
                  <Award className="size-5" />
                </div>
                <div>
                  <h3 className="text-[18px] font-semibold text-[#FAFAFA]">{c.title}</h3>
                  <p className="mt-1 text-[12px] font-medium text-[#9CA3AF]">{c.issuer}</p>
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
          <div className="absolute bottom-0 left-4 top-0 w-px bg-[#232329] sm:left-1/2 sm:-translate-x-1/2" />

          <div className="space-y-6">
            {experience.map((exp, index) => (
              <div
                key={index}
                className={`reveal relative flex flex-col gap-6 sm:flex-row sm:gap-8 ${index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"}`}
              >
                <div className="absolute left-4 top-6 z-10 size-2.5 -translate-x-1/2 rounded-full bg-[#FAFAFA] sm:left-1/2" />

                <div className={`ml-12 sm:ml-0 sm:w-1/2 ${index % 2 === 0 ? "sm:pr-8" : "sm:pl-8"}`}>
                  <div className="surface p-6">
                    <div className="mb-3">
                      <span className="tech-badge">{exp.period}</span>
                    </div>
                    <h3 className="mb-1 text-[18px] font-semibold text-[#FAFAFA]">{exp.title}</h3>
                    <p className="mb-3 text-[15px] font-medium text-[#9CA3AF]">{exp.company}</p>
                    <p className="mb-4 text-[15px] leading-[1.65] text-[#9CA3AF]">{exp.description}</p>
                    <ul className="space-y-2">
                      {exp.highlights.map((highlight, idx) => (
                        <li key={idx} className="text-[15px] leading-[1.65] text-[#9CA3AF]">
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
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  const field =
    "h-11 w-full rounded-[10px] border border-[#232329] bg-[#101014] px-4 text-[15px] text-[#FAFAFA] outline-none transition-[border-color] duration-200 placeholder:text-[#52525B] focus:border-[#8B5CF6] focus:ring-0";

  return (
    <section id="contact" className="relative px-6 py-24">
      <div className="relative mx-auto max-w-[1100px]">
        <SectionHeader
          eyebrow="Get in touch"
          title="Contact Me"
          subtitle="Feel free to reach out for developer roles, project collaborations or inquiries."
        />
        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <form onSubmit={submit} className="reveal surface space-y-4 p-6">
            <div className="form-field">
              <label className="mb-1.5 block text-[13px] font-medium text-[#9CA3AF]" htmlFor="name">Your Name</label>
              <input
                id="name" required className={field} placeholder="John Doe"
                value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <p className="field-error">Please enter your name.</p>
            </div>
            <div className="form-field">
              <label className="mb-1.5 block text-[13px] font-medium text-[#9CA3AF]" htmlFor="email">Your Email</label>
              <input
                id="email" type="email" required className={field} placeholder="john@example.com"
                value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <p className="field-error">Please enter a valid email.</p>
            </div>
            <div className="form-field">
              <label className="mb-1.5 block text-[13px] font-medium text-[#9CA3AF]" htmlFor="message">Message</label>
              <textarea
                id="message" required rows={4} className={`${field} h-auto py-3`}
                placeholder="Hello Abhishek, I'd like to discuss a project..."
                value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
              <p className="field-error">Please enter a message.</p>
            </div>
            <Button type="submit">
              <Send /> Send Message
            </Button>
          </form>

          <div className="reveal space-y-6">
            <div className="surface flex items-center justify-between gap-4 p-6">
              <div className="flex min-w-0 items-center gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-[10px] border border-[#232329] bg-[#18181B] text-[#FAFAFA]">
                  <Mail className="size-5" />
                </span>
                <div className="min-w-0">
                  <div className="text-[12px] font-medium text-[#9CA3AF]">Email Address</div>
                  <div className="truncate text-[15px] font-semibold text-[#FAFAFA]">{EMAIL}</div>
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={copyEmail}
                title="Copy email address"
              >
                {copied ? <Check className="size-4 text-[#22C55E]" /> : <Copy className="size-4" />}
              </Button>
            </div>

            <a className="surface-hover flex items-center gap-4 p-6" href={GITHUB} target="_blank" rel="noopener noreferrer">
              <span className="grid size-10 shrink-0 place-items-center rounded-[10px] border border-[#232329] bg-[#18181B] text-[#FAFAFA]">
                <Github className="size-5" />
              </span>
              <div className="min-w-0">
                <div className="text-[12px] font-medium text-[#9CA3AF]">GitHub</div>
                <div className="truncate text-[15px] font-semibold text-[#FAFAFA]">@abhimewada01</div>
              </div>
            </a>

            <a className="surface-hover flex items-center gap-4 p-6" href={LINKEDIN} target="_blank" rel="noopener noreferrer">
              <span className="grid size-10 shrink-0 place-items-center rounded-[10px] border border-[#232329] bg-[#18181B] text-[#FAFAFA]">
                <Linkedin className="size-5" />
              </span>
              <div className="min-w-0">
                <div className="text-[12px] font-medium text-[#9CA3AF]">LinkedIn</div>
                <div className="truncate text-[15px] font-semibold text-[#FAFAFA]">Abhishek Mewada</div>
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
    <footer className="border-t border-[#232329] px-6 py-8">
      <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-between gap-4 text-[13px] text-[#9CA3AF]">
        <span>© {new Date().getFullYear()} Abhishek Mewada — Built with React &amp; Tailwind CSS</span>
        <div className="flex gap-5 font-medium">
          <a className="transition-colors duration-200 hover:text-[#FAFAFA]" href={GITHUB} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a className="transition-colors duration-200 hover:text-[#FAFAFA]" href={LINKEDIN} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a className="transition-colors duration-200 hover:text-[#FAFAFA]" href={`mailto:${EMAIL}`}>Email</a>
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
