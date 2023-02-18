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
  const [OSVersion, setOSVersion] = useState<string>();

  // Camera
  const [Rear, setRear] = useState<string>();
  const [Front, setFront] = useState<string>();
  const [NoOFCamera, setNoOFCamera] = useState<string>();

  // hardware
  const [Processor, setProcessor] = useState<string>();
  const [ProcessorName, setProcessorName] = useState<string>();
  const [RAM, setRAM] = useState<string[]>([]);
  const [ROM, setROM] = useState<string[]>([]);

  // Display
  const [Type, setType] = useState<string>();
  const [Refreshrate, setRefreshrate] = useState<string>();
  const [Size, setSize] = useState<string>();
  const [Resolution, setResolution] = useState<string>();
  const [FPS, setFPS] = useState<string>();

  // General
  const [phoneName, setPhoneName] = useState<string>();
  const [BrandName, setBrandName] = useState<number>();
  const [RsDate, setRsDate] = useState<string>();
  const [Weight, setWeight] = useState<string>();
  const [IPRating, setIPRating] = useState<string>();
  const [FastCharing, setFastCharing] = useState<boolean>();
  const [Color, setColor] = useState<string[]>([]);
  const [Security, setSecurity] = useState<string[]>([]);
  const [Battery, setBattery] = useState<string>();
  const [Price, setPrice] = useState<string>();
  const [Network, setNetwork] = useState<string>();

  const { ImageIdArray } = useContext(ImageIDContext);

  // upload funcation
  const hendleUpload = async () => {
    if (
      OS === undefined ||
      Rear === undefined ||
      Front === undefined ||
      NoOFCamera === undefined ||
      Processor === undefined ||
      ProcessorName === undefined ||
      RAM === undefined ||
      ROM === undefined ||
      Type === undefined ||
      Refreshrate === undefined ||
      FPS === undefined ||
      Size === undefined ||
      phoneName === undefined ||
      Resolution === undefined ||
      Weight === undefined ||
      RsDate === undefined ||
      FastCharing === undefined ||
      BrandName === undefined ||
      Color === undefined ||
      IPRating === undefined ||
      Battery === undefined ||
      Price === undefined ||
      Security === undefined ||
      Network === undefined
    ) {
      toast.warn("All are Required");
    } else {
      const toasts = toast.loading("Creating...", {
        type: "info",
        isLoading: true,
        autoClose: false,
      });

      const body: Phone = {
        image: ImageIdArray,
        name: phoneName.trim() as string,
        brand: BrandName as number,
        release: RsDate.trim() as string,
        weight: Number(Weight),
        IPrating: IPRating.trim() as string,
        fastcharging: FastCharing == undefined ? false : FastCharing,
        colours: Color as string[],
        security: Security as string[],
        battery: Battery.trim() as string,
        buyatamazon: Amazon == undefined ? "" : Amazon.trim(),
        buyatflipkart: Filpkart == undefined ? "" : Filpkart.trim(),
        OS: (OS.trim() + " " + OSVersion?.trim()) as string,
        camerarear: Rear.trim() as string,
        camerafront: Front.trim() as string,
        camerano: Number(NoOFCamera.trim()),
        DisplayRefreshRate: Refreshrate.trim() as string,
        Displaytype: Type.trim() as string,
        Displaysize: Size.trim() as string,
        DisplayResolution: Resolution.trim() as string,
        DisplayPPI: FPS.trim() as string,
        hardwareprocessor: Processor.trim() as string,
        hardwareprocessorname: ProcessorName.trim() as string,
        price: Number(Price.trim()),
        network: Network.trim() as string,
        RAM: RAM as string[],
        ROM: ROM as string[],
      };

      const res = await fetch(process.env.API_URL + "/phones", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + process.env.API_TOKEN,
        },
        body: JSON.stringify({ data: body }),
      });

      const data = await res.json();

      if (res.status === 200) {
        toast.update(toasts, {
          render: "Phone Created",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        router.push("/admin/manage-data");
      } else {
        toast.update(toasts, {
          render: "Error: " + data,
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      }
    }
  };

  const value = {
    Amazon,
    Filpkart,
    OS,
    Rear,
    Front,
    NoOFCamera,
    ROM,
    Processor,
    Type,
    Size,
    ProcessorName,
    BrandName,
    Resolution,
    RsDate,
    Refreshrate,
    Weight,
    Color,
    FPS,
    Security,
    IPRating,
    Battery,
    RAM,
    Price,
    FastCharing,
    phoneName,
    Network,
    OSVersion,
    setOSVersion,
    setNetwork,
    setFilpkart,
    setAmazon,
    hendleUpload,
    setOS,
    setRear,
    setFront,
    setNoOFCamera,
    setProcessor,
    setProcessorName,
    setRAM,
    setROM,
    setType,
    setRefreshrate,
    setSize,
    setResolution,
    setFPS,
    setPhoneName,
    setBrandName,
    setRsDate,
    setWeight,
    setIPRating,
    setFastCharing,
    setColor,
    setSecurity,
    setBattery,
    setPrice,
  };

  return (
    <CreatePhoneContext.Provider value={value}>
      {props.children}
    </CreatePhoneContext.Provider>
  );
};

export default CreatePhoneProvider;
