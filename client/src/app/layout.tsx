import type { Metadata } from "next";
import { Noto_Serif, Plus_Jakarta_Sans, Alex_Brush } from "next/font/google";
import "./globals.css";

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  variable: "--font-noto-serif",
  weight: ["400", "700"],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600", "700"],
});

const alexBrush = Alex_Brush({
  subsets: ["latin"],
  variable: "--font-alex-brush",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Julian & Isabella | Our Wedding",
  description: "Join us in celebrating our special day.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${notoSerif.variable} ${plusJakarta.variable} ${alexBrush.variable}`}>
      <body className="bg-surface text-on-surface font-sans antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
