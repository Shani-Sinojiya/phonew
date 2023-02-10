import { useState } from "react";

const MobileImage = (props: {
  data: { id: number; url: string; alt: string | null }[] | null;
}) => {
  const [image, setImage] = useState<{
    id: number;
    url: string;
    alt: string | null;
  }>(props.data ? props.data[0] : { id: 0, url: "", alt: "" });

  const ChengImageHendler = (data: {
    id: number;
    url: string;
    alt: string | null;
  }) => {
    setImage(data);
  };

  return (
    <div className="md:hidden w-full relative">
      <div className="flex justify-center my-2">
        <img
          src={process.env.API_IMAGE_URL + image.url}
          alt={image.alt ? image.alt : image.id.toString()}
          className="w-auto h-[30rem] rounded"
        />
      </div>
      <div className="mx-4 my-2 absolute top-0">
        <ul className="gap-1 grid">
          {props.data?.map((img) => (
            <li
              key={img.id}
              className="border-2 border-[#4468E954] cursor-pointer rounded w-14 h-20"
              onClick={() => ChengImageHendler(img)}
            >
              <img
                src={process.env.API_IMAGE_URL + img.url}
                alt={img.alt ? img.alt : img.id.toString()}
                className="object-cover w-full h-full rounded"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MobileImage;
