import {
  HIDE_BRAND_MENU,
  HIDE_FILTER_MENU,
  HIDE_PRICE_MENU,
  SHOW_BRAND_MENU,
  SHOW_FILTER_MENU,
  SHOW_PRICE_MENU,
} from "./types";
import type { ShowMenuAction } from "./types";

interface ShowMenuState {
  ShowFilterMenu: boolean;
  ShowBrandMenu: boolean;
  ShowPriceMenu: boolean;
}

const initialState: ShowMenuState = {
  ShowFilterMenu: false,
  ShowBrandMenu: false,
  ShowPriceMenu: false,
};

const ShowMenu = (state = initialState, action: ShowMenuAction) => {
  switch (action.type) {
    case SHOW_FILTER_MENU:
      return {
        ...state,
        ShowFilterMenu: true,
        ShowBrandMenu: false,
        ShowPriceMenu: false,
      };

    case SHOW_BRAND_MENU:
      return {
        ...state,
        ShowBrandMenu: true,
        ShowFilterMenu: false,
        ShowPriceMenu: false,
      };

    case SHOW_PRICE_MENU:
      return {
        ...state,
        ShowPriceMenu: true,
        ShowFilterMenu: false,
        ShowBrandMenu: false,
      };

    case HIDE_FILTER_MENU:
      return {
        ...state,
        ShowFilterMenu: false,
      };

    case HIDE_BRAND_MENU:
      return {
        ...state,
        ShowBrandMenu: false,
      };

    case HIDE_PRICE_MENU:
      return {
        ...state,
        ShowPriceMenu: false,
      };

    default:
      return state;
  }
};

export default ShowMenu;
