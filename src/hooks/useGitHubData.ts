"use client";

import { useState, useEffect } from "react";
import type {
  GitHubStats,
  LanguageStat,
  ActivityMonth,
  ContributionDay,
  CodingPatternsData,
  TrendingInterest,
} from "@/lib/github";

interface GitHubData {
  stats: GitHubStats;
  languages: LanguageStat[];
  activity: ActivityMonth[];
  mostActive: { name: string; commits: number; pushedAt: string }[];
  codingPatterns: CodingPatternsData;
  trendingInterests: TrendingInterest[];
  contributionGraph: ContributionDay[];
  repoCount: number;
  followers: number;
  avatarUrl: string;
  repoTags: string[];
  externalPRsMerged: number;
}

export function useGitHubData() {
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/github");
        if (!res.ok) throw new Error("Failed to fetch");
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading, error };
}
