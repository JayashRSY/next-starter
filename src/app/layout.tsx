import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Header from "@/components/Header";
import ClientProviders from "@/providers/ClientProviders";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wealth Wings",
  description: "Your personal finance assistant",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientProviders>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Header />
            <div className="flex">
              <main className="flex-1 bg-background">{children}</main>
            </div>
            <Toaster position="top-right" />
          </ThemeProvider>
        </ClientProviders>
      </body>
    </html>
  );
}
