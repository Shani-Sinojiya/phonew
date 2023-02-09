// show menu action type
export const SHOW_FILTER_MENU = "SHOW_FILTER_MENU";
export const SHOW_BRAND_MENU = "SHOW_BRAND_MENU";
export const SHOW_PRICE_MENU = "SHOW_PRICE_MENU";

// hide menu action type
export const HIDE_FILTER_MENU = "HIDE_FILTER_MENU";
export const HIDE_BRAND_MENU = "HIDE_BRAND_MENU";
export const HIDE_PRICE_MENU = "HIDE_PRICE_MENU";

type ShowMenuAction = {
  type:
    | typeof SHOW_FILTER_MENU
    | typeof SHOW_BRAND_MENU
    | typeof SHOW_PRICE_MENU
    | typeof HIDE_FILTER_MENU
    | typeof HIDE_BRAND_MENU
    | typeof HIDE_PRICE_MENU;
};

export type { ShowMenuAction };
