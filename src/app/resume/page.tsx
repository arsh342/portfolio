"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Download } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { profile } from "@/data/profile";

type SkillGroup = {
  label: string;
  items: string[];
};

type Project = {
  name: string;
  subtitle: string;
  sourceLabel: "GitHub" | "GitLab";
  sourceUrl: string;
  sourceText: string;
  liveText?: string;
  liveUrl?: string;
  bullets: string[];
};

const summary =
  "Backend-focused software engineer with strong foundations in Java, data structures, algorithms, multithreading, and object-oriented design. Experience building scalable REST APIs, concurrent systems, and production-ready backend services.";

const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    items: ["Java", "C++", "Python", "JavaScript", "TypeScript"],
  },
  {
    label: "Core CS",
    items: [
      "Data Structures",
      "Algorithms",
      "OOP",
      "Multithreading",
      "DBMS",
      "Operating Systems",
    ],
  },
  {
    label: "Backend",
    items: [
      "Spring Boot",
      "Node.js",
      "Express.js",
      "REST APIs",
      "JWT Authentication",
      "Firebase",
      "Maven",
      "Tomcat",
    ],
  },
  {
    label: "Databases",
    items: ["PostgreSQL", "MongoDB", "MySQL"],
  },
  {
    label: "Tools",
    items: ["Git", "Docker", "Linux/Unix", "Shell Scripting", "CI/CD", "GitHub Actions"],
  },
];

const projects: Project[] = [
  {
    name: "DispatchCore",
    subtitle: "Multi-Tenant Logistics SaaS",
    sourceLabel: "GitHub",
    sourceUrl: "https://github.com/arsh342/dispatchCore",
    sourceText: "github.com/arsh342/dispatchCore",
    liveUrl: "https://dispatchcore.tech",
    liveText: "dispatchcore.tech",
    bullets: [
      "Built multi-tenant logistics platform supporting 5 user roles with modular REST services, tenant-aware middleware, and real-time delivery tracking",
      "Integrated Firebase Authentication and Firebase Realtime Database for secure authentication and live order synchronization across tenants",
      "Designed scalable backend workflows using Node.js, PostgreSQL, and Sequelize with transaction isolation, composite indexing, and optimized database query performance",
      "Implemented transactional email workflows using Resend API integration",
    ],
  },
  {
    name: "Job Application Service",
    subtitle: "Spring Boot REST API",
    sourceLabel: "GitHub",
    sourceUrl: "https://github.com/arsh342/Job-Application-Service",
    sourceText: "github.com/arsh342/Job-Application-Service",
    bullets: [
      "Built layered Spring Boot backend deployed on Tomcat with Maven, JWT authentication, and centralized exception handling",
      "Developed JSP-based frontend views served through Tomcat for job listing and application management workflows",
      "Designed MySQL schemas with indexing and validation ensuring scalable CRUD operations and efficient query execution",
    ],
  },
  {
    name: "CareerCompass",
    subtitle: "AI Career Platform",
    sourceLabel: "GitHub",
    sourceUrl: "https://github.com/arsh342/careercompass",
    sourceText: "github.com/arsh342/careercompass",
    liveUrl: "https://careercompassai.vercel.app",
    liveText: "careercompassai.vercel.app",
    bullets: [
      "Built backend services with role-based authentication, REST APIs, and subscription workflows for production deployment",
      "Designed modular service architecture and integrated external LLM APIs into application workflows",
    ],
  },
  {
    name: "SecureFlow AI",
    subtitle: "Multi-Agent Security Platform",
    sourceLabel: "GitLab",
    sourceUrl: "https://gitlab.com/gitlab-ai-hackathon/participants/34775220",
    sourceText: "gitlab.com/gitlab-ai-hackathon/participants/34775220",
    bullets: [
      "Developed backend orchestration workflows for security scanning, secrets detection, and dependency vulnerability analysis",
      "Implemented parallel task execution pipelines generating JSON compliance reports aligned with OWASP Top 10",
    ],
  },
];

const education = {
  degree: "B.E. Computer Science",
  school: "Chitkara University",
  location: "Punjab, India",
  period: "2023–2027",
  details: "CGPA: 8.70",
  coursework: "Data Structures, Algorithms, Operating Systems, DBMS",
};

const certifications = [
  {
    org: "Anthropic",
    year: "2026",
    name: "Model Context Protocol (Foundations & Advanced), Claude Code in Action",
  },
];

