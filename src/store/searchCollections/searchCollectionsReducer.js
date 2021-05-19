import {
  GET_COLLECTION_DATA_PENDING,
  GET_COLLECTION_DATA_SUCCESS,
  GET_COLLECTION_DATA_ERROR,
  SET_FAVORITE_COLLECTIONS,
} from "./searchCollectionsTypes";

const initialState = {
  collectionData: null,
  isLoading: false,
  favoriteCollections: {},
  error: false,
};

function searchCollectionsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COLLECTION_DATA_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_COLLECTION_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        collectionData: action.payload,
      };
    case GET_COLLECTION_DATA_ERROR:
      return {
        ...state,
        error: true,
      };
    case SET_FAVORITE_COLLECTIONS:
      return {
        ...state,
        favoriteCollections: action.payload,
      };
    default:
      return state;
  }
}

export default searchCollectionsReducer;

export const getFavoriteList = (state) =>
  state.searchCollection.favoriteCollections;
