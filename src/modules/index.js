import { combineReducers } from "redux";
import process from "./Process";
import selectIndex from "./SelectID";
import popupPage from "./PopupPage";
import getDataReducer from "./GetData";

const rootReducer = combineReducers({
  selectedID: selectIndex,
  process,
  popupPage,
  data: getDataReducer
});

export default rootReducer;