const achievements = [
  {
    title: "Hacktoberfest Contributor, 2025",
    description: "Accepted open-source contributions",
  },
];

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#c97e3a] mb-4 pb-2 border-b border-[#2a2a2a]">
      {children}
    </h2>
  );
}

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e5e5e5] overflow-x-hidden">
      <div className="max-w-200 mx-auto px-4 sm:px-6 py-8">
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

        <motion.header
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10"
        >
          <h1 className="text-3xl font-mono font-bold text-[#e5e5e5] mb-3">
            {profile.name}
          </h1>
          <div className="space-y-1 text-[11px] font-mono text-[#888]">
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span>Chandigarh, India</span>
              <span className="text-[#555]">|</span>
              <a
                href="tel:+919056054358"
                className="hover:text-[#c97e3a] transition-colors"
              >
                +91 9056054358
              </a>
              <span className="text-[#555]">|</span>
              <a
                href={`mailto:${profile.links.email}`}
                className="hover:text-[#c97e3a] transition-colors"
              >
                {profile.links.email}
              </a>
            </p>
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span>GitHub:</span>
              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#c97e3a] transition-colors"
              >
                github.com/arsh342
              </a>
              <span>LinkedIn:</span>
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#c97e3a] transition-colors"
              >
                linkedin.com/in/arsh342
              </a>
              <a
                href="https://arsh.engineer"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#c97e3a] transition-colors"
              >
                arsh.engineer
              </a>
            </p>
          </div>
        </motion.header>

        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="mb-8"
        >
          <SectionTitle>SUMMARY</SectionTitle>
          <p className="text-[11px] font-mono text-[#999] leading-relaxed">
            {summary}
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-8"
        >
          <SectionTitle>SKILLS</SectionTitle>
          <div className="space-y-2.5">
            {skillGroups.map((group) => (
              <div
                key={group.label}
                className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-3"
              >
                <span className="text-[10px] font-mono text-[#555] uppercase tracking-wider sm:w-28 shrink-0 pt-0.5">
                  {group.label}:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
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

        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <SectionTitle>PROJECTS</SectionTitle>
          <div className="space-y-6">
            {projects.map((project) => (
              <div key={project.name} className="pb-5 border-b border-[#1d1d1d] last:border-b-0 last:pb-0">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                  <div>
                    <h3 className="text-[13px] font-mono font-semibold text-[#e5e5e5]">
                      {project.name} - {project.subtitle}
                    </h3>
                    <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] font-mono text-[#666]">
                      <span>{project.sourceLabel}:</span>
                      <a
                        href={project.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#c97e3a]/80 hover:text-[#c97e3a] transition-colors inline-flex items-center gap-1"
                      >
                        {project.sourceText}
                      </a>
                      {project.liveUrl && project.liveText && (
                        <>
                          <span>Live:</span>
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#c97e3a]/80 hover:text-[#c97e3a] transition-colors inline-flex items-center gap-1"
                          >
                            {project.liveText}
                          </a>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <ul className="mt-2 space-y-1 list-disc pl-5 marker:text-[#555]">
                  {project.bullets.map((bullet) => (
                    <li key={bullet} className="text-[11px] font-mono text-[#999] leading-relaxed">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mb-8"
        >
          <SectionTitle>EDUCATION</SectionTitle>
          <div>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
              <div>
                <h3 className="text-[13px] font-mono font-semibold text-[#e5e5e5]">
                  {education.degree} - {education.school}
                </h3>
                <p className="text-[11px] font-mono text-[#c97e3a]">
                  {education.details} - {education.location}
                </p>
              </div>
              <span className="text-[10px] font-mono text-[#666] shrink-0 sm:ml-4 mt-1 sm:mt-0">
                {education.period}
              </span>
            </div>
            <p className="text-[11px] font-mono text-[#999] mt-1">
              Coursework: {education.coursework}
            </p>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8"
        >
          <SectionTitle>CERTIFICATIONS</SectionTitle>
          <ul className="space-y-1">
            {certifications.map((cert) => (
              <li
                key={cert.name}
                className="text-[11px] font-mono text-[#999] pl-3 relative before:content-['›'] before:absolute before:left-0 before:text-[#c97e3a]"
              >
                {cert.org}, {cert.year} -{" "}
                <span className="text-[#c97e3a]">{cert.name}</span>
              </li>
            ))}
          </ul>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mb-16"
        >
          <SectionTitle>ACHIEVEMENTS</SectionTitle>
          <ul className="space-y-1">
            {achievements.map((achievement) => (
              <li
                key={achievement.title}
                className="text-[11px] font-mono text-[#999] pl-3 relative before:content-['›'] before:absolute before:left-0 before:text-[#c97e3a]"
              >
                <span className="text-[#e5e5e5]">{achievement.title}</span> -{" "}
                {achievement.description}
              </li>
            ))}
          </ul>
        </motion.section>
      </div>
    </div>
  );
}
