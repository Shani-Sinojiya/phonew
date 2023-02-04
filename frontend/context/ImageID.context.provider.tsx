import { ReactNode, useEffect, useState } from "react";
import ImageID from "@/context/ImageID.context";

function ImageIDProvider(props: { children: ReactNode }) {
  const [ImageIdArray, setImageIdArray] = useState<number[]>([]);

  return (
    <ImageID.Provider value={{ ImageIdArray, setImageIdArray }}>
      {props.children}
    </ImageID.Provider>
  );
}

export default ImageIDProvider;
