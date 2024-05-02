import { SessionProvider } from "next-auth/react";
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
}) {
  return (
    <SessionProvider session={session}>
      <div className={combinedClassName}>
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}
