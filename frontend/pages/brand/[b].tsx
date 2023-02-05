import { HeaderFooterLayout } from "@/layouts";
import { data, pagination } from "@/types/Phones.type";
import { Spinner } from "flowbite-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Card } from "@/components";
import { phone } from "@/data";
import { useSelector } from "react-redux";

const Phone = new phone();

const Search = () => {
  const [Data, setData] = useState<data[]>([]);
  const [Pagination, setPagination] = useState<pagination>({
    page: 0,
    pageCount: 999999999999999999999,
    total: 2222222222222222222222222222,
    pageSize: 54515,
  });
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [filterUrl, setFilterUrl] = useState<string>("");

  const Router = useRouter();

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
          `/phones?populate=image&filters[brand][$containsi]=${Router.query.q}` +
          filterUrl;
        const res = await Phone.getPhones(url);
        const { data, meta } = res;
        const allData = Phone.toNormalFormatArray(data);
        setData([...allData] as unknown as data[]);
        setPagination(meta.pagination);
      }
    };
    NewFilterFetch();
  }, [filterUrl]);

  useEffect(() => {
    const DisplayNew = async () => {
      const url =
        process.env.API_URL +
        `/phones?populate=image&filters[brand][$containsi]=${Router.query.q}`;
      const res = await Phone.getPhones(url);
      const { data, meta } = res;
      const allData = Phone.toNormalFormatArray(data);
      setData([...Data, ...allData] as data[]);
      setPagination(meta.pagination);
    };

    DisplayNew();
  }, [Router.query.q]);

  if (Pagination.pageCount === 0) {
    return (
      <HeaderFooterLayout pageTitle={Router.query.q + " - Brand "}>
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-2xl font-bold">No Results Found</h1>
        </div>
      </HeaderFooterLayout>
    );
  }

  const fetchData = async () => {
    if (Pagination.page === Pagination.pageCount) {
      setHasMore(false);
    } else {
      if (filterUrl !== "") {
        const url =
          process.env.API_URL +
          `/phones?populate=image&filters[brand][$containsi]=${Router.query.q}` +
          filterUrl +
          `&pagination[page]=${Pagination.page + 1}`;
        const res = await Phone.getPhones(url);
        const { data, meta } = res;
        const allData = Phone.toNormalFormatArray(data);
        setData([...Data, ...allData] as data[]);
        setPagination(meta.pagination);
      } else {
        const url =
          process.env.API_URL +
          `/phones?populate=image&filters[brand][$containsi]=${
            Router.query.q
          }&pagination[page]=${Pagination.page + 1}`;
        const res = await Phone.getPhones(url);
        const { data, meta } = res;
        const allData = Phone.toNormalFormatArray(data);
        setData([...Data, ...allData] as data[]);
        setPagination(meta.pagination);
      }
    }
  };

  return (
    <HeaderFooterLayout pageTitle={Router.query.b + " | Brand "}>
      <h2 className="w-full bg-[#F8F8F8] pt-6 text-primary-1 font-semibold font-outfit grid grid-cols-12 text-xl">
        <span className="col-span-2"></span>
        <span className="col-span-10">
          Search: <span className="text-filter">{Router.query.b}</span>
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

export default Search;