import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { Titillium_Web } from "next/font/google";
import Script from "next/script";

import { LanguageProvider } from "@/context/LanguageContext";

const googleTagId = "AW-18224201365";

const titilliumWeb = Titillium_Web({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-titillium",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${googleTagId}`}
        strategy="afterInteractive"
      />
      <Script id="google-tag" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${googleTagId}');
        `}
      </Script>
      <LanguageProvider>
        <div className={`${titilliumWeb.variable} font-sans`}>
          <Component {...pageProps} />
        </div>
      </LanguageProvider>
    </>
  );
}
