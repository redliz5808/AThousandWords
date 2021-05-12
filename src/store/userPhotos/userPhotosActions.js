import axios from "axios";
import {
  GET_USER_PHOTOS_PENDING,
  GET_USER_PHOTOS_SUCCESS,
  GET_USER_PHOTOS_ERROR,
} from "./userPhotosTypes";

export const retrieveUserPhotos = (username) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_USER_PHOTOS_PENDING,
    });
    const { data } = await axios(
      `${process.env.REACT_APP_API_BASE_URL}/users/${username}/photos?per_page=12&client_id=${process.env.REACT_APP_API_KEY}`
    );
    dispatch({
      type: GET_USER_PHOTOS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_USER_PHOTOS_ERROR,
    });
  }
};
