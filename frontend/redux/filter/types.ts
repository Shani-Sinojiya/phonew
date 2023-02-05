// set filter types
export const SET_FILTER_RAM = "SET_FILTER_RAM";
export const SET_FILTER_ROM = "SET_FILTER_ROM";
export const SET_FILTER_PROCESSOR = "SET_FILTER_PROCESSOR";
export const SET_FILTER_CAMERA = "SET_FILTER_CAMERA";

// remove filter types
export const REMOVE_FILTER_RAM = "REMOVE_FILTER_RAM";
export const REMOVE_FILTER_ROM = "REMOVE_FILTER_ROM";
export const REMOVE_FILTER_PROCESSOR = "REMOVE_FILTER_PROCESSOR";
export const REMOVE_FILTER_CAMERA = "REMOVE_FILTER_CAMERA";

export type FilterAction = {
  type:
    | typeof SET_FILTER_RAM
    | typeof SET_FILTER_ROM
    | typeof SET_FILTER_PROCESSOR
    | typeof SET_FILTER_CAMERA
    | typeof REMOVE_FILTER_RAM
    | typeof REMOVE_FILTER_ROM
    | typeof REMOVE_FILTER_PROCESSOR
    | typeof REMOVE_FILTER_CAMERA;
  payload: string;
};
