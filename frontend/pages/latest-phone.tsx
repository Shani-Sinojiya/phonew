import { Card } from "@/components";
import { phone } from "@/data";
import { HeaderFooterLayout } from "@/layouts";
import type { data, pagination, props } from "@/types/Phones.type";
import { Spinner } from "flowbite-react";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";

const Phone = new phone();

const LatestPhones = (props: props) => {
  const InfiniteScrollvalue = () => {
    const [Data, setData] = useState<data[]>(props.data);
    const [Pagination, setPagination] = useState<pagination>(props.pagination);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [filterUrl, setFilterUrl] = useState<string>("");

    const { url } = useSelector(
      (state: {
        filter: {
          ramFilter: string[];
          romFilter: string[];
          processorFilter: string[];
          cameraFilter: string[];
          url: string;
        };
      }) => state.filter
    );

    useEffect(() => {
      setFilterUrl(url);
    }, [url]);

    useEffect(() => {
      const NewFilterFetch = async () => {
        if (filterUrl !== "") {
          const url =
            process.env.API_URL +
            `/phones?populate=image,brand&sort[0]=release:desc${filterUrl}`;
          const res = await Phone.getPhones(url);
          const { data, meta } = res;
          const allData = Phone.toNormalFormatArray(data);
          setData([...allData] as unknown as data[]);
          setPagination(meta.pagination);
        }
      };
      NewFilterFetch();
    }, [filterUrl]);

    const fetchData = async () => {
      if (Pagination.page === Pagination.pageCount) {
        setHasMore(false);
      } else {
        if (filterUrl !== "") {
          const url =
            process.env.API_URL +
            `/phones?populate=image,brand&sort[0]=release:desc${filterUrl}` +
            `&pagination[page]=${Pagination.page + 1}`;
          const res = await Phone.getPhones(url);
          const { data, meta } = res;
          const allData = Phone.toNormalFormatArray(data);
          setData([...Data, ...allData] as data[]);
          setPagination(meta.pagination);
        } else {
          const response = await Phone.getPhones(
            process.env.API_URL +
              `/phones?sort[0]=release:desc&populate=image,brand&pagination[page]=${
                Pagination.page + 1
              }`
          );
          const { data, meta } = await response;
          const allData = Phone.toNormalFormatArray(data);
          const newData = [...Data, ...allData];
          setData(newData as data[]);
          setPagination(meta.pagination);
        }
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
      >
        {Data.map((data) => (
          <Card key={data.id} {...data} />
        ))}
      </InfiniteScroll>
    );
  };

  return (
    <HeaderFooterLayout pageTitle="Latest Phones">
      <InfiniteScrollvalue />
    </HeaderFooterLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const response = await Phone.getPhones(
    process.env.API_URL + "/phones?populate=image,brand&sort[0]=release:desc"
  );
  const { data, meta } = await response;
  const allData = Phone.toNormalFormatArray(data);
  return {
    props: {
      data: allData,
      pagination: meta.pagination,
    },
  };
};

export default LatestPhones;
