import {
  GET_FAVORITE_PHOTOS_PENDING,
  GET_FAVORITE_PHOTOS_SUCCESS,
  GET_FAVORITE_PHOTOS_ERROR,
} from "./favoritePhotoTypes";

const initialState = {
  photos: [],
  isLoading: false,
  error: false,
};

function favoritePhotoReducer(state = initialState, action) {
  switch (action.type) {
    case GET_FAVORITE_PHOTOS_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_FAVORITE_PHOTOS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        photos: action.payload,
      };
    case GET_FAVORITE_PHOTOS_ERROR:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
}

export default favoritePhotoReducer;
