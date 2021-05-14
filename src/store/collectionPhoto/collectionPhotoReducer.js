import {
  GET_COLLECTION_PHOTO_PENDING,
  GET_COLLECTION_PHOTO_SUCCESS,
  GET_COLLECTION_PHOTO_ERROR,
} from "./collectionPhotoTypes";

const initialState = {
  data: null,
  isLoading: false,
  error: false,
};

function collectionPhotoReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COLLECTION_PHOTO_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_COLLECTION_PHOTO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case GET_COLLECTION_PHOTO_ERROR:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
}

export default collectionPhotoReducer;
