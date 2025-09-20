import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ["latin"],
  display: 'swap',
  variable: "--font-poppins",
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#ffffff',
};

export const metadata: Metadata = {
  title: "MyERAS Editing - Expert ERAS Application Review Service",
  description: "Professional ERAS application review by physicians who successfully matched. Personal statements, CV optimization, experience descriptions. 95% match rate.",
  applicationName: "MyERAS Editing",
  metadataBase: new URL('https://www.myerasediting.com'),
  
  // Open Graph metadata for social sharing
  openGraph: {
    title: "MyERAS Editing",
    description: "Expert ERAS application review by physicians who successfully matched. Personal statements, CV optimization, letters of recommendation. 95% match rate.",
    url: "https://www.myerasediting.com",
    siteName: "MyERAS Editing",
    determiner: "the",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MyERAS Editing Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  
  // Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    title: "MyERAS Editing",
    site: "@myerasreviewer",
    creator: "@myerasreviewer",
    description: "Expert ERAS application review by physicians. Personal statements, CV, letters of recommendation. 95% match rate.",
    images: ["https://www.myerasediting.com/twitter-image.png"],
  },
  
  // Icons configuration
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-64x64.png", sizes: "64x64", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png" },
      { url: "/apple-icon-57x57.png", sizes: "57x57", type: "image/png" },
      { url: "/apple-icon-60x60.png", sizes: "60x60", type: "image/png" },
      { url: "/apple-icon-72x72.png", sizes: "72x72", type: "image/png" },
      { url: "/apple-icon-76x76.png", sizes: "76x76", type: "image/png" },
      { url: "/apple-icon-114x114.png", sizes: "114x114", type: "image/png" },
      { url: "/apple-icon-120x120.png", sizes: "120x120", type: "image/png" },
      { url: "/apple-icon-144x144.png", sizes: "144x144", type: "image/png" },
      { url: "/apple-icon-152x152.png", sizes: "152x152", type: "image/png" },
      { url: "/apple-icon-180x180.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/apple-icon-180x180.png",
      },
    ],
  },
  
  // PWA manifest
  manifest: "/site.webmanifest",

  // Additional metadata for branding
  keywords: ["MyERAS Editing", "MyERAS Editing", "ERAS application review", "residency personal statement", "ERAS CV review", "medical residency application", "ERAS experience descriptions", "letters of recommendation review"],
  authors: [{ name: "MyERAS Editing Team", url: "https://www.myerasediting.com/about" }],
  creator: "MyERAS Editing",
  publisher: "MyERAS Editing",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://www.myerasediting.com",
  },
  
  // Robots configuration
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
  // Verification tags (add your actual verification codes when you have them)
  // verification: {
  //   google: "your-google-verification-code",
  //   yandex: "your-yandex-verification-code",
  //   yahoo: "your-yahoo-verification-code",
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} font-sans antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
