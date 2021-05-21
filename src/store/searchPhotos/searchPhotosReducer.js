import {
  GET_PHOTO_DATA_PENDING,
  GET_PHOTO_DATA_SUCCESS,
  GET_PHOTO_DATA_ERROR,
  SET_PAGE_NUMBER,
  GET_MORE_PHOTO_DATA_SUCCESS,
} from "./searchPhotosTypes";

const initialState = {
  photoData: null,
  isLoading: false,
  error: true,
  page: 1,
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
    case GET_MORE_PHOTO_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        photoData: [...state.photoData, ...action.payload]
      }
    case SET_PAGE_NUMBER:
      return {
        ...state,
        page: action.payload,
      }
    default:
      return state;
  }
}

export default searchPhotosReducer;
