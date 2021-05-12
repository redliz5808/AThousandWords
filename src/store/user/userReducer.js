import {
  FETCH_USER_DATA_SUCCESS,
  FETCH_USER_DATA_PENDING,
  FETCH_USER_DATA_ERROR,
  SET_USERNAME,
  SET_FAVORITE_USERS,
} from "./userTypes";

const initialState = {
  data: null,
  username: "",
  isLoading: false,
  favoriteUsers: {},
  error: false,
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      };
    case FETCH_USER_DATA_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_USER_DATA_ERROR:
      return {
        ...state,
        error: true,
        isLoading: false,
      };
    case SET_USERNAME:
      return {
        ...state,
        username: action.payload,
      };
    case SET_FAVORITE_USERS:
      return {
        ...state,
        favoriteUsers: action.payload,
      };
    default:
      return state;
  }
}

export default userReducer;
