import {
  GET_COLLECTION_DATA_PENDING,
  GET_COLLECTION_DATA_SUCCESS,
  GET_COLLECTION_DATA_ERROR,
  SET_FAVORITE_COLLECTIONS,
  GET_MORE_COLLECTION_DATA_SUCCESS,
  SET_PAGE_NUMBER,
} from "./searchCollectionsTypes";

const initialState = {
  collectionData: null,
  isLoading: false,
  favoriteCollections: {},
  error: false,
  page: 1,
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
    case GET_MORE_COLLECTION_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        collectionData: [...state.collectionData, ...action.payload],
      };
    case SET_FAVORITE_COLLECTIONS:
      return {
        ...state,
        favoriteCollections: action.payload,
      };
    case SET_PAGE_NUMBER:
      return {
        ...state,
        page: action.payload,
      };
    default:
      return state;
  }
}

export default searchCollectionsReducer;

export const getFavoriteList = (state) =>
  state.searchCollection.favoriteCollections;
