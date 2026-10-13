import React, { useState } from 'react';
import { Twitter, Github, Linkedin, Mail, ArrowUpRight, type LucideIcon } from 'lucide-react';
import profileImage from '@/assets/profile.jpg';

export interface SocialLink {
  id: string;
  icon: LucideIcon;
  label: string;
  href: string;
}

export interface ActionButtonProps {
  text: string;
  href: string;
}

export interface GlassmorphismProfileCardProps {
  avatarUrl: string;
  name: string;
  title: string;
  bio: string;
  socialLinks?: SocialLink[];
  actionButton: ActionButtonProps;
}

//================================================================================
// 1. DEMO COMPONENT (demos/default/code.demo.tsx)
// This file demonstrates how to use the reusable GlassmorphismProfileCard.
//================================================================================

/**
 * Main component rendering the profile card.
 */
export function Component() {
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen p-4 font-sans bg-transparent transition-colors duration-500 sm:p-8 w-full">
        <ProfileCardDemo />
      </div>
    </div>
  );
}

/**
 * The Demo component that showcases the GlassmorphismProfileCard with Abhishek Mewada's details.
 */
const ProfileCardDemo = () => {
  const cardProps: GlassmorphismProfileCardProps = {
    avatarUrl: profileImage,
    name: 'Abhishek Mewada',
    title: 'Software Developer & CS Student',
    bio: 'B.Tech CS student at SISTec Bhopal. Building web applications with JavaScript, Python, and Django.',
    socialLinks: [
      { id: 'github', icon: Github, label: 'GitHub', href: 'https://github.com/abhimewada01' },
      { id: 'linkedin', icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/abhishek-mewada-b436b7303' },
      { id: 'email', icon: Mail, label: 'Email', href: 'mailto:abhishekmewada9119@gmail.com' },
    ],
    actionButton: {
      text: 'Contact Me',
      href: '#contact',
    },
  };

  return <GlassmorphismProfileCard {...cardProps} />;
};

//================================================================================
// 2. REUSABLE COMPONENT
// This is the core, reusable component logic. It is fully customizable via props.
//================================================================================

/**
 * --- Glassmorphism Profile Card Component ---
 * A responsive, animated, and themeable profile card with a glassmorphism effect.
 */
export const GlassmorphismProfileCard: React.FC<GlassmorphismProfileCardProps> = ({
  avatarUrl,
  name,
  title,
  bio,
  socialLinks = [],
  actionButton,
}) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div className="relative w-full max-w-sm">
      <div 
        className="relative flex flex-col items-center p-8 rounded-3xl border transition-all duration-500 ease-out backdrop-blur-xl bg-card/40 border-white/10"
        style={{
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div className="w-24 h-24 mb-4 rounded-full p-1 border-2 border-white/20 overflow-hidden">
          <img 
            src={avatarUrl} 
            alt={`${name}'s Avatar`}
            className="w-full h-full rounded-full object-cover object-center"
            onError={(e) => { 
              const target = e.currentTarget;
              target.onerror = null; 
              target.src = profileImage; 
            }}
          />
        </div>

        <h2 className="text-2xl font-bold text-card-foreground text-center">{name}</h2>
        <p className="mt-1 text-sm font-medium text-primary text-center">{title}</p>
        <p className="mt-4 text-center text-sm leading-relaxed text-muted-foreground">{bio}</p>

        <div className="w-1/2 h-px my-6 rounded-full bg-border" />

        <div className="flex items-center justify-center gap-3">
          {socialLinks.map((item) => (
            <SocialButton key={item.id} item={item} setHoveredItem={setHoveredItem} hoveredItem={hoveredItem} />
          ))}
        </div>

        <ActionButton action={actionButton} />
      </div>
      
      <div className="absolute inset-0 rounded-3xl -z-10 transition-all duration-500 ease-out blur-2xl opacity-30 bg-gradient-to-r from-primary/40 to-accent/30" />
    </div>
  );
};

// --- Sub-components (Internal to GlassmorphismProfileCard) ---

interface SocialButtonProps {
  item: SocialLink;
  setHoveredItem: (id: string | null) => void;
  hoveredItem: string | null;
}

const SocialButton: React.FC<SocialButtonProps> = ({ item, setHoveredItem, hoveredItem }) => (
  <div className="relative">
    <a
      href={item.href}
      target={item.href.startsWith('http') ? '_blank' : '_self'}
      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
      onClick={(e) => {
        if (item.href === '#' || !item.href) {
          e.preventDefault();
        }
      }}
      className="relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ease-out group overflow-hidden bg-secondary/50 hover:bg-secondary"
      onMouseEnter={() => setHoveredItem(item.id)}
      onMouseLeave={() => setHoveredItem(null)}
      aria-label={item.label}
    >
      <div className="relative z-10 flex items-center justify-center">
        <item.icon size={20} className="transition-all duration-200 ease-out text-secondary-foreground/70 group-hover:text-secondary-foreground" />
      </div>
    </a>
    <Tooltip item={item} hoveredItem={hoveredItem} />
  </div>
);

interface ActionButtonSubProps {
  action: ActionButtonProps;
}

const ActionButton: React.FC<ActionButtonSubProps> = ({ action }) => (
  <a
    href={action.href}
    onClick={(e) => {
      if (action.href === '#' || !action.href) {
        e.preventDefault();
      }
    }}
    className="flex items-center gap-2 px-6 py-3 mt-8 rounded-full font-semibold text-base backdrop-blur-sm transition-all duration-300 ease-out hover:scale-[1.03] active:scale-95 group bg-primary text-primary-foreground"
    style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}
  >
    <span>{action.text}</span>
    <ArrowUpRight size={16} className="transition-transform duration-300 ease-out group-hover:rotate-45" />
  </a>
);

interface TooltipProps {
  item: SocialLink;
  hoveredItem: string | null;
}

const Tooltip: React.FC<TooltipProps> = ({ item, hoveredItem }) => (
  <div 
    role="tooltip"
    className={`absolute -top-12 left-1/2 -translate-x-1/2 z-50 px-3 py-1.5 rounded-lg backdrop-blur-md border text-xs font-medium whitespace-nowrap transition-all duration-300 ease-out pointer-events-none bg-popover text-popover-foreground border-border ${hoveredItem === item.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
    style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
  >
    {item.label}
    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-popover border-b border-r border-border" />
  </div>
);
