import houseData from "../json/houseData.json";
// import houseData from "../json/Dummy2.json";
import { getGeocodeWithObjectArray } from "./GeocodeAPI";

const initialState = [];

const GET_DATA = "GET_DATA";

export const getData = (data) => {
  return {type: GET_DATA, data}
};

export const getDataAsync = () => async (dispatch, getState) => {
  try {
    let promise = await getGeocodeWithObjectArray(houseData);
    dispatch({type: GET_DATA, data: promise});
  } catch (err) {
    console.log("error getDataAsync")
    console.log(err)
  }
}

export default function getDataReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DATA:
      return action.data;
    default:
      return state;
  }
}