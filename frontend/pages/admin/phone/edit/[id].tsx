import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import type { FullPhoneImage } from "@/types/phones";
import type { props } from "@/types/PhonesInOne.type";
import { AdminLayout } from "@/layouts";
import { AdminHeader } from "@/components";
import ImageID from "@/context/ImageID.context";
import ImageIDProvider from "@/context/ImageID.context.provider";
import { Button, Label, Select, TextInput } from "flowbite-react";
import {
  useRef,
  useState,
  useContext,
  useEffect,
  ChangeEvent,
  Fragment,
} from "react";
import { toast } from "react-toastify";
import PhoneProvider from "@/context/Phone.context.provider";
import PhoneContext from "@/context/Phone.context";
import Router from "next/router";
import { classNames } from "@/lib";
import Head from "next/head";
import { AdminBrand } from "@/data";
import { BrandStateDataProps } from "@/types/Brand.types";
import { XMarkIcon } from "@heroicons/react/24/outline";

const PhonesInOne = (props: props) => {
  const PhoneFormUpdate = () => {
    const ImageSection = () => {
      const fileuploadRef = useRef<HTMLInputElement>(null);
      const [showDrop, setShowDrop] = useState<boolean>();
      const [file, setFile] = useState<any | null>(null);
      const [show, setShow] = useState<boolean>();
      const [upload, setFileUpload] = useState<any>();
      const { ImageIdArray, setImageIdArray } = useContext(ImageID);

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
            const res = await fetch(
              process.env.API_URL + "/upload/files/" + props.id,
              {
                method: "DELETE",
                headers: { Authorization: "Bearer " + process.env.API_TOKEN },
              }
            );
            const data = await res.json();
            if (data) {
              toast.success("Image Removed");
            } else {
              toast.error("Image Remove Error");
            }
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
        Battery,
        setBattery,
        Price,
        setPrice,
      } = useContext(PhoneContext);

      const [BrandNameArray, setBrandNameArray] =
        useState<BrandStateDataProps[]>();
      const [BrandNameArrayLoading, setBrandNameArrayLoading] = useState(true);

      useEffect(() => {
        const getBrandName = async () => {
          const brand = new AdminBrand();
          const { data } = await brand.getBrandsNameAndDate();
          setBrandNameArray(data);
          setBrandNameArrayLoading(false);
        };
        getBrandName();
      }, []);

      const Securitysection = () => {
        const { Security, setSecurity } = useContext(PhoneContext);
        const [securityArray, setSecurityArray] = useState<string[]>([
          "Face Id",
          "PIN Code",
          "Fingerprint",
          "Iris Scanning",
        ]);

        useEffect(() => {
          for (let i = 0; i < Security.length; i++) {
            const index = securityArray.indexOf(Security[i]);
            securityArray.splice(index, 1);
          }
          setSecurityArray([...securityArray]);
        }, [Security]);

        return (
          <div className="mb-2">
            <div className="mb-2 block">
              <Label htmlFor={"Security"} value={"Security"} />
            </div>
            <Select
              onChange={(e) => {
                const value = e.target.value;
                const index = securityArray.indexOf(value);
                const s = Security;
                securityArray.splice(index, 1);
                setSecurityArray([...securityArray]);
                s.push(value);
                setSecurity(s);
              }}
            >
              <option>Add Security</option>
              {securityArray.map((security) => (
                <option value={security} key={security}>
                  {security}
                </option>
              ))}
            </Select>
            <div>
              {(Security as string[]).map((N) => (
                <div
                  className="flex items-center mt-2 bg-slate-50 hover:bg-slate-100 py-2 px-3 rounded justify-between"
                  key={N}
                >
                  <div className="text-sm">{N}</div>
                  <div className="text-sm">
                    <button
                      className="text-red-500"
                      onClick={() => {
                        setSecurity(Security.filter((R) => R !== N));
                        setSecurityArray([...securityArray, N]);
                      }}
                      title={`remove ${N}`}
                    >
                      <XMarkIcon aria-hidden="true" className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      };

      const ColorSection = () => {
        const { Color, setColor } = useContext(PhoneContext);
        const [ColorArray, setColorArray] = useState<string[]>([
          "White",
          "Black",
          "Gray",
          "Silver",
          "Gold",
          "Blue",
          "Red",
          "Purple",
          "Yellow",
          "Orange",
          "Green",
          "Pink",
        ]);

        useEffect(() => {
          for (let i = 0; i < Color?.length; i++) {
            const index = ColorArray.indexOf(Color[i]);
            ColorArray.splice(index, 1);
          }
          setColorArray([...ColorArray]);
        }, [Color]);

        return (
          <div className="mb-2">
            <div className="mb-2 block">
              <Label htmlFor={"Color"} value={"Color"} />
            </div>
            <Select
              onChange={(e) => {
                const value = e.target.value;
                const index = ColorArray.indexOf(value);
                ColorArray.splice(index, 1);
                setColorArray([...ColorArray]);
                const a = Color;
                a.push(value);
                setColor(a);
              }}
            >
              <option>Add Color</option>
              {ColorArray.map((color) => (
                <option value={color} key={color}>
                  {color}
                </option>
              ))}
            </Select>
            <div>
              {(Color as string[]).map((N) => (
                <div
                  className="flex items-center mt-2 bg-slate-50 hover:bg-slate-100 py-2 px-3 rounded justify-between"
                  key={N}
                >
                  <div className="text-sm">{N}</div>
                  <div className="text-sm">
                    <button
                      className="text-red-500"
                      onClick={() => {
                        setColor(Color.filter((R) => R !== N));
                        setColorArray([...ColorArray, N]);
                      }}
                      title={`remove ${N}`}
                    >
                      <XMarkIcon aria-hidden="true" className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      };

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
            <Select
              id="countries"
              required={true}
              value={BrandName}
              onChange={(e) => setBrandName(Number(e.target.value))}
            >
              <option>Add Brand</option>
              {BrandNameArrayLoading ? (
                <option value={0}>Loading...</option>
              ) : (
                BrandNameArray?.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))
              )}
            </Select>
          </div>
          <div className="mb-2">
            <div className="mb-2 block">
              <Label htmlFor={"Price"} value={"Price"} />
            </div>
            <TextInput
              id="Price"
              type={"number"}
              value={Price}
              icon={() => (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                  className="w-4 h-4"
                >
                  <path d="M0 64C0 46.3 14.3 32 32 32H96h16H288c17.7 0 32 14.3 32 32s-14.3 32-32 32H231.8c9.6 14.4 16.7 30.6 20.7 48H288c17.7 0 32 14.3 32 32s-14.3 32-32 32H252.4c-13.2 58.3-61.9 103.2-122.2 110.9L274.6 422c14.4 10.3 17.7 30.3 7.4 44.6s-30.3 17.7-44.6 7.4L13.4 314C2.1 306-2.7 291.5 1.5 278.2S18.1 256 32 256h80c32.8 0 61-19.7 73.3-48H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H185.3C173 115.7 144.8 96 112 96H96 32C14.3 96 0 81.7 0 64z" />
                </svg>
              )}
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
          <ColorSection />
          <Securitysection />
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
      const { Refreshrate, setRefreshrate, Size, setSize, FPS, setFPS } =
        useContext(PhoneContext);

      const DisplayTypesection = () => {
        const { Type, setType } = useContext(PhoneContext);
        const [DisplayTypesArray, setDisplayTypesArray] = useState<string[]>([
          "LCD",
          "OLED",
          "AMOLED",
        ]);

        return (
          <div className="mb-2">
            <div className="mb-2 block">
              <Label htmlFor={"Displaytype"} value={"Display type"} />
            </div>
            <Select value={Type} onChange={(e) => setType(e.target.value)}>
              <option>Add Display Type</option>
              {DisplayTypesArray.map((type) => (
                <option value={type} key={type}>
                  {type}
                </option>
              ))}
            </Select>
          </div>
        );
      };

      const DisplayResolutionsection = () => {
        const { Resolution, setResolution } = useContext(PhoneContext);
        const [DisplayResolutionsArray, setDisplayResolutionsArray] = useState<
          string[]
        >([
          "720x1280 Pixels",
          "1024x768 Pixels",
          "1366x768 Pixels",
          "1080x2160 Pixels",
          "1920x1080 Pixels",
          "1440x2560 Pixels",
          "3840x2160 Pixels",
        ]);

        return (
          <div className="mb-2">
            <div className="mb-2 block">
              <Label
                htmlFor={"DisplayResolution"}
                value={"Display Resolution"}
              />
            </div>
            <Select
              id="DisplayResolution"
              value={Resolution}
              onChange={(e) => setResolution(e.target.value)}
            >
              <option>Add Resolution</option>
              {DisplayResolutionsArray.map((Resolution) => (
                <option value={Resolution} key={Resolution}>
                  {Resolution}
                </option>
              ))}
            </Select>
          </div>
        );
      };

      return (
        <div className="max-w-xl my-4">
          <DisplayTypesection />
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
          <DisplayResolutionsection />
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
      const { ProcessorName, setProcessorName } = useContext(PhoneContext);

      const RamSection = () => {
        const { RAM, setRAM } = useContext(PhoneContext);
        const [RamSelectArray, setRamSelectArray] = useState<string[]>([
          "2GB",
          "3GB",
          "4GB",
          "6GB",
          "8GB",
          "12GB",
          "16GB",
          "32GB",
        ]);

        useEffect(() => {
          for (let i = 0; i < RAM.length; i++) {
            const index = RamSelectArray.indexOf(RAM[i]);
            RamSelectArray.splice(index, 1);
          }
          setRamSelectArray([...RamSelectArray]);
        }, [RAM]);

        return (
          <div className="mb-2">
            <div className="mb-2 block">
              <Label htmlFor={"RAM"} value={"RAM"} />
            </div>
            <Select
              onChange={(e) => {
                const value = e.target.value;
                const index = RamSelectArray.indexOf(value);
                const s = RAM;
                RamSelectArray.splice(index, 1);
                setRamSelectArray([...RamSelectArray]);
                s.push(value);
                setRAM(s);
              }}
            >
              <option>Add RAM</option>
              {RamSelectArray.map((N) => (
                <option value={N} key={N}>
                  {N}
                </option>
              ))}
            </Select>
            <div>
              {(RAM as string[]).map((N) => (
                <div
                  className="flex items-center mt-2 bg-slate-50 hover:bg-slate-100 py-2 px-3 rounded justify-between"
                  key={N}
                >
                  <div className="text-sm">{N}</div>
                  <div className="text-sm">
                    <button
                      className="text-red-500"
                      onClick={() => {
                        setRAM(RAM.filter((R) => R !== N));
                        setRamSelectArray([...RamSelectArray, N]);
                      }}
                      title={`remove ${N}`}
                    >
                      <XMarkIcon aria-hidden="true" className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      };

      const RomSection = () => {
        const { ROM, setROM } = useContext(PhoneContext);
        const [RomSelectArray, setRomSelectArray] = useState<string[]>([
          "16GB",
          "32GB",
          "64GB",
          "128GB",
          "256GB",
          "512GB",
          "1TB",
        ]);

        useEffect(() => {
          for (let i = 0; i < ROM.length; i++) {
            const index = RomSelectArray.indexOf(ROM[i]);
            RomSelectArray.splice(index, 1);
          }
          setRomSelectArray([...RomSelectArray]);
        }, [ROM]);

        return (
          <div className="mb-2">
            <div className="mb-2 block">
              <Label htmlFor={"ROM"} value={"ROM"} />
            </div>
            <Select
              onChange={(e) => {
                const value = e.target.value;
                const index = RomSelectArray.indexOf(value);
                const s = ROM;
                RomSelectArray.splice(index, 1);
                setRomSelectArray([...RomSelectArray]);
                s.push(value);
                setROM(s);
              }}
            >
              <option>Add ROM</option>
              {RomSelectArray.map((N) => (
                <option value={N} key={N}>
                  {N}
                </option>
              ))}
            </Select>
            <div>
              {(ROM as string[]).map((N) => (
                <div
                  className="flex items-center mt-2 bg-slate-50 hover:bg-slate-100 py-2 px-3 rounded justify-between"
                  key={N}
                >
                  <div className="text-sm">{N}</div>
                  <div className="text-sm">
                    <button
                      className="text-red-500"
                      onClick={() => {
                        setROM((ROM as string[]).filter((R) => R !== N));
                        setRomSelectArray([...RomSelectArray, N]);
                      }}
                      title={`remove ${N}`}
                    >
                      <XMarkIcon aria-hidden="true" className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      };

      const Processorsection = () => {
        const { Processor, setProcessor } = useContext(PhoneContext);
        const [ProcessorArray, setProcessorArray] = useState<string[]>([
          "Apple",
          "Snapdragon",
          "Exynos",
          "Dimensity",
          "Kirin",
          "Mediatek",
        ]);

        return (
          <div className="mb-2">
            <div className="mb-2 block">
              <Label htmlFor={"Processor"} value={"Processor"} />
            </div>
            <Select
              id="Processor"
              value={Processor}
              onChange={(e) => setProcessor(e.target.value)}
            >
              <option>Add Processor</option>
              {ProcessorArray.map((Processor) => (
                <option value={Processor} key={Processor}>
                  {Processor}
                </option>
              ))}
            </Select>
          </div>
        );
      };
      return (
        <div className="max-w-xl my-4">
          <Processorsection />
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
          <RamSection />
          <RomSection />
        </div>
      );
    };

    const CameraForm = () => {
      const { Rear, setRear, Front, setFront, NoOFCamera, setNoOFCamera } =
        useContext(PhoneContext);

      return (
        <div className="max-w-xl my-4">
          <div className="mb-2">
            <div className="mb-2 block">
              <Label htmlFor={"Rear"} value={"Rear Camera"} />
            </div>
            <TextInput
              id="Rear"
              type={""}
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
      const { OS, setOS, OSVersion, setOSVersion } = useContext(PhoneContext);

      return (
        <div className="max-w-xl my-4">
          <div className="mb-2">
            <label
              htmlFor="OperatingSystem"
              className="block text-sm font-medium text-gray-700"
            >
              Operating System
            </label>
            <div className="relative mt-1 rounded-md shadow-sm">
              <input
                type="text"
                id="OperatingSystem"
                className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="16"
                value={OSVersion}
                onChange={(e) => setOSVersion(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 flex items-center">
                <label htmlFor="OS" className="sr-only">
                  OS
                </label>
                <select
                  id="OS"
                  value={OS}
                  className="h-full rounded-md border-transparent bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  onChange={(e) => setOS(e.target.value)}
                >
                  <option>Add OS type</option>
                  <option value={"iOS"}>iOS</option>
                  <option value={"Android"}>Android</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      );
    };

    const BuyAtForm = () => {
      const { setAmazon, Amazon, setFilpkart, Filpkart } =
        useContext(PhoneContext);

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

    const NetworkForm = () => {
      const { Network, setNetwork } = useContext(PhoneContext);
      const networks = ["3G", "4G", "5G"];

      return (
        <div className="max-w-xl my-4">
          <div className="mb-2">
            <div className="mb-2 block">
              <Label htmlFor={"Network"} value={"Network"} />
            </div>
            <Select
              id="Network"
              value={Network}
              onChange={(e) => setNetwork(e.target.value)}
            >
              <option>Add Network</option>
              {networks.map((n) => (
                <option value={n} key={n}>
                  {n}
                </option>
              ))}
            </Select>
          </div>
        </div>
      );
    };

    const SavBtn = () => {
      const { hendleUpload } = useContext(PhoneContext);
      return (
        <div className="p-6 mb-4">
          <Button className="float-right ml-4" onClick={() => hendleUpload()}>
            Save
          </Button>
          <Button
            color={"gray"}
            className="float-right"
            outline
            onClick={() => Router.push("/admin/manage-data")}
          >
            Cancel
          </Button>
        </div>
      );
    };

    return (
      <Fragment>
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
            Network
          </h2>
          <div>
            <NetworkForm />
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
      </Fragment>
    );
  };

  return (
    <ImageIDProvider>
      <PhoneProvider data={props.data}>
        <AdminLayout>
          <AdminHeader />
          <div className="bg-gray-50 p-16">
            <PhoneFormUpdate />
          </div>
          <Head>
            <title>{props.data.id} - Edit Phone | Admin - Phonew</title>
          </Head>
        </AdminLayout>
      </PhoneProvider>
    </ImageIDProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  if (!session) {
    return { redirect: { destination: "/admin/login", permanent: false } };
  }
  const { id } = ctx.query;

  if (id == "manage-data") {
    return {
      redirect: { destination: "/admin/manage-data", permanent: false },
    };
  }

  const res = await fetch(
    process.env.API_URL + "/phones/" + id + "?populate=image,brand",
    {
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
    }
  );

  const { data } = await res.json();

  const allData = {
    id: data.id,
    name: data.attributes.name,
    price: data.attributes.price,
    brand: data.attributes.brand.data.id,
    network: data.attributes.network,
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
      RAM: data.attributes.RAM === null ? [] : data.attributes.RAM,
      ROM: data.attributes.ROM === null ? [] : data.attributes.ROM,
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
      colours: data.attributes.colours === null ? [] : data.attributes.colours,
      fastcharging: data.attributes.fastcharging,
      security:
        data.attributes.security === null ? [] : data.attributes.security,
      release: data.attributes.release,
    },
    buyAt: {
      amazon: data.attributes.buyatamazon,
      flipkart: data.attributes.buyatflipkart,
    },
    image:
      data.attributes.image.data === null
        ? ([] as { id: number }[])
        : data.attributes.image.data.map((img: FullPhoneImage) => {
            return {
              id: img.id,
            };
          }),
  };

  return {
    props: { data: allData },
  };
};

export default PhonesInOne;
