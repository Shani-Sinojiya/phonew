import Head from "next/head";
import { Footer, Header } from "@/components";
import { Fragment, useEffect, useRef } from "react";

type props = {
  children?: React.ReactNode;
  pageTitle?: string;
};

const HeaderFooterLayout = (props: props) => {
  const ScrollToTopRef = useRef<HTMLDivElement>(null);

  const ValueOFPageYOffset = useRef(0);

  const handleScrollToTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.pageYOffset > 100 &&
        ScrollToTopRef.current?.classList.contains("hidden")
      ) {
        ScrollToTopRef.current?.classList.add("block");
        ScrollToTopRef.current?.classList.remove("hidden");
      } else if (
        window.pageYOffset < 100 &&
        !ScrollToTopRef.current?.classList.contains("hidden")
      ) {
        ScrollToTopRef.current?.classList.add("hidden");
        ScrollToTopRef.current?.classList.remove("block");
      }
      ValueOFPageYOffset.current = window.pageYOffset;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Fragment>
      <Head>
        <title>
          {props.pageTitle ? props.pageTitle + " | Phonew" : "Phonew"}
        </title>
      </Head>
      <Header />
      <div className="containt pt-32">{props.children}</div>
      <div
        className="scroll-to-top fixed bottom-10 right-10 max-md:right-2.5 max-md:bottom-2.5 transition-all duration-300 ease-in-out hidden"
        ref={ScrollToTopRef}
      >
        <button
          type="button"
          className="inline-block p-3 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out bottom-5 right-5"
          onClick={handleScrollToTop}
        >
          <svg
            aria-hidden="true"
            focusable="false"
            className="w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path
              fill="currentColor"
              d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"
            ></path>
          </svg>
        </button>
      </div>

      <Footer />
    </Fragment>
  );
};

export default HeaderFooterLayout;
