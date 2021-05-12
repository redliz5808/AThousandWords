import {
  GET_USER_PHOTOS_PENDING,
  GET_USER_PHOTOS_SUCCESS,
  GET_USER_PHOTOS_ERROR,
} from "./userPhotosTypes";

const initialState = {
  photos: null,
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
    default:
      return state;
  }
}

export default userPhotosReducer;
