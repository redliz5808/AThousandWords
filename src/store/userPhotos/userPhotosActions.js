import axios from "axios";
import {
  GET_USER_PHOTOS_PENDING,
  GET_USER_PHOTOS_SUCCESS,
  GET_USER_PHOTOS_ERROR,
  GET_MORE_USER_PHOTOS_SUCCESS,
  GET_MORE_USER_PHOTOS_END_DATA,
} from "./userPhotosTypes";

export const retrieveUserPhotos = (username, page) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: GET_USER_PHOTOS_PENDING,
    });
    const { data } = await axios(
      `${process.env.REACT_APP_API_BASE_URL}/users/${username}/photos?page=${page}&per_page=12&client_id=${process.env.REACT_APP_API_KEY}`
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

export const fetchData = (username, page) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_USER_PHOTOS_PENDING,
    });
    const { data } = await axios(
      `${process.env.REACT_APP_API_BASE_URL}/users/${username}/photos?page=${page}&per_page=12&client_id=${process.env.REACT_APP_API_KEY}`
    );
    if (data.length > 0) {
      dispatch({
        type: GET_MORE_USER_PHOTOS_SUCCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: GET_MORE_USER_PHOTOS_END_DATA,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_USER_PHOTOS_ERROR,
    });
  }
};
