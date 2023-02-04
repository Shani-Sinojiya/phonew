import { createContext } from "react";

const ImageID = createContext({
  ImageIdArray: [] as number[],
  setImageIdArray: (value: number[]) => {},
});

export default ImageID;
