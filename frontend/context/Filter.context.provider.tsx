import { ReactNode, useState } from "react";
import FilterContext from "./Filter.context";

type props = {
  children?: ReactNode;
};

const FilterContextProvider = (props: props) => {
  const [RAM, setRAM] = useState<string[]>([]);
  const [ROM, setROM] = useState<string[]>([]);
  const [Battery, setBattery] = useState<string[]>([]);
  const [Camera, setCamera] = useState<string[]>([]);
  const [Network, setNetwork] = useState<string[]>([]);
  const [Processor, setProcessor] = useState<string[]>([]);
  const [submit, setSubmit] = useState<boolean>(false);

  const value = {
    RAM,
    setRAM,
    ROM,
    setROM,
    Battery,
    setBattery,
    Camera,
    setCamera,
    Network,
    setNetwork,
    Processor,
    setProcessor,
    submit,
    setSubmit,
  };

  return (
    <FilterContext.Provider value={value}>
      {props.children}
    </FilterContext.Provider>
  );
};

export default FilterContextProvider;
