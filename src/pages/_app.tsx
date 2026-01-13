import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { Titillium_Web } from "next/font/google";

const titilliumWeb = Titillium_Web({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-titillium",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${titilliumWeb.variable} font-sans`}>
      <Component {...pageProps} />
    </div>
  );
}
