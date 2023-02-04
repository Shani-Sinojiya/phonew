type image = {
  id: number;
};

type display = {
  size: string;
  resolution: string;
  type: string;
  PPI: string;
  fps: string;
};

type hardware = {
  processor: string;
  processorName: string;
  RAM: string;
  ROM: string;
};

type camera = {
  rear: string;
  front: string;
  number: number;
};

type general = {
  os: string;
  battery: number;
  weight: number;
  IPrating: string;
  colours: string;
  fastcharging: boolean;
  security: string;
  release: string;
};

type buyAt = {
  amazon: string;
  flipkart: string;
};

type data = {
  id: number;
  name: string;
  image: image[];
  price: number;
  brand: string;
  display: display;
  hardware: hardware;
  camera: camera;
  general: general;
  buyAt: buyAt;
};

type props = {
  data: data;
};

export type { props, data };
