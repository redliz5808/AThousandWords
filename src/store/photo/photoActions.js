import axios from "axios";
import {
  FETCH_PHOTO_PENDING,
  FETCH_PHOTO_SUCCESS,
  FETCH_PHOTO_ERROR,
  SET_FAVORITES_DATA,
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

export const setFavorites = () => {
  return {
    type: SET_FAVORITES_DATA,
    payload: JSON.parse(localStorage.getItem("favoritePhotos")) || {},
  };
};

export const setFavoriteImage = (id) => (dispatch, getState) => {
  const state = getState();
  if (state.photo.favoritePhotos[id]) {
    const favoritesList = state.photo.favoritePhotos;
    delete favoritesList[id];
    dispatch({
      type: SET_FAVORITE_IMAGE,
      payload: favoritesList,
    });
  } else {
    const newFavoritesList = { ...state.photo.favoritePhotos, [id]: id };
    dispatch({
      type: SET_FAVORITE_IMAGE,
      payload: newFavoritesList,
    });
  }
};
