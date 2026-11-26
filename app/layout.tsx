import type { Metadata } from "next";
import { Marcellus, Newsreader, Inter_Tight } from "next/font/google";
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
  weight: ["400", "500"],
});

const marcellus = Marcellus({
  subsets: ["latin"],
  variable: "--display",
  display: "swap",
  weight: "400",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await cms.getSiteSettings();
  return {
    title: {
      default: settings.siteName,
      template: `%s · ${settings.siteName}`,
    },
    description: settings.slogan,
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await cms.getSiteSettings();

  return (
    <html lang="pt-BR" className={`${newsreader.variable} ${interTight.variable} ${marcellus.variable}`}>
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
