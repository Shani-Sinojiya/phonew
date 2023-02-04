import { HeaderFooterLayout } from "@/layouts";
import {
  props,
  data,
  pagination,
  Phones,
  Imagedata,
} from "@/types/Phones.type";
import { Spinner } from "flowbite-react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Card } from "@/components";

const Search = (props: props) => {
  const [Data, setData] = useState<data[]>(props.data);
  const [Pagination, setPagination] = useState<pagination>(props.pagination);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const Router = useRouter();

  if (Pagination.pageCount === 0) {
    return (
      <HeaderFooterLayout>
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-2xl font-bold">No Results Found</h1>
        </div>
      </HeaderFooterLayout>
    );
  }

  const fetchData = async () => {
    const response = await fetch(
      process.env.API_URL +
        `/phones&filters[name][$containsi]=${Router.query.q}&pagination[page]=${
          Pagination.page + 1
        }`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + process.env.API_TOKEN,
        },
      }
    );

    const { data, meta } = await response.json();

    if (data.length == 0) {
      setHasMore(false);
    }

    const allData = data.map((data: Phones) => {
      return {
        id: data.id,
        name: data.attributes.name,
        price: data.attributes.price,
        brand: data.attributes.brand,
        display: {
          size: data.attributes.Displaysize,
          resolution: data.attributes.DisplayResolution,
          type: data.attributes.Displaytype,
          PPI: data.attributes.DisplayPPI,
          fps: data.attributes.DisplayRefreshRate,
        },
        hardware: {
          processor: data.attributes.hardwareprocessor,
          processorName: data.attributes.hardwareprocessorname,
          RAM: data.attributes.hardwareRAM,
          ROM: data.attributes.hardwareROM,
        },
        camera: {
          rear: data.attributes.camerarear,
          front: data.attributes.camerafront,
          number: data.attributes.camerano,
        },
        general: {
          os: data.attributes.OS,
          battery: data.attributes.battery,
          weight: data.attributes.weight,
          IPrating: data.attributes.IPrating,
          colours: data.attributes.colours,
          fastcharging: data.attributes.fastcharging,
          security: data.attributes.security,
          release: data.attributes.release,
        },
        buyAt: {
          amazon:
            data.attributes.buyatamazon == null
              ? ""
              : data.attributes.buyatamazon,
          flipkart:
            data.attributes.buyatflipkart == null
              ? ""
              : data.attributes.buyatflipkart,
        },
        image:
          data.attributes.image.data === null
            ? null
            : data.attributes.image.data.map((img: Imagedata) => {
                return {
                  id: img.id,
                  url: img.attributes.url,
                  alt: img.attributes.alternativeText,
                };
              }),
      };
    });

    const newData = [...Data, ...allData];
    setData(newData);

    setPagination(meta.pagination);
  };

  return (
    <HeaderFooterLayout pageTitle="Search">
      <h2 className="w-full bg-[#F8F8F8] pt-6 text-primary-1 font-semibold font-outfit grid grid-cols-12 text-xl">
        <span className="col-span-2"></span>
        <span className="col-span-10">
          Search: <span className="text-filter">{Router.query.q}</span>
        </span>
      </h2>
      <InfiniteScroll
        dataLength={Data.length}
        next={fetchData}
        hasMore={hasMore}
        loader={
          <div className="w-full mt-2 grid place-content-center">
            <Spinner color="info" aria-label="Loader" />
          </div>
        }
        className="min-h-screen grid md:gap-16 max-md:gap-4 place-content-center px-32 py-16 bg-[#F8F8F8] font-outfit max-md:p-4"
        endMessage={
          <p className="text-center text-[#8E8E8E] font-normal">
            <b>You have seen it all</b>
          </p>
        }
      >
        {Data.map((data) => (
          <Card key={data.id} {...data} />
        ))}
      </InfiniteScroll>
    </HeaderFooterLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (ctx.query.q == undefined) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const response = await fetch(
    process.env.API_URL +
      "/phones?populate=image&filters[name][$contains]=" +
      ctx.query.q,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + process.env.API_TOKEN,
      },
    }
  );

  const { data, meta } = await response.json();

  const allData = data.map((data: Phones) => {
    return {
      id: data.id,
      name: data.attributes.name,
      price: data.attributes.price,
      brand: data.attributes.brand,
      display: {
        size: data.attributes.Displaysize,
        resolution: data.attributes.DisplayResolution,
        type: data.attributes.Displaytype,
        PPI: data.attributes.DisplayPPI,
        fps: data.attributes.DisplayRefreshRate,
      },
      hardware: {
        processor: data.attributes.hardwareprocessor,
        processorName: data.attributes.hardwareprocessorname,
        RAM: data.attributes.hardwareRAM,
        ROM: data.attributes.hardwareROM,
      },
      camera: {
        rear: data.attributes.camerarear,
        front: data.attributes.camerafront,
        number: data.attributes.camerano,
      },
      general: {
        os: data.attributes.OS,
        battery: data.attributes.battery,
        weight: data.attributes.weight,
        IPrating: data.attributes.IPrating,
        colours: data.attributes.colours,
        fastcharging: data.attributes.fastcharging,
        security: data.attributes.security,
        release: data.attributes.release,
      },
      buyAt: {
        amazon:
          data.attributes.buyatamazon == null
            ? ""
            : data.attributes.buyatamazon,
        flipkart:
          data.attributes.buyatflipkart == null
            ? ""
            : data.attributes.buyatflipkart,
      },
      image:
        data.attributes.image.data === null
          ? null
          : data.attributes.image.data.map((img: Imagedata) => {
              return {
                id: img.id,
                url: img.attributes.url,
                alt: img.attributes.alternativeText,
              };
            }),
    };
  });

  return {
    props: {
      data: allData,
      pagination: meta.pagination,
    },
  };
};

export default Search;
