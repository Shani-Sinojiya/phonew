import {
  CLEAR,
  REMOVE_FILTER_CAMERA,
  REMOVE_FILTER_NETWORK,
  REMOVE_FILTER_PROCESSOR,
  REMOVE_FILTER_RAM,
  REMOVE_FILTER_ROM,
  SET_FILTER_CAMERA,
  SET_FILTER_NETWORK,
  SET_FILTER_PROCESSOR,
  SET_FILTER_RAM,
  SET_FILTER_ROM,
  SUMBIT,
} from "./types";
import type { FilterAction } from "./types";

interface FilterState {
  ramFilter: string[];
  romFilter: string[];
  processorFilter: string[];
  networkFilter: string[];
  cameraFilter: string[];
  url: string[];
}

const initialState: FilterState = {
  ramFilter: [] as string[],
  romFilter: [] as string[],
  processorFilter: [] as string[],
  networkFilter: [] as string[],
  cameraFilter: [] as string[],
  url: [] as string[],
};

const filter = (state = initialState, action: FilterAction) => {
  switch (action.type) {
    case SET_FILTER_RAM:
      const ramFilter = state.ramFilter.includes(action.payload)
        ? state.ramFilter.filter((item) => item !== action.payload)
        : [...state.ramFilter, action.payload];
      return { ...state, ramFilter };

    case SET_FILTER_ROM:
      const romFilter = state.romFilter.includes(action.payload)
        ? state.romFilter.filter((item) => item !== action.payload)
        : [...state.romFilter, action.payload];
      return { ...state, romFilter };

    case SET_FILTER_PROCESSOR:
      const processorFilter = state.processorFilter.includes(action.payload)
        ? state.processorFilter.filter((item) => item !== action.payload)
        : [...state.processorFilter, action.payload];
      return { ...state, processorFilter };

    case SET_FILTER_CAMERA:
      const cameraFilter = state.cameraFilter.includes(action.payload)
        ? state.cameraFilter.filter((item) => item !== action.payload)
        : [...state.cameraFilter, action.payload];
      return { ...state, cameraFilter };

    case SET_FILTER_NETWORK:
      const networkFilter = state.networkFilter.includes(action.payload)
        ? state.networkFilter.filter((item) => item !== action.payload)
        : [...state.networkFilter, action.payload];
      return { ...state, networkFilter };

    case REMOVE_FILTER_RAM:
      const removeRamFilter = state.ramFilter.filter(
        (item) => item !== action.payload
      );
      return { ...state, ramFilter: removeRamFilter };

    case REMOVE_FILTER_ROM:
      const removeRomFilter = state.romFilter.filter(
        (item) => item !== action.payload
      );
      return { ...state, romFilter: removeRomFilter };

    case REMOVE_FILTER_PROCESSOR:
      const removeProcessorFilter = state.processorFilter.filter(
        (item) => item !== action.payload
      );
      return { ...state, processorFilter: removeProcessorFilter };

    case REMOVE_FILTER_CAMERA:
      const removeCameraFilter = state.cameraFilter.filter(
        (item) => item !== action.payload
      );
      return { ...state, cameraFilter: removeCameraFilter };

    case REMOVE_FILTER_NETWORK:
      const removeNetworkFilter = state.networkFilter.filter(
        (item) => item !== action.payload
      );
      return { ...state, networkFilter: removeNetworkFilter };

    case SUMBIT:
      const url: string[] = [];
      state.ramFilter.map((ram) => {
        url.push("&filters[RAM][$containsi]=" + ram.toString());
      });

      state.romFilter.map((rom) => {
        url.push("&filters[ROM][$containsi]=" + rom.toString());
      });

      state.cameraFilter.map((cam) => {
        url.push("&filters[camerafront][$containsi]=" + cam.toString());
      });

      state.processorFilter.map((pf) => {
        url.push("&filters[hardwareprocessor][$containsi]=" + pf.toString());
      });

      state.networkFilter.map((nf) => {
        url.push("&filters[network][$containsi]=" + nf.toString());
      });

      const newUrl = url.join("");
      return { ...state, url: newUrl };

    case CLEAR:
      return {
        ...state,
        ramFilter: [],
        romFilter: [],
        cameraFilter: [],
        processorFilter: [],
        url: [],
      };

    default:
      return state;
  }
};

export default filter;
