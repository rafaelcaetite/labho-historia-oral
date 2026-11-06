import type { Metadata } from "next";
import { Newsreader, Inter_Tight } from "next/font/google";
import "./globals.css";

import { cms } from "@/lib/cms";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { VideoModal } from "@/components/video-modal";
import { CustomCursor } from "@/components/custom-cursor";
import { SmoothScroll } from "@/components/smooth-scroll";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--serif",
  display: "swap",
  style: ["normal", "italic"],
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--sans",
  display: "swap",
  weight: ["400", "500", "600"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await cms.getSiteSettings();
  return {
    title: {
      default: settings.siteName,
      template: `%s · ${settings.siteName}`,
    },
    description: settings.slogan,
    icons: {
      icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='16' fill='%23975428'/%3E%3Cpath d='M9 11h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-8l-5 4v-4H9a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2z' fill='%23E1DFD5'/%3E%3C/svg%3E",
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await cms.getSiteSettings();

  return (
    <html lang="pt-BR" className={`${newsreader.variable} ${interTight.variable}`}>
      <body className="antialiased">
        <a className="skip" href="#main">
          Pular para o conteúdo
        </a>
        <Nav siteName={settings.siteName} />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer settings={settings} />
        <VideoModal />
        <CustomCursor />
        <SmoothScroll />
      </body>
    </html>
  );
}
