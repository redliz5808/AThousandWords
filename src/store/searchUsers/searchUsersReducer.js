import {
  GET_USER_DATA_PENDING,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_ERROR,
  GET_MORE_USER_DATA_SUCCESS,
} from "./searchUsersTypes";

const initialState = {
  userData: [],
  isLoading: false,
  error: false,
};

function searchUsersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_DATA_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_USER_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userData: action.payload,
      };
    case GET_USER_DATA_ERROR:
      return {
        ...state,
        error: true,
      };
    case GET_MORE_USER_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userData: [...state.userData, ...action.payload],
      };
    default:
      return state;
  }
}

export default searchUsersReducer;
