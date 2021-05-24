import axios from "axios";
import {
  GET_PHOTO_DATA_PENDING,
  GET_PHOTO_DATA_SUCCESS,
  GET_PHOTO_DATA_ERROR,
  GET_MORE_PHOTO_DATA_SUCCESS,
} from "./searchPhotosTypes";

export const getPhotoData = (searchTerm, page) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: GET_PHOTO_DATA_PENDING,
    });
    const { data } = await axios(
      `${process.env.REACT_APP_API_BASE_URL}/search/photos?query=${searchTerm}&page=${page}&per_page=30&client_id=${process.env.REACT_APP_API_KEY}`
    );
    const results = data.results;
    dispatch({
      type: GET_PHOTO_DATA_SUCCESS,
      payload: results,
    });
  } catch (error) {
    dispatch({
      type: GET_PHOTO_DATA_ERROR,
    });
  }
};

export const fetchData = (searchTerm, page) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_PHOTO_DATA_PENDING,
    });
    const { data } = await axios(
      `${process.env.REACT_APP_API_BASE_URL}/search/photos?query=${searchTerm}&page=${page}&per_page=30&client_id=${process.env.REACT_APP_API_KEY}`
    );
    const results = data.results;
    dispatch({
      type: GET_MORE_PHOTO_DATA_SUCCESS,
      payload: results,
    });
  } catch (error) {
    dispatch({
      type: GET_PHOTO_DATA_ERROR,
    });
  }
};
