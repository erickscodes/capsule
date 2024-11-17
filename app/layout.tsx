import type { Metadata } from "next";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import "./globals.css";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"], // Specify the font weights you need
  subsets: ["latin"], // Specify the character subsets you need
  display: "swap", // Optional: Use 'swap' for faster loading
});

export const metadata: Metadata = {
  title: "Capsule",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${poppins.className} antialiased`}>
          <header className="h-[60px] bg-[#14b8a6] items-center flex justify-between p-4">
            <div className="text-2xl text-white font-semibold">
              <h1>Capsule</h1>
            </div>
            <div>
              <SignedOut>
                <Button asChild>
                  <SignInButton />
                </Button>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </header>
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
