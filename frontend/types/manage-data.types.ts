type data = {
  id: number;
  phonename: string;
  image: string;
  updateAt: string;
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

export type { props, pagination, data };

// Path: frontend\components\manage-data\manage-data.tsx
