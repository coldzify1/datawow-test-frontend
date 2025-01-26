import { UserProvider } from "@/contexts/UserContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Castoro, IBM_Plex_Sans_Thai, Inter } from "next/font/google";

const IbmSansThaiNormal = IBM_Plex_Sans_Thai({
  weight: ["400","600","700"],
  variable: "--font-ibm-normal",
  subsets: ["latin"],
});

const interFont = Inter({
  variable: "--font-inter"
})

const castoro = Castoro({
  weight: ["400"],
  variable: "--font-castoro",
})


export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <div className={`${IbmSansThaiNormal.variable} ${interFont.variable} ${interFont.className} ${castoro.variable}`}>
        <Component {...pageProps} />
      </div>

    </UserProvider>
  );
}
