import { Footer, Header } from "@/components";
import FilterContextProvider from "@/context/Filter.context.provider";
import Head from "next/head";

type props = {
  children?: React.ReactNode;
  pageTitle?: string;
};

const HeaderFooterLayout = (props: props) => {
  return (
    <FilterContextProvider>
      <Head>
        <title>
          {props.pageTitle ? props.pageTitle + " | Phonew" : "Phonew"}
        </title>
      </Head>
      <Header />
      {props.children}
      <Footer />
    </FilterContextProvider>
  );
};

export default HeaderFooterLayout;
