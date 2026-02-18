import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arshdeep Singh — Software Engineer",
  description:
    "Software engineer specializing in backend and full-stack development with Java, Spring Boot, React, Next.js, and AWS. Explore projects, skills, and coding activity.",
  keywords: [
    "Arshdeep Singh",
    "arsh342",
    "software engineer",
    "full-stack developer",
    "backend developer",
    "Java",
    "Spring Boot",
    "TypeScript",
    "React",
    "Next.js",
    "AWS",
    "portfolio",
  ],
  authors: [{ name: "Arshdeep Singh", url: "https://github.com/arsh342" }],
  openGraph: {
    title: "Arshdeep Singh — Software Engineer",
    description:
      "Software engineer specializing in backend and full-stack development with Java, Spring Boot, React, Next.js, and AWS.",
    url: "https://github.com/arsh342",
    siteName: "Arshdeep Singh Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Arshdeep Singh — Software Engineer",
    description:
      "Software engineer specializing in backend and full-stack development.",
    creator: "@Thearshsran",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
