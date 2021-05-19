import axios from "axios";
import { getFavoritePhotos } from "./photoReducer";
import {
  FETCH_PHOTO_PENDING,
  FETCH_PHOTO_SUCCESS,
  FETCH_PHOTO_ERROR,
  SET_FAVORITE_IMAGE,
} from "./photoTypes";

export const retrievePhoto = (photoid) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FETCH_PHOTO_PENDING,
    });
    const { data } = await axios(
      `${process.env.REACT_APP_API_BASE_URL}/photos/${photoid}?client_id=${process.env.REACT_APP_API_KEY}`
    );
    dispatch({
      type: FETCH_PHOTO_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_PHOTO_ERROR,
    });
  }
};

export const setFavoriteImage = (id) => (dispatch, getState) => {
  const state = getState();
  const favoritePhotos = getFavoritePhotos(state);
  if (favoritePhotos[id]) {
    delete favoritePhotos[id];
    dispatch({
      type: SET_FAVORITE_IMAGE,
      payload: favoritePhotos,
    });
  } else {
    const newFavoritesList = { ...favoritePhotos, [id]: id };
    dispatch({
      type: SET_FAVORITE_IMAGE,
      payload: newFavoritesList,
    });
  }
};
