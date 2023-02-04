import { ReactNode, useState } from "react";
import URLContext from "./URL.context";

type props = {
  children?: ReactNode;
  URL?: string;
};

const URLContextProvider = (props: props) => {
  const [URL, setURL] = useState<string>(props.URL ? props.URL : "");

  return (
    <URLContext.Provider value={{ URL, setURL }}>
      {props.children}
    </URLContext.Provider>
  );
};

export default URLContextProvider;
