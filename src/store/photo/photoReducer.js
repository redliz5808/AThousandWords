import {
  FETCH_PHOTO_SUCCESS,
  FETCH_PHOTO_ERROR,
  FETCH_PHOTO_PENDING,
  SET_FAVORITE_IMAGE,
} from "./photoTypes";

const initialState = {
  data: null,
  isLoading: false,
  favoritePhotos: {},
  error: false,
};

function photoReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PHOTO_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      };
    case FETCH_PHOTO_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_PHOTO_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    case SET_FAVORITE_IMAGE:
      return {
        ...state,
        favoritePhotos: action.payload,
      };
    default:
      return state;
  }
}

export default photoReducer;

export const getFavoritePhotos = (state) => state.photo.favoritePhotos;
