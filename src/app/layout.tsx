import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";

export const metadata: Metadata = {
  title: "toolbelt",
  description: "A toolbelt for productivity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className=" text-white bg-c1">
        <Header />
        {children}
      </body>
    </html>
  );
}