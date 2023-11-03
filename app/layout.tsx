import "@/styles/globals.css";

import { Inter } from "next/font/google";

const inter = Inter({ display: "swap", subsets: ["latin"] });

export const metadata = {
  title: "Semantec",
  description: "Semantec data visualization POC",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} bg-green-dark-jungle h-full`}>
        {children}
      </body>
    </html>
  );
}
