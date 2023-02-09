import { Phones } from "./Phones.type";

type data = {
  id: number;
  attributes: {
    name: string;
    createdAt: string;
    updatedAt: string;
  };
};

type pagination = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

type ServerBrand = {
  data: data[];
  meta: {
    pagination: pagination;
  };
};

type Brand = {
  id: number;
  attributes: {
    name: string;
    createdAt: string;
    updatedAt: string;
    phones: {};
  };
};

type image = {
  id: number;
  url: string;
  attributes: {
    formats: {
      large: {
        url: string;
      };
      small: {
        url: string;
      };
      medium: {
        url: string;
      };
      thumbnail: {
        url: string;
      };
    };
  };
};

type BrandStateDataProps = {
  id: number;
  name: string;
  createdAt: string;
};

type brandData = {
  id: number;
  attributes: {
    name: string;
    createdAt: string;
    updatedAt: string;
    phones: { data: Phones[] | [] };
  };
};

type BrandProps = {
  data: BrandStateDataProps[];
  meta: {
    pagination: pagination;
  };
};

export type {
  Brand,
  ServerBrand,
  BrandProps,
  pagination,
  BrandStateDataProps,
  data,
  brandData,
};
