import BuyAtCard from "@/components/Card/BuyAtCard";
import CardDetail from "@/components/Card/Detail";
import MobileImage from "@/components/Card/MobileImage";
import { phone } from "@/data";
import { HeaderFooterLayout } from "@/layouts";
import { ShowMenu } from "@/redux/ShowMenu/functions";
import { Carousel, Tabs } from "flowbite-react";
import { GetServerSideProps } from "next";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

type image = {
  id: number;
  url: string;
  alt: string;
  thumbnail: string;
};

type display = {
  size: string;
  resolution: string;
  type: string;
  PPI: string;
  fps: string;
};

type hardware = {
  processor: string;
  processorName: string;
  RAM: string[];
  ROM: string[];
};

type camera = {
  rear: string;
  front: string;
  number: number;
};

type general = {
  os: string;
  battery: number;
  weight: number;
  IPrating: string;
  colours: string[];
  fastcharging: boolean;
  security: string[];
  release: string;
};

type buyAt = {
  amazon: string;
  flipkart: string;
};

type data = {
  id: number;
  name: string;
  image: image[];
  price: number;
  brand: string;
  display: display;
  hardware: hardware;
  camera: camera;
  general: general;
  buyAt: buyAt;
};

type Props = {
  data: data;
};

const PhoneClass = new phone();

