import { HeaderFooterLayout } from "@/layouts";
import { data, pagination } from "@/types/Phones.type";
import { Spinner } from "flowbite-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Card } from "@/components";
import { phone } from "@/data";
import { useDispatch, useSelector } from "react-redux";
import { ShowMenu } from "@/redux/ShowMenu/functions";

const Phone = new phone();

const Search = () => {
  const [Data, setData] = useState<data[]>([]);
  const [Pagination, setPagination] = useState<pagination>({
    page: 1,
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

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ShowMenu.HideAllMenu());
  }, []);

  useEffect(() => {
    setFilterUrl(url);
  }, [url]);

  useEffect(() => {
    const NewFilterFetch = async () => {
      if (filterUrl !== "") {
        const url =
          process.env.API_URL +
          `/phones?populate=image&filters[name][$containsi]=${Router.query.q}` +
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
        `/phones?populate=image&filters[name][$containsi]=${Router.query.q}`;
      const res = await Phone.getPhones(url);
      const { data, meta } = res;
      const allData = Phone.toNormalFormatArray(data);
      setData([...Data, ...allData] as data[]);
      setPagination(meta.pagination);
    };

    DisplayNew();
  }, [Router.query.q]);

  const fetchData = async () => {
    if (Pagination.page === Pagination.pageCount) {
      setHasMore(false);
    } else {
      if (filterUrl !== "") {
        const url =
          process.env.API_URL +
          `/phones?populate=image&filters[name][$containsi]=${Router.query.q}` +
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
          `/phones?populate=image&filters[name][$containsi]=${
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
    <HeaderFooterLayout pageTitle={Router.query.q + " - Search"}>
      {Pagination.pageCount === 0 ? (
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-2xl font-bold">No Results Found</h1>
        </div>
      ) : (
        <>
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
            className="grid md:gap-16 max-md:gap-4 place-content-center px-32 py-16 bg-[#F8F8F8] font-outfit max-md:p-4"
          >
            {Data.map((data) => (
              <Card key={data.id} {...data} />
            ))}
          </InfiniteScroll>
        </>
      )}
    </HeaderFooterLayout>
  );
};

export default Search;
