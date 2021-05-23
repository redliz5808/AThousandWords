import {
  GET_USER_PHOTOS_PENDING,
  GET_USER_PHOTOS_SUCCESS,
  GET_USER_PHOTOS_ERROR,
  GET_MORE_USER_PHOTOS_SUCCESS,
} from "./userPhotosTypes";

const initialState = {
  photos: [],
  isLoading: false,
  error: true,
};

function userPhotosReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_PHOTOS_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_USER_PHOTOS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        photos: action.payload,
      };
    case GET_USER_PHOTOS_ERROR:
      return {
        ...state,
        error: true,
      };
    case GET_MORE_USER_PHOTOS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        photos: [...state.photos, ...action.payload],
      };
    default:
      return state;
  }
}

export default userPhotosReducer;
