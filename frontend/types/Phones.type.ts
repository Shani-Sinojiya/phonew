type ImageInfo = {
  url: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  name: string;
};

type Imagedata = {
  id: number;
  attributes: {
    alternativeText: string;
    caption: string;
    width: number;
    height: number;
    formats: {
      thumbnail: ImageInfo;
      large: ImageInfo;
      medium: ImageInfo;
      small: ImageInfo;
    };
    hash: string;
    url: string;
    ext: string;
    mime: string;
    size: number;
    name: string;
    previewUrl: string;
    provider: string;
    provider_metadata: string;
    created_at: string;
    updated_at: string;
  };
};

type image = {
  data: Imagedata[] | null;
};

type attributes = {
  image: image;
  name: string;
  network: string;
  brand: {
    data: {
      id: number;
      attributes: {
        name: string;
        createdAt: string;
        updatedAt: string;
      };
    };
  };
  release: string;
  weight: number;
  IPrating: string;
  fastcharging: boolean;
  colours: string;
  DisplayRefreshRate: string;
  Displaytype: string;
  Displaysize: string;
  DisplayResolution: string;
  DisplayPPI: string;
  hardwareprocessor: string;
  hardwareprocessorname: string;
  camerarear: string;
  camerafront: string;
  camerano: number;
  OS: string;
  security: string[];
  battery: string;
  price: number;
  buyatamazon: string;
  buyatflipkart: string;
  RAM: string[];
  ROM: string[];
};

type Phones = {
  id: number;
  attributes: attributes;
};

// propd

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
  RAM: string[];
  ROM: string[];
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
  security: string[];
  release: string;
};

type buyAt = {
  amazon: string;
  flipkart: string;
};

type propImage = {
  id: number;
  url: string;
  alt: string | null;
};

type data = {
  id: number;
  name: string;
  image: propImage[] | null;
  price: number;
  brand: string;
  display: display;
  hardware: hardware;
  camera: camera;
  general: general;
  buyAt: buyAt;
};

type pagination = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

type props = {
  data: data[];
  pagination: pagination;
};

export type { props, data, pagination };

export type { Phones, attributes, image, ImageInfo, Imagedata };
