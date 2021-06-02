import {
  COLLECTIONS_FETCH_COLLECTION_DATA_SUCCESS,
  COLLECTIONS_FETCH_COLLECTION_DATA_ERROR,
  COLLECTIONS_FETCH_COLLECTION_DATA_PENDING,
  GET_FAVORITES_DATA,
} from "./collectionTypes";

const initialState = {
  data: null,
  favoriteCollections: [],
  isLoading: false,
  error: false,
  errorMessage: "",
};

function collectionsReducer(state = initialState, action) {
  switch (action.type) {
    case COLLECTIONS_FETCH_COLLECTION_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        error: false,
      };
    case COLLECTIONS_FETCH_COLLECTION_DATA_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case COLLECTIONS_FETCH_COLLECTION_DATA_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
        errorMessage: action.payload,
      };
    case GET_FAVORITES_DATA:
      return {
        ...state,
        favoriteCollections: action.payload,
      };
    default:
      return state;
  }
}

export default collectionsReducer;

export const getFavoriteCollections = (state) =>
  state.collection.favoriteCollections;
