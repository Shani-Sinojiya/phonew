import { Phone } from "@/types/Phone.type";
import { useRouter } from "next/router";
import { ReactNode, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import PhoneContext from "./Phone.context";
import ImageIDContext from "./ImageID.context";
import type { data } from "@/types/PhonesInOne.type";

const PhoneProvider = (props: { children?: ReactNode; data: data }) => {
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
  const [Color, setColor] = useState<string>();
  const [Security, setSecurity] = useState<string>();
  const [Battery, setBattery] = useState<string>();
  const [Price, setPrice] = useState<string>();
  const [Network, setNetwork] = useState<string>();

  // id
  const [id, setId] = useState<number>();

  // image
  const { ImageIdArray, setImageIdArray } = useContext(ImageIDContext);

  // upload funcation
  const hendleUpload = async () => {
    if (
      Amazon === undefined ||
      Filpkart === undefined ||
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
      const toasts = toast.loading("Updateing...", {
        type: "info",
        isLoading: true,
        autoClose: false,
      });

      const body: Phone = {
        image: ImageIdArray,
        name: phoneName as string,
        brand: BrandName as number,
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
        price: Number(Price),
        network: Network as string,
        RAM: RAM,
        ROM: ROM,
      };

      const res = await fetch(process.env.API_URL + "/phones/" + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + process.env.API_TOKEN,
        },
        body: JSON.stringify({ data: body }),
      });

      if (res.status === 200) {
        toast.update(toasts, {
          render: "Phone Updated",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        router.push("/admin/manage-data");
      } else {
        toast.update(toasts, {
          render: "Error",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      }
    }
  };

  function setAllData(d: data) {
    // Buy at
    setFilpkart(d.buyAt.flipkart);
    setAmazon(d.buyAt.amazon);

    //image
    setImageIdArray(d.image.map((img) => img.id));

    // camera
    setRear(d.camera.rear);
    setFront(d.camera.front);
    setNoOFCamera(String(d.camera.number));

    // hardware
    setProcessor(d.hardware.processor);
    setProcessorName(d.hardware.processorName);
    setRAM(d.hardware.RAM);
    setROM(d.hardware.ROM);

    // Display
    setPhoneName(d.name);
    setBrandName(d.brand);
    setPrice(String(d.price));
    setType(d.display.type);
    setRefreshrate(d.display.fps);
    setSize(d.display.size);
    setResolution(d.display.resolution);
    setOS(d.general.os);
    setFPS(d.display.PPI);
    setRsDate(d.general.release);
    setWeight(String(d.general.weight));
    setIPRating(d.general.IPrating);
    setFastCharing(d.general.fastcharging);
    setColor(d.general.colours);
    setSecurity(d.general.security);
    setBattery(String(d.general.battery));
    setId(d.id);
    setNetwork(d.network);
  }

  useEffect(() => {
    setAllData(props.data);
  }, []);

  const value = {
    Amazon,
    Filpkart,
    OS,
    Rear,
    Front,
    NoOFCamera,
    Processor,
    ProcessorName,
    RAM,
    ROM,
    Type,
    Refreshrate,
    FPS,
    Size,
    phoneName,
    Resolution,
    Weight,
    RsDate,
    FastCharing,
    BrandName,
    Color,
    IPRating,
    Battery,
    Price,
    Security,
    Network,
    setNetwork,
    setAllData,
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
    <PhoneContext.Provider value={value}>
      {props.children}
    </PhoneContext.Provider>
  );
};

export default PhoneProvider;
