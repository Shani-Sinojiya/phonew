import { combineReducers } from "@reduxjs/toolkit";
import filter from "./filter";
import ShowMenu from "./ShowMenu";
import rating from "./rating";

const rootReducer = combineReducers({
  filter,
  ShowMenu,
  rating,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
