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
  title: "Mock Interviews & Residency Interview Coaching | Ex-Program Directors | 95% Match Rate",
  description: "Master your residency interviews with realistic mock interviews and expert coaching from ex-program directors who conducted 1,000+ interviews. Personalized feedback, proven techniques, and comprehensive preparation. 95% match rate. Virtual sessions available. Packages from $499.",
  applicationName: "ResidencyInterviewPrep",
  metadataBase: new URL('https://www.residencyinterviewprep.com'),
  
  // Open Graph metadata for social sharing
  openGraph: {
    title: "Mock Interviews & Residency Interview Coaching by Ex-Program Directors",
    description: "Master your residency interviews with realistic mock interviews and expert coaching. Led by ex-program directors. Personalized feedback and proven techniques. 95% match rate.",
    url: "https://www.residencyinterviewprep.com",
    siteName: "ResidencyInterviewPrep",
    determiner: "the",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ResidencyInterviewPrep Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  
  // Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    title: "Mock Interviews & Residency Interview Coaching",
    site: "@residencyintprep",
    creator: "@residencyintprep",
    description: "Master your residency interviews with realistic mock interviews by ex-program directors. 95% match rate. Virtual sessions available.",
    images: ["https://www.residencyinterviewprep.com/twitter-image.png"],
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
  keywords: [
    "mock interview residency",
    "residency mock interviews",
    "residency interview coaching",
    "medical residency interview preparation",
    "program director interview coaching",
    "ex program director coaching",
    "virtual mock interviews",
    "IMG interview coaching",
    "residency interview practice",
    "mock interview medical residency",
    "residency match interview prep",
    "online residency mock interviews",
    "best residency interview coaching",
    "residency interview tips",
    "medical interview coaching",
    "ERAS interview preparation",
    "residency interview questions",
    "how to prepare for residency interview",
    "competitive specialty interview prep",
    "dermatology interview coaching",
    "surgery interview prep",
    "internal medicine interview coaching"
  ],
  authors: [{ name: "ResidencyInterviewPrep Team", url: "https://www.residencyinterviewprep.com/about" }],
  creator: "ResidencyInterviewPrep",
  publisher: "ResidencyInterviewPrep",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://www.residencyinterviewprep.com",
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
