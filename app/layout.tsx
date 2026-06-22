import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shivansh Malik — Designer & Developer",
  description:
    "Portfolio of Shivansh Malik — 3D Designer, Web & App Designer, and Web Developer.",
  openGraph: {
    title: "Shivansh Malik — Designer & Developer",
    description: "3D Designer · Web & App Designer · Developer",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-black text-white antialiased">{children}</body>
    </html>
  );
}
