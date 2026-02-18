"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { TechStack } from "@/components/TechStack";
import { Projects } from "@/components/Projects";
import { Insights } from "@/components/Insights";
import { Skills } from "@/components/Skills";
import { CodingPatterns } from "@/components/CodingPatterns";
import { Footer } from "@/components/Footer";
import { LoadingScreen } from "@/components/LoadingScreen";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {!loaded && <LoadingScreen onFinished={() => setLoaded(true)} />}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12"
      >
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <Insights />
        <Skills />
        <CodingPatterns />
        <Footer />
      </motion.div>
    </main>
  );
}
