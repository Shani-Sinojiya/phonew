import { data } from "@/types/PhonesInOne.type";
import { createContext } from "react";

interface PhoneContextData {
  // uplaod function
  hendleUpload: () => void;
  setAllData: (d: data) => void;

  // buyAt
  Amazon: string | undefined;
  setAmazon: (Amazon: string) => void;
  Filpkart: string | undefined;
  setFilpkart: (Filpkart: string) => void;

  // software
  OS: string | undefined;
  setOS: (OS: string) => void;
  OSVersion: string | undefined;
  setOSVersion: (OSVersion: string) => void;

  // Camera
  Rear: string | undefined;
  setRear: (Rear: string) => void;
  Front: string | undefined;
  setFront: (Front: string) => void;
  NoOFCamera: string | undefined;
  setNoOFCamera: (NoOFCamera: string) => void;

  // hardware
  Processor: string | undefined;
  setProcessor: (Processor: string) => void;
  ProcessorName: string | undefined;
  setProcessorName: (ProcessorName: string) => void;
  RAM: string[];
  setRAM: (RAM: string[]) => void;
  ROM: string[];
  setROM: (ROM: string[]) => void;

  // Display
  Type: string | undefined;
  setType: (Type: string) => void;
  Refreshrate: string | undefined;
  setRefreshrate: (Refreshrate: string) => void;
  Size: string | undefined;
  setSize: (Size: string) => void;
  Resolution: string | undefined;
  setResolution: (Resolution: string) => void;
  FPS: string | undefined;
  setFPS: (FPS: string) => void;

  // General
  phoneName: string | undefined;
  setPhoneName: (phoneName: string) => void;
  BrandName: number | undefined;
  setBrandName: (BrandName: number) => void;
  RsDate: string | undefined;
  setRsDate: (RsDate: string) => void;
  Weight: string | undefined;
  setWeight: (Weight: string) => void;
  IPRating: string | undefined;
  setIPRating: (IPRating: string) => void;
  FastCharing: boolean | undefined;
  setFastCharing: (FastCharing: boolean) => void;
  Color: string[];
  setColor: (Color: string[]) => void;
  Security: string[];
  setSecurity: (Security: string[]) => void;
  Battery: string | undefined;
  setBattery: (Battery: string) => void;
  Price: string | undefined;
  setPrice: (Price: string) => void;

  // network
  Network: string | undefined;
  setNetwork: (Network: string) => void;
}

const CreatePhoneContext = createContext<PhoneContextData>(
  {} as PhoneContextData
);

export default CreatePhoneContext;
