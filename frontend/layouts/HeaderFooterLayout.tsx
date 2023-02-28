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
      <div className="containt pt-36">{props.children}</div>
      <Footer />
    </Fragment>
  );
};

export default HeaderFooterLayout;
