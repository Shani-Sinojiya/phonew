type image = {
  id: number;
  attributes: {
    formats: {
      thumbnail: {
        url: string;
      };
    };
  };
};

type phoneMetadata = {
  id: number;
  attributes: {
    name: string;
    release: string;
    image: { data: null | image[] };
  };
};

type FullPhoneImage = {
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

export type { phoneMetadata, FullPhoneImage };
