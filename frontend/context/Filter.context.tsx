import { createContext } from "react";

interface FilterContextType {
  RAM: string[];
  setRAM: (value: string[]) => void;
  ROM: string[];
  setROM: (value: string[]) => void;
  Battery: string[];
  setBattery: (value: string[]) => void;
  Camera: string[];
  setCamera: (value: string[]) => void;
  Network: string[];
  setNetwork: (value: string[]) => void;
  Processor: string[];
  setProcessor: (value: string[]) => void;
  submit: boolean;
  setSubmit: (value: boolean) => void;
}

const FilterContext = createContext({} as FilterContextType);

export default FilterContext;
