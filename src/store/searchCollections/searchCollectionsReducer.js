import {
  GET_COLLECTION_DATA_PENDING,
  GET_COLLECTION_DATA_SUCCESS,
  GET_COLLECTION_DATA_ERROR,
  GET_MORE_COLLECTION_DATA_SUCCESS,
} from "./searchCollectionsTypes";

const initialState = {
  collectionData: [],
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
    case GET_MORE_COLLECTION_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        collectionData: [...state.collectionData, ...action.payload],
      };
    default:
      return state;
  }
}

export default searchCollectionsReducer;
