import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { css } from "@shadow-panda/styled-system/css";
import { Inter } from "next/font/google";
import "./global.css";

const inter = Inter({ subsets: ["latin"] });

const combinedClassName = `${inter.className} ${css({
  height: "100%",
})}`;

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <div className={combinedClassName}>
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}
