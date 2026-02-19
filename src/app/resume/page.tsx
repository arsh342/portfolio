"use client";

import { motion } from "framer-motion";
import {
  Download,
  ArrowLeft,
  Mail,
  Github,
  Linkedin,
  MapPin,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { profile } from "@/data/profile";

const experience = [
  {
    role: "Open Source Contributor",
    org: "Various Projects",
    period: "2025 – Present",
    bullets: [
      "Contributed merged PRs to public open-source repositories",
      "Collaborated with maintainers on bug fixes, documentation, and feature development",
    ],
  },
];

const education = [
  {
    degree: "Bachelor of Computer Applications (BCA)",
    school: "Chandigarh University",
    period: "2024 – 2027",
    details:
      "Relevant coursework: Data Structures, Algorithms, Database Systems, Software Engineering, Object-Oriented Programming",
  },
];

const projects = [
  {
    name: "CareerCompass",
    tech: "Next.js · TypeScript · Gemini AI · Stripe",
    bullets: [
      "AI-powered career platform integrating Gemini AI for career analysis and recommendations",
      "Implemented Stripe subscription payments, secure authentication, and role-based access control",
      "Built scalable REST APIs with Next.js App Router; submitted as a hackathon project on Devpost",
    ],
    url: "https://github.com/arsh342/careercompass",
  },
  {
    name: "Job Application Service",
    tech: "Java · Spring Boot · MongoDB · JWT",
    bullets: [
      "Spring Boot microservices backend with RESTful APIs and JWT-based authentication",
      "Implemented role separation, request validation, centralized error handling, and MongoDB indexing",
      "Led team project with layered controller → service → repository architecture",
    ],
    url: "https://github.com/arsh342/Job-Application-Service",
  },
  {
    name: "CollabSpace",
    tech: "Node.js · Socket.IO · Redis · Stripe",
    bullets: [
      "Enterprise-grade real-time collaboration platform with SSL/HTTPS and Socket.IO chat",
      "Built Kanban task management with Redis caching achieving 90% load reduction",
      "Implemented Stripe payments and 99+ tests with CI/CD pipeline",
    ],
    url: "https://github.com/arsh342/collabspace",
  },
  {
    name: "Code Detective",
    tech: "VS Code · Gemini 3 · TypeScript",
    bullets: [
      "AI-powered code archaeology VS Code extension using Gemini 3 multi-agent system",
      "Features git history investigation, time travel timeline, tech debt scoring, and expertise mapping",
      "Built for Google DeepMind Gemini 3 Hackathon",
    ],
    url: "https://github.com/arsh342/Gemini3",
  },
  {
    name: "GameVault",
    tech: "React Native · Expo · Zustand · AdMob",
    bullets: [
      "Cross-platform mobile app with 10+ board and puzzle games deployed to Google Play Store",
      "Modular component architecture with optimized state management and Google AdMob integration",
    ],
    url: "https://github.com/arsh342/tic-tac-toe-react-native",
  },
];

const certifications = [
  "AWS Cloud Practitioner Essentials",
  "Spring Boot & Microservices (Udemy)",
];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#c97e3a] mb-4 pb-2 border-b border-[#2a2a2a]">
      {children}
    </h2>
  );
}

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e5e5e5]">
      <div className="max-w-[800px] mx-auto px-6 py-8">
        {/* Top bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-between mb-10"
        >
          <Link
            href="/"
            className="flex items-center gap-2 text-[11px] font-mono text-[#555] hover:text-[#c97e3a] transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Portfolio
          </Link>
          <a
            href="/arsh.pdf"
            download
            className="flex items-center gap-2 px-4 py-2 text-[11px] font-mono text-[#0a0a0a] bg-[#c97e3a] rounded-md hover:bg-[#d4943e] transition-colors"
          >
            <Download size={13} />
            Download PDF
          </a>
        </motion.div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10"
        >
          <h1 className="text-3xl font-mono font-bold text-[#e5e5e5] mb-2">
            {profile.name}
          </h1>
          <p className="text-[13px] font-mono text-[#c97e3a] mb-4">
            Software Engineer · Full-Stack & Backend Development
          </p>
          <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono text-[#888]">
            <a
              href={`mailto:${profile.links.email}`}
              className="flex items-center gap-1.5 hover:text-[#c97e3a] transition-colors"
            >
              <Mail size={12} />
              {profile.links.email}
            </a>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-[#c97e3a] transition-colors"
            >
              <Github size={12} />
              arsh342
            </a>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-[#c97e3a] transition-colors"
            >
              <Linkedin size={12} />
              arsh342
            </a>
            <span className="flex items-center gap-1.5">
              <MapPin size={12} />
              India
            </span>
          </div>
        </motion.header>

        {/* Summary */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-8"
        >
          <SectionTitle>Summary</SectionTitle>
          <p className="text-[12px] font-mono text-[#999] leading-relaxed">
            {profile.about}
          </p>
        </motion.section>

        {/* Technical Skills */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <SectionTitle>Technical Skills</SectionTitle>
          <div className="space-y-2.5">
            {[
              { label: "Languages", items: profile.technicalSkills.languages },
              { label: "Backend", items: profile.technicalSkills.backend },
              { label: "Frontend", items: profile.technicalSkills.frontend },
              { label: "Databases", items: profile.technicalSkills.databases },
              { label: "Cloud & DevOps", items: profile.technicalSkills.cloud },
              { label: "Concepts", items: profile.technicalSkills.concepts },
            ].map((cat) => (
              <div key={cat.label} className="flex items-start gap-3">
                <span className="text-[10px] font-mono text-[#555] uppercase tracking-wider w-28 shrink-0 pt-0.5">
                  {cat.label}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      className="text-[10px] font-mono text-[#bbb] bg-[#1a1a1a] border border-[#2a2a2a] px-2 py-0.5 rounded-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Projects */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mb-8"
        >
          <SectionTitle>Projects</SectionTitle>
          <div className="space-y-5">
            {projects.map((proj) => (
              <div key={proj.name}>
                <div className="flex items-start justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-[13px] font-mono font-semibold text-[#e5e5e5]">
                      {proj.name}
                    </h3>
                    <a
                      href={proj.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#555] hover:text-[#c97e3a] transition-colors"
                    >
                      <ExternalLink size={11} />
                    </a>
                  </div>
                  <span className="text-[10px] font-mono text-[#666] shrink-0">
                    {proj.tech}
                  </span>
                </div>
                <ul className="space-y-1">
                  {proj.bullets.map((b, i) => (
                    <li
                      key={i}
                      className="text-[11px] font-mono text-[#999] leading-relaxed pl-3 relative before:content-['›'] before:absolute before:left-0 before:text-[#c97e3a]"
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Experience */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8"
        >
          <SectionTitle>Experience</SectionTitle>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.role}>
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <h3 className="text-[13px] font-mono font-semibold text-[#e5e5e5]">
                      {exp.role}
                    </h3>
                    <p className="text-[11px] font-mono text-[#c97e3a]">
                      {exp.org}
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-[#666] shrink-0">
                    {exp.period}
                  </span>
                </div>
                <ul className="space-y-1 mt-1.5">
                  {exp.bullets.map((b, i) => (
                    <li
                      key={i}
                      className="text-[11px] font-mono text-[#999] leading-relaxed pl-3 relative before:content-['›'] before:absolute before:left-0 before:text-[#c97e3a]"
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Education */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mb-8"
        >
          <SectionTitle>Education</SectionTitle>
          {education.map((edu) => (
            <div key={edu.degree}>
              <div className="flex items-start justify-between mb-1">
                <div>
                  <h3 className="text-[13px] font-mono font-semibold text-[#e5e5e5]">
                    {edu.degree}
                  </h3>
                  <p className="text-[11px] font-mono text-[#c97e3a]">
                    {edu.school}
                  </p>
                </div>
                <span className="text-[10px] font-mono text-[#666] shrink-0">
                  {edu.period}
                </span>
              </div>
              <p className="text-[11px] font-mono text-[#999] mt-1">
                {edu.details}
              </p>
            </div>
          ))}
        </motion.section>

        {/* Certifications */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-16"
        >
          <SectionTitle>Certifications</SectionTitle>
          <ul className="space-y-1">
            {certifications.map((cert) => (
              <li
                key={cert}
                className="text-[11px] font-mono text-[#999] pl-3 relative before:content-['›'] before:absolute before:left-0 before:text-[#c97e3a]"
              >
                {cert}
              </li>
            ))}
          </ul>
        </motion.section>
      </div>
    </div>
  );
}
