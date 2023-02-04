import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import ProgressBar from "@badrap/bar-of-progress";
import Router from "next/router";

const progress = new ProgressBar({
  size: 4,
  className: "z-50 bg-gredient-to-r from-blue-400 to-blue-500",
  delay: 100,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session} basePath="/api/auth">
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default App;
