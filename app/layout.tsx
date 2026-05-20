import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mental Health & Wellbeing",
  description: "Evidence-based exercises, CBT tools, and research-backed education for your mental wellness. Track mood, journal, and build healthy habits.",
  openGraph: {
    title: "Mental Health & Wellbeing",
    description: "Evidence-based exercises, CBT tools, and research-backed education for your mental wellness.",
    url: "https://mental-health-wellness-app-delta.vercel.app",
    siteName: "Mental Health & Wellbeing",
    images: [
      {
        url: "/app-dashboard.png",
        width: 1600,
        height: 900,
        alt: "Mental Health & Wellbeing App Dashboard",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mental Health & Wellbeing",
    description: "Evidence-based exercises, CBT tools, and research-backed education for your mental wellness.",
    images: ["/app-dashboard.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white">
        {children}
      </body>
    </html>
  );
}
