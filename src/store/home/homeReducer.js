import {
  GET_ALL_PHOTOS_SUCCESS,
  GET_MORE_PHOTOS_SUCCESS,
  GET_ALL_PHOTOS_ERROR,
  GET_ALL_PHOTOS_PENDING,
  SET_FAVORITE_IMAGE,
  SHOW_MODAL,
  GET_PHOTO_PENDING,
  GET_PHOTO_SUCCESS,
  GET_PHOTO_ERROR,
  SET_IMAGE_INDEX,
  GET_MORE_PHOTOS_END_DATA,
} from "./homeTypes";

const initialState = {
  data: [],
  isLoading: false,
  favoritePhotos: {},
  showModal: false,
  displayedImageId: null,
  displayedImage: null,
  index: null,
  hasMore: true,
};

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PHOTOS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      };
    case GET_ALL_PHOTOS_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_ALL_PHOTOS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    case GET_MORE_PHOTOS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: [...state.data, ...action.payload],
      };
    case SET_FAVORITE_IMAGE:
      return {
        ...state,
        favoritePhotos: action.payload,
      };
    case SHOW_MODAL:
      return {
        ...state,
        showModal: action.payload,
      };
    case SET_IMAGE_INDEX:
      return {
        ...state,
        index: action.payload,
      };
    case GET_PHOTO_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_PHOTO_SUCCESS:
      return {
        ...state,
        displayedImage: action.payload,
        isLoading: false,
      };
    case GET_PHOTO_ERROR:
      return {
        ...state,
        error: true,
      };
    case GET_MORE_PHOTOS_END_DATA:
      return {
        ...state,
        isLoading: false,
        hasMore: false,
      };
    default:
      return state;
  }
}

export default homeReducer;

export const getFavoritePhotos = (state) => state.home.favoritePhotos;
