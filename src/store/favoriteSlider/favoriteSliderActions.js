import axios from "axios";
import {
  GET_FAVORITES_PENDING,
  GET_FAVORITES_SUCCESS,
  GET_FAVORITES_ERROR,
} from "./favoriteSliderTypes";

export const retrievePhotos = (photos) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_FAVORITES_PENDING,
    });
    const favoritePhotos = await Promise.all(
      Object.values(photos).map(async (photo) => {
        const { data } = await axios(
          `${process.env.REACT_APP_API_BASE_URL}/photos/${photo}?client_id=${process.env.REACT_APP_API_KEY}`
        );
        return data;
      })
    );
    dispatch({
      type: GET_FAVORITES_SUCCESS,
      payload: favoritePhotos,
    });
  } catch (error) {
    dispatch({
      type: GET_FAVORITES_ERROR,
    });
  }
};
