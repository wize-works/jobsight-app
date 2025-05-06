import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar/collapsible";
import { SidebarProvider } from "@/components/sidebar/provider";
import { ThemeProvider } from "@/components/theme/provider";
import { ToastProvider } from "@/components/ui/toast";
import Header from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import Script from "next/script";
import { ClerkProvider } from "@clerk/nextjs";
import { syncUserWithDatabase } from "@/services/user";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "Wize Works - Job Site Management",
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon.ico",
        apple: "/apple-touch-icon.png",
    },
    appleWebApp: {
        statusBarStyle: "default",
        title: "Wize Works - Job Site Management",
        capable: true,
    },
    formatDetection: {
        telephone: false,
        address: false,
        email: false,
    },
    metadataBase: new URL("https://jobsight.co"),
    description: "Job Site Management Software",
};

export default async function RootLayout({ children }) {
    // Sync the user with database for authenticated users
    await syncUserWithDatabase();

    return (
        <html lang="en" suppressHydrationWarning>
            <Script src="https://kit.fontawesome.com/40c3b5129c.js" crossOrigin="anonymous" />
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex h-screen`} >
                <ClerkProvider>
                    <ThemeProvider>
                        <SidebarProvider>
                            <ToastProvider>
                                <Sidebar />
                                <div className="flex-1 flex flex-col bg-base-200 min-h-screen pb-auto">
                                    <Header />
                                    {children}
                                    <Footer />
                                </div>
                            </ToastProvider>
                        </SidebarProvider>
                    </ThemeProvider>
                </ClerkProvider>
            </body>
        </html >
    );
}
