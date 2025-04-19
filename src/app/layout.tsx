import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
// import BottomNav from "@/components/BottomNav";
import Footer from '@/components/Footer';
import Script from 'next/script';
import { Toaster } from 'react-hot-toast';

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Propyto",
  description: "Your trusted property partner",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link 
          rel="stylesheet" 
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" 
        />
      </head>
      <body className={inter.className}>
        {/* Facebook SDK */}
        <Script
          id="facebook-jssdk"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              window.fbAsyncInit = function() {
                FB.init({
                  appId: 'YOUR_FACEBOOK_APP_ID', // Replace with your Facebook App ID
                  cookie: true,
                  xfbml: true,
                  version: 'v18.0'
                });
              };

              (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s);
                js.id = id;
                js.src = "https://connect.facebook.net/en_US/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
              }(document, 'script', 'facebook-jssdk'));
            `,
          }}
        />
        
        {/* Google OAuth */}
        <Script
          src="https://accounts.google.com/gsi/client"
          strategy="lazyOnload"
        />
        
        <Header />
        <main className="min-h-screen pt-16">
          {children}
        </main>
        <Footer />
        {/* <BottomNav /> */}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
