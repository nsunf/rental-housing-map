const initialState = {
  dong: null,
  house: null
};

const SET_DONG_ID = "SET_DONG_ID";
const SET_HOUSE_ID = "SET_HOUSE_ID";
const SET_ID = "SET_ID";
const RESET = "RESET";

export const setDongID = function(value) {
  return {
    type: SET_DONG_ID,
    value
  }
}

export const setHouseID = function(value) {
  return {
    type: SET_HOUSE_ID,
    value
  }
}

export const setID = function(dongID, houseID) {
  return {
    type: SET_ID,
    value: {dong: dongID, house: houseID}
  }
}

export const reset = function() {
  return { type: RESET };
}

export default function selectID(state = initialState, action) {
  switch (action.type) {
    case SET_DONG_ID:
      return (
        action.value == state.dong ? 
          initialState
          : { dong: action.value, house: null }
      );
    case SET_HOUSE_ID:
      return (
        action.value == state.house ? { ...state, house: null }
        : { ...state, house: action.value }
      );
      case SET_ID:
        return action.value;
      case RESET:
        return initialState;
    default:
      return state;
  }
}
