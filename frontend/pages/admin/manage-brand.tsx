import { AdminHeader } from "@/components";
import { AdminLayout } from "@/layouts";
import { Transition, Dialog } from "@headlessui/react";
import {
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import Head from "next/head";
import { useState, useRef, Fragment } from "react";
import { toast } from "react-toastify";
import { GetServerSideProps } from "next/types";
import { AdminBrand } from "@/data";
import type {
  BrandProps,
  pagination,
  BrandStateDataProps,
} from "@/types/Brand.types";
import { Label, Pagination, TextInput } from "flowbite-react";

const ManageBrand = (props: BrandProps) => {
  const [Data, setData] = useState<BrandStateDataProps[]>(props.data);
  const [pagination, setPagination] = useState<pagination>(
    props.meta.pagination
  );
  const [open, setOpen] = useState<boolean>(false);
  const [id, setId] = useState<number>();
  const [CreateShow, setCreateShow] = useState<boolean>(false);
  const [EditShow, setEditShow] = useState<boolean>(false);
  const [defaultName, setdefaultName] = useState<string>("");

  const DeleteModal = (props: {
    FetchFunction: () => void;
    open: boolean;
    setOpen: (open: boolean) => void;
    id: number;
  }) => {
    const handleDelete = async (id: number) => {
      props.setOpen(false);
      const tost = toast.loading("Deleting...");
      const res = await fetch(process.env.API_URL + "/brands/" + id, {
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
                          Delete this Brand
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Delete this Brand
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

  const hendleFetch = async (page: number = 1) => {
    const res = await fetch(
      process.env.API_URL + "/brands?" + "&pagination[page]=" + page,
      {
        headers: {
          Authorization: "Bearer " + process.env.API_TOKEN,
        },
      }
    );
    const { data, meta } = await res.json();
    const phoneFrmt = new AdminBrand();
    const allBrand = phoneFrmt.toNameAndDateMany(data);
    setData(allBrand);
    setPagination(meta.pagination);
  };

  const CreateBrand = (props: {
    show: boolean;
    setShow: (show: boolean) => void;
    FetchFunction: () => void;
  }) => {
    const cancelButtonRef = useRef(null);
    const [name, setName] = useState<string>("");

    const CreateBrandHendler = async () => {
      if (name == "") {
        toast.warn("Name is Requierd");
      } else {
        props.setShow(false);
        const tost = toast.loading("Creating...");
        const brand = new AdminBrand();
        const { success } = await brand.createBrand(name.trim());
        if (success) {
          toast.update(tost, {
            render: "Created",
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
        setName("");
        props.FetchFunction();
      }
    };

    return (
      <Transition.Root show={props.show} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={props.setShow}
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
                    <div className="sm:flex sm:items-start w-full">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                        <PlusIcon
                          className="h-6 w-6 text-blue-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900"
                        >
                          Create Brand
                        </Dialog.Title>
                        <div className="w-full py-4 pr-4">
                          <div className="mb-2 block">
                            <Label htmlFor="CreatName" value="Brand Name" />
                          </div>
                          <TextInput
                            type={"text"}
                            id="CreatName"
                            placeholder="Apple"
                            className="w-full"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => CreateBrandHendler()}
                    >
                      Create
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => props.setShow(false)}
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

  const handlePageChange = async (page: number) => {
    hendleFetch(page);
  };

  const SearchSection = (props: {
    setData: (Data: BrandStateDataProps[]) => void;
    setPagination: (pagination: pagination) => void;
  }) => {
    const [Name, setName] = useState<string>("");

    const onKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        const brand = new AdminBrand();
        const { data, meta } = await brand.FindBrand(Name.trim());
        const allData = brand.toNameAndDateMany(data);
        props.setData(allData);
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

  const EditBrand = (props: {
    show: boolean;
    setShow: (show: boolean) => void;
    FetchFunction: () => void;
    id: number;
    defaultName: string;
  }) => {
    const cancelButtonRef = useRef(null);
    const [name, setName] = useState<string>(props.defaultName);

    const CreateBrandHendler = async () => {
      if (name == "") {
        toast.warn("Name is Requierd");
      } else {
        props.setShow(false);
        const tost = toast.loading("Updating...");
        const brand = new AdminBrand();
        const { success } = await brand.updateBrand(props.id, name.trim());
        if (success) {
          toast.update(tost, {
            render: "Updated",
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
        setName("");
        props.FetchFunction();
      }
    };

    return (
      <Transition.Root show={props.show} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={props.setShow}
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
                    <div className="sm:flex sm:items-start w-full">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                        <PencilSquareIcon
                          className="h-6 w-6 text-blue-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900"
                        >
                          Edit Brand
                        </Dialog.Title>
                        <div className="w-full py-4 pr-4">
                          <div className="mb-2 block">
                            <Label htmlFor="CreatName" value="Brand Name" />
                          </div>
                          <TextInput
                            type={"text"}
                            id="CreatName"
                            placeholder="Apple"
                            className="w-full"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => CreateBrandHendler()}
                    >
                      Update now
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => props.setShow(false)}
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

  return (
    <AdminLayout>
      <DeleteModal
        id={id as number}
        FetchFunction={hendleFetch}
        open={open}
        setOpen={setOpen}
      />
      <CreateBrand
        FetchFunction={hendleFetch}
        show={CreateShow}
        setShow={setCreateShow}
      />
      <EditBrand
        id={id as number}
        FetchFunction={hendleFetch}
        show={EditShow}
        setShow={setEditShow}
        defaultName={defaultName}
      />
      <AdminHeader />
      <div className="max-w-full bg-[#F8F8F8] min-h-screen py-8 font-outfit">
        <Head>
          <title>Manage Brand | Admin - Phonew</title>
        </Head>
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
            <SearchSection setPagination={setPagination} setData={setData} />
          </div>
          <button
            className="float-right inline-flex justify-center items-center border-2 rounded-md py-2 bg-white font-outfit font-medium hover:bg-slate-100"
            onClick={() => setCreateShow(true)}
          >
            <PlusIcon className="mr-2 h-5 w-5" />
            Create brand
          </button>
        </div>
        <div>
          <div className="grid grid-cols-4 mx-16 max-md:grid-cols-2 max-sm:grid-cols-1 gap-4">
            {Data.map((item, index) => (
              <div className="bg-white rounded-lg shadow-md p-4" key={index}>
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <div className="ml-4">
                      <h2 className="text-lg font-outfit font-medium">
                        {item.name}
                      </h2>
                      <p className="text-sm text-gray-500 font-outfit font-normal">
                        Upload At: {DateFormete(item.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="grid xl:flex lg:items-center max-sm:!flex max-sm:!items-center">
                    <button
                      className="bg-[#F8F8F8] text-blue-500 rounded-lg p-2 mr-2"
                      title="Edit"
                      onClick={() => {
                        setId(item.id);
                        setdefaultName(item.name);
                        setEditShow(true);
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

export default ManageBrand;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const Adminbrand = new AdminBrand();
  const { data, meta } = await Adminbrand.getBrandsNameAndDate();

  return {
    props: { data, meta },
  };
};