const Phone = (props: Props) => {
  const { data } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ShowMenu.HideAllMenu());
  }, []);

  const ReleseDate = (d: string) => {
    const date = new Date(d);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return (
      date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear()
    );
  };
  return (
    <HeaderFooterLayout pageTitle={data.brand + " " + data.name}>
      <div className="py-8 px-32 bg-[#F8F8F8] font-outfit max-md:px-4">
        <div className="w-full bg-white border rounded-lg border-[#A4A4A4] md:p-4">
          <div className="md:grid grid-cols-8 h-full md:gap-4">
            <Carousel
              className="md:col-span-2 h-full max-md:col-span-3 max-md:hidden"
              leftControl
              rightControl
            >
              {data.image?.map((img) => (
                <img
                  key={img.id}
                  src={process.env.API_IMAGE_URL + img.url}
                  alt={data.brand + " " + data.name}
                  className="object-contain w-full h-full"
                />
              ))}
            </Carousel>
            <MobileImage data={data.image} />
            <div className="md:col-span-6 max-md:col-span-5 max-md:p-4">
              <hr className="max-w-[24rem] min-w-[10rem] h-[2px] mx-auto my-4 bg-[#B1BBF5] border-0 rounded md:my-10 max-md:block md:hidden" />
              <div className="grid max-md:w-full md:grid-cols-2 my-1 max-md:place-items-center md:pr-4 font-medium relative">
                <h2 className="text-2xl max-md:text-xl max-md:col-span-2 md:border-b-2 max-md:text-center">
                  <span>{data.brand + " " + data.name}</span>
                  <hr className="w-64 h-1 my-2 bg-[#E3E3E3] border-0 rounded max-md:block md:hidden" />
                </h2>
              </div>
              <div className="md:p-4 md:rounded-xl md:mt-4 md:bg-[#EDF1FF9C]">
                <h2 className="underline text-xl font-outfit font-normal text-[#1c1c1c] max-md:hidden">
                  Key features:
                </h2>
                <div className="grid md:grid-cols-6 md:gap-3 my-2 max-md:grid-cols-8 max-md:gap-y-2">
                  <CardDetail
                    title="Display"
                    details={
                      data.display.size +
                      " inch | " +
                      data.display.type +
                      " | " +
                      data.display.PPI +
                      "PPI | " +
                      data.display.fps +
                      "hz"
                    }
                  />
                  <CardDetail
                    title="Storage"
                    details={data.hardware.ROM.join(" | ")}
                  />
                  <CardDetail
                    title="RAM"
                    details={data.hardware.RAM.join(" | ")}
                  />
                  <CardDetail
                    title="Processor"
                    details={
                      data.hardware.processor +
                      " " +
                      data.hardware.processorName
                    }
                  />
                  <CardDetail
                    title="Camera"
                    details={
                      "Front: " +
                      data.camera.front +
                      " MP | Rear: " +
                      data.camera.rear +
                      " MP"
                    }
                  />
                  <CardDetail
                    title="Security"
                    details={data.general.security?.join(" | ")}
                  />
                  <CardDetail
                    title="Battery"
                    details={data.general.battery + "mAh"}
                  />
                </div>
              </div>
              <div className="md:border-t-2 max-md:my-4 w-full border-primary-0/25 my-2">
                <div className="grid grid-cols-2 mt-6 rounded-full bg-[#EDF1FF9C] md:p-4 max-md:p-2 md:gap-2 max-md:gap-1 md:divide-x-2 max-md:divide-x-2 divide-slate-300 divide-solid">
                  <div className="grid md:grid-cols-3 max-md:grid-cols-2 max-md:my-2 gap-4 text-center md:place-content-center">
                    <h3 className="font-medium text-lg flex items-center justify-center max-md:hidden">
                      Buy at
                    </h3>
                    <BuyAtCard Icon={"Amazon"} to={data.buyAt.amazon} />
                    <BuyAtCard Icon={"Flipkart"} to={data.buyAt.flipkart} />
                  </div>
                  <div className="grid md:grid-cols-2 gap-x-4">
                    <span className="flex md:items-center md:justify-center md:text-xl max-md:text-xs max-md:text-left max-md:ml-4 font-normal">
                      Starting at just
                    </span>
                    <span className="flex flex-col items-center justify-center relative">
                      <span className="text-primary-0 font-bold text-3xl max-md:text-2xl">
                        ₹
                        {new Intl.NumberFormat("en-IN", {
                          maximumSignificantDigits: 3,
                        }).format(data.price)}
                      </span>
                      <span className="absolute md:-bottom-1.5 max-md:-bottom-2 md:right-12 max-md:right-5 text-[#8E8E8E] md:text-sm max-md:text-[0.60rem] text-right">
                        Price may vary
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 mx-4 rounded-xl bg-[#F7F9FF]">
            <Tabs.Group
              aria-label="Tabs with underline"
              className="text-sm"
              style="underline"
            >
              <Tabs.Item title="General" active={true}>
                <div className="flex font-outfit mx-16 max-md:mx-2">
                  <div className="grid grid-cols-5 w-full">
                    <div className="font-medium text-[#515151] col-span-2">
                      <ul className="gap-4 grid">
                        <li>Brand name:</li>
                        <li>Model name:</li>
                        <li>Release date:</li>
                        <li>Weight:</li>
                        <li>IP rating:</li>
                        <li>Fast charging support:</li>
                        <li>Colours:</li>
                      </ul>
                    </div>
                    <div className="font-medium text-[#1C1C1C] col-span-3">
                      <ul className="gap-4 grid">
                        <li>{data.brand}</li>
                        <li>{data.name}</li>
                        <li>{ReleseDate(data.general.release)}</li>
                        <li>{data.general.weight}gm</li>
                        <li>IP{data.general.IPrating}</li>
                        <li>{data.general.fastcharging ? "Yes" : "No"}</li>
                        <li>{data.general.colours.join(" | ")}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Tabs.Item>
              <Tabs.Item title="Display">
                <div className="flex font-outfit mx-16 max-md:mx-2">
                  <div className="grid grid-cols-5 w-full">
                    <div className="font-medium text-[#515151] col-span-2">
                      <ul className="gap-4 grid">
                        <li>Display type:</li>
                        <li>Refresh Rate:</li>
                        <li>Screen size:</li>
                        <li>Resolution:</li>
                        <li>
                          Pixels per inch {"("}PPI{")"}:
                        </li>
                      </ul>
                    </div>
                    <div className="font-medium text-[#1C1C1C] col-span-3">
                      <ul className="gap-4 grid">
                        <li>{data.display.type}</li>
                        <li>{data.display.fps}hz</li>
                        <li>{data.display.size}inch</li>
                        <li>{data.display.resolution}</li>
                        <li>{data.display.PPI}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Tabs.Item>
              <Tabs.Item title="Hardware">
                <div className="flex font-outfit mx-16 max-md:mx-2">
                  <div className="grid grid-cols-5 w-full">
                    <div className="font-medium text-[#515151] col-span-2">
                      <ul className="gap-4 grid">
                        <li>Processor:</li>
                        <li>Processor name:</li>
                        <li>RAM:</li>
                        <li>Internal storage:</li>
                      </ul>
                    </div>
                    <div className="font-medium text-[#1C1C1C] col-span-3">
                      <ul className="gap-4 grid">
                        <li>{data.hardware.processor}</li>
                        <li>{data.hardware.processorName}</li>
                        <li>{data.hardware.RAM.join(" | ")}</li>
                        <li>{data.hardware.ROM.join(" | ")}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Tabs.Item>
              <Tabs.Item title="Camera">
                <div className="flex font-outfit mx-16 max-md:mx-2">
                  <div className="grid grid-cols-5 w-full">
                    <div className="font-medium text-[#515151] col-span-2">
                      <ul className="gap-4 grid">
                        <li>Rear camera:</li>
                        <li>Front camera:</li>
                        <li>No. of cameras</li>
                      </ul>
                    </div>
                    <div className="font-medium text-[#1C1C1C] col-span-3">
                      <ul className="gap-4 grid">
                        <li>{data.camera.rear} MP</li>
                        <li>{data.camera.front} MP</li>
                        <li>{data.camera.number}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Tabs.Item>
              <Tabs.Item title="Software">
                <div className="flex font-outfit mx-16 max-md:mx-2">
                  <div className="grid grid-cols-5 w-full">
                    <div className="font-medium text-[#515151] col-span-2">
                      <ul className="gap-4 grid">
                        <li>Operating system:</li>
                      </ul>
                    </div>
                    <div className="font-medium text-[#1C1C1C] col-span-3">
                      <ul className="gap-4 grid">
                        <li>{data.general.os}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Tabs.Item>
            </Tabs.Group>
          </div>
          <span className="text-xs mx-4 text-gray-400">
            {"*"}For more specs and details visit store.
          </span>
        </div>
      </div>
    </HeaderFooterLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const res = await PhoneClass.getPhone(
    process.env.API_URL + "/phones/" + ctx.query.id + "?populate=image,brand"
  );
  if (res.error) {
    return {
      notFound: true,
    };
  }
  const { data } = res;
  return {
    props: {
      data,
    },
  };
};

export default Phone;
