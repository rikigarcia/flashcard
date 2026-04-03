import type { Metadata } from "next";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  Show,
  UserButton,
} from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Poppins } from "next/font/google";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Flashy Cardy Course",
  description: "Learn with interactive flashcards",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${poppins.variable}`}>
      <body className="antialiased font-sans">
        <ClerkProvider
          appearance={{
            baseTheme: dark,
          }}
        >
          <header className="border-b border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-4">
                <h1 className="text-xl font-semibold">Flashy Cardy Course</h1>
                <div className="flex items-center gap-4">
                  <Show when="signed-out">
                    <SignInButton mode="modal" fallbackRedirectUrl="/dashboard">
                      <Button variant="default" size="default">
                        Sign In
                      </Button>
                    </SignInButton>
                    <SignUpButton mode="modal" fallbackRedirectUrl="/dashboard">
                      <Button variant="secondary" size="default">
                        Sign Up
                      </Button>
                    </SignUpButton>
                  </Show>
                  <Show when="signed-in">
                    <UserButton />
                  </Show>
                </div>
              </div>
            </div>
          </header>
          {children}
          <Toaster />
        </ClerkProvider>
      </body>
    </html>
  );
}
