import {
  FETCH_ALL_PHOTOS_SUCCESS,
  FETCH_ALL_PHOTOS_ERROR,
  FETCH_ALL_PHOTOS_PENDING,
  SET_PARSED_DATA,
  SET_FAVORITES_DATA,
  SET_PAGE_NUMBER,
  SET_FAVORITE_IMAGE,
} from "./homeTypes";

const initialState = {
  data: null,
  isLoading: false,
  page: 1,
  favoritePhotos: {},
  parsed: 1,
}

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ALL_PHOTOS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      };
    case FETCH_ALL_PHOTOS_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_ALL_PHOTOS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    case SET_PARSED_DATA:
      return {
        ...state,
        parsed: action.payload,
      };
    case SET_FAVORITES_DATA:
      return {
        ...state,
        parsed: action.payload,
      };
    case SET_PAGE_NUMBER:
      return {
        ...state,
        page: action.payload,
      }
    case SET_FAVORITE_IMAGE:
      return {
        ...state,
        favoritePhotos: action.payload,
      }
    default:
      return state;
  }
}

export default homeReducer;