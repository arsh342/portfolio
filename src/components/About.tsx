"use client";

import { SectionHeader } from "./ui/SectionHeader";
import { Card } from "./ui/Card";
import { profile } from "@/data/profile";

export function About() {
  return (
    <section>
      <SectionHeader title="About" />
      <Card className="!p-8">
        <p className="text-[13px] leading-[1.9] text-[#999] font-mono tracking-wide">
          {profile.about}
        </p>
      </Card>
    </section>
  );
}
