import { pagination } from "./manage-data.types";

type data = {
  id: string;
  attributes: {
    name: string;
    email: string;
    details: string;
  };
};

type contactDataApi = {
  data: {
    contactForms: {
      data: data[];
      pagniation: pagination;
    };
  };
};

export type { contactDataApi, pagination, data };
