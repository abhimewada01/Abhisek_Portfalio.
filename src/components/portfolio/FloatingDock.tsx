import { FolderGit2, FileText, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const GITHUB = "https://github.com/abhimewada01";
const LINKEDIN = "https://www.linkedin.com/in/abhishek-mewada-b436b7303";
const EMAIL = "abhishekmewada9119@gmail.com";

export function FloatingDock() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button asChild>
        <a href="#contact">Hire Me / Contact</a>
      </Button>
      <Button asChild variant="outline">
        <a href="/Abhishek_Mewada_Resume.pdf" download="Abhishek_Mewada_Resume.pdf" target="_blank" rel="noopener noreferrer">
          <FileText /> Download Resume
          <span className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-[3px]" aria-hidden="true">↗</span>
        </a>
      </Button>
      <Button asChild variant="outline">
        <a href="#projects">
          <FolderGit2 /> View Projects
          <span className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-[3px]" aria-hidden="true">↗</span>
        </a>
      </Button>
      <Button asChild variant="outline" size="icon" aria-label="GitHub Profile">
        <a href={GITHUB} target="_blank" rel="noopener noreferrer">
          <Github />
        </a>
      </Button>
      <Button asChild variant="outline" size="icon" aria-label="LinkedIn Profile">
        <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">
          <Linkedin />
        </a>
      </Button>
      <Button asChild variant="outline" size="icon" aria-label="Contact Me">
        <a href={`mailto:${EMAIL}`}>
          <Mail />
        </a>
      </Button>
    </div>
  );
}
