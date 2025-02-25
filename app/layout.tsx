"use client";
import PrivyProviderWrapper from "@/components/PrivyProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/stories/Navbar";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { loadDevMessages, loadErrorMessages } from "@apollo/client/dev";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_INDEXER_URL,
  cache: new InMemoryCache(),
});

//TODO I fought the law
// if (process.env.NODE_ENV !== "development") {
// Adds messages only in a dev environment
loadDevMessages();
loadErrorMessages();
// }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PrivyProviderWrapper>
            <ApolloProvider client={client}>
              <Navbar />
              {children}
            </ApolloProvider>
          </PrivyProviderWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
