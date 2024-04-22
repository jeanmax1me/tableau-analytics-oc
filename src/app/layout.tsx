/**
 * Interface type imported from Next.js for website metadata.
 */
import type { Metadata } from "next";

/**
 * Imports the Roboto font from Next.js font library with desired weight, subsets, and display options.
 */
import { Roboto } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import { UserProvider } from "./providers/UseContext";

/**
 * Defines a custom font object using the Roboto font family.
 */
const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

/**
 * Defines website metadata object for SEO and branding purposes.
 * 
 * @type {Metadata}
 */
export const metadata: Metadata = {
  title: "SportSee",
  description: "Sports Analytics Dashboard",
};

/**
 * Defines an array of link elements for various favicon sizes.
 * 
 * @type {JSX.Element[]}
 */
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

/**
 * Defines an array of meta tags for various website configuration options.
 * 
 * @type {JSX.Element[]}
 */
const metaTags = [
  { name: "manifest", content: "/site.webmanifest" },
  { name: "msapplication-TileColor", content: "#da532c" },
  { name: "theme-color", content: "#ffffff" },
  { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#5bbad5" },
];

/**
 * Root layout component that wraps child components and provides global styles and context.
 * 
 * @param {object} props - Component properties
 * @param {React.ReactNode} props.children - Child components to be rendered within the layout.
 * 
 * @returns {JSX.Element} - The RootLayout component.
 */
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
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
            {children}
          </body>
        </UserProvider>
      </html>
    </>
  );
}
