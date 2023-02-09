import type { brandData, data, ServerBrand } from "@/types/Brand.types";

class Brand {
  protected ApiUrl = process.env.API_URL + "/brands";
  protected ApiToken = `Bearer ${process.env.API_TOKEN}`;

  protected ApiHeader = {
    "Content-Type": "application/json",
    Authorization: this.ApiToken,
  };

  protected async getBrandsWithOutPopulate(useToken = true) {
    const response = await fetch(this.ApiUrl, {
      method: "GET",
      headers: useToken
        ? this.ApiHeader
        : { "Content-Type": "application/json" },
    });
    const { data, meta } = await response.json();
    return { data, meta };
  }

  public async getBrandsName() {
    const brands: ServerBrand = await this.getBrandsWithOutPopulate(false);
    const data = this.toNameMany(brands.data);
    return { data, meta: brands.meta };
  }

  public toNameMany(data: data[]) {
    return data.map((b) => {
      return {
        id: b.id,
        name: b.attributes.name,
      };
    });
  }
}

class AdminBrand extends Brand {
  public async getBrandsNameAndDate() {
    const brands: ServerBrand = await this.getBrandsWithOutPopulate();
    const data = this.toNameAndDateMany(brands.data);
    return { data, meta: brands.meta };
  }

  public toNameAndDateMany(data: data[]) {
    return data.map((b) => {
      return {
        id: b.id,
        name: b.attributes.name,
        createdAt: b.attributes.createdAt,
      };
    });
  }

  public async createBrand(name: string) {
    const response = await fetch(this.ApiUrl, {
      method: "POST",
      headers: this.ApiHeader,
      body: JSON.stringify({
        data: {
          name,
        },
      }),
    });
    const { data } = await response.json();
    return { success: response.status === 200 ? true : false, data };
  }

  public async FindBrand(name: string) {
    const response = await fetch(
      this.ApiUrl + "?" + "filters[name][$containsi]=" + name,
      {
        method: "GET",
        headers: this.ApiHeader,
      }
    );
    const { data, meta } = await response.json();
    return { data, meta };
  }

  public async updateBrand(id: number, name: string) {
    const response = await fetch(this.ApiUrl + `/${id}`, {
      method: "PUT",
      headers: this.ApiHeader,
      body: JSON.stringify({
        data: {
          name,
        },
      }),
    });
    const { data } = await response.json();
    return { success: response.status === 200 ? true : false, data };
  }
}

export { AdminBrand };
export default Brand;
