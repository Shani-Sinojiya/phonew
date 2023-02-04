import { Phone } from "@/types/Phone.type";
import { useRouter } from "next/router";
import { ReactNode, useContext, useState } from "react";
import { toast } from "react-toastify";
import CreatePhoneContext from "./CreatePhone.context";
import ImageIDContext from "./ImageID.context";

const CreatePhoneProvider = (props: { children?: ReactNode }) => {
  const router = useRouter();

  // buyAt
  const [Amazon, setAmazon] = useState<string>();
  const [Filpkart, setFilpkart] = useState<string>();

  // software
  const [OS, setOS] = useState<string>();

  // Camera
  const [Rear, setRear] = useState<string>();
  const [Front, setFront] = useState<string>();
  const [NoOFCamera, setNoOFCamera] = useState<string>();

  // hardware
  const [Processor, setProcessor] = useState<string>();
  const [ProcessorName, setProcessorName] = useState<string>();
  const [RAM, setRAM] = useState<string>();
  const [ROM, setROM] = useState<string>();

  // Display
  const [Type, setType] = useState<string>();
  const [Refreshrate, setRefreshrate] = useState<string>();
  const [Size, setSize] = useState<string>();
  const [Resolution, setResolution] = useState<string>();
  const [FPS, setFPS] = useState<string>();

  // General
  const [phoneName, setPhoneName] = useState<string>();
  const [BrandName, setBrandName] = useState<string>();
  const [RsDate, setRsDate] = useState<string>();
  const [Weight, setWeight] = useState<string>();
  const [IPRating, setIPRating] = useState<string>();
  const [FastCharing, setFastCharing] = useState<boolean>();
  const [Color, setColor] = useState<string>();
  const [Security, setSecurity] = useState<string>();
  const [Battery, setBattery] = useState<string>();
  const [Price, setPrice] = useState<string>();

  const { ImageIdArray } = useContext(ImageIDContext);

  // upload funcation
  const hendleUpload = async () => {
    const toasts = toast.loading("Creating...", {
      type: "info",
      isLoading: true,
      autoClose: false,
    });

    const body: Phone = {
      image: ImageIdArray,
      name: phoneName as string,
      brand: BrandName as string,
      release: RsDate as string,
      weight: Number(Weight),
      IPrating: IPRating as string,
      fastcharging: FastCharing == undefined ? false : FastCharing,
      colours: Color as string,
      security: Security as string,
      battery: Battery as string,
      buyatamazon: Amazon as string,
      buyatflipkart: Filpkart as string,
      OS: OS as string,
      camerarear: Rear as string,
      camerafront: Front as string,
      camerano: Number(NoOFCamera),
      DisplayRefreshRate: Refreshrate as string,
      Displaytype: Type as string,
      Displaysize: Size as string,
      DisplayResolution: Resolution as string,
      DisplayPPI: FPS as string,
      hardwareprocessor: Processor as string,
      hardwareprocessorname: ProcessorName as string,
      hardwareRAM: RAM as string,
      hardwareROM: ROM as string,
      price: Number(Price),
    };

    const res = await fetch(process.env.API_URL + "/phones", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + process.env.API_TOKEN,
      },
      body: JSON.stringify({ data: body }),
    });

    const { data } = await res.json();
    if (res.status === 200) {
      toast.update(toasts, {
        render: "Phone Created",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      router.push("/admin/phone/edit/" + data.id);
    } else {
      toast.update(toasts, {
        render: "Error",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  const value = {
    Amazon,
    Filpkart,
    setFilpkart,
    setAmazon,
    hendleUpload,
    OS,
    setOS,
    Rear,
    setRear,
    Front,
    setFront,
    NoOFCamera,
    setNoOFCamera,
    Processor,
    setProcessor,
    ProcessorName,
    setProcessorName,
    RAM,
    setRAM,
    ROM,
    setROM,
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
  };

  return (
    <CreatePhoneContext.Provider value={value}>
      {props.children}
    </CreatePhoneContext.Provider>
  );
};

export default CreatePhoneProvider;
