import { AdminHeader } from "@/components";
import { AdminLayout } from "@/layouts";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { Fragment, useRef, useState } from "react";
import { phoneMetadata } from "@/types/phones";
import type { props, pagination, data } from "@/types/manage-data.types";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { Pagination, TextInput } from "flowbite-react";
import Head from "next/head";
import { Dialog, Transition } from "@headlessui/react";
import {
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { phone } from "@/data";

const ManageData = (props: props) => {
  const Router = useRouter();
  const [data, setData] = useState<data[]>(props.data);
  const [pagination, setPagination] = useState<pagination>(props.pagination);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState<number>();

  const hendleFetch = async (page: number = 1) => {
    const res = await fetch(
      process.env.API_URL +
        "/phones?sort[0]=release:desc&populate=image&fields[0]=name&fields[1]=release&pagination[pageSize]=27" +
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

  const DeleteModal = (props: {
    FetchFunction: () => void;
    open: boolean;
    setOpen: (open: boolean) => void;
    id: number;
  }) => {
    const handleDelete = async (id: number) => {
      props.setOpen(false);
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
      props.FetchFunction();
    };
    const cancelButtonRef = useRef(null);
    return (
      <Transition.Root show={props.open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={props.setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationTriangleIcon
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900"
                        >
                          Delete this Phone
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Delete this Phone
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => handleDelete(props.id)}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => props.setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    );
  };

  const DateFormete = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString("ca-indian");
  };

  const SearchSection = (props: {
    setData: (Data: data[]) => void;
    setPagination: (pagination: pagination) => void;
  }) => {
    const [Name, setName] = useState<string>("");

    const onKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        const phones = new phone();
        const { data, meta } = await phones.SearchPhone(Name);
        props.setData(data);
        props.setPagination(meta.pagination);
      }
    };

    return (
      <TextInput
        icon={MagnifyingGlassIcon}
        placeholder="Search..."
        value={Name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={onKeyPress}
      />
    );
  };

  return (
    <AdminLayout>
      <DeleteModal
        open={open}
        setOpen={setOpen}
        FetchFunction={hendleFetch}
        id={id as number}
      />
      <AdminHeader />
      <div className="max-w-full bg-[#F8F8F8] min-h-screen py-8">
        <div className="grid md:grid-cols-10 gap-2 mb-4 ml-8">
          <div className="col-span-6">
            <div className="float-right">
              <button
                className="float-right inline-flex justify-center items-center border-2 rounded-md px-2 py-2 bg-white font-outfit font-medium hover:bg-slate-100"
                onClick={() => hendleFetch()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-5 h-5"
                >
                  <path d="M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="col-span-2 float-right">
            <SearchSection setData={setData} setPagination={setPagination} />
          </div>
          <button
            className="float-right inline-flex justify-center items-center border-2 rounded-md py-2 bg-white font-outfit font-medium hover:bg-slate-100"
            onClick={() => Router.push("/admin/phone/create")}
          >
            <PlusIcon className="mr-2 h-5 w-5" />
            Create phone
          </button>
        </div>
        <div>
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
                        Upload At: {DateFormete(item.updateAt)}
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
                      onClick={() => {
                        setId(item.id);
                        setOpen(true);
                      }}
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
      "/phones?populate=image&fields[0]=name&fields[1]=release&pagination[pageSize]=27&sort[0]=release:desc",
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
        ? null
        : phone.attributes.image.data.map(
            (image) => image.attributes.formats.thumbnail.url
          );
    return {
      id: phone.id,
      phonename: phone.attributes.name,
      updateAt: phone.attributes.release,
      image: image == null ? "" : image[0],
    };
  });

  return {
    props: {
      data: allPhones,
      pagination: data.meta.pagination,
    },
  };
};
