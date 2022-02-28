const initialState = {
  loading: false,
  data: [],
  error: null
};

const LOADING_STATUS = "LOADING_STATUS";
const SUCCESS_STATUS = "SUCCESS_STATUS";
const ERROR_STATUS = "ERROR_STATUS";

export const setStateLoading = function() {
  return {
    type: LOADING_STATUS
  }
}

export const setStateSuccess = function(data) {
  return {
    type: SUCCESS_STATUS,
    data
  }
}

export const setStateError = function(error) {
  return {
    type: ERROR_STATUS,
    error
  }
}

export default function process(state = initialState, action) {
  switch (action.type) {
    case LOADING_STATUS:
      return {
        loading: true,
        data: state.data,
        error: null
      };
    case SUCCESS_STATUS:
      return {
        loading: false,
        data: action.data,
        error: null
      };
    case ERROR_STATUS:
      return {
        loading: false,
        data: [],
        error: action.error
      };
    default:
      return state;
  }
}
