import { Outfit } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import { auth } from "@/auth";
import { AuthProvider } from "@/shared/AuthProvider";
import { ContextProvider } from "@/shared/ContextProvider";

// Import Outfit font
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-outfit",
});

export const metadata = {
  title: "TodoList",
  description: "Track your day",
};

export default async function RootLayout({ children }) {
  const session = await auth();
  return (
    <html lang="en">
      <body className={`${outfit.className} antialiased`}>
        <ContextProvider>
          <AuthProvider session={session}>
            <section className="w-full min-h-screen h-full flex justify-center">
              <div className="">
                <Navbar />
              </div>
              <div className="mt-[5rem] w-full">{children}</div>
            </section>
            <Toaster position="top-right" reverseOrder={false} />
          </AuthProvider>
        </ContextProvider>
      </body>
    </html>
  );
}
