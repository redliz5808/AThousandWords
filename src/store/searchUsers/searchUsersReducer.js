import {
  GET_USER_DATA_PENDING,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_ERROR,
} from "./searchUsersTypes";

const initialState = {
  userData: null,
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
    default:
      return state;
  }
}

export default searchUsersReducer;
