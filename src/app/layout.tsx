import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import Navbar from "./components/Navbar";
import { UserProvider } from "./providers/UseContext";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SportSee",
  description: "Sports Analytics Dashboard",
};

const faviconLinks = [
  { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
  {
    rel: "icon",
    type: "image/png",
    sizes: "32x32",
    href: "/favicon-32x32.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "16x16",
    href: "/favicon-16x16.png",
  },
];

const metaTags = [
  { name: "manifest", content: "/site.webmanifest" },
  { name: "msapplication-TileColor", content: "#da532c" },
  { name: "theme-color", content: "#ffffff" },
  { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#5bbad5" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Head>
        {faviconLinks.map((link) => (
          <link key={link.rel} {...link} />
        ))}
        {metaTags.map((tag) => (
          <meta key={tag.name || tag.rel} {...tag} />
        ))}
      </Head>
      <html lang="en" className="antialiased">
        <UserProvider>
          <body className={roboto.className}>
            <Navbar />
            {children}
          </body>
        </UserProvider>
      </html>
    </>
  );
}
