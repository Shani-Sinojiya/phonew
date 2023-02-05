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
      brand: data.attributes.brand,
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
        RAM: data.attributes.hardwareRAM,
        ROM: data.attributes.hardwareROM,
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
              };
            }),
    };
  }

  async getPhones(url: string) {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.API_TOKEN}`,
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
        Authorization: `Bearer ${process.env.API_TOKEN}`,
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
}

export default phone;
