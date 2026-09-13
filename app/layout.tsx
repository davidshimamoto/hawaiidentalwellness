import type { Metadata } from "next";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SiteInteractions from "@/components/SiteInteractions";
import "./globals.css";

const SITE_URL = "https://hawaiidentalwellness.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Hawaii Dental Wellness - Your Smile, Our Aloha",
    template: "%s - Hawaii Dental Wellness",
  },
  icons: {
    icon: "/images/cropped-Hawaii-Dental-Wellness-Icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&family=Meow+Script&display=swap"
          rel="stylesheet"
        />
        {/* Google Analytics */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-QJQK353CZ2" strategy="afterInteractive" />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-QJQK353CZ2');
          `}
        </Script>
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
        <SiteInteractions />
      </body>
    </html>
  );
}
