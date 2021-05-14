import {
  GET_FAVORITE_COLLECTION_ERROR,
  GET_FAVORITE_COLLECTION_SUCCESS,
  GET_FAVORITE_COLLECTION_PENDING,
} from "./favoriteCollectionTypes";

const initialState = {
  collections: [],
  isLoading: false,
  error: false,
};

function favoriteCollectionReducer(state = initialState, action) {
  switch (action.type) {
    case GET_FAVORITE_COLLECTION_ERROR:
      return {
        ...state,
        error: true,
      };
    case GET_FAVORITE_COLLECTION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        collections: action.payload,
      };
    case GET_FAVORITE_COLLECTION_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
}

export default favoriteCollectionReducer;
