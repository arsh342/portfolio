"use client";

import { GitCommitHorizontal, GitPullRequest } from "lucide-react";
import { SectionHeader } from "./ui/SectionHeader";
import { Badge } from "./ui/Badge";
import { Card } from "./ui/Card";
import { BarChart } from "./ui/BarChart";
import { profile } from "@/data/profile";
import { useGitHubData } from "@/hooks/useGitHubData";
import { useMemo } from "react";
import type { ContributionDay } from "@/lib/github";

function ContributionGraph({
  days,
  loading,
}: {
  days: ContributionDay[];
  loading: boolean;
}) {
  const { weeks, months } = useMemo(() => {
    if (days.length === 0) return { weeks: [], months: [] };

    // Sort days by date
    const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date));

    // Build a full year grid
    const year = new Date().getFullYear();
    const jan1 = new Date(year, 0, 1);
    const dayOfWeek = jan1.getDay(); // 0=Sun

    // Create a lookup map
    const levelMap = new Map<string, number>();
    for (const d of sorted) {
      levelMap.set(d.date, d.level);
    }

    // Helper to format date as YYYY-MM-DD without timezone issues
    const formatDate = (d: Date) => {
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${y}-${m}-${day}`;
    };

    // Build weeks array
    const weeks: { date: string; level: number }[][] = [];
    const today = new Date();
    today.setHours(23, 59, 59, 999);

    // Start from the Sunday of the week containing Jan 1
    const startDate = new Date(jan1);
    startDate.setDate(startDate.getDate() - dayOfWeek);

    let currentDate = new Date(startDate);
    let currentWeek: { date: string; level: number }[] = [];

    while (currentDate <= today || currentWeek.length > 0) {
      const dateStr = formatDate(currentDate);
      const isInYear =
        currentDate.getFullYear() === year && currentDate <= today;

      if (isInYear) {
        currentWeek.push({
          date: dateStr,
          level: levelMap.get(dateStr) ?? 0,
        });
      } else if (currentDate < jan1) {
        // Padding before Jan 1
        currentWeek.push({ date: "", level: -1 });
      }

      if (currentWeek.length === 7 || currentDate > today) {
        if (currentWeek.length > 0) {
          weeks.push(currentWeek);
          currentWeek = [];
        }
        if (currentDate > today) break;
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Push any remaining partial week
    if (currentWeek.length > 0) {
      weeks.push(currentWeek);
    }

    // Month labels
    const monthLabels: { label: string; weekIndex: number }[] = [];
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let lastMonth = -1;
    for (let w = 0; w < weeks.length; w++) {
      for (const day of weeks[w]) {
        if (day.date) {
          const month = parseInt(day.date.split("-")[1], 10) - 1;
          if (month !== lastMonth) {
            monthLabels.push({ label: monthNames[month], weekIndex: w });
            lastMonth = month;
          }
          break;
        }
      }
    }

    return { weeks, months: monthLabels };
  }, [days]);

  const levelColors = [
    "bg-[#161616]", // level 0 - no contributions
    "bg-[#5a3d1a]", // level 1
    "bg-[#8b5e2a]", // level 2
    "bg-[#c97e3a]", // level 3
    "bg-[#e5a84b]", // level 4
  ];

  if (loading) {
    return <div className="h-[88px] rounded bg-[#161616] animate-pulse" />;
  }

  if (weeks.length === 0) {
    return null;
  }

  return (
    <div className="overflow-hidden inline-block">
      {/* Month labels */}
      <div className="flex gap-[3px] mb-1">
        {weeks.map((_, wi) => {
          const monthLabel = months.find((m) => m.weekIndex === wi);
          return (
            <div key={wi} className="flex-shrink-0" style={{ width: "10px" }}>
              {monthLabel && (
                <span className="text-[8px] font-mono text-[#555] whitespace-nowrap">
                  {monthLabel.label}
                </span>
              )}
            </div>
          );
        })}
      </div>
      {/* Grid */}
      <div className="flex gap-[3px]">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[3px]">
            {week.map((day, di) => (
              <div
                key={di}
                className={`rounded-[2px] ${
                  day.level === -1
                    ? "bg-transparent"
                    : levelColors[day.level] || levelColors[0]
                }`}
                style={{ width: "10px", height: "10px" }}
                title={day.date ? `${day.date}: Level ${day.level}` : undefined}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Insights() {
  const { data, loading } = useGitHubData();

  const languages = data?.languages ?? profile.languages;
  const mostActive =
    data?.mostActive && data.mostActive.length > 0
      ? data.mostActive.map((r) => ({ name: r.name, commits: r.commits }))
      : profile.mostActive;
  const commitsThisYear =
    data?.stats?.commitsThisYear ?? profile.stats.commitsThisYear;
  const prsThisYear = data?.stats?.prsThisYear ?? profile.stats.prsThisYear;
  const externalPRsMerged = profile.stats.externalPRsMerged;
  const contributionGraph = data?.contributionGraph ?? [];

  const langColors = [
    "#c97e3a",
    "#8b5e34",
    "#d4943e",
    "#a66b2f",
    "#e5a84b",
    "#7a5028",
  ];

  return (
    <section>
      <SectionHeader title="Insights" />

      {/* 2-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Column 1: This Year + Most Active */}
        <Card>
          <h3 className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#555] mb-5">
            This Year
          </h3>
          <div className="flex flex-wrap items-center gap-6 sm:gap-8 mb-6">
            <div className="flex items-center gap-2">
              <GitCommitHorizontal size={16} className="text-[#c97e3a]" />
              <span
                className={`text-2xl font-mono font-bold text-[#e5e5e5] ${loading ? "animate-pulse" : ""}`}
              >
                {commitsThisYear}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <GitPullRequest size={16} className="text-[#c97e3a]" />
              <span
                className={`text-2xl font-mono font-bold text-[#e5e5e5] ${loading ? "animate-pulse" : ""}`}
              >
                {prsThisYear}
              </span>
            </div>
          </div>
          <div className="flex gap-6 mb-4">
            <span className="text-[10px] font-mono tracking-wider uppercase text-[#555]">
              Commits
            </span>
            <span className="text-[10px] font-mono tracking-wider uppercase text-[#555]">
              PRs
            </span>
          </div>

          <div className="mb-6 overflow-x-auto">
            <ContributionGraph days={contributionGraph} loading={loading} />
          </div>

          <h3 className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#555] mb-4">
            Most Active In
          </h3>
          <BarChart
            items={mostActive.map((r) => ({
              label: r.name,
              value: r.commits,
            }))}
          />
        </Card>

        {/* Column 2: In Public Repos + Signals */}
        <Card delay={0.1}>
          <h3 className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#555] mb-4">
            In Public Repos
          </h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {profile.publicRepoTags.map((tag) => (
              <Badge key={tag} variant="accent">
                {tag}
              </Badge>
            ))}
          </div>

          <h3 className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#555] mb-4">
            Signals
          </h3>
          <div className="flex items-center gap-2 mb-6">
            <GitPullRequest size={14} className="text-[#c97e3a]" />
            <span
              className={`text-2xl font-mono font-bold text-[#e5e5e5] ${loading ? "animate-pulse" : ""}`}
            >
              {externalPRsMerged}
            </span>
            <span className="text-[10px] font-mono tracking-wider uppercase text-[#555]">
              External PRs Merged
            </span>
          </div>

          <h3 className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#555] mb-3">
            Languages
          </h3>
          {/* Stacked bar */}
          <div className="flex h-2 rounded-full overflow-hidden mb-3">
            {languages.map((lang, i) => (
              <div
                key={lang.name}
                className="h-full"
                style={{
                  width: `${lang.percentage}%`,
                  backgroundColor: langColors[i % langColors.length],
                }}
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            {languages.map((lang, i) => (
              <div key={lang.name} className="flex items-center gap-1.5">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: langColors[i % langColors.length] }}
                />
                <span className="text-[10px] font-mono text-[#777]">
                  {lang.name}{" "}
                  <span className="text-[#444]">{lang.percentage}%</span>
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}
