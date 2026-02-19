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
  Phone,
} from "lucide-react";
import Link from "next/link";
import { profile } from "@/data/profile";

const education = [
  {
    degree: "Bachelor of Engineering in Computer Science",
    school: "Chitkara University",
    location: "Punjab, India",
    period: "Aug 2023 – Jun 2027",
    details:
      "CGPA: 8.70 — Coursework: Data Structures, Operating Systems, DBMS, Computer Networks",
  },
];

const projects = [
  {
    name: "CareerCompass",
    tech: "Next.js · TypeScript · Gemini AI · Stripe",
    bullets: [
      "Developed AI-powered career platform for a hackathon submission on Devpost",
      "Designed REST APIs and role-based authentication workflows and integrated Gemini AI and Stripe subscription workflows",
      "Designed modular frontend architecture to support scalable feature additions and maintainable component structure",
    ],
    url: "https://github.com/arsh342/careercompass",
    live: "https://careercompassai.vercel.app",
  },
  {
    name: "Job Application Service",
    tech: "Java · Spring Boot · MongoDB",
    bullets: [
      "Led a team project to design a RESTful backend using Spring Boot with JWT-based authentication, role separation, and modular service architecture",
      "Modeled MongoDB schemas with indexing and validation to ensure efficient querying and consistent data integrity",
      "Implemented centralized exception handling, request validation, and layered controller→service→repository structure to improve maintainability",
    ],
    url: "https://github.com/arsh342/Job-Application-Service",
  },
  {
    name: "GameVault Mobile App",
    tech: "React Native",
    bullets: [
      "Developed cross-platform mobile application with modular architecture and optimized state management; integrated Google AdMob and published to Play Store",
    ],
    url: "https://github.com/arsh342/tic-tac-toe-react-native",
  },
];

const achievements = [
  {
    title: "Hacktoberfest Contributor, 2025",
    description:
      "Awarded Hacktoberfest badge for accepted open-source contributions (Badge ID: cmgmeh4xb0018l104d4y49mwj)",
  },
  {
    title: "GitHub Contributions",
    description:
      "200+ contributions across personal and open-source repositories (github.com/arsh342)",
  },
];

const certifications = [
  "Introduction to Modern AI, 2025 — Cisco Networking Academy",
  "Apply AI: Analyze Customer Reviews, 2025 — Cisco Networking Academy",
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
    <div className="min-h-screen bg-[#0a0a0a] text-[#e5e5e5] overflow-x-hidden">
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-8">
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
          <h1 className="text-3xl font-mono font-bold text-[#e5e5e5] mb-3">
            {profile.name}
          </h1>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[11px] font-mono text-[#888]">
            <span className="flex items-center gap-1.5">
              <MapPin size={12} />
              Chandigarh, India
            </span>
            <a
              href="tel:+919056054358"
              className="flex items-center gap-1.5 hover:text-[#c97e3a] transition-colors"
            >
              <Phone size={12} />
              +91 9056054358
            </a>
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
          </div>
        </motion.header>

        {/* Education */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-8"
        >
          <SectionTitle>Education</SectionTitle>
          {education.map((edu) => (
            <div key={edu.degree}>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-1">
                <div>
                  <h3 className="text-[13px] font-mono font-semibold text-[#e5e5e5]">
                    {edu.degree}
                  </h3>
                  <p className="text-[11px] font-mono text-[#c97e3a]">
                    {edu.school} — {edu.location}
                  </p>
                </div>
                <span className="text-[10px] font-mono text-[#666] shrink-0 sm:ml-4 mt-1 sm:mt-0">
                  {edu.period}
                </span>
              </div>
              <p className="text-[11px] font-mono text-[#999] mt-1">
                {edu.details}
              </p>
            </div>
          ))}
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
              {
                label: "Languages",
                items: ["Java", "JavaScript", "TypeScript", "Python"],
              },
              {
                label: "Backend",
                items: [
                  "Spring Boot",
                  "Node.js",
                  "Express.js",
                  "REST API Design",
                ],
              },
              { label: "Databases", items: ["MongoDB", "MySQL", "PostgreSQL"] },
              { label: "Cloud & DevOps", items: ["AWS", "Docker"] },
              {
                label: "Frontend",
                items: ["React", "Next.js", "React Native"],
              },
              {
                label: "Concepts",
                items: [
                  "Microservices Architecture",
                  "JWT Authentication",
                  "CI/CD",
                  "Object-Oriented Programming",
                  "Data Structures & Algorithms",
                ],
              },
            ].map((cat) => (
              <div
                key={cat.label}
                className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-3"
              >
                <span className="text-[10px] font-mono text-[#555] uppercase tracking-wider sm:w-28 shrink-0 pt-0.5">
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
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-1">
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
                  <span className="text-[10px] font-mono text-[#666] shrink-0 sm:ml-4 mt-0.5 sm:mt-0">
                    {proj.tech}
                  </span>
                </div>
                {proj.live && (
                  <a
                    href={proj.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-mono text-[#c97e3a]/70 hover:text-[#c97e3a] transition-colors"
                  >
                    {proj.live.replace("https://", "")}
                  </a>
                )}
                <ul className="space-y-1 mt-1">
                  {proj.bullets.map((b, i) => (
                    <li
                      key={i}
                      className="text-[11px] font-mono text-[#999] leading-relaxed pl-3 relative before:content-['–'] before:absolute before:left-0 before:text-[#555]"
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Achievements */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8"
        >
          <SectionTitle>Achievements</SectionTitle>
          <div className="space-y-3">
            {achievements.map((a) => (
              <div key={a.title}>
                <h3 className="text-[12px] font-mono font-semibold text-[#e5e5e5]">
                  {a.title}
                </h3>
                <p className="text-[11px] font-mono text-[#999] mt-0.5">
                  {a.description}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Certifications */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
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
