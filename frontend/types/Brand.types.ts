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

type Brand = {};

type BrandStateDataProps = {
  id: number;
  name: string;
  createdAt: string;
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
};
