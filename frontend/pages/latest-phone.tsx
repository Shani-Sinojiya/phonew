import { Card } from "@/components";
import FilterContext from "@/context/Filter.context";
import FilterContextProvider from "@/context/Filter.context.provider";
import { HeaderFooterLayout } from "@/layouts";
import type {
  data,
  Imagedata,
  pagination,
  Phones,
  props,
} from "@/types/Phones.type";
import { Spinner } from "flowbite-react";
import { GetServerSideProps } from "next";
import { useContext, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const Home = (props: props) => {
  const InfiniteScrollvalue = () => {
    const { RAM, ROM, Battery, Camera, Network, Processor, submit } =
      useContext(FilterContext);
    const [Data, setData] = useState<data[]>(props.data);
    const [Pagination, setPagination] = useState<pagination>(props.pagination);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const fetchData = async () => {
      const response = await fetch(
        process.env.API_URL +
          `/phones&pagination[page]=${
            Pagination.page + 1
          }&sort[0]=release:desc`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + process.env.API_TOKEN,
          },
        }
      );

      const { data, meta } = await response.json();

      if (Pagination.page == Pagination.pageCount) {
        setHasMore(false);
      }
      if (data == null || data.length == 0) {
        setHasMore(false);
      } else {
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
      }
    };

    return (
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
    );
  };

  return (
    <FilterContextProvider>
      <HeaderFooterLayout pageTitle="Home">
        <InfiniteScrollvalue />
      </HeaderFooterLayout>
    </FilterContextProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const response = await fetch(
    process.env.API_URL + "/phones?populate=image&sort[0]=release:desc",
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

export default Home;
