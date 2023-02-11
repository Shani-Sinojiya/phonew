import { phoneMetadata } from "@/types/phones";
import type { Imagedata, Phones } from "@/types/Phones.type";

class phone {
  toNormalFormatArray(data: Phones[]) {
    return data.map((phone) => this.toNormalFormat(phone));
  }

  toNormalFormat(data: Phones) {
    return {
      id: data.id,
      name: data.attributes.name,
      price: data.attributes.price,
      brand: data.attributes.brand.data?.attributes.name || "",
      network: data.attributes.network,
      display: {
        size: data.attributes.Displaysize,
        resolution: data.attributes.DisplayResolution,
        type: data.attributes.Displaytype,
        PPI: data.attributes.DisplayPPI,
        fps: data.attributes.DisplayRefreshRate,
      },
      hardware: {
        processor: data.attributes.hardwareprocessor,
        processorName: data.attributes.hardwareprocessorname,
        RAM: data.attributes.RAM,
        ROM: data.attributes.ROM,
      },
      camera: {
        rear: data.attributes.camerarear,
        front: data.attributes.camerafront,
        number: data.attributes.camerano,
      },
      general: {
        os: data.attributes.OS,
        battery: data.attributes.battery,
        weight: data.attributes.weight,
        IPrating: data.attributes.IPrating,
        colours: data.attributes.colours,
        fastcharging: data.attributes.fastcharging,
        security: data.attributes.security,
        release: data.attributes.release,
      },
      buyAt: {
        amazon:
          data.attributes.buyatamazon == null
            ? ""
            : data.attributes.buyatamazon,
        flipkart:
          data.attributes.buyatflipkart == null
            ? ""
            : data.attributes.buyatflipkart,
      },
      image:
        data.attributes.image.data === null
          ? null
          : data.attributes.image.data.map((img: Imagedata) => {
              return {
                id: img.id,
                url: img.attributes.url,
                alt: img.attributes.alternativeText,
                thumbnail: img.attributes.formats.thumbnail.url,
              };
            }),
    };
  }

  async getPhones(url: string) {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { data, meta } = await response.json();

    if (response.status !== 200) {
      return {
        error: true,
      };
    }

    return {
      error: false,
      data,
      meta,
    };
  }

  async getPhone(url: string) {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { data } = await response.json();

    if (response.status !== 200) {
      return {
        error: true,
      };
    }

    return {
      error: false,
      data: this.toNormalFormat(data),
    };
  }

  async SearchPhone(name: string) {
    const { data, meta, error } = await this.getPhones(
      process.env.API_URL +
        "/phones?sort[0]=release:desc&populate=image&fields[0]=name&fields[1]=release&filters[name][$containsi]=" +
        name
    );

    const allPhones = data.map((phone: phoneMetadata) => {
      const image =
        phone.attributes.image.data == null
          ? null
          : phone.attributes.image.data.map(
              (image) => image.attributes.formats.thumbnail.url
            );
      return {
        id: phone.id,
        phonename: phone.attributes.name,
        updateAt: phone.attributes.release,
        image: image == null ? "" : image[0],
      };
    });

    return { data: allPhones, meta, error };
  }
}

export default phone;
