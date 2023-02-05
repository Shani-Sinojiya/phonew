import {
  REMOVE_FILTER_CAMERA,
  REMOVE_FILTER_PROCESSOR,
  REMOVE_FILTER_RAM,
  REMOVE_FILTER_ROM,
  SET_FILTER_CAMERA,
  SET_FILTER_PROCESSOR,
  SET_FILTER_RAM,
  SET_FILTER_ROM,
} from "./types";

export const setFilterRam = (ram: string) => {
  return {
    type: SET_FILTER_RAM,
    payload: ram,
  };
};

export const setFilterRom = (rom: string) => {
  return {
    type: SET_FILTER_ROM,
    payload: rom,
  };
};

export const setFilterProcessor = (processor: string) => {
  return {
    type: SET_FILTER_PROCESSOR,
    payload: processor,
  };
};

export const setFilterCamera = (camera: string) => {
  return {
    type: SET_FILTER_CAMERA,
    payload: camera,
  };
};

export const removeFilterRam = (ram: string) => {
  return {
    type: REMOVE_FILTER_RAM,
    payload: ram,
  };
};

export const removeFilterRom = (rom: string) => {
  return {
    type: REMOVE_FILTER_ROM,
    payload: rom,
  };
};

export const removeFilterProcessor = (processor: string) => {
  return {
    type: REMOVE_FILTER_PROCESSOR,
    payload: processor,
  };
};

export const removeFilterCamera = (camera: string) => {
  return {
    type: REMOVE_FILTER_CAMERA,
    payload: camera,
  };
};

// Path: frontend\redux\filter\index.ts
