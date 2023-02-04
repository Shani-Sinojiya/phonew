import { AdminHeader } from "@/components";
import { AdminLayout } from "@/layouts";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useState } from "react";
import { phoneMetadata } from "@/types/phones";
import type { props, pagination, data } from "@/types/manage-data.types";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { Pagination } from "flowbite-react";
import Head from "next/head";

const ManageData = (props: props) => {
  const Router = useRouter();
  const [data, setData] = useState<data[]>(props.data);
  const [pagination, setPagination] = useState<pagination>(props.pagination);

  const hendleFetch = async (page: number = 1) => {
    const res = await fetch(
      process.env.API_URL +
        "/phones?populate=image&fields[0]=name&fields[1]=release&pagination[pageSize]=27" +
        "&pagination[page]=" +
        page,
      {
        headers: {
          Authorization: "Bearer " + process.env.API_TOKEN,
        },
      }
    );
    const data = await res.json();

    const allPhones = data.data.map((phone: phoneMetadata) => {
      const image =
        phone.attributes.image.data == null
          ? ([] as string[])
          : phone.attributes.image.data.map(
              (image) => image.attributes.formats.thumbnail.url
            );
      return {
        id: phone.id,
        phonename: phone.attributes.name,
        updateAt: phone.attributes.release,
        image: image[0],
      };
    });
    setData(allPhones);
    setPagination(data.meta.pagination);
  };

  const handleEdit = async (id: number) => {
    Router.push("/admin/phone/edit/" + id);
  };

  const handlePageChange = async (page: number) => {
    hendleFetch(page);
  };

  const handleDelete = async (id: number) => {
    const tost = toast.loading("Deleting...");
    const res = await fetch(process.env.API_URL + "/phones/" + id, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + process.env.API_TOKEN,
      },
    });
    const data = await res.json();
    if (data) {
      toast.update(tost, {
        render: "Deleted",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
    } else {
      toast.update(tost, {
        render: "Error",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
    hendleFetch();
  };

  return (
    <AdminLayout>
      <AdminHeader />
      <div className="max-w-full bg-[#F8F8F8] min-h-screen py-8">
        <div className="grid grid-cols-3 mx-16 max-md:grid-cols-2 max-sm:grid-cols-1 gap-4">
          {data.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md p-4">
              <div className="flex justify-between">
                <div className="flex items-center">
                  <img
                    src={
                      item.image === undefined
                        ? "/no_image_found.png"
                        : process.env.API_IMAGE_URL + item.image
                    }
                    alt={item.phonename}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="ml-4">
                    <h1 className="text-lg font-outfit font-medium">
                      {item.phonename}
                    </h1>
                    <p className="text-sm text-gray-500 font-outfit font-normal">
                      Update At: {item.updateAt}
                    </p>
                  </div>
                </div>
                <div className="grid xl:flex lg:items-center max-sm:!flex max-sm:!items-center">
                  <button
                    className="bg-[#F8F8F8] text-blue-500 rounded-lg p-2 mr-2"
                    title="Edit"
                    onClick={() => handleEdit(item.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                  </button>
                  <button
                    className="bg-[#F8F8F8] text-red-500 rounded-lg p-2"
                    title="Delete"
                    onClick={() => handleDelete(item.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Head>
          <title>Manage Data | Admin - Phonew</title>
        </Head>
        <div className="flex justify-center text-center items-center w-screen my-8">
          <Pagination
            currentPage={pagination.page}
            showIcons={true}
            totalPages={pagination.pageCount}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </AdminLayout>
  );
};

export default ManageData;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  if (!session) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }

  const res = await fetch(
    process.env.API_URL +
      "/phones?populate=image&fields[0]=name&fields[1]=release&pagination[pageSize]=27",
    {
      headers: {
        Authorization: "Bearer " + process.env.API_TOKEN,
      },
    }
  );

  const data = await res.json();

  const allPhones = data.data.map((phone: phoneMetadata) => {
    const image =
      phone.attributes.image.data == null
        ? ([] as string[])
        : phone.attributes.image.data.map(
            (image) => image.attributes.formats.thumbnail.url
          );
    return {
      id: phone.id,
      phonename: phone.attributes.name,
      updateAt: phone.attributes.release,
      image: image[0],
    };
  });

  return {
    props: {
      data: allPhones,
      pagination: data.meta.pagination,
    },
  };
};
