
const initialState = {
  houseList: []
};

const SET_HOSUE_LIST = "SET_HOSUE_LIST";

export const setHouseList = (houseList) => ({
  type: SET_HOSUE_LIST,
  houseList
});

export default function popupPage(state = initialState, action) {
  switch (action.type) {
    case SET_HOSUE_LIST:
      return {houseList: action.houseList};
    default:
      return state;
  }
}