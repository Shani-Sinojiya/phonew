import { data } from "@/types/Phones.type";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Carousel } from "flowbite-react";
import Link from "next/link";
import BuyAtCard from "./BuyAtCard";
import CardDetail from "./Detail";
import MobileImage from "./MobileImage";
import { classNames } from "@/lib";

const Card = (props: data) => {
  return (
    <div className="w-full bg-white border rounded-lg border-[#A4A4A4] md:p-4">
      <div className="md:grid md:grid-cols-8 h-full md:gap-4">
        <Carousel
          className="md:col-span-2 h-full max-md:hidden"
          leftControl
          rightControl
        >
          {props.image?.map((img) => (
            <img
              key={img.id}
              src={process.env.API_IMAGE_URL + img.url}
              alt={img.alt ? img.alt : img.id.toString()}
              className="object-contain w-full h-full"
            />
          ))}
        </Carousel>
        <MobileImage data={props.image} />
        <div className="md:col-span-6 max-md:col-span-5 max-md:p-4">
          <hr className="max-w-[24rem] min-w-[10rem] h-[2px] mx-auto my-4 bg-[#B1BBF5] border-0 rounded md:my-10 max-md:block md:hidden" />
          <div className="grid max-md:w-full md:grid-cols-2 my-1 max-md:place-items-center md:pr-4 font-medium relative">
            <h2 className="text-2xl max-md:text-xl max-md:col-span-2 md:border-b-2 max-md:text-center">
              <span>{props.brand + " " + props.name}</span>
              <hr className="w-64 h-1 my-2 bg-[#E3E3E3] border-0 rounded max-md:block md:hidden" />
            </h2>
            <div className="max-md:absolute max-md:right-0 max-md:top-1">
              <Link href={"/phone/" + props.id}>
                <span className="max-md:block hidden float-right rounded-full cursor-pointer text-primary-1">
                  <ArrowRightIcon className="w-5 h-5" aria-hidden={"true"} />
                </span>
              </Link>
              <Link
                href={"/phone/" + props.id}
                className="md:block hidden float-right px-4 py-2 rounded-full cursor-pointer bg-[#F0F0F0] text-primary-1"
              >
                View full description
              </Link>
            </div>
          </div>
          <div className="grid md:grid-cols-6 md:gap-3 my-2 max-md:grid-cols-8">
            <CardDetail
              title="Display"
              details={
                props.display.size +
                " inch | " +
                props.display.type +
                " | " +
                props.display.PPI +
                "PPI | " +
                props.display.fps +
                "hz"
              }
            />
            <CardDetail
              title="Storage"
              details={props.hardware.ROM.join(" | ")}
            />
            <CardDetail title="RAM" details={props.hardware.RAM.join(" | ")} />
            <CardDetail
              title="Processor"
              details={
                props.hardware.processor + " " + props.hardware.processorName
              }
            />
            <CardDetail
              title="Camera"
              details={
                "Front: " +
                props.camera.front +
                " MP | Rear: " +
                props.camera.rear +
                " MP"
              }
            />
            <CardDetail
              title="Security"
              details={props.general.security?.join(" | ")}
            />
            <CardDetail
              title="Battery"
              details={props.general.battery + "mAh"}
            />
          </div>
          <div className="md:border-t-2 max-md:my-4 w-full border-primary-0/25 my-2">
            <div className="grid grid-cols-2 mt-6 rounded-full bg-[#F0F0F0] md:p-4 max-md:p-2 md:gap-2 max-md:gap-1 md:divide-x-2 max-md:divide-x-2 divide-slate-300 divide-solid">
              <div
                className={classNames(
                  "grid md:grid-cols-3 max-md:my-2 gap-4 text-center md:place-content-center justify-center items-center",
                  props.buyAt.amazon == "" || props.buyAt.flipkart == ""
                    ? "max-md:flex"
                    : "max-md:grid-cols-2 max-md:gap-2"
                )}
              >
                <h3 className="font-medium text-lg flex items-center justify-center max-md:hidden">
                  Buy at
                </h3>
                {props.buyAt.amazon == "" ? null : (
                  <BuyAtCard Icon={"Amazon"} to={props.buyAt.amazon} />
                )}
                {props.buyAt.flipkart == "" ? null : (
                  <BuyAtCard Icon={"Flipkart"} to={props.buyAt.flipkart} />
                )}
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
                    }).format(props.price)}
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
    </div>
  );
};

export default Card;
