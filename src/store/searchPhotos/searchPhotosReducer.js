import {
  GET_PHOTO_DATA_PENDING,
  GET_PHOTO_DATA_SUCCESS,
  GET_PHOTO_DATA_ERROR,
} from "./searchPhotosTypes";

const initialState = {
  photoData: null,
  isLoading: false,
  error: true,
};

function searchPhotosReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PHOTO_DATA_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_PHOTO_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        photoData: action.payload,
      };
    case GET_PHOTO_DATA_ERROR:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
}

export default searchPhotosReducer;
