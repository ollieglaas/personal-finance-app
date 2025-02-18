import type { Metadata } from "next";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/Sidebar/AppSidebar";
import PageTitle from "@/components/PageTitle";
import localFont from "next/font/local";
import DataFetcher from "@/components/DataFetch";
import { Toaster } from "@/components/ui/toaster";

const publicSans = localFont({
  src: "./../assets/fonts/PublicSans-VariableFont_wght.ttf",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${publicSans.className}  antialiased debug-screens`}>
        <DataFetcher />
        <SidebarProvider>
          <AppSidebar />
          <div className="pl-8 pb-8 pr-8 w-full">
            <PageTitle />
            {children}
          </div>
          <Toaster />
        </SidebarProvider>
      </body>
    </html>
  );
}
