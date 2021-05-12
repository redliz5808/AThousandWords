import {
  GET_USER_COLLECTIONS_PENDING,
  GET_USER_COLLECTIONS_SUCCESS,
  GET_USER_COLLECTIONS_ERROR,
} from "./userCollectionsTypes";

const initialState = {
  collections: null,
  isLoading: false,
  error: false,
};

function userCollectionsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_COLLECTIONS_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_USER_COLLECTIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        collections: action.payload,
      };
    case GET_USER_COLLECTIONS_ERROR:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
}

export default userCollectionsReducer;
