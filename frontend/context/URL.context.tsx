import { createContext } from "react";

interface UrlContext {
  URL: string;
  setURL: (value: string) => void;
}

const URLContext = createContext({} as UrlContext);

export default URLContext;
