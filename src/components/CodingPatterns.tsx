"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "./ui/SectionHeader";
import { Card } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { profile } from "@/data/profile";
import {
  GitCommitHorizontal,
  GitBranch,
  FolderPlus,
  Star,
  TrendingUp,
  ExternalLink,
} from "lucide-react";
import { useGitHubData } from "@/hooks/useGitHubData";

export function CodingPatterns() {
  const {
    codingPatterns: fallbackPatterns,
    recentInterests,
    interests,
  } = profile;
  const { data, loading } = useGitHubData();
  const activityTimeline =
    data?.activity && data.activity.length > 0
      ? data.activity
      : profile.githubActivity;

  // Use real coding patterns data from GitHub events, fall back to hardcoded
  const codingPatterns =
    data?.codingPatterns && data.codingPatterns.totalEvents > 0
      ? data.codingPatterns
      : {
          totalEvents: fallbackPatterns.totalCommits,
          description: fallbackPatterns.description,
          byDay: fallbackPatterns.byDay,
          byTime: fallbackPatterns.byTime,
          label: fallbackPatterns.label,
        };

  return (
    <section>
      <SectionHeader title="Coding Patterns" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Column 1: Activity by Day & Time */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#555]">
              {loading ? "..." : `${codingPatterns.totalEvents} commits`}
            </h3>
          </div>
          <p className="text-[12px] text-[#888] font-mono leading-relaxed mb-5">
            {codingPatterns.description}
          </p>

          {/* By Day */}
          <h4 className="text-[9px] font-mono tracking-[0.2em] uppercase text-[#444] mb-3">
            By Day
          </h4>
          <div className="flex items-end gap-2 mb-2 h-16">
            {codingPatterns.byDay.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <motion.div
                  initial={{ height: 0 }}
                  whileInView={{ height: `${d.value * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="w-full rounded-sm bg-[#c97e3a]"
                  style={{ minHeight: d.value > 0 ? "4px" : "0" }}
                />
              </div>
            ))}
          </div>
          <div className="flex gap-2 mb-6">
            {codingPatterns.byDay.map((d, i) => (
              <span
                key={i}
                className="flex-1 text-center text-[9px] font-mono text-[#555]"
              >
                {d.day}
              </span>
            ))}
          </div>

          {/* By Time */}
          <h4 className="text-[9px] font-mono tracking-[0.2em] uppercase text-[#444] mb-3">
            By Time (UTC)
          </h4>
          <div className="flex items-end gap-2 h-10 mb-2">
            {codingPatterns.byTime.map((t, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                whileInView={{ height: `${t.value * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="flex-1 rounded-sm bg-[#c97e3a]"
                style={{ minHeight: t.value > 0 ? "4px" : "0" }}
              />
            ))}
          </div>
          <div className="flex gap-2">
            {codingPatterns.byTime.map((t, i) => (
              <span
                key={i}
                className="flex-1 text-center text-[8px] font-mono text-[#555]"
              >
                {t.time}
              </span>
            ))}
          </div>

          <div className="mt-4 text-[11px] font-mono text-[#c97e3a]">
            {codingPatterns.label}
          </div>
        </Card>

        {/* Column 2: Recent Interests + Trending */}
        <Card delay={0.1}>
          <h3 className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#555] mb-4">
            Interests
          </h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {recentInterests.map((interest) => (
              <Badge key={interest} variant="default">
                {interest}
              </Badge>
            ))}
          </div>

          <h3 className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#555] mb-3">
            <TrendingUp
              size={10}
              className="inline-block mr-1.5 text-[#c97e3a]"
            />
            Trending This Week
          </h3>

          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-3 w-20 bg-[#1a1a1a] rounded mb-2" />
                  <div className="h-2.5 w-full bg-[#1a1a1a] rounded mb-1" />
                  <div className="h-2.5 w-3/4 bg-[#1a1a1a] rounded" />
                </div>
              ))}
            </div>
          ) : data?.trendingInterests && data.trendingInterests.length > 0 ? (
            <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1 scrollbar-thin">
              {data.trendingInterests.map((interest, i) => (
                <motion.div
                  key={interest.keyword}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
                  <div className="text-[9px] font-mono tracking-[0.15em] uppercase text-[#c97e3a] mb-1.5">
                    {interest.keyword}
                  </div>
                  <div className="space-y-1.5">
                    {interest.repos.map((repo) => (
                      <a
                        key={repo.name}
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-start gap-2 bg-[#c97e3a]/5 border border-[#c97e3a]/10 hover:border-[#c97e3a]/30 rounded-md px-2.5 py-2 transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-mono text-[#ccc] group-hover:text-[#c97e3a] transition-colors truncate">
                              {repo.name}
                            </span>
                            <ExternalLink
                              size={8}
                              className="text-[#444] group-hover:text-[#c97e3a] transition-colors shrink-0"
                            />
                          </div>
                          {repo.description && (
                            <p className="text-[9px] font-mono text-[#666] mt-0.5 line-clamp-1">
                              {repo.description}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-0.5 shrink-0">
                          <Star size={8} className="text-[#c97e3a]" />
                          <span className="text-[9px] font-mono text-[#888]">
                            {repo.stars >= 1000
                              ? `${(repo.stars / 1000).toFixed(1)}k`
                              : repo.stars}
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {interests.map((interest, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-[11px] font-mono text-[#c97e3a] bg-[#c97e3a]/8 border border-[#c97e3a]/15 rounded-md px-3 py-2.5 leading-relaxed uppercase tracking-wide"
                >
                  {interest}
                </motion.div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* GitHub Activity Timeline */}
      <div className="mt-4">
        <Card delay={0.3}>
          <h3 className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#555] mb-6">
            <GitCommitHorizontal
              size={12}
              className="inline-block mr-2 text-[#c97e3a]"
            />
            Contribution Activity
          </h3>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[5px] top-2 bottom-2 w-px bg-[#2a2a2a]" />

            <div className="space-y-6">
              {loading
                ? // Loading skeleton for activity timeline
                  Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="pl-7 relative animate-pulse">
                      <div className="absolute left-0 top-1 w-[11px] h-[11px] rounded-full border-2 border-[#333] bg-[#0a0a0a]" />
                      <div className="h-4 w-24 bg-[#1a1a1a] rounded mb-3" />
                      <div className="h-3 w-full max-w-[250px] bg-[#1a1a1a] rounded mb-2" />
                      <div className="h-3 w-2/3 max-w-[160px] bg-[#1a1a1a] rounded" />
                    </div>
                  ))
                : activityTimeline.map((month, mi) => (
                    <motion.div
                      key={month.month}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: mi * 0.08 }}
                      className="pl-7 relative"
                    >
                      {/* Timeline dot */}
                      <div className="absolute left-0 top-1 w-[11px] h-[11px] rounded-full border-2 border-[#c97e3a] bg-[#0a0a0a]" />

                      <h4 className="text-[12px] font-mono font-semibold text-[#e5e5e5] mb-3">
                        {month.month}
                      </h4>

                      <div className="space-y-3">
                        {month.events.map((event, ei) => (
                          <div key={ei}>
                            <div className="flex items-center gap-2 mb-2">
                              {event.type === "commits" ? (
                                <GitCommitHorizontal
                                  size={11}
                                  className="text-[#666]"
                                />
                              ) : (
                                <FolderPlus size={11} className="text-[#666]" />
                              )}
                              <span className="text-[11px] font-mono text-[#888]">
                                {event.description}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-x-4 gap-y-1 ml-5">
                              {event.repos.map((repo) => (
                                <a
                                  key={repo.name}
                                  href={`https://github.com/arsh342/${repo.name}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="group flex items-center gap-2 text-[10px] font-mono cursor-pointer"
                                >
                                  <span className="text-[#999] group-hover:text-[#c97e3a] transition-colors">
                                    {repo.name}
                                  </span>
                                  {"commits" in repo &&
                                    typeof repo.commits === "number" && (
                                      <span className="text-[#555]">
                                        {repo.commits} commits
                                      </span>
                                    )}
                                  {"lang" in repo &&
                                    typeof repo.lang === "string" &&
                                    repo.lang && (
                                      <span className="text-[#555]">
                                        {repo.lang}
                                      </span>
                                    )}
                                </a>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
