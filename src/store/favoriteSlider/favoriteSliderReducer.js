import {
  GET_FAVORITES_PENDING,
  GET_FAVORITES_SUCCESS,
  GET_FAVORITES_ERROR,
} from "./favoriteSliderTypes";

const initialState = {
  photos: {},
  isLoading: false,
  error: false,
};

function favoriteSliderReducer(state = initialState, action) {
  switch (action.type) {
    case GET_FAVORITES_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_FAVORITES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        photos: action.payload,
      };
    case GET_FAVORITES_ERROR:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
}

export default favoriteSliderReducer;
