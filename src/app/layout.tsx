import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import { FirebaseAuthProvider } from "@/components/providers/FirebaseAuthContext";

export const metadata: Metadata = {
  title: "ResumeAI - ATS Resume Scanner & Builder",
  description: "Build ATS-optimized resumes, check your ATS score, and get AI-powered suggestions to land more interviews.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <FirebaseAuthProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 lg:ml-[260px] p-4 lg:p-8">
              {children}
            </main>
          </div>
        </FirebaseAuthProvider>
      </body>
    </html>
  );
}
