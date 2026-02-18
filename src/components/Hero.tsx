"use client";

import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  ExternalLink,
  Copy,
  Share2,
} from "lucide-react";
import { profile } from "@/data/profile";
import { useGitHubData } from "@/hooks/useGitHubData";
import type { ContributionDay } from "@/lib/github";
import { useMemo } from "react";

function MiniContributionGraph({ days }: { days: ContributionDay[] }) {
  const { weeks, monthName } = useMemo(() => {
    const levelMap = new Map<string, number>();
    for (const d of days) {
      levelMap.set(d.date, d.level);
    }

    const formatDate = (d: Date) => {
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${y}-${m}-${day}`;
    };

    const today = new Date();
    today.setHours(23, 59, 59, 999);
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const monthName = today.toLocaleDateString("en-US", { month: "short" });

    // First and last day of the current month
    const monthStart = new Date(currentYear, currentMonth, 1);
    const monthEnd = new Date(currentYear, currentMonth + 1, 0); // last day

    // Start from the Sunday of the week containing the 1st
    const startDate = new Date(monthStart);
    startDate.setDate(startDate.getDate() - startDate.getDay());

    // End at the Saturday of the week containing the last day
    const endDate = new Date(monthEnd);
    endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));

    const weeks: {
      date: string;
      level: number;
      inMonth: boolean;
      isFuture: boolean;
    }[][] = [];
    let currentDate = new Date(startDate);
    let currentWeek: {
      date: string;
      level: number;
      inMonth: boolean;
      isFuture: boolean;
    }[] = [];

    while (currentDate <= endDate) {
      const dateStr = formatDate(currentDate);
      const inMonth =
        currentDate.getMonth() === currentMonth &&
        currentDate.getFullYear() === currentYear;
      const isFuture = currentDate > today;

      currentWeek.push({
        date: inMonth ? dateStr : "",
        level: inMonth && !isFuture ? (levelMap.get(dateStr) ?? 0) : -1,
        inMonth,
        isFuture,
      });

      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    if (currentWeek.length > 0) weeks.push(currentWeek);

    return { weeks, monthName };
  }, [days]);

  const levelColors = [
    "bg-[#1a1a1a]",
    "bg-[#5a3d1a]",
    "bg-[#8b5e2a]",
    "bg-[#c97e3a]",
    "bg-[#e5a84b]",
  ];

  if (weeks.length === 0) {
    return (
      <div
        className="grid gap-[2px]"
        style={{ gridTemplateColumns: "repeat(5, 1fr)" }}
      >
        {Array.from({ length: 25 }).map((_, i) => (
          <div
            key={i}
            className={`w-[6px] h-[6px] rounded-[1px] ${
              [0, 1, 3, 4, 5, 9, 11, 13, 15, 19, 20, 21, 23, 24].includes(i)
                ? "bg-[#c97e3a]"
                : "bg-transparent"
            }`}
          />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="text-[7px] font-mono text-[#555] tracking-wider uppercase mb-1 text-center">
        {monthName}
      </div>
      <div
        className="grid gap-[2px]"
        style={{
          gridTemplateColumns: `repeat(${weeks.length}, 1fr)`,
          gridTemplateRows: "repeat(7, 1fr)",
          gridAutoFlow: "column",
          width: "56px",
          height: "56px",
        }}
      >
        {weeks.map((week, wi) =>
          week.map((day, di) => (
            <div
              key={`${wi}-${di}`}
              className={`rounded-[1px] ${
                !day.inMonth
                  ? "bg-transparent"
                  : day.isFuture
                    ? "bg-[#111111]"
                    : levelColors[day.level] || levelColors[0]
              }`}
              title={day.date ? `${day.date}: Level ${day.level}` : undefined}
            />
          )),
        )}
      </div>
    </div>
  );
}

export function Hero() {
  const { data, loading } = useGitHubData();
  const repoCount = data?.repoCount ?? profile.stats.repos;
  const followers = data?.followers ?? profile.stats.followers;
  const contributionGraph = data?.contributionGraph ?? [];

  return (
    <section className="pt-8 pb-6">
      {/* Top nav bar */}
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between mb-12 pb-4"
      >
        <span className="text-[13px] font-mono tracking-[0.08em] text-[#888]">
          portfolio
        </span>
        <div className="flex items-center gap-3 sm:gap-5 text-[11px] font-mono tracking-[0.1em] uppercase text-[#666]">
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#e5e5e5] transition-colors cursor-pointer"
          >
            GitHub
          </a>
          <span className="text-[#333]">/</span>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#e5e5e5] transition-colors cursor-pointer"
          >
            LinkedIn
          </a>
          <span className="text-[#333]">/</span>
          <a
            href={`mailto:${profile.links.email}`}
            className="hover:text-[#e5e5e5] transition-colors cursor-pointer"
          >
            Contact
          </a>
        </div>
      </motion.nav>

      {/* Profile row — matches SkillSync exactly */}
      <div className="flex flex-col sm:flex-row items-start gap-5">
        {/* Avatar with left accent border */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="shrink-0 relative hidden sm:block"
        >
          <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#c97e3a] rounded-full" />
          <img
            src={data?.avatarUrl || profile.avatar}
            alt={profile.name}
            width={80}
            height={80}
            className="rounded-sm ml-3 grayscale hover:grayscale-0 transition-all duration-500"
          />
        </motion.div>

        {/* Name, handle, tagline */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex-1 min-w-0 pt-1"
        >
          {/* Mobile: avatar + name side by side */}
          <div className="flex items-center gap-3 sm:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative shrink-0 sm:hidden"
            >
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#c97e3a] rounded-full" />
              <img
                src={data?.avatarUrl || profile.avatar}
                alt={profile.name}
                width={56}
                height={56}
                className="rounded-sm ml-3 grayscale hover:grayscale-0 transition-all duration-500"
              />
            </motion.div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <h1 className="text-xl sm:text-2xl font-mono font-bold text-[#e5e5e5]">
                  {profile.name}
                </h1>
                <a
                  href={profile.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#555] hover:text-[#c97e3a] transition-colors cursor-pointer"
                >
                  <ExternalLink size={13} />
                </a>
                <button className="text-[#555] hover:text-[#c97e3a] transition-colors cursor-pointer">
                  <Copy size={13} />
                </button>
                <button className="text-[#555] hover:text-[#c97e3a] transition-colors cursor-pointer">
                  <Share2 size={13} />
                </button>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-[12px] font-mono text-[#555]">
                  @{profile.username}
                </p>
              </div>
              <p className="text-[12px] text-[#c97e3a]/80 font-mono flex items-center gap-1.5 mt-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c97e3a] inline-block" />
                {profile.tagline}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Mobile stats row — visible only on small screens */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex sm:hidden items-center gap-6 w-full"
        >
          <div>
            <div
              className={`text-xl font-mono font-bold text-[#e5e5e5] ${loading ? "animate-pulse" : ""}`}
            >
              {repoCount}
            </div>
            <div className="text-[9px] font-mono tracking-[0.2em] uppercase text-[#555]">
              Repos
            </div>
          </div>
          <div>
            <div
              className={`text-xl font-mono font-bold text-[#e5e5e5] ${loading ? "animate-pulse" : ""}`}
            >
              {followers}
            </div>
            <div className="text-[9px] font-mono tracking-[0.2em] uppercase text-[#555]">
              Followers
            </div>
          </div>
          <div className="ml-auto">
            <MiniContributionGraph days={contributionGraph} />
          </div>
        </motion.div>

        {/* Stats + pixel grid — far right (desktop) */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden sm:flex items-start gap-8 shrink-0"
        >
          <div className="text-right">
            <div
              className={`text-2xl font-mono font-bold text-[#e5e5e5] ${loading ? "animate-pulse" : ""}`}
            >
              {repoCount}
            </div>
            <div className="text-[9px] font-mono tracking-[0.2em] uppercase text-[#555]">
              Repos
            </div>
          </div>
          <div className="text-right">
            <div
              className={`text-2xl font-mono font-bold text-[#e5e5e5] ${loading ? "animate-pulse" : ""}`}
            >
              {followers}
            </div>
            <div className="text-[9px] font-mono tracking-[0.2em] uppercase text-[#555]">
              Followers
            </div>
          </div>
          <MiniContributionGraph days={contributionGraph} />
        </motion.div>
      </div>
    </section>
  );
}
