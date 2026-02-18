import { fetchAllGitHubData } from "@/lib/github";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // always fetch fresh data

export async function GET() {
  try {
    const data = await fetchAllGitHubData();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
      },
    });
  } catch (error) {
    console.error("GitHub API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch GitHub data" },
      { status: 500 },
    );
  }
}
