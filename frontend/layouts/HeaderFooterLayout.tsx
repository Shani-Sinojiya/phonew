import { Footer, Header } from "@/components";
import Head from "next/head";
import { Fragment } from "react";

type props = {
  children?: React.ReactNode;
  pageTitle?: string;
};

const HeaderFooterLayout = (props: props) => {
  return (
    <Fragment>
      <Head>
        <title>
          {props.pageTitle ? props.pageTitle + " | Phonew" : "Phonew"}
        </title>
      </Head>
      <Header />
      {props.children}
      <Footer />
    </Fragment>
  );
};

export default HeaderFooterLayout;
