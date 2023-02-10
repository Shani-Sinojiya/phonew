import {
  HIDE_BRAND_MENU,
  HIDE_FILTER_MENU,
  HIDE_PRICE_MENU,
  SHOW_BRAND_MENU,
  SHOW_FILTER_MENU,
  SHOW_PRICE_MENU,
  HIDE_ALL,
} from "./types";

class Showmenu {
  ShowFilterMenu() {
    return {
      type: SHOW_FILTER_MENU,
    };
  }

  ShowBrandMenu() {
    return {
      type: SHOW_BRAND_MENU,
    };
  }

  ShowPriceMenu() {
    return {
      type: SHOW_PRICE_MENU,
    };
  }

  HideFilterMenu() {
    return {
      type: HIDE_FILTER_MENU,
    };
  }

  HideBrandMenu() {
    return {
      type: HIDE_BRAND_MENU,
    };
  }

  HidePriceMenu() {
    return {
      type: HIDE_PRICE_MENU,
    };
  }

  HideAllMenu() {
    return {
      type: HIDE_ALL,
    };
  }
}

const ShowMenu = new Showmenu();

export { ShowMenu };
