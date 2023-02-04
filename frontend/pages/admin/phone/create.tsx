import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { AdminLayout } from "@/layouts";
import { AdminHeader } from "@/components";
import {
  ChangeEvent,
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { toast } from "react-toastify";
import ImageIDProvider from "@/context/ImageID.context.provider";
import ImageID from "@/context/ImageID.context";
import CreatePhoneProvider from "@/context/CreatePhone.context.provider";
import CreatePhoneContext from "@/context/CreatePhone.context";
import Head from "next/head";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const PhoneCreate = () => {
  const PhoneFormCreate = () => {
    const ImageSection = () => {
      const fileuploadRef = useRef<HTMLInputElement>(null);
      const [showDrop, setShowDrop] = useState<boolean>();
      const [file, setFile] = useState<any | null>(null);
      const [show, setShow] = useState<boolean>();

      const [upload, setFileUpload] = useState<any>();

      const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const file = e.target.files;
        if (file) {
          setFileUpload(file[0]);
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file[0]);
          fileReader.onload = (e) => {
            setFile(e.target?.result);
            setShow(true);
          };
        }
      };

      const { ImageIdArray, setImageIdArray } = useContext(ImageID);

      const HendleUpload = async () => {
        const toastupload = toast.loading("File Uploading");
        const form = new FormData();
        await form.append("files", upload);

        const res = await fetch(process.env.API_URL + "/upload", {
          method: "POST",
          headers: {
            Authorization: "Bearer " + process.env.API_TOKEN,
          },
          body: form,
        });

        const data = await res.json();
        if (data) {
          toast.update(toastupload, {
            render: "File Uploaded...",
            type: "success",
            isLoading: false,
            autoClose: 2000,
          });
          const idArray = ImageIdArray;
          for (let i = 0; i < data.length; i++) {
            const id = data[i].id;
            idArray.push(id);
          }
          setImageIdArray(idArray);
        } else {
          toast.update(toastupload, {
            render: "File Uploading Error...",
            type: "error",
            isLoading: false,
            autoClose: 2000,
          });
        }
        setFile(null);
        setShow(false);
        setShowDrop(false);
        setFileUpload(null);
      };

      function ImageSection(props: { image: any; onSubmit: () => {} }) {
        return (
          <div className="w-full relative h-full flex justify-center items-center group/imageshow transition-all">
            <img
              src={props.image}
              className="object-fill max-h-[18rem] group-hover/imageshow:backdrop-blur"
              alt="show"
            />
            <div className="absolute bottom-0 w-full hidden group-hover/imageshow:block">
              <div className="w-full grid grid-cols-2 gap-0">
                <Button
                  className="rounded-r-none"
                  color="success"
                  onClick={() => props.onSubmit()}
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
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                    />
                  </svg>
                  Upload
                </Button>
                <Button
                  className="rounded-l-none"
                  color="failure"
                  onClick={() => {
                    setFile(null);
                    setShow(false);
                    setShowDrop(false);
                    setFileUpload(null);
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  Remove
                </Button>
              </div>
            </div>
          </div>
        );
      }

      function ShoeImageSection() {
        const { ImageIdArray } = useContext(ImageID);

        const ImageSee = (props: { id: number; index: number }) => {
          const { ImageIdArray, setImageIdArray } = useContext(ImageID);
          const [image, setImage] = useState<any>();
          useEffect(() => {
            const fetchImage = async () => {
              const res = await fetch(
                process.env.API_URL + "/upload/files/" + props.id,
                {
                  method: "GET",
                  headers: {
                    Authorization: "Bearer " + process.env.API_TOKEN,
                  },
                }
              );
              const {
                formats: {
                  thumbnail: { url },
                },
              } = await res.json();
              setImage(url);
            };
            fetchImage();
          }, [props.id]);

          const HendleRemoveImage = async () => {
            const idArray = ImageIdArray;
            const removeElement = (array: number[], n: number) => {
              let newArray = [];

              for (let i = 0; i < array.length; i++) {
                if (array[i] !== n) {
                  newArray.push(array[i]);
                }
              }
              return newArray;
            };
            setImageIdArray(await removeElement(idArray, props.id));
          };

          return (
            <div className="relative w-full h-auto rounded-md overflow-hidden group/imageshow flex justify-center">
              <img
                src={process.env.API_IMAGE_URL + image}
                className="object-cover"
                alt="show"
                loading="lazy"
              />
              <div className="absolute top-0 right-0 hidden group-hover/imageshow:block">
                <button
                  className="bg-red-600 text-white"
                  onClick={() => HendleRemoveImage()}
                  title="Remove"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          );
        };

        return (
          <div className="w-full rounded col-span-3">
            <div className="grid grid-cols-8 gap-4 max-h-32">
              {ImageIdArray.map((id, index) => (
                <ImageSee key={index} id={id} index={index} />
              ))}
            </div>
          </div>
        );
      }

      return (
        <div className="grid grid-cols-4 my-2 gap-8">
          <div
            className={classNames(
              "border-2 border-gray-400 bg-gray-100 rounded-md col-span-1",
              showDrop ? "border-2" : "border-dashed"
            )}
            onClick={() => {
              fileuploadRef.current?.click();
            }}
            onDragEnter={() => {
              setShowDrop(true);
            }}
            onDragLeave={() => {
              setShowDrop(false);
            }}
            onDragOver={(e) => {
              e.preventDefault();
            }}
            onDrop={(e) => {
              e.preventDefault();
              const file = e.dataTransfer.files;
              if (file) {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(file[0]);
                fileReader.onload = (e) => {
                  setFile(e.target?.result);
                  setShow(true);
                };
              }
            }}
          >
            <div className="flex flex-col items-center justify-center min-h-[18rem] w-full h-full cursor-pointer">
              {!show ? (
                <div className="flex flex-col self-center text-center justify-self-center mx-auto">
                  <div className="mx-auto mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-8 h-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                      />
                    </svg>
                  </div>
                  <div className="px-16 max-md:px-4">
                    Drag and Drop your files here or{" "}
                    <span className="text-primary-0">Browse</span>
                  </div>
                  <input
                    type="file"
                    name="fileupload"
                    ref={fileuploadRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    hidden
                  />
                </div>
              ) : (
                <ImageSection image={file} onSubmit={HendleUpload} />
              )}
            </div>
          </div>
          <ShoeImageSection />
        </div>
      );
    };

    const GeneralForm = () => {
      const {
        phoneName,
        setPhoneName,
        BrandName,
        setBrandName,
        RsDate,
        setRsDate,
        Weight,
        setWeight,
        IPRating,
        setIPRating,
        FastCharing,
        setFastCharing,
        Color,
        setColor,
        Security,
        setSecurity,
        Battery,
        setBattery,
        Price,
        setPrice,
      } = useContext(CreatePhoneContext);

      return (
        <div className="max-w-xl my-4">
          <div className="mb-2">
            <div className="mb-2 block">
              <Label htmlFor={"PhoneName"} value={"Phone Name"} />
            </div>
            <TextInput
              id="PhoneName"
              type={"text"}
              value={phoneName}
              placeholder={"Iphone 12"}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPhoneName(e.target.value)
              }
            />
          </div>
          <div className="mb-2">
            <div className="mb-2 block">
              <Label htmlFor={"BrandName"} value={"Brand Name"} />
            </div>
            <TextInput
              id="BrandName"
              type={"text"}
              value={BrandName}
              placeholder={"Apple"}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setBrandName(e.target.value)
              }
            />
          </div>
          <div className="mb-2">
            <div className="mb-2 block">
              <Label htmlFor={"Price"} value={"Price"} />
            </div>
            <TextInput
              id="Price"
              type={"number"}
              value={Price}
              placeholder={"12421455"}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPrice(e.target.value)
              }
            />
          </div>
          <div className="mb-2">
            <div className="mb-2 block">
              <Label htmlFor={"ReleaseDate"} value={"Release Date"} />
            </div>
            <TextInput
              id="ReleaseDate"
              type={"date"}
              value={RsDate}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setRsDate(e.target.value)
              }
            />
          </div>
          <div className="mb-2">
            <div className="mb-2 block">
              <Label htmlFor={"Weight"} value={"Weight"} />
            </div>
            <TextInput
              id="Weight"
              type={"number"}
              value={Weight}
              placeholder={"123"}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setWeight(e.target.value)
              }
            />
          </div>
          <div className="mb-2">
            <div className="mb-2 block">
              <Label htmlFor={"IPrating"} value={"IP rating"} />
            </div>
            <TextInput
              id="IPrating"
              type={"text"}
              placeholder="IP68"
              value={IPRating}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setIPRating(e.target.value)
              }
            />
          </div>
          <div className="mb-2">
            <div className="mb-2 block">
              <Label htmlFor={"FastCharing"} value={"Fast Charging"} />
            </div>
            <div className="flex">
              <button
                className={classNames(
                  "inline-block px-6 py-2 border-2 border-blue-600  font-medium text-xs leading-tight uppercase rounded focus:outline-none focus:ring-0 transition duration-150 ease-in-out border-r rounded-r-none",
                  FastCharing
                    ? "bg-blue-600 text-white"
                    : "text-blue-600 hover:bg-blue-600 hover:text-white"
                )}
                onClick={() => setFastCharing(true)}
              >
                yes
              </button>
              <button
                className={classNames(
                  "inline-block px-6 py-2 border-2 border-yellow-500  font-medium text-xs leading-tight uppercase rounded  focus:outline-none focus:ring-0 transition duration-150 ease-in-out border-l rounded-l-none",
                  FastCharing
                    ? "text-yellow-500 hover:bg-yellow-400 hover:text-white"
                    : "bg-yellow-400 text-white"
                )}
                onClick={() => setFastCharing(false)}
              >
                no
              </button>
            </div>
          </div>
          <div className="mb-2">
            <div className="mb-2 block">
              <Label htmlFor={"Color"} value={"Color"} />
            </div>
            <TextInput
              id="Color"
              type={"text"}
              placeholder="Black"
              value={Color}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setColor(e.target.value)
              }
            />
          </div>
          <div className="mb-2">
            <div className="mb-2 block">
              <Label htmlFor={"Security"} value={"Security"} />
            </div>
            <TextInput
              id="Security"
              type={"text"}
              placeholder="Face ID"
              value={Security}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSecurity(e.target.value)
              }
            />
          </div>
          <div className="mb-2">
            <div className="mb-2 block">
              <Label htmlFor={"Battery"} value={"Battery"} />
            </div>
            <TextInput
              id="Battery"
              type={"number"}
              placeholder="5000 mAh"
              value={Battery}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setBattery(e.target.value)
              }
            />
          </div>
        </div>
      );
    };

    const DisplayForm = () => {
      const {
        Type,
        setType,
        Refreshrate,
        setRefreshrate,
        Size,
        setSize,
        Resolution,
        setResolution,
        FPS,
        setFPS,
      } = useContext(CreatePhoneContext);

      return (
        <div className="max-w-xl my-4">
          <div className="mb-2">
            <div className="mb-2 block">
              <Label htmlFor={"DisplayType"} value={"Display Type"} />
            </div>
            <TextInput
              id="DisplayType"
              type={"text"}
              value={Type}
              placeholder={"AMOLAD"}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setType(e.target.value)
              }
            />
          </div>
          <div className="mb-2">
            <div className="mb-2 block">
              <Label htmlFor={"Refreshrate"} value={"Refresh rate"} />
            </div>
            <TextInput
              id="Refreshrate"
              type={"text"}
              value={Refreshrate}
              placeholder={"120 FPS"}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setRefreshrate(e.target.value)
              }
            />
          </div>
          <div className="mb-2">
            <div className="mb-2 block">
              <Label htmlFor={"DisplaySize"} value={"Display Size"} />
            </div>
            <TextInput
              id="DisplaySize"
              type={"text"}
              placeholder="7 INCH"
              value={Size}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSize(e.target.value)
              }
            />
          </div>
          <div className="mb-2">
            <div className="mb-2 block">
              <Label htmlFor={"Resolution"} value={"Resolution"} />
            </div>
            <TextInput
              id="Resolution"
              type={"text"}
              value={Resolution}
              placeholder={"123"}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setResolution(e.target.value)
              }
            />
          </div>
          <div className="mb-2">
            <div className="mb-2 block">
              <Label htmlFor={"FPS"} value={"Pixels per inch"} />
            </div>
            <TextInput
              id="FPS"
              type={"text"}
              placeholder="124"
              value={FPS}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFPS(e.target.value)
              }
            />
          </div>
        </div>
      );
    };

    const HardwareForm = () => {
      const {
        Processor,
        setProcessor,
        ProcessorName,
        setProcessorName,
        RAM,
        setRAM,
        ROM,
        setROM,
      } = useContext(CreatePhoneContext);

      return (
        <div className="max-w-xl my-4">
          <div className="mb-2">
            <div className="mb-2 block">
              <Label htmlFor={"Processor"} value={"Processor"} />
            </div>
            <TextInput
              id="Processor"
              type={"text"}
              value={Processor}
              placeholder={"Octa FX"}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setProcessor(e.target.value)
              }
            />
          </div>
          <div className="mb-2">
            <div className="mb-2 block">
              <Label htmlFor={"ProcessorName"} value={"Processor name"} />
            </div>
            <TextInput
              id="ProcessorName"
              type={"text"}
              value={ProcessorName}
              placeholder={"Apple M3"}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setProcessorName(e.target.value)
              }
            />
          </div>
          <div className="mb-2">
            <div className="mb-2 block">
              <Label htmlFor={"RAM"} value={"RAM"} />
            </div>
            <TextInput
              id="RAM"
              type={"text"}
              placeholder="8 gb"
              value={RAM}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setRAM(e.target.value)
              }
            />
          </div>
          <div className="mb-2">
            <div className="mb-2 block">
              <Label htmlFor={"ROM"} value={"Internal storage"} />
            </div>
            <TextInput
              id="ROM"
              type={"text"}
              value={ROM}
              placeholder={"128 gb"}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setROM(e.target.value)
              }
            />
          </div>
        </div>
      );
    };

    const CameraForm = () => {
      const { Rear, setRear, Front, setFront, NoOFCamera, setNoOFCamera } =
        useContext(CreatePhoneContext);

      return (
        <div className="max-w-xl my-4">
          <div className="mb-2">
            <div className="mb-2 block">
              <Label htmlFor={"Rear"} value={"Rear Camera"} />
            </div>
            <TextInput
              id="Rear"
              type={"text"}
              value={Rear}
              placeholder={"12x12x12MP (Telephoto - Wide angle - Ultra micro)"}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setRear(e.target.value)
              }
            />
          </div>
          <div className="mb-2">
            <div className="mb-2 block">
              <Label htmlFor={"Front"} value={"Front Camera"} />
            </div>
            <TextInput
              id="Front"
              type={"text"}
              value={Front}
              placeholder={"12MP with TrueDepth"}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFront(e.target.value)
              }
            />
          </div>
          <div className="mb-2">
            <div className="mb-2 block">
              <Label htmlFor={"NoOFCamera"} value={"No. of Camera"} />
            </div>
            <TextInput
              id="NoOFCamera"
              type={"number"}
              placeholder="4"
              value={NoOFCamera}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNoOFCamera(e.target.value)
              }
            />
          </div>
        </div>
      );
    };

    const SoftwareForm = () => {
      const { OS, setOS } = useContext(CreatePhoneContext);

      return (
        <div className="max-w-xl my-4">
          <div className="mb-2">
            <div className="mb-2 block">
              <Label htmlFor={"OS"} value={"Operating System"} />
            </div>
            <TextInput
              id="OS"
              type={"text"}
              value={OS}
              placeholder={"iOS 14"}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setOS(e.target.value)
              }
            />
          </div>
        </div>
      );
    };

    const BuyAtForm = () => {
      const { setAmazon, Amazon, setFilpkart, Filpkart } =
        useContext(CreatePhoneContext);

      return (
        <div className="max-w-xl my-4">
          <div className="mb-2">
            <div className="mb-2 block">
              <Label htmlFor={"Amazon"} value={"Amazon"} />
            </div>
            <TextInput
              id="Amazon"
              type={"text"}
              value={Amazon}
              placeholder={"https://amzn.eu/d/aZEMe2V"}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setAmazon(e.target.value)
              }
            />
          </div>
          <div className="mb-2">
            <div className="mb-2 block">
              <Label htmlFor={"Flipkart"} value={"Flipkart"} />
            </div>
            <TextInput
              id="Flipkart"
              type={"text"}
              value={Filpkart}
              placeholder={
                "https://www.flipkart.com/apple-iphone-13-blue-128-gb/p/itm6c601e0a58b3c?pid=MOBG6VF5SMXPNQHG&lid=LSTMOBG6VF5SMXPNQHGMMXJDB"
              }
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFilpkart(e.target.value)
              }
            />
          </div>
        </div>
      );
    };

    const SavBtn = () => {
      const { hendleUpload } = useContext(CreatePhoneContext);
      return (
        <div className="p-6 mb-4">
          <Button className="float-right ml-4" onClick={() => hendleUpload()}>
            Save
          </Button>
          <Button color={"gray"} className="float-right" outline>
            Cencel
          </Button>
        </div>
      );
    };

    return (
      <CreatePhoneProvider>
        <div className="bg-white border rounded-xl p-6 mb-4">
          <h2 className="font-outfit text-primary-0 text-xl underline font-medium">
            General
          </h2>
          <div>
            <ImageSection />
            <GeneralForm />
          </div>
        </div>
        <div className="bg-white border rounded-xl p-6 mb-4">
          <h2 className="font-outfit text-primary-0 text-xl underline font-medium">
            Display
          </h2>
          <div>
            <DisplayForm />
          </div>
        </div>
        <div className="bg-white border rounded-xl p-6 mb-4">
          <h2 className="font-outfit text-primary-0 text-xl underline font-medium">
            Hardware
          </h2>
          <div>
            <HardwareForm />
          </div>
        </div>
        <div className="bg-white border rounded-xl p-6 mb-4">
          <h2 className="font-outfit text-primary-0 text-xl underline font-medium">
            Camera
          </h2>
          <div>
            <CameraForm />
          </div>
        </div>
        <div className="bg-white border rounded-xl p-6 mb-4">
          <h2 className="font-outfit text-primary-0 text-xl underline font-medium">
            Software
          </h2>
          <div>
            <SoftwareForm />
          </div>
        </div>
        <div className="bg-white border rounded-xl p-6 mb-4">
          <h2 className="font-outfit text-primary-0 text-xl underline font-medium">
            Buy At
          </h2>
          <div>
            <BuyAtForm />
          </div>
        </div>
        <SavBtn />
      </CreatePhoneProvider>
    );
  };

  return (
    <AdminLayout>
      <ImageIDProvider>
        <AdminHeader />
        <div className="bg-gray-50 p-16">
          <PhoneFormCreate />
        </div>
      </ImageIDProvider>
      <Head>
        <title>Create new Phone | Admin - Phonew</title>
      </Head>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  if (!session) {
    return { redirect: { destination: "/admin/login", permanent: false } };
  }
  return {
    props: {},
  };
};

export default PhoneCreate;
