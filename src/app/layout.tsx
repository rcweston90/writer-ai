import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Writer — Get Critiqued by the Greats",
  description:
    "A writing app that lets you request critiques from famous writers. What would Hemingway say about your prose?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="h-full">{children}</body>
    </html>
  );
}
