import {
  GET_FAVORITE_USER_PENDING,
  GET_FAVORITE_USER_SUCCESS,
  GET_FAVORITE_USER_ERROR,
} from "./favoriteUserTypes";

const initialState = {
  users: [],
  isLoading: false,
  error: false,
};

function favoriteUserReducer(state = initialState, action) {
  switch (action.type) {
    case GET_FAVORITE_USER_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_FAVORITE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: action.payload,
      };
    case GET_FAVORITE_USER_ERROR:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
}

export default favoriteUserReducer;
